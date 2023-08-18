import { configureStore } from "@reduxjs/toolkit";
import { RouteElement, reducer as routerReducer, routerState } from "../router";

function createState() {
  return configureStore({
    reducer: {
      routerReducer,
    },
  });
}

describe("src/state/router.ts", () => {
  describe("Init", () => {
    it("Loads the intial state", () => {
      const store = createState();
      expect(store.getState().routerReducer).toEqual({ routerHistory: [] });
    });
  });
  describe("Actions", () => {
    describe("addHistory", () => {
      it("Adds history if it does no exist at the top of the stack", () => {
        const { dispatch, getState } = createState();

        const newHistoryItem: RouteElement = {
          pathname: "/",
          protected: false,
          search: "",
        };

        expect(getState().routerReducer.routerHistory.length).toEqual(0);
        dispatch(routerState.actions.addHistory(newHistoryItem));
        expect(getState().routerReducer.routerHistory[0]).toEqual(newHistoryItem);
      });
      it("Does not add history to the top of the stack if the top is equal to the new item", () => {
        const historyItem: RouteElement = {
          pathname: "/",
          protected: false,
          search: "",
        };
        const { dispatch, getState } = createState();
        dispatch(routerState.actions.addHistory(historyItem));
        expect(getState().routerReducer.routerHistory.length).toEqual(1);
        dispatch(routerState.actions.addHistory(historyItem));
        expect(getState().routerReducer.routerHistory.length).toEqual(1);
      });
      it("Removes the oldest item from the history if the history is greater than 5 elements", () => {
        const { dispatch, getState } = createState();
        for (let i = 0; i < 5; i++) {
          dispatch(
            routerState.actions.addHistory({
              pathname: i.toString(),
              protected: false,
              search: "",
            }),
          );
        }
        expect(getState().routerReducer.routerHistory.length).toEqual(5);
        dispatch(
          routerState.actions.addHistory({
            pathname: "newItem",
            protected: false,
            search: "",
          }),
        );
        expect(getState().routerReducer.routerHistory.length).toEqual(5);
        expect(getState().routerReducer.routerHistory.find((i) => i.pathname.includes("0"))).toBeFalsy();
      });
    });
  });
});
