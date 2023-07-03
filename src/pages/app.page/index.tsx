import React from "react";
import Loading from "@components/Loading";
import ResultsBar from "./resultsBar";
import AppHeight from "@components/AppHeight";

export interface LatLong {
  latitude: number;
  longitude: number;
}

const Map = React.lazy(() => import("./map"));

export default function MainApp() {
  return (
    <AppHeight>
      <React.Suspense fallback={<Loading />}>
        <Map />
      </React.Suspense>
      <ResultsBar />
    </AppHeight>
  );
}
