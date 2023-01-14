import { LatLng, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import { useEffect, useRef } from "react";

import { MapContainer, TileLayer } from "react-leaflet";
import { LatLong } from "..";
import { classes } from "@utils";

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
    <div className={classes("h-full", "w-full")}>
      <MapContainer
        center={[latLong.latitude, latLong.longitude]}
        zoom={13}
        scrollWheelZoom
        className={classes("h-full", "w-full", "z-0")}
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
      </MapContainer>
    </div>
  );
}
