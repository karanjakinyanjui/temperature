import Vue from "vue";
import App from "./App.vue";
import VueFormulate from "@braid/vue-formulate";
import vuetify from './plugins/vuetify';

Vue.use(VueFormulate);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
