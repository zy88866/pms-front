<template>
  <div class="app-container">
       <payment-header/>
        <el-table :data="currData" size="small" border class="table-container" show-summary :summary-method="totalSummary">
        <el-table-column  width="50px" type="index" align="center"  label="序号" show-overflow-tooltip>  </el-table-column>
        <el-table-column  prop="username" label="用户名" align="center"/>
        <el-table-column  prop="realName" label="业主" align="center"/>
        <el-table-column  prop="phone" label="手机号" align="center"/>
        <el-table-column  prop="rechargeType" label="充值方式" align="center" :formatter="rechargeType"/>
        <el-table-column  prop="money" label="充值金额" align="center"/>
        <el-table-column  prop="rechargeTime" label="充值时间" align="center"/>
        </el-table>
        <!--分页组件-->
        <el-pagination
        background
        :total="total"
        :page-size="pagesize"
        :current-page="currentPage"
        @current-change="pageChange"
        style="margin-top:8px; float:right"
        layout="prev,pager,next"/>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapActions} from 'vuex'
import PaymentHeader from './module/PaymentHeader'
export default {
  data() {
    return {

    }
  },
  components: {
      PaymentHeader
  },
   //计算属性 监听vuex中的数据
   computed: {
    ...mapState({
        currData: state => state.payment.table.currData,
        total: state => state.payment.table.total,
        pagesize: state => state.payment.table.size,
        currentPage: state => state.payment.table.currpage,
    })
  },
    methods:{
    ...mapActions({
        report: 'payment/report',
        pageable:'payment/pageable'
    }),
    rechargeType(row, column){
        switch(row.rechargeType){
            case 'WECHART': return "微信";
            case 'ALIPAY': return "支付宝";
            case 'CASH': return "现金";
            case 'CARD': return "银行卡";
            default: return '';
        }
    },
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
    },
    pageChange(val){
      this.pageable(val);
    }
  },
  mounted () { //页面初始化完成
     this.report("");
  }
}
</script>

<style scoped lang="less">
</style>
