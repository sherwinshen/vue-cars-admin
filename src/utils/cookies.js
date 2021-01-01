// ------------ cookies处理 ------------
import cookie from "cookie_js";

const adminToKen = "admin_toKen";
const usernameKey = "username";

export function getToken() {
  return cookie.get(adminToKen);
}

export function setToken(toKen) {
  return cookie.set(adminToKen, toKen);
}

export function removeToken() {
  return cookie.remove(adminToKen);
}

export function setUsername(value) {
  return cookie.set(usernameKey, value);
}

export function getUsername() {
  return cookie.get(usernameKey);
}

export function removeUsername() {
  return cookie.remove(usernameKey);
}
