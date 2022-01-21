<template>
  <div class="home">
    <div class="top-header">
        <div class="header-text">PPP潮位项目可视化</div>
    </div>
    <div class="center">
        <div class="chart-wrapper">
            <wave-filter
                :data ="waveData"
            />
        </div>
        <div class="location-map">
            <position-map></position-map>
        </div>
    </div>
    <div class="bottom">
        <div class="wave-extre">
            <tide-table></tide-table>
        </div>
        <div class="station-weather">
            <weather-forecast></weather-forecast>
        </div>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted} from 'vue'
  import WaveFilter from '../components/WaveFilter/WaveFilter'
  import PositionMap from '../components/PositionMap/PositinMap'
  import WeatherForecast from '../components/WeatherForecast/WeatherForecast'
  import TideTable from '../components/TideTable/TideTable'
  import { getData } from '../api/index.js'

  export default {
    name: 'Home',
    components: {
        WaveFilter,
        PositionMap,
        WeatherForecast,
        TideTable
    },
    setup(){
        const waveData = ref({})
        
        const update = (data) => {
            function createOption(){
                let xAxisData = []
                let pppData = []
                data.forEach(item => {
                    xAxisData.push(item['DATE'])
                    pppData.push(item['HEIGHT'])
                });
                return {
                    xAxisData,pppData
                }
            }
            const legendData = ['原始数据']
            const {xAxisData,pppData}  = createOption()
            options.value = {
                title:{
                    text:'潮位原始观测数据',
                    textAlign:'auto',
                    left:'40%',
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
                    name:'潮位',
                    // min:600,
                    // max:1500,
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
                    show:true,
                    axisPointer:{
                        type:'cross'
                    }
                },
                dataZoom:[{
                    type:'slider',
                    show:true,
                    xAxisIndex:[0],
                    start:1,
                    end:35
                }],
                legend: {
                    // Try 'horizontal'
                    orient: 'vertical',
                    right: 10,
                    top: 'center',
                    icon: 'circle',
                    // data: ['原始数据','S-G滤波','小波滤波']
                    data:legendData
                },
                series: [
                    {
                        name:'原始数据',
                        type: 'line',
                        smooth: true,
                        data: pppData
                    }
                ]
            }
        }
        onMounted(()=>{
            getData().then(data => {
                waveData.value = data
            })
        })
        return {
            waveData
        }
    }
  }
</script>
<style lang="scss" scoped>
    .home {
        width: 100%;
        height: 100%;
        background-color: #eee;
        box-sizing: border-box;
        padding: 20px;
        position:relative;
        display: flex;
        flex-direction: column;

        .top-header {
            width: 100%;
            height:60px;
            align-items: center;

            .header-text{
                font-weight: bold;
                font-size: 20px;
                letter-spacing: 2px;
            }
        }

        .center {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 50%;
            
            .chart-wrapper{
                width: 50%;
                height: 100%;
            }

            .location-map{
                flex: 1;
                height: 100%;
                margin-left: 10px;
                background-color: #fff;
            }
        }
        .bottom{
            flex:1;
            width: 100%;
            margin-top: 10px;
            display: flex;
            flex-direction: row;

            .wave-extre{
                width: 50%;
                height: 100%;
                background-color: #fff;
            }

            .station-weather{
                flex:1;
                margin-left: 10px;
                background-color: #fff;
            }
        }
    }

</style>