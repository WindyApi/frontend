<template>
    <div id="home">
        <div style="display: flex; justify-content: space-between; align-items: center">
            <div style="display: flex; justify-content: flex-start; align-items: center">
                <el-input style="width: 20vw" placeholder="支持模糊搜索" v-model="keyword"></el-input>
                <div style="width: 1vw"></div>
                <el-button @click="search" type="primary" plain>查找接口</el-button>
                <el-dialog
                    v-model="searchDialog.visible"
                    :title="searchDialog.title"
                    width="50%"
                >
                    <el-scrollbar>
                        <div v-if="searchDialog.list.length === 0" style="font-size: xx-large; text-align: center; margin: 8vh 0;">暂无结果</div>
                        <el-scrollbar v-else>
                            <el-table :data="searchDialog.list" border>
                                <el-table-column prop="name" label="接口名称" width="240"></el-table-column>
                                <el-table-column prop="describe" label="接口描述"></el-table-column>
                                <el-table-column label="" width="90">
                                    <template #default="scope">
                                        <router-link :to="'interface_info/' + scope.row.interfaceId" style="color: #79bbff">查看详情</router-link>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-scrollbar>
                    </el-scrollbar>
                </el-dialog>
            </div>
            <div style="display: flex; justify-content: flex-end; align-items: center">
                <p style="margin-right: 12px;">共{{ total }}条</p>
                <el-pagination layout="prev, pager, next" :page-size="10" :total="total" :current-page="currentPage" @current-change="handleCurrentChange" />
            </div>
        </div>
        <el-divider></el-divider>
        <router-link :to="'/system/interface_info/' + item.id" v-for="item in interface_info_list" class="interface-list-item">
            <div>
                <div style="font-size: larger">{{ item.name }}</div>
                <div style="color: gray; margin-top: 8px; font-size: small">{{ item.describe }}</div>
            </div>
            <div>
                <div style="color: dodgerblue">查看详情</div>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {getRequest} from "../../expand/request.js";

const keyword = ref('')

const searchDialog = ref({
    visible: false,
    list: [],
    title: ''
})

const search = async () => {
    const result = await getRequest('/platform/api/center/interface/search', {keyword: keyword.value})
    searchDialog.value.list = result.data
    searchDialog.value.title = '已为您找到' + searchDialog.value.list.length+ '个接口'
    searchDialog.value.visible = true
}

const total = ref(10)
const currentPage = ref(1)
const interface_info_list = ref([])

const getAliveInterfaceByPage = async () => {
    interface_info_list.value = (await getRequest('/platform/api/center/interface/online', {pageNum: currentPage.value})).data
}

onMounted(async () => {
    total.value = (await getRequest('/platform/api/center/interface/online', null)).data.total
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