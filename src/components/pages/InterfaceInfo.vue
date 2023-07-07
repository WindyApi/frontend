<template>
    <el-scrollbar>
        <div id="interface-info">
            <div id="title">接口文档</div>
            <el-divider></el-divider>
            <div id="table">
                <div style="font-size: x-large; margin-bottom: 16px;">{{ interface_doc.name }}</div>
                <table style="border-collapse: collapse; width: 100%; border: 1px solid rgba(128,128,128,0.2)">
                    <tr style="display: flex; width: 100%">
                        <td class="table-header">描述</td>
                        <td style="flex: 4; user-select: text">{{ interface_doc.describe }}</td>
                        <td class="table-header">请求地址</td>
                        <td style="flex: 4; user-select: text">{{ interface_doc.url }}</td>
                    </tr>
                    <tr style="display: flex; width: 100%">
                        <td class="table-header">请求方法</td>
                        <td style="flex: 4; user-select: text">{{ interface_doc.method }}</td>
                        <td class="table-header">接口状态</td>
                        <td style="flex: 4; user-select: text; display: flex; align-items: center" v-if="interface_doc.status">
                            <div style="background-color: lawngreen; border-radius: 25px; width: 8px; height: 8px; margin-right: 6px;"></div>
                            正常
                        </td>
                    </tr>
                    <tr style="display: flex; width: 100%">
                        <td class="table-header">创建时间</td>
                        <td style="flex: 4; user-select: text">{{ tsToDate(interface_doc.createTime) }}</td>
                        <td class="table-header">更新时间</td>
                        <td style="flex: 4; user-select: text">{{ tsToDate(interface_doc.updateTime) }}</td>
                    </tr>
                    <tr style="display: flex; width: 100%">
                        <td class="table-header">请求头</td>
                        <td style="flex: 4; user-select: text">{{ interface_doc.requestHeader }}</td>
                        <td class="table-header">响应头</td>
                        <td style="flex: 4; user-select: text">{{ interface_doc.responseHeader }}</td>
                    </tr>
                    <tr style="display: flex; width: 100%">
                        <td class="table-header">请求参数</td>
                        <td style="flex: 1" v-if="interface_doc.params === null || interface_doc.params === ''">{}</td>
                        <td style="flex: 1" v-else>{{ interface_doc.params }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </el-scrollbar>
</template>

<script setup>
import {useRoute} from "vue-router";
import {ref, onMounted} from "vue";
import axios from "axios";
import {getCookie, tsToDate} from "../../expand/utils.js";

const route = useRoute()

const interface_doc = ref({
    id: route.params.id,
    name: null,
    describe: null,
    method: null,
    url: null,
    params: null,
    requestHeader: null,
    responseHeader: null,
    status: null,
    createTime: null,
    updateTime: null
})

onMounted(async () => {
    await axios({
        url: '/platform/api/center/interface',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        },
        params: {
            id: route.params.id
        }
    }).then((res) => {
        interface_doc.value = res.data.data
    })
})
</script>

<style scoped>
#interface-info {
    margin: 32px;
    width: calc(100% - 64px);
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
}

#title {
    font-family: "站酷仓耳渔阳体-05", fangsong;
    font-size: xx-large;
}

#table {
    background-color: white;
    padding: 24px;
    display: flex;
    flex-direction: column;
}

td {
    border: 1px solid rgba(128, 128, 128, 0.2);
    padding: 16px 24px;
}

.table-header {
    background-color: rgb(250, 250, 250);
    width: 10%;
}
</style>