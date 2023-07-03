import { DeepPartial } from "@reduxjs/toolkit";
import { RootState } from ".";

const STATE_KEY = "SAVED_LOCAL_STATE";

export function saveState(state: DeepPartial<RootState>) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serialized);
  } catch (e) {}
}

export function loadState() {
  try {
    const serialized = localStorage.getItem(STATE_KEY);
    if (!serialized) return;
    return JSON.parse(serialized);
  } catch (err) {
    localStorage.removeItem(STATE_KEY);
    return undefined;
  }
}
