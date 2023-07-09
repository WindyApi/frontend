import * as VueRouter from 'vue-router'
import Login from "../components/Login.vue";
import System from "../components/System.vue";
import User from "../components/pages/User.vue";
import Home from "../components/pages/Home.vue";
import InterfaceInfo from "../components/pages/InterfaceInfo.vue";
import InterfaceManage from "../components/pages/admin/InterfaceManage.vue";
import Document from "../components/pages/Document.vue";

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
                path: 'home',
                component: Home
            },
            {
                path: 'user',
                component: User
            },
            {
                path: 'interface_info/:id',
                component: InterfaceInfo
            },
            {
                path: 'document',
                component: Document
            },
            {
                path: 'manage',
                children: [
                    {
                        path: 'interface',
                        component: InterfaceManage
                    }
                ]
            }
        ]
    }
]

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})