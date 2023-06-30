import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ResultsBarState {
  opened: boolean;
}

export function createResultsBarState(initialState: ResultsBarState) {
  return createSlice({
    initialState,
    name: "resultsBarSlice",
    reducers: {
      setBarStatus: (state, { payload }: PayloadAction<boolean>) => {
        state.opened = payload;
      },
    },
  });
}

const resultsBarState = createResultsBarState({ opened: false });

export const reducer = resultsBarState.reducer;
export const { setBarStatus } = resultsBarState.actions;
