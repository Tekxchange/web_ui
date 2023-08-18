import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LatLong } from "../pages/app.page";
import { Option, none } from "@utils/option";

export interface Filter {
  longitude: number;
  latitude: number;
  radius: number;
  query: Option<string>;
  priceLow: Option<number>;
  priceHigh: Option<number>;
}

type Results = void;

export interface SearchState {
  filter: Filter;
  results: Option<Results>;
  loading: boolean;
  gotInitialPosition: boolean;
  mapZoomAmount: number;
}

export const updateSearch = createAsyncThunk("search/updateSearch", async (_filter: Partial<Filter>) => {});

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
      updateLocation: (state, { payload }: PayloadAction<LatLong>) => {
        state.filter = {
          ...state.filter,
          latitude: payload.latitude,
          longitude: payload.longitude,
        };
      },
      updateZoom: (state, { payload }: PayloadAction<number>) => {
        state.mapZoomAmount = payload;
      },
      updateQuery: (state, { payload }: PayloadAction<Option<string>>) => {
        state.filter = {
          ...state.filter,
          query: payload,
        };
      },
      updateGotInitialPosition: (state, { payload }: PayloadAction<boolean>) => {
        state.gotInitialPosition = payload;
      },
      updatePrice: (state, { payload }: PayloadAction<Pick<Filter, "priceLow" | "priceHigh">>) => {
        state.filter = {
          ...state.filter,
          priceHigh: payload.priceHigh,
          priceLow: payload.priceLow,
        };
      },
    },
    extraReducers: (builder) => {
      builder.addCase(updateSearch.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(updateSearch.fulfilled, (state) => {
        state.loading = false;
      });
    },
  });
}

const state = createSearchState({
  filter: {
    latitude: 0,
    longitude: 0,
    priceHigh: none(),
    priceLow: none(),
    query: none(),
    radius: 10,
  },
  loading: false,
  results: none(),
  gotInitialPosition: false,
  mapZoomAmount: 13,
});

export const reducer = state.reducer;
export const { updateLocation, updatePrice, updateQuery, updateZoom, updateGotInitialPosition } = state.actions;
