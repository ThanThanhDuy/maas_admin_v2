import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard";
import Station from "@/views/Station";
import Route from "@/views/Route";
import Login from "@/views/Login";
import Layout from "@/layout";
import AddRoute from "@/views/Route/AddRoute";

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
        name: "Station",
        component: Station,
        meta: { title: "ViGo - Station" },
      },
      {
        path: "route",
        name: "Route",
        component: Route,
        meta: { title: "ViGo - Route" },
      },
      {
        path: "create-route",
        name: "AddRoute",
        component: AddRoute,
        meta: { title: "ViGo - Create route" },
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
