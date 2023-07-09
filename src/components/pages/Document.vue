<template>
    <div id="document">
        <el-scrollbar>
            <div style="display: flex; justify-content: space-between; align-items: center">
                <div id="title">WindyApi开放平台使用手册</div>
                <div id="date">更新于:2023/7/9</div>
            </div>
            <el-divider></el-divider>
            <div class="document-box">
                <div class="document-box-title">关于本站</div>
                <el-divider></el-divider>
                <div class="web-info-line">
                    <div class="web-info-title">介绍:</div>
                    <div class="web-info-describe">你好,我是站长WhiteLeaf03。本API开放平台致力于提供稳定高效的API接口资源。欢迎有需要的您访问使用,如果有任何建议和意见也欢迎随时与我取得联系。</div>
                </div>
                <div class="web-info-line">
                    <div class="web-info-title">联系:</div>
                    <div class="web-info-describe">whiteleaf03@163.com</div>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="document-box">
                <div class="document-box-title">签名认证</div>
                <el-divider></el-divider>
                <div class="web-info-line" style="flex-direction: column; align-items: flex-start">
                    <table style="border-collapse: collapse; width: 100%; border: 1px solid rgba(128,128,128,0.2)">
                        <tr style="display: flex; width: 100%">
                            <td class="table-header" style="width: 100%; text-align: center; font-size: large">请求头参数</td>
                        </tr>
                        <tr style="display: flex; width: 100%">
                            <td class="table-header">timestamp</td>
                            <td style="flex: 4;">发起请求时的毫秒时间戳</td>
                        </tr>
                        <tr style="display: flex; width: 100%">
                            <td class="table-header">accessKey</td>
                            <td style="flex: 4;">用户的accessKey</td>
                        </tr>
                        <tr style="display: flex; width: 100%">
                            <td class="table-header">params(GET请求)</td>
                            <td style="flex: 4;">请求参数的JSON格式,例如: name=whiteleaf03&role=admin 则该项应为 {"name":"whiteleaf03","role":"admin"}</td>
                        </tr>
                        <tr style="display: flex; width: 100%">
                            <td class="table-header">body(非GET请求)</td>
                            <td style="flex: 4;">请求body的JSON格式,例如 {"name":"whiteleaf03","role":"admin"}</td>
                        </tr>
                        <tr style="display: flex; width: 100%">
                            <td class="table-header">sign</td>
                            <td style="flex: 4;">将timestamp params/body secretKey进行拼接 拼接格式: "timestamp.params/body.secretKey" 对拼接后的字符串进行SHA256处理生成签名</td>
                        </tr>
                    </table>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="document-box">
                <div class="document-box-title">响应模板</div>
                <el-divider></el-divider>
                <table style="border-collapse: collapse; width: 100%; border: 1px solid rgba(128,128,128,0.2)">
                    <tr style="display: flex; width: 100%">
                        <td class="table-header">请求地址</td>
                        <td style="flex: 4; user-select: text">http://api.whiteleaf03.top</td>
                    </tr>
                    <tr style="display: flex; width: 100%">
                        <td class="table-header">响应参数模板(正确)</td>
                        <td style="flex: 4; user-select: text; white-space: pre">{{ formatJSON(successResponse).replace("\"responseData\"", "    \"responseData\"") }}</td>
                        <td class="table-header">响应参数模板(错误)</td>
                        <td style="flex: 4; user-select: text; white-space: pre">{{ formatJSON(errorResponse).replace("\"responseData\"", "    \"responseData\"") }}</td>
                    </tr>
                </table>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup>
import {ref} from "vue"
import {formatJSON, tsToDate} from "../../expand/utils.js";

const successResponse = ref({
    "status": 0,
    "msg": "OK",
    "data": {"responseData": "响应的数据"}
})

const errorResponse = ref({
    "status": 5,
    "msg": "ERROR \\ 错误原因",
    "data": {}
})
</script>

<style scoped>
#document {
    margin: 32px;
    width: calc(100% - 64px);
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
}

#title {
    font-size: 38px;
    font-family: "站酷仓耳渔阳体-05", fangsong;
}

#date {
    font-size: larger;
}

.document-box {
    background-color: white;
    padding: 24px;
    display: flex;
    flex-direction: column;
}

.document-box-title {
    font-size: 26px;
    font-family: "站酷仓耳渔阳体-05", fangsong;
}

.web-info-line {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.web-info-title {
    font-weight: bolder;
    font-size: 22px;
    min-width: 64px;
    margin-right: 12px;
}

.web-info-describe {
    user-select: text;
    font-size: 18px;
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