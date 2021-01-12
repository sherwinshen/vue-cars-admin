import service from "../utils/interceptor";

/** 新增停车场 */
export function ParkingAdd(data = {}) {
  return service.request({
    method: "post",
    url: "/parking/add/",
    data
  });
}
