import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LatLong } from "../pages/app";
import { Option, none } from "fp-ts/Option";
import api from "../api";

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
}

export const updateSearch = createAsyncThunk(
  "search/updateSearch",
  async (filter: Partial<Filter>) => {}
);

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
      updateQuery: (state, { payload }: PayloadAction<Option<string>>) => {
        state.filter = {
          ...state.filter,
          query: payload,
        };
      },
      updatePrice: (
        state,
        { payload }: PayloadAction<Pick<Filter, "priceLow" | "priceHigh">>
      ) => {
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
      builder.addCase(updateSearch.fulfilled, (state, { payload }) => {
        state.loading = false;
      });
    },
  });
}

const state = createSearchState({
  filter: {
    latitude: 0,
    longitude: 0,
    priceHigh: none,
    priceLow: none,
    query: none,
    radius: 10,
  },
  loading: false,
  results: none,
});

export const reducer =  state.reducer;
export const { updateLocation, updatePrice, updateQuery } = state.actions;
