import axio from 'axios'
import {ref} from 'vue'

const pppReq = axio.create({
    baseURL: 'http://172.16.5.164:9131'
    // baseURL: 'http://localhost:9121'
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
export function getData(){
    return pppReq({
        url:'/pppdata',
        method:'get',
        params:{
            count:'600'
        }
    })
}
export function getFilterData(){
    return pppReq({
        url:'/pppfilter',
        method:'post',
        data:'count=288&scale=5min'
    })
}
