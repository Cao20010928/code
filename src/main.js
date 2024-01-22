import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import layui from '@layui/layui-vue'
import "@layui/layui-vue/lib/index.css";
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(layui)
app.mount('#app')
