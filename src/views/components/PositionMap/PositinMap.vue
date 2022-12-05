<template>
   <div id="map-container"></div>
</template>

<script>
    import {ref, watch, onMounted, getCurrentInstance} from 'vue'
    import { init } from 'echarts'
    //静态图片通过模块引入的方式
    import markerURL  from '@/assets/marker.png'

    export default {
        name:'PositionMap',
        components: {},
        props: {},
        setup(ctx){
            let options = {}
            //站点位置
            // const pointLocation = [117.874292,38.961805]
            const pointLocation = [117.90396803,38.89653889]
            //marker尺寸
            const markerSize = [20,30]
            //更新地图
            const update = ()=>{
                //创建地图实例
                const map = new BMapGL.Map('map-container',{
                    restrictCenter: false,
                    // style: {styleJson:whiteStyle} 地图样式定制
                })
                const point = new BMapGL.Point(pointLocation[0],pointLocation[1])
                map.centerAndZoom(point, 10)
                map.enableScrollWheelZoom(true)

                // console.log(markerURL)
                //创建自定义marker
                const markerPoint = new BMapGL.Point(pointLocation[0],pointLocation[1])
                const myIcon = new BMapGL.Icon(markerURL,new BMapGL.Size(markerSize[0],markerSize[1]))
                const marker = new BMapGL.Marker(markerPoint,{
                    icon:myIcon
                })
                map.addOverlay(marker)

                //创建信息窗口
                const opts = {
                    width:200,
                    height:100,
                    title:'ppp离岸潮位站'
                }
                const infoWindow = new BMapGL.InfoWindow(
                    '经度:'+ pointLocation[0].toFixed(5) + '<br>' +
                    '纬度:'+ pointLocation[1].toFixed(5),
                    opts
                )
                //添加鼠标点击事件
                marker.addEventListener('click',()=>{
                    map.openInfoWindow(infoWindow,markerPoint)
                })
            }
            watch: {()=>data,()=>{}}
            onMounted(()=>{
                update()
            })
            return {
                options
            }
        }
    }
</script>

<style lang='scss' scoped>
    #map-container {
        width: 100%;
        height: 100%;
    }
</style>