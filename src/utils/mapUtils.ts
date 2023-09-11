import type { LatLong } from "src/pages/app.page";

export async function getCurrentPosition(): Promise<{
  latitude: number;
  longitude: number;
}> {
  return new Promise((res) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        res({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      },
      () => {
        res({ latitude: 0, longitude: 0 });
      },
    );
  });
}

export function inBoundingBox(latLong: LatLong, boundingBox: [number, number, number, number]): boolean {
  const north = boundingBox[1];
  const south = boundingBox[0];
  const east = boundingBox[3];
  const west = boundingBox[2];

  return (
    latLong.latitude >= south && latLong.latitude <= north && latLong.longitude <= east && latLong.longitude >= west
  );
}
