import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./state";
import App from "./App";
import { debounce } from "debounce";
import "./index.less";
import { saveState } from "@state/utils";

store.subscribe(
  debounce(() => {
    const { auth: _, ...toSave } = store.getState();
    saveState(toSave);
  }, 800)
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
