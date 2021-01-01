import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "Login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login")
  },
  {
    path: "/home",
    name: "Home",
    component: Layout
  }
];

const router = new VueRouter({
  routes
});

export default router;
