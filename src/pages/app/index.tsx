import React, { useEffect, useState } from "react";
import Loading from "@components/Loading";
import { c } from "@utils";
import ResultsBar from "./resultsBar";

export interface LatLong {
  latitude: number;
  longitude: number;
}

const Map = React.lazy(() => import("./map"));

export default function MainApp() {
  return (
    <section
      className={c`app-height with-footer flex justify-center items-center
        w-full relative overflow-x-hidden`}
    >
      <React.Suspense fallback={<Loading />}>
        <Map />
      </React.Suspense>
      <ResultsBar />
    </section>
  );
}
