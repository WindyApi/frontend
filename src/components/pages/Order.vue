<template>
    <div id="order">
        <div id="header">
            <el-button type="success" size="large" @click="openDialog">创建工单</el-button>
            <div style="display: flex; justify-content: flex-end; align-items: center">
                <p style="margin-right: 12px;">共{{ total }}条</p>
                <el-pagination layout="prev, pager, next" :page-size="10" :total="total" :current-page="currentPage" @current-change="currentPageChange" />
            </div>
            <el-dialog
                v-model="dialogVisible"
                title="新工单"
                width="50%"
            >
                <div class="line">
                    <div class="tips">相关接口</div>
                    <div class="item">
                        <el-select v-model="dialogData.interfaceId" placeholder="请选择" style="width: 40%">
                            <el-option v-for="item in dialogData.interface_info_list" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="line" style="align-items: flex-start">
                    <div class="tips">问题描述</div>
                    <div class="item">
                        <el-input
                            v-model="dialogData.submitMessage"
                            :rows="6"
                            type="textarea"
                            placeholder="必填"
                            resize="none"
                        />
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="line">
                    <div class="tips">紧急程度</div>
                    <div class="item">
                        <el-select v-model="dialogData.level" placeholder="请选择" style="width: 20%">
                            <el-option value="一般" key="一般"></el-option>
                            <el-option value="紧急" key="紧急"></el-option>
                        </el-select>
                    </div>
                </div>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="submitOrder" type="primary">提交工单</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <el-divider></el-divider>
        <el-scrollbar>
            <div id="content">
                <el-table :data="order_list" style="width: 100%" border>
                    <el-table-column prop="id" label="服务编号"/>
                    <el-table-column label="问题描述">
                        <template #default="scope">
                            {{ scope.row.submitMessage.slice(0, 10) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="interfaceName" label="相关接口"/>
                    <el-table-column label="紧急程度">
                        <template #default="scope">
                            <div v-if="scope.row.level==='一般'">&emsp;一般</div>
                            <div style="color: red" v-else>&emsp;紧急</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="replyMessage" label="回复内容">
                        <template #default="scope">
                            <div v-if="scope.row.replyMessage===null">暂无回复</div>
                            <div v-else>{{ scope.row.replyMessage.slice(0, 10) }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="工单状态">
                        <template #default="scope">
                            <div v-if="scope.row.status===0">尚未处理</div>
                            <div v-else>处理完毕</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="发起时间">
                        <template #default="scope">{{ tsToDate(scope.row.createTime) }}</template>
                    </el-table-column>
                    <el-table-column prop="updateTime" label="更新时间">
                        <template #default="scope">{{ tsToDate(scope.row.createTime) }}</template>
                    </el-table-column>
                    <el-table-column width="115" fixed="right">
                        <template #default="scope">
                            <el-button type="primary" @click="openDetailDialog(scope.row.submitMessage, scope.row.replyMessage)">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog
                    v-model="detailVisible"
                    title="工单详情"
                    width="50%"
                >
                    <el-scrollbar>
                        <div style="font-size: x-large">问题描述</div>
                        <div style="margin: 12px 0">{{ detailData.submitMessage }}</div>
                        <el-divider></el-divider>
                        <div style="font-size: x-large">管理员回复</div>
                        <div style="margin: 12px 0">{{ detailData.replyMessage }}</div>
                    </el-scrollbar>
                </el-dialog>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";
import {getCookie, tsToDate} from "../../expand/utils.js";
import {getRequest, postRequest} from "../../expand/request.js";
import {ElMessage} from "element-plus";

const total = ref(1)
const currentPage = ref(1)
const order_list = ref([])

const getAllOrder = async (pageNum) => {
    order_list.value = (await getRequest('/platform/api/center/order', {pageNum: pageNum})).data
}

onMounted(async () => {
    total.value = (await getRequest('/platform/api/center/order', undefined)).data.total
    await getAllOrder(currentPage.value)
})

const currentPageChange = async (targetPage) => {
    currentPage.value = targetPage
    await getAllOrder(targetPage)
}

const dialogVisible = ref(false)
const dialogData = ref({})

const getAllInterfaceInfo = async () => {
    let interface_info_list = [{ id: -1, name: '非特定接口'}]
    let index = 1
    do {
        interface_info_list.push(...(await getRequest('/platform/api/center/interface/online', {pageNum: index})).data)
        index++
    } while (index <= Math.floor(total / 10))
    dialogData.value.interface_info_list = interface_info_list
}

const openDialog = async () => {
    dialogData.value.interfaceId = null
    dialogData.value.level = null
    dialogData.value.submitMessage = null
    await getAllInterfaceInfo()
    dialogVisible.value = true
}

const submitOrder = async () => {
    const response = await postRequest('/platform/api/center/order', {
        interfaceId: dialogData.value.interfaceId,
        level: dialogData.value.level,
        submitMessage: dialogData.value.submitMessage
    })
    if (response.msg === 'OK') {
        ElMessage({
            message: '提交成功,管理员将会通过邮件与您联系',
            type: 'success'
        })
        dialogVisible.value = false
        await getAllOrder(currentPage.value)
    } else {
        ElMessage.error('系统异常,请直接联系管理员')
    }
}

const detailVisible = ref(false)
const detailData = ref({})

const openDetailDialog = (submitMessage, replyMessage) => {
    detailData.value.submitMessage = submitMessage
    detailVisible.value = true
    if (replyMessage === null) {
        detailData.value.replyMessage = '暂无回复'
    } else {
        detailData.value.replyMessage = replyMessage
    }
}
</script>

<style scoped>
#order {
    margin: 32px;
    width: calc(100% - 64px);
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
}

#header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

#content {
    background-color: white;
    width: 100%;
}

.line {
    display: flex;
    align-items: center;
}

.tips {
    font-weight: lighter;
    flex: 1;
}

.item {
    flex: 3;
}
</style>