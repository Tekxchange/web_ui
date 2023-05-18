import { atom } from "recoil";
import { LatLong } from "../pages/app";

type SearchSlice = {
  latLong: LatLong;
};

export const searchSlice = atom<SearchSlice>({
  key: "searchSlice",
  default: {
    latLong: {
      latitude: 0,
      longitude: 0,
    },
  },
});
