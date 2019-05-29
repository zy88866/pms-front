<template>
  <div class="app-container">
        <settle-header/>
        <el-table :data="tableData" size="small" border class="table-container" show-summary :summary-method="totalSummary">
        <el-table-column  width="50px" type="index" align="center"  label="序号" show-overflow-tooltip>  </el-table-column>
        <el-table-column  prop="username" label="用户名" align="center"/>
        <el-table-column  prop="realName" label="业主" align="center"/>
        <el-table-column  prop="costName" label="扣费名称" align="center"/>
        <el-table-column  prop="totalPrice" label="扣费金额" align="center"/>
        <el-table-column  prop="settingDate" label="扣费时间" align="center"/>
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
import SettleHeader from './module/SettleHeader'
export default {
  data() {
    return {

    }
  },
  components: {
    SettleHeader
  },
  //计算属性 监听vuex中的数据
   computed: {
      ...mapState({
          tableData: state => state.settleReport.table.data,
          total: state => state.settleReport.table.total,
      })
    },
    methods:{
    ...mapActions({
        report: 'settleReport/report',
    }),
    totalSummary(param){
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }else if(column.property==="totalPrice"){
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
