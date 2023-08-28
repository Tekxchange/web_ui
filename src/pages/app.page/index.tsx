import ResultsBar from "./resultsBar";
import Map from "./map";
import AppHeight from "@components/AppHeight";

export interface LatLong {
  latitude: number;
  longitude: number;
}

export default function MainApp() {
  return (
    <AppHeight>
      <Map />
      <ResultsBar />
    </AppHeight>
  );
}
