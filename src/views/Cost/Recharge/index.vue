<template>
  <div class="app-container">
       <recharge-header/>
        <el-table :data="tableData" size="small" border class="table-container">
        <el-table-column  width="50px" type="index" align="center"  label="序号" show-overflow-tooltip>  </el-table-column>
        <el-table-column  prop="username" label="业主" align="center"></el-table-column>
        <el-table-column  prop="balance" label="账户余额" align="center"/>
        <el-table-column label="操作" align="center"  width="150px">
          <template slot-scope="scope">
            <el-button  type="success" size="small" @click="RechargDialog(scope.row)">充值</el-button>
         </template>
        </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination
        background
        :page-count="pageCount"
        :page-size="pageSize"
        :current-page="currentPage"
        style="margin-top:8px; float:right"
        layout="prev,pager,next"
        @current-change="pageChange"/>
        <recharge-dialog :accountFrom="accountFrom" @clearData="clearData"/>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapActions} from 'vuex'
import RechargeDialog from './module/RechargeDialog'
import RechargeHeader from './module/RechargeHeader'
export default {
  data() {
    return {
      accountFrom:{
          user:{
            id:""
          },
          money:'',
          rechargeType:'',
      }
    }
  },
     //计算属性 监听vuex中的数据
   computed: {
    ...mapState({
        tableData: state => state.recharge.table.data,
        pageCount: state => state.recharge.table.pageCount,
        pageSize: state => state.recharge.table.pageSize,
        currentPage: state => state.recharge.table.currentPage,
    })
  },
  components: {
    RechargeDialog,
    RechargeHeader
  },
  methods:{
    ...mapActions({
        findAll: 'recharge/findAll',
        rechargDialog: 'recharge/rechargDialog'
    }),
    RechargDialog(data){
      this.accountFrom.user.id=data.userId;
      this.rechargDialog();
    },
    pageChange(){

    },
    clearData(){
      Object.assign(this.$data, this.$options.data());
    },
  },
  mounted () { //页面初始化完成
     this.findAll({"page":0,"size":this.pageSize});
  }
}
</script>

<style scoped lang="less">
</style>
