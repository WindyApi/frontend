<template>
    <div id="user">
        <div style="flex: 2; display: flex; flex-direction: column">
            <div id="user-card">
                <el-image style="width: 25%; margin-top: 16px" src="/images/default-avatar.jpg"></el-image>
                <div class="user-info-line" style="margin-top: 32px"><el-icon><User /></el-icon>&nbsp;{{ store.state.user.nickname }}</div>
                <div class="user-info-line"><el-icon><Male v-if="store.state.user.gender==='男'"/><Female v-else-if="store.state.user.gender==='女'"/><Hide v-else/></el-icon>&nbsp;{{ store.state.user.gender }}</div>
                <div class="user-info-line"><el-icon><Loading /></el-icon>&nbsp;{{ (tsToDate(store.state.user.createTime)) }}</div>
                <el-divider />
                <div style="display: flex; align-items: center; width: 100%">
                    <div style="flex: 1; display: flex; justify-content: center"><el-button type="success" plain>信息修改</el-button></div>
                    <div style="flex: 1; display: flex; justify-content: center"><el-button type="primary" plain>修改密码</el-button></div>
                    <div style="flex: 1; display: flex; justify-content: center"><el-button type="warning" plain>重置秘钥</el-button></div>
                </div>
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
</style>