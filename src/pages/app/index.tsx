import React, { useEffect, useState } from "react";
import Loading from "@components/Loading";
import { classes } from "@utils";
import ResultsBar from "./resultsBar";

export interface LatLong {
  latitude: number;
  longitude: number;
}

const Map = React.lazy(() => import("./map"));

export default function MainApp() {
  const [latLong, setLatLong] = useState<LatLong>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    window.navigator?.geolocation?.getCurrentPosition(
      (pos) => {
        setLatLong({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => {
        alert(
          "Unable to get your location from the browser. You will have to find it on your own!"
        );
      }
    );
  }, []);
  return (
    <section
      className={classes(
        "app-height",
        "with-footer",
        "flex",
        "justify-center",
        "items-center",
        "w-full",
        "relative"
      )}
    >
      <React.Suspense fallback={<Loading />}>
        <Map latLong={latLong} />
      </React.Suspense>
      <ResultsBar />
    </section>
  );
}
