import service from "../utils/interceptor";

/** 订单状态 - 待取车 */
export function OrderWait(data = {}) {
  return service.request({
    method: "post",
    url: "/order/wait/",
    data
  });
}

/** 订单状态 - 超时 */
export function OrderOvertime(data = {}) {
  return service.request({
    method: "post",
    url: "/order/overtime/",
    data
  });
}

/** 订单状态 - 完成 */
export function OrderOver(data = {}) {
  return service.request({
    method: "post",
    url: "/order/over/",
    data
  });
}

/** 订单状态 - 取消 */
export function OrderCancel(data = {}) {
  return service.request({
    method: "post",
    url: "/order/cancel/",
    data
  });
}

/** 订单状态 - 待还车 */
export function OrderReturn(data = {}) {
  return service.request({
    method: "post",
    url: "/order/return/",
    data
  });
}
