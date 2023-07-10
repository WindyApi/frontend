import * as VueRouter from 'vue-router'
import {store} from './store'
import Login from "../components/Login.vue";
import System from "../components/System.vue";
import User from "../components/pages/User.vue";
import Home from "../components/pages/Home.vue";
import InterfaceInfo from "../components/pages/InterfaceInfo.vue";
import InterfaceManage from "../components/pages/admin/InterfaceManage.vue";
import Document from "../components/pages/Document.vue";
import {ElMessage} from "element-plus";
import {isEqual} from "./utils.js";

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

router.beforeEach((to, from, next) => {
    const target = to.path

    // 前往非登录页且未登录 跳转至登录页
    if (isEqual(store.state.user, {nickname: 'unknown', avatar: 'unknown', gender: 'unknown', role: 'unknown', createTime: 'unknown'}) && target !== '/login') {
        ElMessage.error("请先登录")
        return next('/login')
    }

    // 已登录 前往管理员页 且有管理员权限
    if (target.startsWith('/system/manage') && store.state.user.role === 'admin') {
        return next()
    }

    // 已登录 前往管理员页 但无管理员权限 原地不动
    if (target.startsWith('/system/manage') && store.state.user.role !== 'admin') {
        ElMessage.error("权限不足")
        return next(from.path)
    }

    // 其余情况，放行
    next()
})