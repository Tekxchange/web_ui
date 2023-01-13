import React from "react";
import Loading from "../../components/Loading";
import { classes } from "../../utils";

const Map = React.lazy(() => import("./map"));

export default function MainApp() {
  return (
    <div className={classes("app-height", "with-footer")}>
      <div
        className={classes(
          "flex",
          "justify-center",
          "items-center",
          "w-full",
          "h-full"
        )}
      >
        <section
          className={classes(
            "w-full",
            "h-full",
            "flex",
            "justify-center",
            "items-center"
          )}
        >
          <React.Suspense fallback={<Loading />}>
            <Map />
          </React.Suspense>
        </section>
      </div>
    </div>
  );
}
