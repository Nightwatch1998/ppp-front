## 程序文档树
|-- PPP-FRONT
    |-- package.json  依赖包文件
    |-- vue.config.js   vue配置文件
    |-- public
    |   |-- index.html   网页入口
    |-- src
        |-- App.vue   vue根实例
        |-- main.js     程序入口文件
        |-- api
        |   |-- index.js    封装数据请求的API
        |-- components  
        |   |-- BaseTable
        |   |   |-- BaseTable.vue   基础表格组件
        |   |-- VueEcharts
        |       |-- VueEcharts.vue  基础echarts图表组件
        |-- hooks
        |   |-- useScreen.js    封装全局函数
        |-- router
        |   |-- index.js    路由
        |-- static
        |   |-- global.css  全局CSS
        |-- views
            |-- Home.vue    根页面
            |-- components
                |-- PositionMap
                |   |-- PositinMap.vue      位置地图组件
                |-- TideTable
                |   |-- TideTable.vue   潮位图表组件
                |-- WaveFilter
                |   |-- WaveFilter.vue  潮位滤波组件
                |-- WeatherForecast
                    |-- WeatherForecast.vue 天气预报组件
