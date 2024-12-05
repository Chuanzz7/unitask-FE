import "./assets/main.css";
import "primeicons/primeicons.css";
import "vue-toastification/dist/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";

import router from "./router";

import App from "./App.vue";
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";


const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(Toast);
app.use(pinia);
app.use(Vue3ColorPicker);

app.mount("#app");
