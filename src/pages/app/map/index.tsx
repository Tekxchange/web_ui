import { LatLng, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import { useEffect, useRef } from "react";
import { Navigation2 } from "react-feather";
import { MapPinIcon } from "@heroicons/react/24/outline";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { LatLong } from "..";
import { c } from "@utils";
import { useSetRecoilState } from "recoil";
import { searchSlice } from "@atoms/search";
import Button, { ButtonColor } from "@components/Button";
import Tooltip from "@components/Tooltip";

interface IMapProps {
  latLong: LatLong;
}

export default function Map(props: IMapProps) {
  const { latLong } = props;

  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    map.setView(new LatLng(latLong.latitude, latLong.longitude));
  }, [latLong]);

  return (
    <div className={c`h-full w-full`}>
      <MapButtons />
      <MapContainer
        center={[latLong.latitude, latLong.longitude]}
        zoom={13}
        scrollWheelZoom
        className={c`h-full w-full z-0`}
        zoomAnimation
        touchZoom
        bounceAtZoomLimits
        boxZoom
        minZoom={3}
        maxZoom={18}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEventListener />
      </MapContainer>
    </div>
  );
}

function MapEventListener() {
  const setSearch = useSetRecoilState(searchSlice);

  useMapEvents({
    moveend: (e) => {
      const center: LatLng | undefined = e.target.getCenter?.();

      if (center) {
        setSearch((v) => ({
          ...v,
          latLong: {
            latitude: center.lat,
            longitude: center.lng,
          },
        }));
      }
    },
  });

  return <></>;
}

function MapButtons() {
  return (
    <div
      className={c`absolute flex w-full h-full bg-transparent z-50 pointer-events-none p-1 pt-20 pb-5 md:pb-0 justify-start items-end`}
    >
      <section
        className={c`pointer-events-auto opacity-50 hover:opacity-100 top-full
         p-1 rounded-md border-black border transition-all h-fit`}
      >
        <Tooltip text="Go to current location">
          <Button className={c`rounded-none h-full`} buttonColor={ButtonColor.Blue}>
            <MapPinIcon className={c`w-7 h-7`}/>
          </Button>
        </Tooltip>
      </section>
    </div>
  );
}
