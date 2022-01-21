<template>
    <div class="wave-filter-chart">
        <vue-echarts
            :options = "options"
        />
    </div>
</template>

<script>
    import {ref, onMounted, watch} from 'vue'
    import VueEcharts from '../VueEcharts/VueEcharts'
    import { getFilterData } from '../../api/index.js'

    export default {
        name:'WaveFilter',
        components: {
            VueEcharts
        },
        setup(props){
            let screenWidth = ref(document.body.clientWidth)
            const options = ref({})
            const update = (data) => {
                function createOption(){
                    let xAxisData = []
                    let pppData = []
                    let sgFilter = []
                    let wavelet = []
                    data.forEach(item => {
                        xAxisData.push(item['时间'].split(' ')[1])
                        pppData.push(item['潮位'])
                        sgFilter.push(item['S-G滤波'])
                        wavelet.push(item['小波滤波'])
                    });
                    return {
                        xAxisData,
                        pppData,
                        sgFilter,
                        wavelet
                    }
                }
                const legendData = ['潮位','S-G滤波','小波滤波']
                const {xAxisData,pppData,sgFilter,wavelet}  = createOption()

                options.value = {
                    title:{
                        text:'潮位数据及其滤波可视化',
                        left:'center'
                    },
                    xAxis: {
                        type: 'category',
                        name:'时间',
                        nameGap:20,
                        axisLine:{
                            show:true,
                            symbol:['none','arrow'],
                            symbolOffset : [0,12],
                            lineStyle:{
                                color:'#333',
                            }
                        },
                        axisLabel:{
                            rotate:-60
                        },
                        splitLine:{
                            show:true
                        },
                        axisPointer:{
                            show:true
                        },
                        axisTick:{
                            alignWithLabel : true
                        },
                        data:xAxisData
                    },
                    yAxis: {
                        type: 'value',
                        name:'潮位/m',
                        min:6,
                        max:11,
                        axisLine:{
                            show:true,
                            symbol:['none','arrow'],
                            symbolOffset : [0,12]
                        },
                        splitLine:{
                            show:true
                        },
                    },
                    toolbox:{
                        show:true,
                        right:'10%',
                        feature:{
                            dataZoom:{
                                show:true
                            },
                            saveAsImage:{
                                show:true,
                                type:'png',
                            },
                        }
                    },
                    tooltip:{
                        formatter:function(params){
                            let str = '时间: '+params[0].axisValue + '<br/>' 
                            params.forEach(item => {
                                let data = parseFloat(item.data).toFixed(2)
                                str += item.marker+item.seriesName+data+'m'+'<br/>' 
                            })
                            return str
                        }
                    },
                    dataZoom:[{
                        type:'slider',
                        show:true,
                        xAxisIndex:[0],
                        start:1,
                        end:100
                    }],
                    grid:{
                        left:'5%',
                        right:'5%'
                    },
                    legend: {
                        // Try 'horizontal'
                        orient: 'horizontal',
                        top: '9%',
                        icon: 'circle',
                        // data: ['原始数据','S-G滤波','小波滤波']
                        data:legendData
                    },
                    series: [
                        {
                            name:'潮位',
                            type: 'line',
                            smooth: true,
                            data: pppData
                        },
                        {
                            name:'S-G滤波',
                            type: 'line',
                            smooth: true,
                            data: sgFilter
                        },
                        {
                            name:'小波滤波',
                            type: 'line',
                            smooth: true,
                            data: wavelet
                        }
                    ]
                }
            }
            onMounted(()=>{
                getFilterData().then(data => {
                    update(data.data)
                })
            })
            watch(()=>screenWidth,()=>{
                update(data.data)
            })
            return {
                options,
                screenWidth
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wave-filter-chart {
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
</style>