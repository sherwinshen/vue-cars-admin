import service from "../utils/interceptor";
/**
 * 获取城市列表
 */
export function GetCity(data = {}) {
  return service.request({
    method: "post",
    url: "/cityPicker/",
    data
  });
}
