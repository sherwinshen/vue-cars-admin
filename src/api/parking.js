import service from "../utils/interceptor";

/** 停车场列表 */
export function ParkingList(data = {}) {
  return service.request({
    method: "post",
    url: "/parking/list/",
    data
  });
}

/** 停车场信息 */
export function ParkingDetailed(data = {}) {
  return service.request({
    method: "post",
    url: "/parking/detailed/",
    data
  });
}

/** 新增停车场 */
export function ParkingAdd(data = {}) {
  return service.request({
    method: "post",
    url: "/parking/add/",
    data
  });
}

/** 停车场修改 */
export function ParkingEdit(data = {}) {
  return service.request({
    method: "post",
    url: "/parking/edit/",
    data
  });
}

/** 停车场删除 */
export function ParkingDelete(data = {}) {
  return service.request({
    method: "post",
    url: "/parking/delete/",
    data
  });
}
