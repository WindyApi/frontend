<template>
    <div id="order-manage">
        <div id="header">
            <el-radio-group v-model="status" class="ml-4">
                <el-radio label="0" size="large">尚未处理</el-radio>
                <el-radio label="1" size="large">处理完毕</el-radio>
            </el-radio-group>
            <el-button type="success" style="margin: 0 32px" @click="getAllOrder(currentPage, status)">筛选</el-button>
            <el-button type="primary" @click="getAllOrder(currentPage, status=null)">重置</el-button>
            <div style="display: flex; justify-content: flex-end; align-items: center">
                <p style="margin: 0 32px;">待处理工单&nbsp;{{ total.waitTotal }}&nbsp;条 已处理工单&nbsp;{{ total.endTotal }}&nbsp;条</p>
                <el-pagination layout="prev, pager, next" :page-size="10" :total="total.all" :current-page="currentPage" @current-change="currentPageChange" />
            </div>
        </div>
        <el-divider></el-divider>
        <div id="content">
            <el-table :data="order_list" style="width: 100%" border>
                <el-table-column label="编号" prop="orderId" width="100"></el-table-column>
                <el-table-column label="用户昵称" prop="nickname"></el-table-column>
                <el-table-column label="接口名称" prop="interfaceName"></el-table-column>
                <el-table-column label="紧急程度" width="120">
                  <template #default="scope">
                    <div v-if="scope.row.level==='一般'">&emsp;一般</div>
                    <div style="color: red" v-else>&emsp;紧急</div>
                  </template>
                </el-table-column>
                <el-table-column label="问题描述">
                  <template #default="scope">
                    {{ scope.row.submitMessage.slice(0, 10) }}
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
                <el-table-column width="115" fixed="right">
                    <template #default="scope">
                        <el-button type="primary" @click="openDialog(scope.row.orderId, scope.row.submitMessage)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                v-model="dialogVisible"
                title="回复工单"
                width="50%"
            >
                <el-scrollbar>
                    <div style="margin-bottom: 24px">
                        <div style="font-size: x-large">用户描述</div>
                        <div style="margin: 16px">&emsp;&emsp;{{ UserSubmitMessage }}</div>
                    </div>
                    <div style="font-size: x-large; margin-bottom: 16px">回复内容</div>

                    <el-input
                        v-model="dialogData.replyMessage"
                        :rows="6"
                        type="textarea"
                        placeholder="必填"
                        resize="none"
                    />
                </el-scrollbar>
                <template #footer>
                      <span class="dialog-footer">
                          <el-button type="primary" @click="replyOrder">提交回复</el-button>
                      </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";
import {getCookie, tsToDate} from "../../../expand/utils.js";
import {ElMessage} from "element-plus";

const total = ref({
    all: 0,
    waitTotal: 0,
    endTotal: 0
})
const currentPage = ref(1)
const status = ref(null)
const order_list = ref([])

const getAllOrder = async (pageNum, status) => {
    console.log(pageNum)
    await axios({
        url: '/platform/api/center/order/all',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        },
        params: {
            pageNum: pageNum,
            status: status
        }
    }).then((res) => {
        order_list.value = res.data.data
    })
}

onMounted(async () => {
    await axios({
        url: '/platform/api/center/order/all',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        }
    }).then((res) => {
        total.value.waitTotal = res.data.data.waitTotal
        total.value.endTotal = res.data.data.endTotal
        total.value.all = res.data.data.waitTotal + res.data.data.endTotal
    })
    await getAllOrder(currentPage.value)
})

const currentPageChange = async (targetPage) => {
    currentPage.value = targetPage
    await getAllOrder(targetPage, null)
}

const dialogVisible = ref(false)
const dialogData = ref({})
const UserSubmitMessage = ref('')

const openDialog = (orderId, submitMessage) => {
    UserSubmitMessage.value = submitMessage
    dialogData.value.orderId = orderId
    dialogData.value.replyMessage = null
    dialogVisible.value = true
}

const replyOrder = async () => {
    await axios({
        url: '/platform/api/center/order',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        },
        data: JSON.stringify({
            orderId: dialogData.value.orderId,
            replyMessage: dialogData.value.replyMessage
        })
    }).then((res) => {
        if (res.data.msg === 'OK') {
            ElMessage({
                message: '回复成功',
                type: 'success'
            })
            dialogVisible.value = false
        }
    })
}
</script>

<style scoped>
#order-manage {
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
}

#content {
    background-color: white;
    width: 100%;
}
</style>