import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { classes } from "../../../utils";

export default function Map() {
  return (
    <div className={classes("h-full", "w-full")}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom
        className={classes("h-full", "w-full", 'z-0')}
        zoomAnimation
        touchZoom
        bounceAtZoomLimits
        boxZoom
        minZoom={3}
        maxZoom={18}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
