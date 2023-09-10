import { authState } from "./auth";
import { searchState } from "./search";
import { resultsBarState } from "./resultsBar";
import { routerState } from "./router";

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

    const un = JSON.parse(serialized);

    const state = {
      auth: { ...authState.getInitialState(), ...un.auth },
      search: { ...searchState.getInitialState(), ...un.search },
      resultsBar: { ...resultsBarState.getInitialState(), ...un.resultsBar },
      router: { ...routerState.getInitialState(), ...un.router },
    };

    return state;
  } catch (err) {
    localStorage.removeItem(STATE_KEY);
    return undefined;
  }
}
