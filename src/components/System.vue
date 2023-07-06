<template>
    <div id="system">
        <header>
            <div style="font-size: x-large">WindyApi开放平台</div>
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ store.state.user.nickname }}
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item><p style="text-align: center; width: 100%" @click="logout">退出登录</p>
                        </el-dropdown-item>
                        <el-dropdown-item><p style="text-align: center; width: 100%">SDK下载</p></el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </header>
        <div style="height: 94vh; display: flex;">
            <div id="menu">

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
import {User} from "@element-plus/icons-vue";

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
    background-color: #FCFCFDFF;
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