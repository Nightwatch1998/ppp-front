import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueECharts from 'vue-echarts'
import ECharts from 'echarts'
import './static/global.css'

createApp(App)
    .use(store)
    .use(router)
    .component('vue-echarts', VueECharts)
    .mount('#app')
