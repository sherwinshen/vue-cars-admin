import service from "../utils/interceptor";

/** 获取租赁列表 */
export function RentList(data = {}) {
  return service.request({
    method: "post",
    url: "/lease/carsLeaseList/",
    data
  });
}
/** 添加 */
export function RentAdd(data = {}) {
  return service.request({
    method: "post",
    url: "/lease/add/",
    data
  });
}

/** 添加 */
export function RentStatus(data = {}) {
  return service.request({
    method: "post",
    url: "/lease/status/",
    data
  });
}

/** 编辑 */
export function RentEdit(data = {}) {
  return service.request({
    method: "post",
    url: "/lease/edit/",
    data
  });
}
