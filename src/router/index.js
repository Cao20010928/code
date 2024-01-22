// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import logInSignUp from "@/views/logInSignUp";
//
// Vue.use(VueRouter)
// const routes = [
//     {
//         path: '/',
//         name: 'home',
//         components: logInSignUp
//     }
// ]
// const router = new VueRouter({
//     mode: 'history',
//     base: process.env.BASE_URL,
//     routes
// })
//
// export default router
import {createRouter, createWebHistory} from "vue-router";
// import {createRouter} from "vue-router";

const routes = [
    {
        path: '/',
        component: ()=> import('../views/logInSignUp')
    },
    {
        path: '/mainMenu',
        component: ()=> import('../views/mainMenu')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
// router.beforeEach()
export default router