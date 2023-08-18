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
