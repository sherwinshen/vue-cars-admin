import service from "@/utils/interceptor";
import requestUrl from "@/api/requestUrl";
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
 * 获取表格数据
 */
export function TableData(params = {}) {
  return service.request({
    method: "post",
    url: requestUrl[params.url],
    data: params.data
  });
}
