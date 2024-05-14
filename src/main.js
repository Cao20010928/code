import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
// import layui from '@layui/layui-vue'
// import "@layui/layui-vue/lib/index.css";
import store from './store'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import "../src/assets/icon/iconfont.css";
// import "../src/assets/icon/iconfont"
// import XLSX from 'xlsx'
import axios from "axios";
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router)
app.use(store)
app.use(elementPlus)
// app.use(layui)
app.mount('#app')
