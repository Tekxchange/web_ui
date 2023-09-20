import { createAsyncThunk, createSlice, DeepPartial, PayloadAction } from "@reduxjs/toolkit";
import { none, Option } from "@utils/option";
import { ProductLocationReturn } from "@api/productApi";
import { debounce } from "debounce";
import api from "@api";

export enum DistanceUnit {
  Miles = "Miles",
  NauticalMiles = "NauticalMiles",
  Kilometers = "Kilometers",
  Meters = "Meters",
}

export interface Filter {
  longitude: number;
  latitude: number;
  radius: number;
  query: Option<string>;
  priceLow: Option<number>;
  priceHigh: Option<number>;
  radiusUnit: DistanceUnit;
}

type Results = ProductLocationReturn[];

export interface SearchState {
  filter: Filter;
  results: Results;
  loading: boolean;
  gotInitialPosition: boolean;
  mapZoomAmount: number;
}

const performSearch = createAsyncThunk(
  "search/performSearch",
  debounce(async (filter: Filter) => {
    return api.productApi.search(filter);
  }, 1000),
);

export const updateSearchResults = createAsyncThunk(
  "search/updateSearch",
  (filter: Partial<Filter>, { dispatch, getState }) => {
    const updatedSearch: Filter = { ...((getState() as any).search as SearchState).filter, ...filter };
    dispatch(updateFilter(filter));
    dispatch(performSearch(updatedSearch));
  },
);

export const gotoCurrentLocation = createAsyncThunk("search/gotoCurrentLocation", async () => {
  return new Promise<{ latitude: number; longitude: number }>((res, _) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        res({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => {
        alert(
          "Unable to get current position. Either you have not given the site permissions, or your browser is not compatible.",
        );
        res({ latitude: 0, longitude: 0 });
      },
    );
  });
});

export function createSearchState(initialState: SearchState) {
  return createSlice({
    name: "searchSlice",
    initialState: initialState,
    reducers: {
      updateFilter: (state, { payload }: PayloadAction<Partial<Filter>>) => {
        state.filter = { ...state.filter, ...payload };
      },
      updateZoom: (state, { payload }: PayloadAction<number>) => {
        state.mapZoomAmount = payload;
      },
      updateGotInitialPosition: (state, { payload }: PayloadAction<boolean>) => {
        state.gotInitialPosition = payload;
      },
      updateResults: (state, { payload }: PayloadAction<ProductLocationReturn[]>) => {
        state.results = payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(performSearch.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(performSearch.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.results = payload;
      });
    },
  });
}

export function preloadSearchState(preloaded: DeepPartial<SearchState>): SearchState {
  return { ...searchState.getInitialState(), ...preloaded } as SearchState;
}

export const searchState = createSearchState({
  filter: {
    latitude: 0,
    longitude: 0,
    priceHigh: none(),
    priceLow: none(),
    query: none(),
    radius: 2,
    radiusUnit: DistanceUnit.Miles,
  },
  loading: false,
  results: [],
  gotInitialPosition: false,
  mapZoomAmount: 13,
});

export const reducer = searchState.reducer;
export const { updateFilter, updateZoom, updateGotInitialPosition } = searchState.actions;
