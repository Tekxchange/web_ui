import { LatLng, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import { useCallback, useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { c } from "@utils";
import Button, { ButtonColor } from "@components/Button";
import { useAppDispatch, useAppSelector } from "@state/index";
import { updateGotInitialPosition, updateLocation, updateZoom } from "@state/search";
import { getCurrentPosition } from "@utils/mapUtils";

export default function Map() {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const dispatch = useAppDispatch();
  const {
    gotInitialPosition,
    filter: { latitude, longitude },
  } = useAppSelector((state) => state.search);
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
        zoom={13}
        scrollWheelZoom
        className={c`h-full w-full z-0`}
        zoomAnimation
        touchZoom
        bounceAtZoomLimits
        boxZoom
        minZoom={5}
        maxZoom={16}
        ref={(r) => setMap(r)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://maps.tekxchange.net/tile/{z}/{x}/{y}.png"
        />
        <MapEventListener />
      </MapContainer>
    </div>
  );
}

function MapEventListener() {
  const dispatch = useAppDispatch();

  useMapEvents({
    moveend: (e) => {
      const center: LatLng | undefined = e.target.getCenter?.();

      if (center) {
        dispatch(
          updateLocation({
            latitude: center.lat,
            longitude: center.lng,
          }),
        );
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
