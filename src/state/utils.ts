import { RootState } from ".";

const STATE_KEY = "SAVED_LOCAL_STATE";

export function saveState(state: Partial<RootState>) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serialized);
  } catch (e) {
  }
}

export function loadState() {
  try {
    const serialized = localStorage.getItem(STATE_KEY);
    if (!serialized) return;
    return JSON.parse(serialized);
  } catch (err) {
    return undefined;
  }
}
