import './assets/main.css'
import 'primeicons/primeicons.css';
import router from './router';
import {createApp} from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import 'vue-toastification/dist/index.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(router);
app.use(Toast)
app.use(pinia)
app.mount('#app');