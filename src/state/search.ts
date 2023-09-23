import { createAsyncThunk, createSlice, DeepPartial, PayloadAction } from "@reduxjs/toolkit";
import { none, Option } from "@utils/option";
import { ProductLocationReturn } from "@api/productApi";
import api from "@api";
import { debounce } from "debounce";
import { assign } from "lodash";

const asyncSearchThunk = createAsyncThunk.withTypes<{ state: { search: SearchState } }>();

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

const performSearch = asyncSearchThunk(
  "search/performSearch",
  debounce(async (filter: Filter, { dispatch }) => {
    dispatch(updateResults(await api.productApi.search(filter)));
  }, 750),
);

export const updateSearchResults = asyncSearchThunk<void, Partial<Filter>>(
  "search/updateSearch",
  (filter, { dispatch, getState }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedSearch = { ...getState().search.filter, ...filter };
    dispatch(updateFilter(filter));
    dispatch(performSearch(updatedSearch));
  },
);

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
  });
}

export function preloadSearchState(preloaded: DeepPartial<SearchState>): SearchState {
  return assign({}, searchState.getInitialState(), preloaded);
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

const { updateResults } = searchState.actions;
export const { updateFilter, updateZoom, updateGotInitialPosition } = searchState.actions;
