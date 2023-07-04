import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const MAX_HISTORY_SIZE = 5;

export type RouteElement = {
  pathname: string;
  search: string;
  protected: boolean;
};

export interface RouterState {
  routerHistory: RouteElement[];
}

export function createRouterState(initialState: RouterState) {
  return createSlice({
    name: "routerSlice",
    initialState: initialState,
    reducers: {
      addHistory: (state, { payload }: PayloadAction<RouteElement>) => {
        if (state.routerHistory[0]) {
          const history = state.routerHistory[0];
          if (
            history.pathname === payload.pathname &&
            history.search === payload.search &&
            history.protected === payload.protected
          )
            return;
        }
        state.routerHistory.unshift(payload);
        while (state.routerHistory.length > MAX_HISTORY_SIZE) {
          state.routerHistory.pop();
        }
      },
    },
  });
}

export const routerState = createRouterState({
  routerHistory: [],
});

export const reducer = routerState.reducer;
export const { addHistory } = routerState.actions;
