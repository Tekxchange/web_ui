import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { reducer as authReducer } from "./auth";
import { reducer as searchReducer } from "./search";
import { reducer as resultsBarReducer } from "./resultsBar";

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    resultsBar: resultsBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
