import { LatLng, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import { useCallback, useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Circle, LayerGroup, MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { c } from "@utils";
import L from "leaflet";
import Button, { ButtonColor } from "@components/Button";
import { useAppDispatch, useAppSelector } from "@state/index";
import { DistanceUnit, updateGotInitialPosition, updateSearchResults, updateZoom } from "@state/search";
import { distanceUnitToMeters, getCurrentPosition } from "@utils/mapUtils";
import { ProductLocationReturn } from "@api/productApi";
import { LatLong } from "../index";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png?url";
import iconUrl from "leaflet/dist/images/marker-icon.png?url";
import shadowUrl from "leaflet/dist/images/marker-shadow.png?url";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function Map() {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const dispatch = useAppDispatch();

  const { gotInitialPosition, results, mapZoomAmount } = useAppSelector((state) => state.search);
  const { latitude, longitude, radiusUnit, radius } = useAppSelector((state) => state.search.filter);

  const zoomHandler = useCallback(() => {
    if (!map) return;
    const amount = map.getZoom();
    amount && dispatch(updateZoom(amount));
  }, [map]);

  async function goToCurrentLocation() {
    if (!map) return;
    const pos = await getCurrentPosition();
    map.setView(new LatLng(pos.latitude, pos.longitude));
  }

  useEffect(() => {
    if (!map) return;

    map.addEventListener("zoomend", zoomHandler);

    if (!gotInitialPosition) {
      (async () => {
        await goToCurrentLocation();
        dispatch(updateGotInitialPosition(true));
      })();
    }

    return () => {
      map.removeEventListener("zoomend", zoomHandler);
    };
  }, [gotInitialPosition, zoomHandler]);

  return (
    <div className={c`h-full w-full`}>
      <MapButtons onCurrentLocationClicked={goToCurrentLocation} />
      <MapContainer
        center={[latitude, longitude]}
        zoom={mapZoomAmount}
        scrollWheelZoom
        className={c`h-full w-full z-0 dark:invert dark:brightness-95 dark:contrast-[90%]`}
        zoomAnimation
        touchZoom
        bounceAtZoomLimits
        boxZoom
        minZoom={5}
        maxZoom={16}
        ref={(r) => setMap(r)}
      >
        <MyCustomLayerGroup
          results={results}
          centerLatLng={{ latitude, longitude }}
          radius={radius}
          unit={radiusUnit}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://maps.tekxchange.net/tile/{z}/{x}/{y}.png"
        />
        <MapEventListener />
      </MapContainer>
    </div>
  );
}

type CustomLayerProps = {
  results: ProductLocationReturn[];
  centerLatLng: LatLong;
  radius: number;
  unit: DistanceUnit;
};

function MyCustomLayerGroup({ centerLatLng, unit, radius, results }: CustomLayerProps) {
  return (
    <LayerGroup>
      <Circle
        center={new LatLng(centerLatLng.latitude, centerLatLng.longitude)}
        radius={distanceUnitToMeters(radius, unit)}
        className="pointer-events-none"
      />
      {results?.map((result) => {
        return (
          <Marker position={new LatLng(result.latitude, result.longitude)} key={result.id}>
            <h1>Hello World</h1>
          </Marker>
        );
      })}
    </LayerGroup>
  );
}

function MapEventListener() {
  const dispatch = useAppDispatch();

  useMapEvents({
    moveend: (e) => {
      const center: LatLng | undefined = e.target.getCenter?.();
      if (center) {
        dispatch(updateSearchResults({ latitude: center.lat, longitude: center.lng }));
      }
    },
  });

  return <></>;
}

interface MapButtonsProps {
  onCurrentLocationClicked: (() => void) | (() => Promise<void>);
}

function MapButtons(props: MapButtonsProps) {
  return (
    <div
      className={c`absolute flex w-full h-full bg-transparent z-10
       pointer-events-none p-1 pt-20 pb-5 md:pb-0 justify-start items-end`}
    >
      <section
        className={c`pointer-events-auto opacity-50 hover:opacity-100 top-full
         p-1 rounded-md transition-all h-fit`}
      >
        <Button
          className={c`rounded-none h-full`}
          buttonColor={ButtonColor.Blue}
          data-tooltip-id="tooltip"
          data-tooltip-content="Go to current location"
          onClick={props.onCurrentLocationClicked}
        >
          <MapPinIcon className={c`w-7 h-7`} />
        </Button>
      </section>
    </div>
  );
}
