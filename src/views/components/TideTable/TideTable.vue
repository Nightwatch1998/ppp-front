<template>
    <div class="tide-table">
        <div class="table-title">潮位站潮汐表</div>
        <div class="tide-table-wrapper">
            <base-table
                :config="config"
            >
            </base-table>
        </div>
    </div>
</template>

<script>
    import {ref, watch, onMounted} from 'vue'
    import useScreen from '@/hooks/useScreen'
    import BaseTable from '@/components/BaseTable/BaseTable'

    export default {
        name:'TideTable',
        components: {
            BaseTable
        },
        props: {},
        setup(props){
            const config = ref({})
            //配置config
            const update = ()=>{
                config.value = {
                    //标题数据
                    header:['满潮','干潮','满潮','干潮'],
                    //标题行高
                    headerHeight:'40px',
                    //标题样式
                    // headerStyle:[{width:'100px'}],
                    //标题背景色
                    headerBg:'#80bfff',
                    //数据行高
                    rowHeight:'40px',
                    //行背景色
                    rowBg:'#cce5ff',
                    //是否显示序号列
                    headerIndex:true,
                    //序号列标题内容
                    headerIndexContent:'高低潮',
                    //序号列数据内容
                    headerIndexData:['潮时','潮高'],
                    //数据项,二维数组
                    data:[
                        ['02:21','07:20','13:42','20:15'],
                        ['110cm','40cm','197cm','16cm']
                    ]
                }
            }
            watch: {()=>data,()=>{}}
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
    .tide-table{
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing:border-box;

        .table-title{
            text-align: center;
            letter-spacing: 2px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .tide-table-wrapper{
            overflow: hidden;
        }
    }
</style>