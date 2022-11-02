import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
const app = createApp(App);

// Vant
import Vant from "vant";
import "vant/lib/index.css";

// less
import "@/assets/less/index.less";

// js
import $common from "./utils/common";
app.config.globalProperties.$common = $common;

app.use(router).use(Vant).mount("#app");
