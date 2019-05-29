<template>
  <div class="app-container">
        <settle-header/>
        <el-table :data="tableData" size="small" border class="table-container" show-summary :summary-method="totalSummary">
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
  }
}
</script>

<style scoped lang="less">
</style>
