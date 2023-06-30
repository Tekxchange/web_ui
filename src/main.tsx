import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./state";
import App from "./App";
import { RecoilRoot } from "recoil";
import "./index.less";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <Provider store={store}>
        <App />
      </Provider>
    </RecoilRoot>
  </React.StrictMode>
);
