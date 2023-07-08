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
                        <td style="flex: 4; user-select: text; white-space: pre" >{{ formatJSON(interface_doc.requestHeader) }}</td>
                        <td class="table-header">响应头</td>
                        <td style="flex: 4; user-select: text; white-space: pre" >{{ formatJSON(interface_doc.responseHeader).replace("\"", "    \"") }}</td>
                    </tr>
                    <tr style="display: flex; width: 100%">
                        <td class="table-header">请求参数</td>
                        <td style="flex: 1" v-if="interface_doc.params === null || interface_doc.params === '' || interface_doc.params === '{}'">无</td>
                        <td style="flex: 1; user-select: text; white-space: pre" v-else>{{ formatJSON(interface_doc.params) }}</td>
                    </tr>
                </table>
            </div>
            <el-divider></el-divider>
            <div id="subscribe">
                <div class="subscribe-line">
                    <div class="subscribe-line-title">新人包</div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small; font-weight: lighter">请求次数</div>
                        <div style="font-size: larger">20</div>
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small">价格(CNY)</div>
                        <div style="font-size: larger">0.1元</div>
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small">单次请求价格</div>
                        <div style="font-size: larger">0.005元</div>
                    </div>
                    <el-divider></el-divider>
                    <div style="display: flex; justify-content: space-between"><div></div><el-button type="success" plain>立即订阅</el-button></div>
                </div>
                <div style="width: 42px"></div>
                <div class="subscribe-line">
                    <div class="subscribe-line-title">体验包</div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small; font-weight: lighter">请求次数</div>
                        <div style="font-size: larger">1000次</div>
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small">价格(CNY)</div>
                        <div style="font-size: larger">1元</div>
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small">单次请求价格</div>
                        <div style="font-size: larger">0.001元</div>
                    </div>
                    <el-divider></el-divider>
                    <div style="display: flex; justify-content: space-between"><div></div><el-button type="success" plain>立即订阅</el-button></div>
                </div>
                <div style="width: 42px"></div>
                <div class="subscribe-line">
                    <div class="subscribe-line-title">特惠包</div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small; font-weight: lighter">请求次数</div>
                        <div style="font-size: larger">5000次</div>
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small">价格(CNY)</div>
                        <div style="font-size: larger">4元</div>
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small">单次请求价格</div>
                        <div style="font-size: larger">0.0008元</div>
                    </div>
                    <el-divider></el-divider>
                    <div style="display: flex; justify-content: space-between"><div></div><el-button type="success" plain>立即订阅</el-button></div>
                </div>
                <div style="width: 42px"></div>
                <div class="subscribe-line">
                    <div class="subscribe-line-title">标准包</div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small; font-weight: lighter">请求次数</div>
                        <div style="font-size: larger">10000次</div>
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small">价格(CNY)</div>
                        <div style="font-size: larger">5元</div>
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small">单次请求价格</div>
                        <div style="font-size: larger">0.0005元</div>
                    </div>
                    <el-divider></el-divider>
                    <div style="display: flex; justify-content: space-between"><div></div><el-button type="success" plain>立即订阅</el-button></div>
                </div>
                <div style="width: 42px"></div>
                <div class="subscribe-line">
                    <div class="subscribe-line-title">企业包</div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small; font-weight: lighter">请求次数</div>
                        <div style="font-size: larger">50000次</div>
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small">价格(CNY)</div>
                        <div style="font-size: larger">10元</div>
                    </div>
                    <el-divider></el-divider>
                    <div>
                        <div style="font-size: small">单次请求价格</div>
                        <div style="font-size: larger">0.0002元</div>
                    </div>
                    <el-divider></el-divider>
                    <div style="display: flex; justify-content: space-between"><div></div><el-button type="success" plain>立即订阅</el-button></div>
                </div>
            </div>
        </div>
    </el-scrollbar>
</template>

<script setup>
import {useRoute} from "vue-router";
import {ref, onMounted} from "vue";
import axios from "axios";
import {formatJSON, getCookie, tsToDate} from "../../expand/utils.js";

const route = useRoute()

const test = "{\n\"Content-Type\":\"application/json\"\n}"

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

const subscribeInterface = async () => {

}
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

#subscribe {
    display: flex;
}

.subscribe-line {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 24px;
    background-color: white;
}

.subscribe-line-title {
    font-size: x-large;
}


</style>