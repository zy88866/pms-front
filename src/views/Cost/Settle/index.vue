<template>
  <div class="app-container">
        <settle-header/>
        <el-table :data="tableData" size="small" border class="table-container">
        <el-table-column  width="50px" type="index" align="center"  label="序号" show-overflow-tooltip>  </el-table-column>
        <el-table-column  prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column  prop="realName" label="业主" align="center"></el-table-column>
        <el-table-column  prop="balance" label="账户余额" align="center"/>
        <el-table-column label="操作" align="center"  width="150px">
          <template slot-scope="scope">
            <el-button  type="danger" size="small" @click="Settle(scope.row)">结算</el-button>
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
        <settle-dialog :settle-form="settleForm" @clearData="clearData"/>
  </div>
</template>

<script type="text/ecmascript-6">
import SettleDialog from './module/SettleDialog'
import SettleHeader from './module/SettleHeader'
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
      settleForm:{
        user:{
          id: '',
          username:''
        },
        costSetting:{
          id:''
        },
        multiple:'',
      }
    }
  },
  components: {
    SettleHeader,
    SettleDialog
  },
  computed: {
    ...mapState({
        tableData: state => state.settle.table.data,
        pageCount: state => state.settle.table.pageCount,
        pageSize: state => state.settle.table.pageSize,
        currentPage: state => state.settle.table.currentPage,
    })
   },
  methods: {
    ...mapActions({
        findAll: 'settle/findAll',
        openDialog: 'settle/openDialog',
    }),
    pageChange(currpage){
        this.findAll({"page":currpage-1,"size":this.pageSize});
    },
    Settle(data){
      this.settleForm.user.id=data.userId,
      this.settleForm.user.username=data.username,
      this.openDialog();
    },
    clearData(){
      Object.assign(this.$data, this.$options.data());
    },
  },
  mounted () { 
    this.findAll({"page":0,"size":this.pageSize});
  }
}
</script>

<style scoped lang="less">
</style>
