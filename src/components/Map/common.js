// 点击获取经纬度
export function getLngLat(e) {
  return {
    lng: e.lnglat.getLng(),
    lat: e.lnglat.getLat(),
    value: e.lnglat.getLng() + "," + e.lnglat.getLat()
  };
}

// 地址转经纬度并定位
export function addressSetMapCenter(address, map) {
  // eslint-disable-next-line no-undef
  const geocoder = new AMap.Geocoder();
  geocoder.getLocation(address, function(status, result) {
    if (status === "complete" && result.geocodes.length) {
      let lat = result.geocodes[0].location.lat;
      let lng = result.geocodes[0].location.lng;
      map.setCenter([lng, lat]);
    } else {
      console.error("error", "根据地址查询位置失败");
    }
  });
}
