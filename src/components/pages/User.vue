<template>
    <div id="user">
        <div style="flex: 2; display: flex; flex-direction: column">
            <div id="user-card">
                <el-image style="width: 10vw; height: 10vw; margin-top: 16px" :src="store.state.user.avatar" @click="uploadAvatar" fit="contain"></el-image>
                <div class="user-info-line" style="margin-top: 32px"><el-icon><User /></el-icon>&nbsp;{{ store.state.user.nickname }}</div>
                <div class="user-info-line"><el-icon><Male v-if="store.state.user.gender==='男'"/><Female v-else-if="store.state.user.gender==='女'"/><Hide v-else/></el-icon>&nbsp;{{ store.state.user.gender }}</div>
                <div class="user-info-line"><el-icon><Loading /></el-icon>&nbsp;{{ (tsToDate(store.state.user.createTime)) }}</div>
                <el-divider />
                <div style="display: flex; align-items: center; width: 100%">
                    <div style="flex: 1; display: flex; justify-content: center"><el-button type="success" plain @click="openDialog('信息修改')">信息修改</el-button></div>
                    <div style="flex: 1; display: flex; justify-content: center"><el-button type="primary" plain @click="openDialog('修改密码')">修改密码</el-button></div>
                    <div style="flex: 1; display: flex; justify-content: center"><el-button type="warning" plain @click="openDialog('重置密钥')">重置密钥</el-button></div>
                </div>
                <el-dialog
                    v-model="dialogData.dialogVisible"
                    :title="dialogData.title"
                    width="30%"
                >
                    <div v-if="dialogData.title === '信息修改'">
                        <div class="dialog-tips">昵称</div>
                        <el-input v-model="dialogData.info.nickname"></el-input>
                        <div class="dialog-tips">性别</div>
                        <el-select v-model="dialogData.info.gender" style="width: 100%" clearable>
                            <el-option label="男" value="0"/>
                            <el-option label="女" value="1"/>
                            <el-option label="保密" value="-1"/>
                        </el-select>
                        <div class="dialog-tips">邮箱</div>
                        <el-input v-model="dialogData.info.email"></el-input>
                        <div class="dialog-tips">验证码</div>
                        <el-input v-model="dialogData.info.verifyCode"></el-input>
                    </div>
                    <div v-if="dialogData.title === '修改密码'">
                        <div class="dialog-tips">新密码</div>
                        <el-input v-model="dialogData.password.newPassword" type="password" show-password></el-input>
                        <div class="dialog-tips">验证码</div>
                        <el-input v-model="dialogData.password.verifyCode"></el-input>
                    </div>
                    <div v-if="dialogData.title === '重置密钥'">
                        确认要重置吗？
                    </div>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="getVerifyCode" v-if="dialogData.title !== '重置密钥'">获取验证码</el-button>
                            <el-button type="primary" @click="editInfo" v-if="dialogData.title === '信息修改'">
                                确认
                            </el-button>
                            <el-button type="primary" @click="editPassword" v-if="dialogData.title === '修改密码'">
                                确认
                            </el-button>
                            <el-button type="primary" @click="resetKey" v-if="dialogData.title === '重置密钥'">
                                确认
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
                <el-divider />
                <div style="font-weight: 600; display: flex; align-items: center">个性签名<el-icon><Edit /></el-icon></div>
                <div style="margin-top: 12px;">生活就像一本书，你要翻过去才能知道结局</div>
            </div>
        </div>
        <div style="flex: 5; display: flex; flex-direction: column">
            <div id="interface-card">
                <p style="color: dodgerblue; width: 99%; font-size: x-large; text-align: left">已订阅接口</p>
                <el-divider/>
                <div class="interface-card-line" v-for="line in userInterfaceRecordData">
                    <div class="box" v-for="item in line">
                        <div class="box-header">{{ item.interfaceName }}</div>
                        <div class="box-body">
                            <div style="flex: 1; display: flex; flex-direction: column;">
                                <div style="font-size: small; color: gray">调用次数</div>
                                <div style="font-size: x-large">{{ item.totalNum }}</div>
                            </div>
                            <div style="flex: 1; display: flex; flex-direction: column;">
                                <div style="font-size: small; color: gray">剩余</div>
                                <div style="font-size: x-large">{{ item.leftNum }}</div>
                            </div>
                        </div>
                        <div class="box-footer">
                            <div style="display: flex; flex-direction: column">
                                <div style="font-size: 14px">更新时间</div>
                                <div style="font-size: 16px" v-if="item.updateTime === null">暂无调用记录</div>
                                <div style="font-size: 16px" v-else>{{ tsToDate(item.updateTime) }}</div>
                            </div>
                            <el-button plain style="position: relative; right: 31px" @click="router.push('/system/interface_info/' + item.interfaceId)">续订</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useStore} from "vuex";
import {getCookie, tsToDate} from "../../expand/utils.js";
import {Edit, Female, Hide, Loading, Male, User} from "@element-plus/icons-vue";
import axios from "axios";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

