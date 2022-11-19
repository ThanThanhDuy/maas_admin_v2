import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard";
import Station from "@/views/Station";
import Route from "@/views/Route";
import Login from "@/views/Login";
import Layout from "@/layout";
import AddRoute from "@/views/Route/AddRoute";
import Driver from "@/views/Driver";
import DriverDetail from "@/views/Driver/DriverDetail";
import RouteDetail from "@/views/Route/RouteDetail";
import HelpCenter from "@/views/HelpCenter";
import Message from "@/views/Message";
import Banner from "@/views/Banner";
import Promotion from "@/views/Promotion";
import Setting from "@/views/Setting";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { title: "ViGo - Login" },
  },
  {
    path: "/",
    component: Layout,
    name: "Default",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { title: "ViGo - Dashboard" },
      },
      {
        path: "station",
        name: "Stations",
        component: Station,
        meta: { title: "ViGo - Station" },
      },
      {
        path: "route",
        name: "Routes",
        component: Route,
        meta: { title: "ViGo - Route" },
      },
      {
        path: "create-route",
        name: "AddRoute",
        component: AddRoute,
        meta: { title: "ViGo - Create route" },
      },
      {
        path: "driver",
        name: "Drivers",
        component: Driver,
        meta: { title: "ViGo - Driver" },
      },
      {
        path: "driver/:code",
        name: "DriverDetail",
        component: DriverDetail,
        meta: { title: "ViGo - Driver Detail" },
      },
      {
        path: "route/:code",
        name: "RouteDetail",
        component: RouteDetail,
        meta: { title: "ViGo - Route Detail" },
      },
      {
        path: "help",
        name: "Help",
        component: HelpCenter,
        meta: { title: "ViGo - Help Center" },
      },
      {
        path: "messages",
        name: "Messages",
        component: Message,
        meta: { title: "ViGo - Chat Support" },
      },
      {
        path: "banner",
        name: "Banners",
        component: Banner,
        meta: { title: "ViGo - Banner" },
      },
      {
        path: "promotion",
        name: "Promotions",
        component: Promotion,
        meta: { title: "ViGo - Promotion" },
      },
      {
        path: "setting",
        name: "Settings",
        component: Setting,
        meta: { title: "ViGo - Settings" },
      },
    ],
    redirect: "/dashboard",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// eslint-disable-next-line
router.beforeEach(async (to, from, next) => {
  const user = localStorage.getItem("USER");
  if (to.name !== "Login" && !JSON.parse(user)) next({ name: "Login" });
  else next();
});

const DEFAULT_TITLE = "ViGo";
// eslint-disable-next-line
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
