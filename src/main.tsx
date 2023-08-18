import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store, { RootState } from "./state";
import App from "./App";
import { debounce } from "debounce";
import "./index.less";
import { saveState } from "@state/utils";
import { DeepPartial } from "@reduxjs/toolkit";

store.subscribe(
  debounce(() => {
    // Not serializing:
    // Auth, search results
    const {
      auth: _,
      search: { results: _results, ...search },
      ...rest
    } = store.getState();
    const toSave = rest as DeepPartial<RootState>;

    toSave.search = search;

    saveState(toSave);
  }, 800),
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