const store = useStore()
const router = useRouter()

const convertTo2DArray = (arr) => {
    const result = [];
    const cols = 3;
    const length = arr.length;
    for (let i = 0; i < length; i += cols) {
        const row = arr.slice(i, i + cols);
        result.push(row);
    }
    return result;
}

const userInterfaceRecordData = ref()

onMounted(async () => {
    await axios({
        url: '/platform/api/center/user_interface_record',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        }
    }).then((res) => {
        userInterfaceRecordData.value = convertTo2DArray(res.data.data)
    })
})

const uploadAvatar = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.jpg, .png';
    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        if (file.size > 20 * 1024 * 1024) {
            alert('文件大小不能超过20MB');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        await axios({
            url: '/platform/api/center/user/avatar',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': getCookie('token')
            },
            data: formData
        }).then((res) => {
            store.commit('setAvatar', {
                avatar: res.data.data
            })
        })
    });
    fileInput.click();
}

const dialogData = ref({
    dialogVisible: false,
    title: 'unknown',
    info: {
        verifyCode: null,
        nickname: null,
        gender: null,
        email: null
    },
    password: {
        verifyCode: null,
        newPassword: null
    }
})

const openDialog = (model) => {
    dialogData.value.title = model
    dialogData.value.dialogVisible = true
}

const getVerifyCode = async () => {
    await axios({
        url: '/platform/api/center/user/verify',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        }
    }).then((res) => {
        if (res.data.msg === 'OK') {
            ElMessage({
                message: '验证码发送成功，请查看邮箱',
                type: 'success',
            })
        } else {
            ElMessage.error("系统出错，请联系管理员")
        }
    })
}

const editInfo = async () => {
    if (dialogData.value.info.nickname === null && dialogData.value.info.gender === null && dialogData.value.info.email === null) {
        ElMessage.error("请至少输入一项信息")
        return
    }
    if (dialogData.value.info.verifyCode === null) {
        ElMessage.error("请输入验证码")
        return
    }
    await axios({
        url: '/platform/api/center/user/info',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        },
        data: JSON.stringify({
            verifyCode: dialogData.value.info.verifyCode,
            nickname: dialogData.value.info.nickname,
            gender: dialogData.value.info.gender,
            email: dialogData.value.info.email
        })
    }).then((res) => {
        if (res.data.msg === 'OK') {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
            dialogData.value.dialogVisible = false
        } else if (res.data.msg === '验证码错误') {
            ElMessage.error("验证码错误，请重试")
        } else {
            ElMessage.error("系统出错，请联系管理员")
        }
    })
}

const editPassword = async () => {
    if (dialogData.value.password.newPassword === null) {
        ElMessage.error("请输入新密码")
        return
    }
    if (dialogData.value.password.verifyCode === null) {
        ElMessage.error("请输入验证码")
        return
    }
    await axios({
        url: '/platform/api/center/user/password',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        },
        data: JSON.stringify({
            verifyCode: dialogData.value.password.verifyCode,
            newPassword: dialogData.value.password.newPassword
        })
    }).then((res) => {
        if (res.data.msg === 'OK') {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
            dialogData.value.dialogVisible = false
            store.commit('resetUser')
            router.push('/login')
        } else if (res.data.msg === '验证码错误') {
            ElMessage.error("验证码错误，请重试")
        } else {
            ElMessage.error("系统出错，请联系管理员")
        }
    })
}

const resetKey = async () => {
    await axios({
        url: '/platform/api/center/user/resetKey',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': getCookie('token')
        }
    }).then((res) => {
        if (res.data.msg === 'OK') {
            ElMessage({
                message: '重置成功，请查看邮箱',
                type: 'success',
            })
        } else {
            ElMessage.error("系统出错，请联系管理员")
        }
        dialogData.value.dialogVisible = false
    })
}
</script>

<style scoped>
#user {
    margin: 32px;
    width: calc(100% - 64px);
    height: calc(100% - 64px);
    display: flex;
}

#user-card {
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 24px;
    align-items: center;
    border-radius: 5px;
}

.user-info-line {
    margin-top: 12px;
    margin-right: auto;
    margin-left: 24px;
    display: flex;
    align-items: center;
}

#interface-card {
    margin-left: 24px;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 24px;
    align-items: center;
    border-radius: 5px;
}

.interface-card-line {
    display: flex;
    width: 100%;
    margin-top: -6px;
}

.box {
    width: calc(33% - 48px);
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.2);
    margin: 24px;
}

.box:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: shadow-appear 0.3s ease-out forwards;
}

@keyframes shadow-appear {
    0% {
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }
    50% {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    100% {
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
    }
}

.box-header {
    font-size: x-large;
    font-weight: bolder;
    margin: 16px;
}

.box-body {
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
}

.box-footer {
    width: 100%;
    margin: 16px;
    position: relative;
    display: flex;
    justify-content: space-between;
}

.dialog-tips {
    font-size: larger;
    margin: 12px 0;
}
</style>