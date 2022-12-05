<template>
    <div class="table">
        <tide-table></tide-table>    
    </div>
</template>

<script>
    import {ref, watch, onMounted} from 'vue'
    import TideTable from '@/views/components/TideTable/TideTable'

    export default {
        name:'Test',
        components: {
            TideTable
        },
        props: {},
        setup(props){
            watch: {()=>data,()=>{}}
            onMounted(()=>{
            })
        }
    }
</script>

<style lang='scss' scoped>
    .table {
        width: 600px;
        height: 400px;
    }
</style>