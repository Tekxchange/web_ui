import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store, { RootState } from "./state";
import App from "./App";
import { debounce } from "debounce";
import "./index.less";
import "react-toastify/dist/ReactToastify.css";
import { saveState } from "@state/utils";
import { DeepPartial } from "@reduxjs/toolkit";
import React from "react";

store.subscribe(
  debounce(() => {
    // Not serializing:
    // Auth, search results
    const {
      auth: { wasLoggedIn, ..._rest },
      search: { results: _results, ...search },
      ...rest
    } = store.getState();
    const toSave = rest as DeepPartial<RootState> & { appVersion: string };

    toSave.search = search;
    toSave.auth = { wasLoggedIn };
    toSave.appVersion = __APP_VERSION__;

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
