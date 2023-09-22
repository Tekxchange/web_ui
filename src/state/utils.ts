import { preloadAuthState } from "./auth";
import { preloadSearchState } from "./search";
import { preloadResultsState } from "./resultsBar";
import { preloadRouterState } from "./router";

const STATE_KEY = "SAVED_LOCAL_STATE";

export function saveState(state: unknown) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serialized);
  } catch (e) {
    /* empty -- do nothing here, not worried about not saving state */
  }
}

export function loadState() {
  try {
    const serialized = localStorage.getItem(STATE_KEY);
    if (!serialized) return;

    let un = JSON.parse(serialized);

    const serializedVersion = un.appVersion as string | undefined;

    if (!serializedVersion || serializedVersion !== __APP_VERSION__) {
      localStorage.removeItem(STATE_KEY);
      un = { auth: { ...(un.auth || {}) } };
    }

    return {
      auth: preloadAuthState(un.auth),
      search: preloadSearchState(un.search),
      resultsBar: preloadResultsState(un.resultsBar),
      router: preloadRouterState(un.router),
    };
  } catch (err) {
    localStorage.removeItem(STATE_KEY);
    return undefined;
  }
}
