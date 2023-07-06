import * as VueRouter from 'vue-router'
import Login from "../components/Login.vue";
import System from "../components/System.vue";
import User from "../components/pages/User.vue";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/system',
        component: System,
        redirect: '/system/home',
        children: [
            {
                path: 'user',
                component: User
            }
        ]
    }
]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})