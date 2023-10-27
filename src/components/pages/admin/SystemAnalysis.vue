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

    // 用户中心
    let backendNodeMemoryUsedList = []
    let backendNodeCpuUsageList = []

    // 网关
    let gatewayNodeMemoryUsedList = []
    let gatewayNodeCpuUsageList = []

    for (let index in data.nodeInfoVOList) {
        let newInterfaceMemoryUsed = JSON.parse(data.nodeInfoVOList[index])[0].memoryUsed / ONE_MB
        interfaceNodeMemoryUsedList.push(newInterfaceMemoryUsed.toFixed(2))
        let newInterfaceCpuUsage = (JSON.parse(data.nodeInfoVOList[index])[0].cpuUsage * 100)
        interfaceNodeCpuUsageList.push(newInterfaceCpuUsage.toFixed(2))

        let newBackendMemoryUsed = JSON.parse(data.nodeInfoVOList[index])[1].memoryUsed / ONE_MB
        backendNodeMemoryUsedList.push(newBackendMemoryUsed.toFixed(2))
        let newBackendCpuUsage = JSON.parse(data.nodeInfoVOList[index])[1].cpuUsage * 100
        backendNodeCpuUsageList.push(newBackendCpuUsage.toFixed(2))

        let newGatewayMemoryUsed = JSON.parse(data.nodeInfoVOList[index])[2].memoryUsed / ONE_MB
        gatewayNodeMemoryUsedList.push(newGatewayMemoryUsed.toFixed(2))
        let newGatewayCpuUsage = JSON.parse(data.nodeInfoVOList[index])[2].cpuUsage * 100
        gatewayNodeCpuUsageList.push(newGatewayCpuUsage.toFixed(2))
    }
    console.log(gatewayNodeMemoryUsedList)
    console.log(gatewayNodeCpuUsageList)

    // 接口中心
    drawCpuPieChart(interfaceNodeCpuUsageList[9], 'chart_pie_cpu_interface', '接口中心CPU负载(%)')
    drawMemoryPieChart(interfaceNodeMemoryUsedList[9], 'chart_pie_memory_interface', '接口中心内存用量(%)', 512)
    drawCpuLineChart(getTimeList(10), interfaceNodeCpuUsageList, 'chart_line_cpu_interface', '接口中心CPU负载(%)')
    drawMemoryLineChart(getTimeList(10), interfaceNodeMemoryUsedList, 'chart_line_memory_interface', '接口中心内存用量(MB)', 520)

    // 用户中心
    drawCpuPieChart(backendNodeCpuUsageList[9], 'chart_pie_cpu_backend', '用户中心CPU负载(%)')
    drawMemoryPieChart(backendNodeMemoryUsedList[9], 'chart_pie_memory_backend', '用户中心内存用量(%)', 512)
    drawCpuLineChart(getTimeList(10), backendNodeCpuUsageList, 'chart_line_cpu_backend', '用户中心CPU负载(%)')
    drawMemoryLineChart(getTimeList(10), backendNodeMemoryUsedList, 'chart_line_memory_backend', '用户中心内存用量(MB)', 520)

    // 网关
    drawCpuPieChart(gatewayNodeCpuUsageList[9], 'chart_pie_cpu_gateway', '网关CPU负载(%)')
    drawMemoryPieChart(gatewayNodeMemoryUsedList[9], 'chart_pie_memory_gateway', '网关内存用量(%)', 256)
    drawCpuLineChart(getTimeList(10), gatewayNodeCpuUsageList, 'chart_line_cpu_gateway', '网关CPU负载(%)')
    drawMemoryLineChart(getTimeList(10), gatewayNodeMemoryUsedList, 'chart_line_memory_gateway', '网关内存用量(MB)', 260)
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