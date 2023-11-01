<template>
    <div id="system-analysis">
        <el-scrollbar>
            <div style="font-size: xx-large">系统负载</div>
            <el-divider></el-divider>
            <div style="display: flex">
                <div class="chart" id="chart_qps"></div>
                <div class="chart" id="chart_avgUseTime" style="margin: 0 32px"></div>
                <div class="chart" id="chart_acceptRate"></div>
            </div>
            <el-divider></el-divider>
            <div>
                <div style="display: flex">
                    <div style="flex: 1" class="chart" id="chart_pie_cpu_interface"></div>
                    <div style="flex: 3" class="chart" id="chart_line_cpu_interface"></div>
                </div>
                <div style="display: flex">
                    <div style="flex: 1" class="chart" id="chart_pie_memory_interface"></div>
                    <div style="flex: 3" class="chart" id="chart_line_memory_interface"></div>
                </div>
                <el-divider></el-divider>
                <div style="display: flex">
                    <div style="flex: 1" class="chart" id="chart_pie_cpu_backend"></div>
                    <div style="flex: 3" class="chart" id="chart_line_cpu_backend"></div>
                </div>
                <div style="display: flex">
                    <div style="flex: 1" class="chart" id="chart_pie_memory_backend"></div>
                    <div style="flex: 3" class="chart" id="chart_line_memory_backend"></div>
                </div>
                <el-divider></el-divider>
                <div style="display: flex">
                    <div style="flex: 1" class="chart" id="chart_pie_cpu_gateway"></div>
                    <div style="flex: 3" class="chart" id="chart_line_cpu_gateway"></div>
                </div>
                <div style="display: flex">
                    <div style="flex: 1" class="chart" id="chart_pie_memory_gateway"></div>
                    <div style="flex: 3" class="chart" id="chart_line_memory_gateway"></div>
                </div>
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

const getTimeList = (len) => {
    len -= 1
    const currentTime = new Date();
    const result = [];
    for (let i = len; i >= 0; i--) {
        const previousTime = new Date(currentTime.getTime() - i * 60 * 1000);
        const hours = previousTime.getHours().toString().padStart(2, '0');
        const minutes = previousTime.getMinutes().toString().padStart(2, '0');
        const timeString = hours + ':' + minutes;
        result.push(timeString);
    }
    return result;
}

const drawLineChart = (xData, yData, chartDom, title) => {
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
            data: yData
        }]
    };
    chart.setOption(options);
}

const drawCpuPieChart = (value, chartDom, title) => {
    let chartContainer = document.getElementById(chartDom);
    let chart = echarts.init(chartContainer);
    let options = {
        title: {
            text: title
        },
        series: [
            {
                labelLine: {
                    show: false
                },
                type: 'pie',
                data: [
                    {
                        value: value
                    },
                    {
                        value: 100 - value
                    }
                ],
                radius: ['50%', '70%']
            }
        ],
        graphic: [
            {
                type: 'text',
                left: 'center',
                top: 'center',
                style: {
                    text: value + '%',
                    textAlign: 'center',
                    fill: '#000',
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            }
        ]
    };
    chart.setOption(options);
}

const drawMemoryPieChart = (value, chartDom, title, max) => {
    let chartContainer = document.getElementById(chartDom);
    let chart = echarts.init(chartContainer);
    let options = {
        title: {
            text: title
        },
        series: [
            {
                labelLine: {
                    show: false
                },
                type: 'pie',
                data: [
                    {
                        value: value
                    },
                    {
                        value: max - value
                    }
                ],
                radius: ['50%', '70%']
            }
        ],
        graphic: [
            {
                type: 'text',
                left: 'center',
                top: 'center',
                style: {
                    text: (value / max * 100).toFixed(2) + '%',
                    textAlign: 'center',
                    fill: '#000',
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            }
        ]
    };
    chart.setOption(options);
}

const drawCpuLineChart = (xData, yData, chartDom, title) => {
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
            type: 'value',
            max: 100
        },
        series: [{
            type: 'line',
            data: yData.reverse(),
            label: {
                show: true,
                position: 'top'
            }
        }]
    };
    chart.setOption(options);
}

const drawMemoryLineChart = (xData, yData, chartDom, title, max) => {
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
            type: 'value',
            max: max,
            axisLabel: {
                formatter: '{value} MB'
            }
        },
        series: [{
            type: 'line',
            data: yData.reverse(),
            label: {
                show: true,
                position: 'top'
            }
        }]
    };
    chart.setOption(options);
}

