import service from "../utils/interceptor";

/** 会员详情 */
export function MemberDetailed(data = {}) {
  return service.request({
    method: "post",
    url: "/member/detailed/",
    data
  });
}

/** 会员修改 */
export function MemberEdit(data = {}) {
  return service.request({
    method: "post",
    url: "/member/edit/",
    data
  });
}

/** 更新实名认证 */
export function UpdateRealName(data = {}) {
  return service.request({
    method: "post",
    url: "/member/updateRealName/",
    data
  });
}

/** 黑名单 */
export function Blacklist(data = {}) {
  return service.request({
    method: "post",
    url: "/member/blacklist/",
    data
  });
}

/** 认证图片 */
export function Photo(data = {}) {
  return service.request({
    method: "post",
    url: "/member/photo/",
    data
  });
}

/** 清除金额 */
export function AmountClear(data = {}) {
  return service.request({
    method: "post",
    url: "/member/amountClear/",
    data
  });
}
