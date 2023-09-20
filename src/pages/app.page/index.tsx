import ResultsBar from "./resultsBar";
import Map from "./map";
import AppHeight from "@components/AppHeight";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@state/index";
import { updateSearchResults } from "@state/search";

export interface LatLong {
  latitude: number;
  longitude: number;
}

export default function MainApp() {
  const { filter } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateSearchResults(filter));
  }, []);

  return (
    <AppHeight>
      <Map />
      <ResultsBar />
    </AppHeight>
  );
}
