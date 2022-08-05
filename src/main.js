import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import axios from 'axios' //追記
import VueAxios from 'vue-axios'

import Plotly from "plotly.js-dist-min";
const app = createApp(App)
app.use(VueAxios, axios)
app.use(createPinia())
app.use(router)
app.use(Plotly)
app.mount('#app')
