import service from "../utils/interceptor";
/**
 * 获取验证码
 */
export function GetCode(data) {
  return service.request({
    method: "post",
    url: "/getCode/",
    data
  });
}

/**
 * 注册
 */
export function Register(data) {
  return service.request({
    method: "post",
    url: "/register/",
    data
  });
}

/**
 * 登录
 */
export function Login(data) {
  return service.request({
    method: "post",
    url: "/login/",
    data
  });
}

/**
 * 退出
 */
export function Logout(data) {
  return service.request({
    method: "post",
    url: "/logout/",
    data
  });
}
