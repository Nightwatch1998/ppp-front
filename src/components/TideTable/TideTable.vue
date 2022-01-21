<template>
    <div class="tide-table">
        <div class="table-title">潮位站潮汐表</div>
        <div class="tide-table-wrapper" :id="id">
            <div 
                class="tide-table-header"
                :style="{
                    backgroundColor:currentConfig.headerBg,
                    height:'40px'
                }"
            >
                <div 
                    class="header-item"
                    v-for="(headerItem, i) in headerData"
                    :key="headerItem+i"
                    :style="{
                        width:`${columnWidths[i]}px`,
                        borderLeft: i==0?'solid 1px':'',
                        borderRight: 'solid 1px'
                    }"
                    v-html="headerItem"
                >
                </div>
            </div>
            <div class="tide-table-rows-wrapper">
                <div 
                    class="tide-table-rows"
                    v-for="(rowData,index) in rowsData"
                    :key="index"
                    :style="{
                        height:'40px',
                        backgroundColor:currentConfig.rowBg
                    }"
                >
                    <div 
                        class="tide-table-columns"
                        v-for="(colData,colIndex) in rowData"
                        :key="colIndex"
                        :style="{
                            width:`${columnWidths[colIndex]}px`,
                            borderLeft: colIndex==0?'solid 1px':'',
                            borderRight: 'solid 1px'
                        }"
                        v-html="colData"
                    >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ref, watch, onMounted} from 'vue'
    import { v4 as uuidv4 } from 'uuid'
    import cloneDeep from 'lodash/cloneDeep'
    import useScreen from '../../hooks/useScreen'

    //表格默认配置项
    const defaultConfig = {
        //标题数据
        header:['满朝','干潮','满朝','干潮'],
        //标题样式
        headerStyle:[{width:'100px'}],
        //标题背景色
        headerBg:'#80bfff',
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

    export default {
        name:'',
        components: {},
        props: {},
        setup(props){
            const id = `base-scroll-list-${uuidv4()}`
            //拿到表格的宽高ref
            const {width,height} = useScreen(id)
            //当前展示配置
            const currentConfig = ref({})
            //表头数据
            const headerData = ref([])
            //行数据
            const rowsData = ref([])
            //动态列宽
            const columnWidths = ref([])
            const rowData = defaultConfig.data

            //处理header
            const handleHeader = (config)=>{
                const _header = cloneDeep(config.header)
                const _headerStyle = cloneDeep(config.headerStyle)
                const _rowsData = cloneDeep(config.data)

                if(_header.length == 0){ return }
                //如果显示索引
                if(config.headerIndex){
                    _header.unshift(config.headerIndexContent)
                    _rowsData.forEach((row,index)=>{
                        //在行数据中加上序号列数据
                        if(config.headerIndexData && config.headerIndexData.length>0
                        && config.headerIndexData[index]){
                            row.unshift(config.headerIndexData[index])
                        }else{
                            row.unshift(index+1)
                        }
                    })
                }
                //动态计算header每一列宽度
                let usedWidth = 0
                let usedColumnNum = 0
                _headerStyle.forEach(style=>{
                    if(style.width){
                        usedWidth += style.width.replace('px','')
                        usedColumnNum ++
                    }
                })

                //分配剩余宽度
                const avgWidth = (width.value - usedWidth)/(_header.length - usedColumnNum)
                //先用剩余平均宽度覆盖
                const _columnWidth = new Array(_header.length).fill(avgWidth)
                //再将原始宽度叠加
                _headerStyle.forEach((style,index)=>{
                    if(style.width){
                        _columnWidth[index] = style.width.replace('px','')
                    }
                })
                columnWidths.value = _columnWidth
                headerData.value = _header
                rowsData.value = _rowsData
            } 

            //处理行
            const handleRows = ()=>{

            }
            //更新表格
            const update = ()=>{
                //对默认配置进行深拷贝
                const _defaultConfig = cloneDeep(defaultConfig)
                handleHeader(_defaultConfig)
                handleRows()
                currentConfig.value = _defaultConfig
            }
            watch: {()=>data,()=>{}}
            onMounted(()=>{
                update()
            })
            return {
                id,
                headerData,
                rowsData,
                currentConfig,
                columnWidths
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

            .tide-table-header{
                display: flex;
                align-items: center;
                border-top: 2px solid;
                border-bottom: 1px solid;

                .header-item{
                    box-sizing: border-box;
                    padding: 10px 0;
                    height: 100%;
                }
            }
            
            .tide-table-rows-wrapper{
                overflow: hidden;
    
                .tide-table-rows{
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid;

                    .tide-table-columns{
                        box-sizing: border-box;
                        padding: 10px 0;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>