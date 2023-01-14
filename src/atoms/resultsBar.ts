import { atom } from "recoil";

export const resultsSidebarSlice = atom({
  key: "resultsSidebarSlice",
  default: {
    opened: false,
  },
});
