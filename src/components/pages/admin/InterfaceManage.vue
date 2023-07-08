<template>
    <div id="interface-manage">
        <div style="display: flex; justify-content: space-between; align-items: center">
            <div style="font-size: xx-large">接口详情表</div>
            <div><el-button type="primary" size="large" @click="openDialog(defaultDialogData, 'new')">新增接口</el-button></div>
        </div>
        <el-dialog
            v-model="dialogVisible"
            :title="dialogData.title"
            width="30%"
            top="5vh"
        >
            <div class="dialog-tip">接口名称</div>
            <el-input v-model="dialogData.name"></el-input>
            <div class="dialog-tip">接口描述</div>
            <el-input v-model="dialogData.describe"></el-input>
            <div class="dialog-tip">请求方式</div>
            <el-select v-model="dialogData.method" placeholder="请选择" class="m-2" style="width: 100%">
                <el-option label="GET" value="GET" />
                <el-option label="POST" value="POST" />
                <el-option label="PUT" value="PUT" />
                <el-option label="DELETE" value="DELETE" />
            </el-select>
            <div class="dialog-tip">接口地址</div>
            <el-input v-model="dialogData.url"></el-input>
            <div class="dialog-tip">请求参数</div>
            <el-input v-model="dialogData.params"></el-input>
            <div class="dialog-tip">请求头</div>
            <el-input v-model="dialogData.requestHeader"></el-input>
            <div class="dialog-tip">响应头</div>
            <el-input v-model="dialogData.responseHeader"></el-input>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="newInterface" v-if="dialogData.title === '新增接口'">
                  提交
                </el-button>
                  <el-button type="primary" @click="editInterface" v-else>
                  提交
                </el-button>
              </span>
            </template>
        </el-dialog>
        <el-divider></el-divider>
        <el-scrollbar>
            <el-table :data="interface_info_list" border style="width: calc(100vw * 7/8 - 64px);" >
                <el-table-column prop="id" label="id" width="42" fixed />
                <el-table-column prop="name" label="接口名称" width="180" fixed />
                <el-table-column prop="describe" label="接口描述" width="240" />
                <el-table-column prop="method" label="请求方式" width="120"/>
                <el-table-column label="URL" width="360">
                    <template #default="scope">
                        <div style="user-select: text">{{ scope.row.url }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="请求参数" width="240" >
                    <template #default="scope">
                        <div style="user-select: text">{{ scope.row.params }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="请求头" width="320" >
                    <template #default="scope">
                        <div style="user-select: text">{{ scope.row.requestHeader }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="响应头" width="320" >
                    <template #default="scope">
                        <div style="user-select: text">{{ scope.row.responseHeader }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="nickname" label="创建人" width="120" />
                <el-table-column prop="createTime" label="创建时间" width="200" >
                    <template #default="scope">
                        {{ tsToDate(scope.row.createTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="修改时间" width="200" >
                    <template #default="scope">
                        {{ tsToDate(scope.row.updateTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="接口状态" width="100" fixed="right">
                    <template #default="scope">
                        <div v-if="scope.row.status" style="display: flex; align-items: center"><div style="background-color: lawngreen; border-radius: 25px; width: 8px; height: 8px; margin-right: 6px;"></div>在线</div>
                        <div v-else style="display: flex; align-items: center"><div style="background-color: #ff0044; border-radius: 25px; width: 8px; height: 8px; margin-right: 6px;"></div>离线</div>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="操作" width="240" fixed="right">
                    <template #default="scope">
                        <el-button type="primary" @click="openDialog(scope.row, 'edit')">修改</el-button>
                        <el-button v-if="scope.row.status" type="warning" @click="setInterfaceStatus(scope.row.id, 0)">下线</el-button>
                        <el-button v-else type="success" @click="setInterfaceStatus(scope.row.id, 1)">上线</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: 12px"><p style="margin-right: 12px;">共{{ total }}条</p><el-pagination layout="prev, pager, next" :page-size="5" :total="total" :current-page="currentPage" @current-change="getAllInterfaceByPage" /></div>
        </el-scrollbar>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {getCookie, tsToDate} from "../../../expand/utils.js";
import {ElMessage} from "element-plus";

const total = ref(0)
const currentPage = ref(1)
const interface_info_list = ref([])

const getAllInterfaceByPage = async () => {
    await axios({
        url: '/platform/api/center/interface/all',
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
        url: '/platform/api/center/interface/all',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        },
    }).then((res) => {
        total.value = res.data.data.total
    })
    await getAllInterfaceByPage()
})

const setInterfaceStatus = async (id, status) => {
    await axios({
        url: '/platform/api/center/interface/status',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        },
        data: JSON.stringify({
            id: id,
            status: status
        })
    }).then(() => {
        getAllInterfaceByPage()
    })
}

const dialogVisible = ref(false)
const dialogData = ref({'title': 'unknown'})
const defaultDialogData = ref({
    name: null,
    describe: null,
    method: null,
    url: null,
    params: "{}",
    requestHeader: "{ \"Content-Type\": \"application/json\" }",
    responseHeader: "{ \"Content-Type\": \"application/json\" }"
})

const openDialog = (data, model) => {
    if (model === 'new') {
        data.title = '新增接口'
    } else {
        data.title = '修改接口'
    }
    dialogData.value = data
    dialogVisible.value = true
}

const resetDefaultDialogData = () => {
    defaultDialogData.value = {
        name: null,
        describe: null,
        method: null,
        url: null,
        params: "{}",
        requestHeader: "{ \"Content-Type\": \"application/json\" }",
        responseHeader: "{ \"Content-Type\": \"application/json\" }"
    }
}

const newInterface = async () => {
    await axios({
        url: '/platform/api/center/interface',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        },
        data: JSON.stringify(dialogData.value)
    }).then((res) => {
        if (res.data.msg === 'OK') {
            ElMessage({
                message: '新增接口成功',
                type: 'success',
            })
            dialogVisible.value = false
            resetDefaultDialogData()
        }
    })
    await getAllInterfaceByPage()
}

const editInterface = async () => {
    await axios({
        url: '/platform/api/center/interface',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        },
        data: JSON.stringify(dialogData.value)
    }).then((res) => {
        if (res.data.msg === 'OK') {
            ElMessage({
                message: '修改接口成功',
                type: 'success',
            })
            dialogVisible.value = false
        }
    })
    await getAllInterfaceByPage()
}
</script>

<style scoped>
#interface-manage {
    margin: 32px;
    width: calc(100% - 64px);
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
}

.dialog-tip {
    font-size: larger;
    margin: 6px 0;
}
</style>