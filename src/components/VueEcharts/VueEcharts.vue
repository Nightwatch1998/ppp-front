<template>
  <div :class="[className, 'echarts']">
  </div>
</template>

<script>
  import { watch, onMounted } from 'vue'
  import * as Echarts from 'echarts'
  //uuid创建一个唯一识别码
  import { v4 as uuidv4 } from 'uuid'

  export default {
    name: 'VueEcharts',
    props: {
      options: Object,
      theme: [String, Object]
    },
    setup(ctx) {
      let dom
      let chart
      let className = `echarts${uuidv4()}`
      const initChart = () => {
        if (!chart) {
          chart = Echarts.init(dom, ctx.theme)
        }
        if (ctx.options) {
          chart.setOption(ctx.options)
        }
      }
      onMounted(() => {
        dom = document.getElementsByClassName(className)[0]
        initChart()
      })
      //监听options状态变化
      watch(() => ctx.options, () => {
        initChart()
      })
      return {
        className
      }
    }
  }
</script>

<style lang="scss" scoped>
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
