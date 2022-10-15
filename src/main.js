import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as VueGoogleMaps from "vue2-google-maps";
import "./plugins/ant-design-vue.js";
//style commons
import "@/theme/commons/style.scss";
// reset css
import "@/theme/commons/reset.scss";

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    // key: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
    key: "",
    libraries: "places",
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