const getSystemInfo = async () => {
    const data = (await getRequest('/platform/api/center/system', null)).data
    drawLineChart(getTimeList(5), data.recentRecordVO.recentQPS.reverse(), 'chart_qps', '接口调用次数(次/分钟)')
    drawLineChart(getTimeList(5), data.recentRecordVO.recentAvgUseTime.reverse(), 'chart_avgUseTime', '调用平均耗时(毫秒/次)')
    drawLineChart(getTimeList(5), data.recentRecordVO.recentAcceptRate.reverse(), 'chart_acceptRate', '调用通过率(%)')

    const ONE_MB = 1024 * 1024

    // 接口中心
    let interfaceNodeMemoryUsedList = []
    let interfaceNodeCpuUsageList = []
    let interfaceNodeTimeList = []

    // 用户中心
    let backendNodeMemoryUsedList = []
    let backendNodeCpuUsageList = []
    let backendNodeTimeList = []

    // 网关
    let gatewayNodeMemoryUsedList = []
    let gatewayNodeCpuUsageList = []
    let gatewayNodeTimeList = []

    for (let index in data.nodeInfoVOList) {
        let interfaceNodeInfoObj = JSON.parse(data.nodeInfoVOList[index])[0]
        interfaceNodeMemoryUsedList.push((interfaceNodeInfoObj.memoryUsed / ONE_MB).toFixed(2))
        interfaceNodeCpuUsageList.push((interfaceNodeInfoObj.cpuUsage * 100).toFixed(2))
        interfaceNodeTimeList.push(interfaceNodeInfoObj.date)

        let backendNodeInfoObj = JSON.parse(data.nodeInfoVOList[index])[0]
        backendNodeMemoryUsedList.push((backendNodeInfoObj.memoryUsed / ONE_MB).toFixed(2))
        backendNodeCpuUsageList.push((backendNodeInfoObj.cpuUsage * 100).toFixed(2))
        backendNodeTimeList.push(backendNodeInfoObj.date)

        let gatewayNodeInfoObj = JSON.parse(data.nodeInfoVOList[index])[0]
        gatewayNodeMemoryUsedList.push((gatewayNodeInfoObj.memoryUsed / ONE_MB).toFixed(2))
        gatewayNodeCpuUsageList.push((gatewayNodeInfoObj.cpuUsage * 100).toFixed(2))
        gatewayNodeTimeList.push(gatewayNodeInfoObj.date)
    }

    // 接口中心
    interfaceNodeCpuUsageList.reverse()
    interfaceNodeMemoryUsedList.reverse()
    interfaceNodeTimeList.reverse()

    drawCpuPieChart(interfaceNodeCpuUsageList[0], 'chart_pie_cpu_interface', '接口中心CPU负载(%)')
    drawMemoryPieChart(interfaceNodeMemoryUsedList[0], 'chart_pie_memory_interface', '接口中心内存用量(%)', 512)
    drawCpuLineChart(interfaceNodeTimeList, interfaceNodeCpuUsageList, 'chart_line_cpu_interface', '接口中心CPU负载(%)')
    drawMemoryLineChart(interfaceNodeTimeList, interfaceNodeMemoryUsedList, 'chart_line_memory_interface', '接口中心内存用量(MB)', 520)

    // 用户中心
    backendNodeCpuUsageList.reverse()
    backendNodeMemoryUsedList.reverse()
    backendNodeTimeList.reverse()

    drawCpuPieChart(backendNodeCpuUsageList[0], 'chart_pie_cpu_backend', '用户中心CPU负载(%)')
    drawMemoryPieChart(backendNodeMemoryUsedList[0], 'chart_pie_memory_backend', '用户中心内存用量(%)', 512)
    drawCpuLineChart(backendNodeTimeList, backendNodeCpuUsageList, 'chart_line_cpu_backend', '用户中心CPU负载(%)')
    drawMemoryLineChart(backendNodeTimeList, backendNodeMemoryUsedList, 'chart_line_memory_backend', '用户中心内存用量(MB)', 520)

    // 网关
    gatewayNodeCpuUsageList.reverse()
    gatewayNodeMemoryUsedList.reverse()
    gatewayNodeTimeList.reverse()

    drawCpuPieChart(gatewayNodeCpuUsageList[0], 'chart_pie_cpu_gateway', '网关CPU负载(%)')
    drawMemoryPieChart(gatewayNodeMemoryUsedList[0], 'chart_pie_memory_gateway', '网关内存用量(%)', 256)
    drawCpuLineChart(gatewayNodeTimeList, gatewayNodeCpuUsageList, 'chart_line_cpu_gateway', '网关CPU负载(%)')
    drawMemoryLineChart(gatewayNodeTimeList, gatewayNodeMemoryUsedList, 'chart_line_memory_gateway', '网关内存用量(MB)', 260)
}

let timer
const startTimer = () => {
    timer = setInterval(getSystemInfo, 5000)
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