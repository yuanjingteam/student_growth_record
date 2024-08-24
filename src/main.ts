import { createApp } from "vue";
import { store } from "./store";
// normalize.css
import "normalize.css/normalize.css";
// 全局样式
import "./styles/index.less";
// tailwindcss
import "./styles/tailwind.css";
// svg icon
import "virtual:svg-icons-register";
// 引入vconsole移动端调试工具
// import VConsole from "vconsole";
// import eruda from "eruda";

// new VConsole();
// eruda.init();

import { Lazyload } from "vant";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Lazyload);

app.mount("#app");
