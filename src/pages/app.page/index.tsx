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

  // Ensure we get search results the first time the map loads. New search results will happen
  // Whenever the filter gets updated (i.e. location change, etc.)
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
