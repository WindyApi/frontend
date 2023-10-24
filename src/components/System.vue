<template>
    <div id="system">
        <header>
            <div style="font-size: x-large; display: flex; align-items: center">
                <svg t="1688623995827" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="965" width="200" height="200"><path d="M135.152059 155.655281c-23.117275-6.950697-22.682856-39.84239 0.620598-46.234549L532.707121 0.878146a24.048171 24.048171 0 0 1 11.791361-0.217209L909.161852 85.55874c23.706843 5.523322 25.134218 38.694284 2.016943 46.265579l-402.768085 131.877069a24.048171 24.048171 0 0 1-14.428903 0.15515L135.152059 155.655281zM46.840967 856.806872A24.048171 24.048171 0 0 1 31.015719 834.217106V224.107237c0-16.135547 15.608039-27.7097 31.029898-22.993155l384.770744 117.199928c10.146777 3.10299 17.066444 12.411959 17.066445 23.024185v633.537441a24.048171 24.048171 0 0 1-32.302125 22.589767l-384.770744-140.658531z m489.217383 120.489097c0 16.011428 15.32877 27.55455 30.7196 23.117274l408.818915-118.006705c10.301926-2.94784 17.376743-12.38093 17.376743-23.086244V223.610759a24.048171 24.048171 0 0 0-30.719599-23.117275l-408.818916 118.006705a24.048171 24.048171 0 0 0-17.376743 23.117275v635.678505z" fill="#C1D0FF" p-id="966"></path><path d="M713.67349 558.547486a186.179392 186.179392 0 1 1-372.358784 0 186.179392 186.179392 0 0 1 372.358784 0z" fill="#0F62FE" p-id="967"></path><path d="M135.152059 159.192689c-23.117275-7.136877-22.682856-40.742257 0.620598-47.258535L532.707121 0.878146a23.520663 23.520663 0 0 1 11.791361-0.217209L909.161852 87.482593c23.706843 5.647442 25.134218 39.594151 2.016943 47.320596L508.41071 269.659129a23.551693 23.551693 0 0 1-14.428903 0.155149L135.152059 159.192689zM46.840967 876.169529A24.57568 24.57568 0 0 1 31.015719 853.021224V229.165111c0-16.507906 15.608039-28.330298 31.029898-23.520663l384.770744 119.868498a24.51362 24.51362 0 0 1 17.066445 23.520664v647.873255c0 17.066444-16.600996 28.950895-32.302125 23.086244l-384.770744-143.82358z m489.217383 123.219727c0 16.352757 15.32877 28.175148 30.7196 23.613753L975.565835 902.358763a24.51362 24.51362 0 0 0 17.376744-23.644783V228.637603c0-16.352757-15.32877-28.144118-30.7196-23.582723l-408.818916 120.644246a24.51362 24.51362 0 0 0-17.376743 23.613753v650.076377z" fill="#E8E8E8" fill-opacity=".1" p-id="968"></path><path d="M341.625005 651.668212a31.029899 31.029899 0 0 1 30.998869 31.091958l-0.24824 186.179392a31.029899 31.029899 0 1 1-62.059797-0.093089l0.248239-186.179393a31.029899 31.029899 0 0 1 31.060929-30.998868z" fill="#FFFFFF" p-id="969"></path><path d="M341.656035 620.638313a31.029899 31.029899 0 1 1 0.062059-62.059798 31.029899 31.029899 0 0 1-0.062059 62.059798z" fill="#FFFFFF" p-id="970"></path><path d="M539.06825 24.616019L142.102756 135.609966l358.829749 110.652619 402.768085-134.85594L539.09928 24.616019zM55.06389 229.165111v623.887143l384.770744 143.854611V349.03361L55.06389 229.165111zM560.075492 999.389256l408.818915-120.675276V228.668632l-408.818915 120.706306v650.045348zM135.741627 111.934154L532.769181 0.878146a23.520663 23.520663 0 0 1 11.791361-0.217209L909.161852 87.482593c23.706843 5.647442 25.134218 39.594151 2.016943 47.320596L508.41071 269.659129a23.551693 23.551693 0 0 1-14.428903 0.155149L135.152059 159.192689c-23.117275-7.136877-22.682856-40.742257 0.620598-47.258535zM31.015719 853.021224V229.165111c0-16.507906 15.608039-28.330298 31.029898-23.520663l384.770744 119.868498a24.51362 24.51362 0 0 1 17.066445 23.520664v647.873255c0 17.066444-16.600996 28.950895-32.302125 23.086244l-384.770744-143.82358A24.57568 24.57568 0 0 1 31.015719 853.021224z m535.731201 169.950755c-15.39083 4.561395-30.7196-7.260996-30.7196-23.613752v-650.076378a24.51362 24.51362 0 0 1 17.376743-23.613753L962.222979 205.02385c15.39083-4.530365 30.7196 7.260996 30.7196 23.644782v650.076378a24.51362 24.51362 0 0 1-17.376744 23.582723l-408.818915 120.706306z" fill="#FFFFFF" fill-opacity=".6" p-id="971"></path></svg>
                WindyApi开放平台
            </div>
            <el-dropdown>
                <span class="el-dropdown-link" style="display: flex; align-items: center">
                    <img :src="store.state.user.avatar" alt="" style="width: 4vh; height: 4vh; object-fit: contain; border-radius: 50px; margin-right: 8px">{{ store.state.user.nickname }}
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item><p style="text-align: center; width: 100%">SDK下载</p></el-dropdown-item>
                        <el-dropdown-item><p style="text-align: center; width: 100%" @click="logout">退出登录</p></el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </header>
        <div style="height: 94vh; display: flex;">
            <div id="menu">
                <el-menu
                    router="true"
                    default-active="home"
                    background-color="#F5F5F5FF"
                    text-color="#FFFFFFF"
                    active-text-color="#1890FFFF"
                    style="height: 94vh"
                >
                    <el-menu-item index="home" route="/system/home"><el-icon><House /></el-icon>首页</el-menu-item>
                    <el-menu-item index="user" route="/system/user"><el-icon><User /></el-icon>个人中心</el-menu-item>
                    <el-menu-item index="document" route="/system/document"><el-icon><DocumentCopy /></el-icon>使用手册</el-menu-item>
                    <el-menu-item index="order" route="/system/order" v-if="store.state.user.role !== 'guest'"><el-icon><Edit /></el-icon>我的工单</el-menu-item>
                    <el-sub-menu index="manage" v-if="store.state.user.role === 'admin'">
                        <template #title><el-icon><ElementPlus /></el-icon>管理页</template>
                        <el-menu-item index="manage-system" route="/system/manage/system"><el-icon><Odometer /></el-icon>系统分析</el-menu-item>
                        <el-menu-item index="manage-interface" route="/system/manage/interface"><el-icon><Operation /></el-icon>接口管理</el-menu-item>
                        <el-menu-item index="manage-order" route="/system/manage/order"><el-icon><Message /></el-icon>工单管理</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
            <div id="main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {DocumentCopy, Edit, ElementPlus, House, Message, Odometer, Operation, User} from "@element-plus/icons-vue";

const store = useStore()
const router = useRouter()

const logout = () => {
    store.commit('resetUser')
    router.push('/login')
}
</script>

<style scoped>
#system {
    width: 100vw;
    height: 100vh;
    background-color: #F5F5F5FF;
    display: flex;
    flex-direction: column;
}

header {
    height: 6vh;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2vw;
    border-bottom: 1px solid #ededee;
    font-family: "站酷仓耳渔阳体-05", fangsong;
    font-weight: 600;
}

header svg {
    width: 3vh;
    height: 3vh;
    margin-right: 6px;
}

.el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
    font-size: large;
}

.el-dropdown-link:focus {
    outline: none;
}

#menu {
    flex: 1;
}

.el-menu-item.is-active {
    background-color: #e6f7ff !important;
}

.el-menu-item svg {
    width: 100%;
    height: 100%;
}

#main {
    flex: 7;
}
</style>