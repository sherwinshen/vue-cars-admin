import service from "../utils/interceptor";

/** 新增停车场 */
export function ParkingAdd(data = {}) {
  return service.request({
    method: "post",
    url: "/parking/add/",
    data
  });
}

/** 停车场列表 */
export function ParkingList(data = {}) {
  return service.request({
    method: "post",
    url: "/parking/list/",
    data
  });
}
