import { LatLng, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import { useEffect, useRef } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { LatLong } from "..";
import { c } from "@utils";
import Button, { ButtonColor } from "@components/Button";
import { useAppDispatch } from "@state/index";
import { updateLocation } from "@state/search";
import { getCurrentPosition } from "../../../utils/mapUtils";

interface IMapProps {
  latLong: LatLong;
}

export default function Map(props: IMapProps) {
  const { latLong } = props;

  const mapRef = useRef<LeafletMap | null>(null);

  async function goToCurrentLocation() {
    if (!mapRef.current) return;
    const pos = await getCurrentPosition();
    mapRef.current.setView(new LatLng(pos.latitude, pos.longitude));
  }

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    map.setView(new LatLng(latLong.latitude, latLong.longitude));
  }, [latLong]);

  return (
    <div className={c`h-full w-full`}>
      <MapButtons onCurrentLocationClicked={goToCurrentLocation} />
      <MapContainer
        center={[latLong.latitude, latLong.longitude]}
        zoom={13}
        scrollWheelZoom
        className={c`h-full w-full z-0`}
        zoomAnimation
        touchZoom
        bounceAtZoomLimits
        boxZoom
        minZoom={5}
        maxZoom={16}
        ref={mapRef}
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
          })
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
      className={c`absolute flex w-full h-full bg-transparent z-10 pointer-events-none p-1 pt-20 pb-5 md:pb-0 justify-start items-end`}
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
