<template>
    <div id="home">
        <router-link :to="'/system/interface_info/' + item.id" v-for="item in interface_info_list" class="interface-list-item">
            <div>
                <div style="font-size: larger">{{ item.name }}</div>
                <div style="color: gray; margin-top: 8px; font-size: small">{{ item.describe }}</div>
            </div>
            <div>
                <div style="color: dodgerblue">查看详情</div>
            </div>
        </router-link>
        <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: 12px"><p style="margin-right: 12px;">共{{
                total
            }}条</p><el-pagination layout="prev, pager, next" :page-size="10" :total="total" :current-page="currentPage" @current-change="handleCurrentChange" /></div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import axios from "axios";
import {getCookie} from "../../expand/utils.js";

const total = ref(10)
const currentPage = ref(1)
const interface_info_list = ref([])

const getAliveInterfaceByPage = async () => {
    await axios({
        url: '/platform/api/center/interface/online',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        },
        params: {
            pageNum: currentPage.value
        }
    }).then((res) => {
        interface_info_list.value = res.data.data
    })
}

onMounted(async () => {
    await axios({
        url: '/platform/api/center/interface/online',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        },
    }).then((res) => {
        total.value = res.data.data.total
    })
    await getAliveInterfaceByPage()
})

const handleCurrentChange = async (targetPage) => {
    currentPage.value = targetPage
    await getAliveInterfaceByPage()
}
</script>

<style scoped>
#home {
    margin: 32px;
    width: calc(100% - 64px);
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
}

.interface-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 8px 18px;
    border: 1px solid rgba(128, 128, 128, 0.2);
}
</style>