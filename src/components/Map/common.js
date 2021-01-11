export function getLngLat(e) {
  return {
    lng: e.lnglat.getLng(),
    lat: e.lnglat.getLat(),
    value: e.lnglat.getLng() + "," + e.lnglat.getLat()
  };
}
