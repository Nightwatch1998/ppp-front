<template>
    <div class="base-table-wrapper" :id="id">
        <div 
            class="base-table-header"
            :style="{
                backgroundColor:currentConfig.headerBg,
                height:`${headerHeight}`
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
        <div class="base-table-rows-wrapper">
            <div 
                class="base-table-rows"
                v-for="(rowData,index) in rowsData"
                :key="index"
                :style="{
                    height:`${rowHeight}`,
                    backgroundColor:currentConfig.rowBg
                }"
            >
                <div 
                    class="base-table-columns"
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
</template>

<script>
    import {ref, watch, onMounted} from 'vue'
    import { v4 as uuidv4 } from 'uuid'
    import cloneDeep from 'lodash/cloneDeep'
    import assign from 'lodash/assign'
    import useScreen from '@/hooks/useScreen'

    //  表格默认配置项
    const defaultConfig = {
        //标题数据，格式['a','b','c']
        header:[],
        //标题样式,格式[{},{},{}]
        headerStyle:[],
        //行样式
        rowStyle:[],
        //行背景色
        rowBg:[],
        //标题背景色
        headerBg:'rgb(90,90,90)',
        //标题的高度
        headerHeight:35,
        //标题是否展示序号
        headerIndex:false,
        //序号列标题内容
        headerIndexContent:'#',
        //序号列标题样式
        headerIndexStyle:{
            width:'50px'
        },
        //序号列数据内容
        headerIndexData:[],
        //序号列内容样式
        rowIndexStyle:{
            width:'50px'
        },
        //数据项，二维数组
        data:[],
        //每页显示数据量
        rowNum:10,
        //居中方式
        aligns:[],
        headerFontsize: 28,
        rowFontsize: 28,
        headerColor: '#fff',
        rowColor: '#000',
        //动画每次移动的位置
        moveNum : 1,
        //动画间隔时间
        duration: 1000
    }

    export default {
        name:'BaseTable',
        components: {},
        props: {
            containerWidth:{
                type:Number
            },
            config:{
                type:Object,
                default:()=>({})
            }
        },
        setup(props){
            // console.log(props.config)
            const id = `base-scroll-list-${uuidv4()}`
            //拿到表格的宽高ref
            const {width,height} = useScreen(id)
            //当前展示配置
            const currentConfig = ref({})
            //标题行高
            const headerHeight = ref()
            //标题数据
            const headerData = ref([])
            //数据行高
            const rowHeight = ref()
            //行数据
            const rowsData = ref([])
            //动态列宽
            const columnWidths = ref([])

            //处理header
            const handleHeader = (config)=>{
                const _header = cloneDeep(config.header)
                const _headerStyle = cloneDeep(config.headerStyle)
                const _rowsData = cloneDeep(config.data)
                const _headerHeight = cloneDeep(config.headerHeight)
                const _rowHeight = cloneDeep(config.rowHeight)

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
                console.log(_columnWidth)
                columnWidths.value = _columnWidth
                headerData.value = _header
                rowsData.value = _rowsData
                headerHeight.value = _headerHeight
                rowHeight.value = _rowHeight
            } 

            //处理行
            const handleRows = ()=>{

            }
            //更新表格
            const update = ()=>{
                //对默认配置进行深拷贝
                const _defaultConfig = assign(defaultConfig,props.config)
                handleHeader(_defaultConfig)
                handleRows()
                currentConfig.value = _defaultConfig
            }
            watch(()=>props.config,()=>{
                update()
            })
            watch()
            return {
                id,
                headerData,
                rowsData,
                currentConfig,
                columnWidths,
                headerHeight,
                rowHeight
            }
        }
    }
</script>

<style lang='scss' scoped>
    .base-table-wrapper{
        overflow: hidden;

        .base-table-header{
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
        
        .base-table-rows-wrapper{
            overflow: hidden;

            .base-table-rows{
                display: flex;
                align-items: center;
                border-bottom: 1px solid;

                .base-table-columns{
                    box-sizing: border-box;
                    padding: 10px 0;
                    height: 100%;
                }
            }
        }
    }
</style>