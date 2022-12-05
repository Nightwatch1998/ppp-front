import axio from 'axios'
import {ref} from 'vue'

const pppReq = axio.create({
    // baseURL: 'http://60.30.57.78:9131'
    baseURL: 'http://localhost:9121'
})

const weatherReq = axio.create({
    baseURL:'https://devapi.qweather.com/v7/weather/7d',
})

//响应拦截器
pppReq.interceptors.response.use(
    res => {
        if(res.status === 200 && res.data){
            return res.data
        }else{
            return Promise.reject(new Error('请求失败'))
        }
    },
    err =>{
        return Promise.reject(err)
    }
)
// 获取潮位数据
export function getData(){
    return pppReq({
        url:'/pppdata',
        method:'get',
        params:{
            count:'600'
        }
    })
}
// 获取潮位滤波后数据
export function getFilterData(){
    return pppReq({
        url:'/pppfilter',
        method:'post',
        data:'count=288&scale=5min'
    })
}

// 和风天气预报数据
export function getWeatherData(){
    return weatherReq({
        method:'get',
        params:{
            key: '7022f78ee5634036af958ae06dc0e68b',
            location: '117.20,39.084'
        }
    })
}

// 和风潮汐数据(付费)
