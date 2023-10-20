<template>
    <div id="system-analysis">
        <el-scrollbar>
            <div style="font-size: xx-large">接口详情</div>
            <el-divider></el-divider>
            <div style="display: flex">
                <div class="chart" id="chart_qps"></div>
                <div class="chart" id="chart_avgUseTime" style="margin: 0 32px"></div>
                <div class="chart" id="chart_acceptRate"></div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup>
import {onMounted, onUnmounted} from 'vue'
import {getRequest} from "../../../expand/request.js";
import * as echarts from "echarts";

onMounted(() => {
    getSystemInfo()
    startTimer()
})

onUnmounted(() => {
    stopTimer()
})

const getTimeList = () => {
    const currentTime = new Date();
    const result = [];
    for (let i = 4; i >= 0; i--) {
        const previousTime = new Date(currentTime.getTime() - i * 60 * 1000);
        const hours = previousTime.getHours().toString().padStart(2, '0');
        const minutes = previousTime.getMinutes().toString().padStart(2, '0');
        const timeString = hours + ':' + minutes;
        result.push(timeString);
    }
    return result;
}

const drawChart = (xData, yData, chartDom, title) => {
    let chartContainer = document.getElementById(chartDom);
    let chart = echarts.init(chartContainer);
    let options = {
        title: {
            text: title
        },
        xAxis: {
            type: 'category',
            data: xData
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            type: 'line',
            data: yData.reverse()
        }]
    };
    chart.setOption(options);
}

const getSystemInfo = async () => {
    const data = (await getRequest('/platform/api/center/system', null)).data
    drawChart(getTimeList(), data.recentQPS, 'chart_qps', '接口调用次数(次/分钟)')
    drawChart(getTimeList(), data.recentAvgUseTime, 'chart_avgUseTime', '调用平均耗时(毫秒/次)')
    drawChart(getTimeList(), data.recentAcceptRate, 'chart_acceptRate', '调用通过率(%)')
}

let timer
const startTimer = () => {
    timer = setInterval(getSystemInfo, 10000)
}

const stopTimer = () => {
    clearInterval(timer);
}
</script>

<style scoped>
    #system-analysis {
        display: flex;
        flex-direction: column;
        margin: 32px;
        width: calc(100% - 64px);
        height: calc(100% - 64px);
    }

    .chart {
        flex: 1;
        min-height: 30vh;
    }
</style>