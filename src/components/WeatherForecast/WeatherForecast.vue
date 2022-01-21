<template>
    <div class="weather-container">
        站点未来一周天气
    </div>
</template>

<script>
    import {ref, watch, onMounted} from 'vue'

    export default {
        name:'WeatherForecast',
        components: {},
        props: {},
        setup(props){
            watch: {()=>data,()=>{}}
            onMounted(()=>{})
        }
    }
</script>

<style lang='scss' scoped>
    .weather-container{
        width: 100%;
        height: 100%;
    }
</style>