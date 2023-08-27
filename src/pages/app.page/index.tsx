import { lazy } from "react";
import ResultsBar from "./resultsBar";
import AppHeight from "@components/AppHeight";
import LazyComponent from "@components/LazyComponent";

export interface LatLong {
  latitude: number;
  longitude: number;
}

export default function MainApp() {
  return (
    <AppHeight>
      <LazyComponent component={lazy(() => import("./map"))} />
      <ResultsBar />
    </AppHeight>
  );
}
