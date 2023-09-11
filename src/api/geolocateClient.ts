import axios from "axios";

type CityStateResponse = {
  boundingbox: [string, string, string, string];
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  license: string;
  lon: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  powered_by: string;
  type: string;
};

export default {
  latLongFromCityState: async function (
    city: string,
    state: string,
    _country: string,
    zip: string,
  ): Promise<{
    latitude: number;
    longitude: number;
    boundingBox: [number, number, number, number];
  }> {
    const result = await axios.get<CityStateResponse[]>(`https://geocode.maps.co/search?q=${city},${state},${zip}`);

    const data = result.data.sort((a, b) => b.importance - a.importance);
    if (data.length < 1) throw new Error("Data not found");
    return {
      latitude: Number(data[0].lat),
      longitude: Number(data[0].lon),
      boundingBox: data[0].boundingbox.map((num) => Number(num)) as [number, number, number, number],
    };
  },
  //   cityStateFromLatLong: async function (latLong: LatLong): Promise<{
  //     city: string;
  //     state: string;
  //     country: string;
  //     zip: string;
  //   }> {},
};
