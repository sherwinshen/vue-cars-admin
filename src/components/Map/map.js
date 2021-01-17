// 点击获取经纬度
export function amapGetLngLat(e) {
  return {
    lng: e.lnglat.getLng(),
    lat: e.lnglat.getLat(),
    value: e.lnglat.getLng() + "," + e.lnglat.getLat()
  };
}

// 地址转经纬度并定位
export function amapAddressSetMapCenter(address, map) {
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

// 根据经纬度设置覆盖物
let marker;
export function amapSetMarker(lnglat, map) {
  if (marker) {
    map.remove(marker);
    marker = null;
  }
  // eslint-disable-next-line no-undef
  marker = new AMap.Marker({
    icon:
      "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
    position: [lnglat.lng, lnglat.lat],
    // eslint-disable-next-line no-undef
    offset: new AMap.Pixel(-13, -30)
  });
  map.add(marker);
  map.setFitView();
}

// 清除覆盖物
export function amapClearMarker(map) {
  if (marker) {
    map.remove(marker);
    marker = null;
  }
}
