import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () => import("../views/Login")
  },
  // 控制台
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "控制台"
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Console",
        meta: {
          title: "首页"
        },
        component: () => import("../views/Console")
      }
    ]
  },
  // 停车场
  {
    path: "/parking",
    name: "Parking",
    meta: {
      title: "停车场"
    },
    component: Layout,
    children: [
      {
        path: "/parkingList",
        name: "ParkingList",
        meta: {
          title: "停车场列表"
        },
        component: () => import("../views/Parking")
      },
      {
        path: "/parkingAdd",
        name: "ParkingAdd",
        meta: {
          title: "新增停车场"
        },
        component: () => import("../views/Parking/add.vue")
      }
    ]
  },
  // 品牌管理
  {
    path: "/brand",
    name: "Brand",
    meta: {
      title: "品牌管理"
    },
    component: Layout,
    children: [
      {
        path: "/brandList",
        name: "BrandList",
        meta: {
          title: "品牌列表"
        },
        component: () => import("../views/Brand")
      }
    ]
  },
  // 车辆管理
  {
    path: "/cars",
    name: "Cars",
    meta: {
      title: "车辆管理"
    },
    component: Layout,
    children: [
      {
        path: "/carsList",
        name: "CarsList",
        meta: {
          title: "车辆列表"
        },
        component: () => import("../views/Cars")
      },
      {
        path: "/carsAttr",
        name: "CarsAttr",
        meta: {
          title: "车辆属性"
        },
        component: () => import("../views/Cars/attr.vue")
      },
      {
        path: "/carsAdd",
        name: "CarsAdd",
        meta: {
          title: "新增车辆"
        },
        component: () => import("../views/Cars/add.vue")
      }
    ]
  },
  // 租赁管理
  {
    path: "/rent",
    name: "Rent",
    meta: {
      title: "租车管理"
    },
    component: Layout,
    children: [
      {
        path: "/rentList",
        name: "RentList",
        meta: {
          title: "租车列表"
        },
        component: () => import("../views/Rent")
      }
    ]
  },
  // 会员管理
  {
    path: "/member",
    name: "Member",
    meta: {
      title: "会员管理"
    },
    component: Layout,
    children: [
      {
        path: "/memberList",
        name: "MemberList",
        meta: {
          title: "会员列表"
        },
        component: () => import("../views/Member")
      },
      {
        path: "/memberEdit",
        name: "MemberEdit",
        hidden: true,
        meta: {
          title: "会员编辑"
        },
        component: () => import("../views/Member/edit.vue")
      },
      {
        path: "/memberDetail",
        name: "MemberDetail",
        hidden: true,
        meta: {
          title: "会员详情"
        },
        component: () => import("../views/Member/detail.vue")
      }
    ]
  },
  // 订单管理
  {
    path: "/order",
    name: "Order",
    meta: {
      title: "订单管理"
    },
    component: Layout,
    children: [
      {
        path: "/orderList",
        name: "OrderList",
        meta: {
          title: "订单列表"
        },
        component: () => import("../views/Order")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
