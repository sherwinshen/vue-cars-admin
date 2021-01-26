import service from "@/utils/interceptor";
import requestUrl from "@/api/requestUrl";

/**
 * 获取表格数据
 */
export function GetTableData(params = {}) {
  return service.request({
    method: "post",
    url: requestUrl[params.url],
    data: params.data
  });
}

/**
 * 删除表格数据
 */
export function DeleteTableData(params = {}) {
  return service.request({
    method: "post",
    url: requestUrl[params.url],
    data: params.data
  });
}

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

/**
 * 获取车辆品牌
 */
export function GetCarsBrand(data = {}) {
  return service.request({
    method: "post",
    url: "/common/getCarsBrand/",
    data
  });
}

/**
 * 获取停车场
 */
export function GetParking(data = {}) {
  return service.request({
    method: "post",
    url: "/common/getParking/",
    data
  });
}
