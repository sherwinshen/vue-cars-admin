import { Login } from "@/api/login";
import {
  setToken,
  setUsername,
  getUsername,
  removeToken,
  removeUsername
} from "@/utils/cookies";

const state = {
  toKen: "",
  username: getUsername() || "",
  roles: [], // 用户角色
  buttonPermission: []
};
const mutations = {
  SET_TOKEN(state, value) {
    state.toKen = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  },
  SET_ROLES(state, value) {
    state.roles = value;
  },
  SET_BUTTON(state, value) {
    state.buttonPermission = value;
  }
};
const getters = {
  roles: state => state.roles,
  buttonPermission: state => state.buttonPermission
};
const actions = {
  login(content, requestData) {
    return new Promise((resolve, reject) => {
      Login(requestData)
        .then(response => {
          content.commit("SET_TOKEN", response.data.data.token);
          content.commit("SET_USERNAME", response.data.data.username);
          setToken(response.data.data.token);
          setUsername(response.data.data.username);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  exit(content) {
    return new Promise(resolve => {
      removeToken();
      removeUsername();
      content.commit("SET_TOKEN", "");
      content.commit("SET_USERNAME", "");
      content.commit("SET_ROLES", []);
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
