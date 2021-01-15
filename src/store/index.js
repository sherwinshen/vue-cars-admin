import Vue from "vue";
import Vuex from "vuex";

import login from "@/store/modules/login";
import config from "@/store/modules/config";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    config
  }
});
