<template>
  <div class="app-container">
       <maintain-header/>
        <el-table :data="tableData" size="small" border class="table-container" show-summary :summary-method="totalSummary">
            <el-table-column  width="50px" type="index" align="center"  label="序号" show-overflow-tooltip>  </el-table-column>
            <el-table-column  prop="repairsBillNo" label="报修单号" align="center"/>
            <el-table-column  prop="repairsType" label="报修项目" align="center"/>
            <el-table-column  prop="repairsPrice" label="费用" align="center"/>
            <el-table-column  prop="realName" label="报修人" align="center"/>
            <el-table-column  prop="repairsDate" label="报修时间" align="center"/>
            <el-table-column  prop="finishDate" label="结束时间" align="center"/>
        </el-table>
        <!--分页组件-->
        <el-pagination
        background
        :total="total"
        style="margin-top:8px; float:right"
        layout="prev,pager,next"/>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapActions} from 'vuex'
import MaintainHeader from './module/MaintainHeader'
export default {
  data() {
    return {

    }
  },
  components: {
      MaintainHeader
  },
   //计算属性 监听vuex中的数据
   computed: {
    ...mapState({
        tableData: state => state.maintain.table.data,
        total: state => state.maintain.table.total,
    })
  },
    methods:{
    ...mapActions({
        report: 'maintain/report',
    }),

    totalSummary(param){
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }else if(column.property==="money"){
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                    }, 0);
                }
          }else{
                sums[index] = '-- --';
          }
        });
        return sums;
    }
  },
  mounted () { //页面初始化完成
     this.report("");
  }
}
</script>

<style scoped lang="less">
</style>
