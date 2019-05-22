<template>
  <div class="app-container">
        <center-header/>
        <el-table :data="tableData" size="small" border class="table-container">
        <el-table-column  width="50px" type="index" align="center"  label="序号" show-overflow-tooltip>  </el-table-column>
        <el-table-column  prop="repairsBillNo" label="报修单号" align="center"/>
        <el-table-column  prop="repairsType" label="报修问题" align="center"/>
        <el-table-column  prop="repairsDate" label="报修时间" align="center"/>
        <el-table-column  prop="realName" label="报修人" align="center"/>
        <el-table-column  prop="repairsStatus" label="订单状态" align="center">
             <template slot-scope="scope">
               <el-button v-if="scope.row.repairsStatus==='NOT'" type="primary" size="mini" @click="startDispatch(scope.row)">开始派单</el-button>
               <el-button v-else-if="scope.row.repairsStatus==='ING'" type="success" size="mini" @click="endDispatch(scope.row)">结束订单</el-button>
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
        <center-dialog :center-form="centerForm"/>
  </div>
</template>

<script type="text/ecmascript-6">
import CenterHeader from './module/CenterHeader'
import CenterDialog from './module/CenterDialog'
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
      centerForm:{
        id:'',
        repairsBillNo:'',
        RepairsPrice:''
      }
    }
  },
  components: {
    CenterHeader,
    CenterDialog
  },
  computed: {
    ...mapState({
        tableData: state => state.repairs.table.data,
        pageCount: state => state.repairs.table.pageCount,
        pageSize: state => state.repairs.table.pageSize,
        currentPage: state => state.repairs.table.currentPage,
    })
   },
  methods: {
    ...mapActions({
        findAll: 'repairs/findAllDto',
        openDialog: 'repairs/openDialog',
        endDispatchData: 'repairs/endDispatch',
    }),
    pageChange(currpage){
          this.findAll({"page":currpage-1,"size":this.pageSize});
    },
    startDispatch (data){
      this.centerForm.id=data.id;
      this.centerForm.repairsBillNo=data.repairsBillNo;
      this.openDialog();
    },
    endDispatch(data){
       this.$confirm('确定结束订单吗?', '结束订单', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
             this.centerForm.id=data.id;
             this.endDispatchData(this.centerForm).then(()=>{
             this.findAll({"page":this.currentPage-1,"size":this.pageSize});
          })
        }).catch(() => {
        });
    }
  },
  mounted () { 
    this.findAll({"page":0,"size":this.pageSize});
  }
}
</script>

<style scoped lang="less">
</style>
