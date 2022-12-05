<template>
    <div class="container">
        <div class="weather-title">未来7日天气预报</div>
        <div class="weather-table-wrapper">
            <base-table
                :config="config"
            >
            </base-table>
        </div>
    </div>
</template>

<script>
    import {ref, watch, onMounted} from 'vue'
    import BaseTable from '@/components/BaseTable/BaseTable'
    import { getWeatherData } from '@/api/index.js'
    import moment from 'moment'

    export default {
        name:'WeatherForecast',
        components: {
            BaseTable
        },
        props: {},
        setup(props){
            const config = ref({})
            //天气数据
            const weatherData = []
            //日期数据
            const dateData = []
            //配置config
            const update = ()=>{
                //后期序号更改为API中的数据
                const rowData = [
                    // ['小雨','16°C','东北风4级'],
                    // ['小雨','17°C','东北风3级'],
                    // ['小雨','19°C','东北风4级'],
                    // ['阴','18°C','东北风4级']
                ]
                // ['周五','周六','周日','周一']
                const headerData = [
                    // ['周五','2022-12-02'],
                    // ['周六','2022-12-03'],
                    // ['周日','2022-12-04'],
                    // ['周一','2022-12-05']
                ]
                const weekDay = ['周日','周一','周二','周三','周四','周五','周六']
                getWeatherData().then(data=>{
                    // console.log(data.data.daily)
                    let weaData = data.data.daily
                    weaData.forEach(item=>{
                        let {
                            fxDate,//日期
                            textDay,//白天天气现象文字
                            tempMax,//当天最高温度
                            tempMin, //当天最低温度
                            windDirDay,//风向文字
                            windScaleDay,  //风力等级
                            precip, //降水量
                            vis, //能见度
                            } = item
                        let rowItem = [textDay,`${tempMin}~${tempMax}℃`,`${windDirDay}${windScaleDay}级`]
                        let dayOfWeek = moment(fxDate).day()
                        rowData.push(rowItem)
                        let headerItem = [weekDay[dayOfWeek],fxDate]
                        headerData.push(headerItem)
                    })
                    //更改数据格式
                    rowData.forEach((dataItem,index)=>{
                        let line = ''
                        dataItem.forEach((item,index)=>{
                            const itemDiv = '<div>'+ item +'</div>'
                            if(index == 0){
                                line += itemDiv
                            }else{
                                line += '<br/>' + itemDiv
                            }
                        })
                        weatherData.push(line)
                    })
                    headerData.forEach((dataItem,index)=>{
                        let line = ''
                        dataItem.forEach((item,index)=>{
                            const itemDiv = '<div>'+ item +'</div>'
                            if(index == 0){
                                line += itemDiv
                            }else{
                                line += '<br/>' + itemDiv
                            }
                        })
                        dateData.push(line)
                    })
                    config.value = {
                        //标题数据
                        header:dateData,
                        //标题高度
                        headerHeight:'80px',
                        //标题样式
                        headerStyle:[],
                        //标题背景色
                        headerBg:'#80bfff',
                        //行高
                        rowHeight:'130px',
                        //行背景色
                        rowBg:'#cce5ff',
                        //是否显示序号列
                        headerIndex:false,
                        //数据项,二维数组
                        data:[weatherData]
                    }
                })
            }
            onMounted(()=>{
                update()
            })
            return {
                config
            }
        }
    }
</script>

<style lang='scss' scoped>
    .container{
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing:border-box;

        .weather-title{
            text-align: center;
            letter-spacing: 2px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .weather-table-wrapper{
            width: 100%;
            height: 100%;
        }

    }
</style>