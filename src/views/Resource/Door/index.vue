<template>
  <div class="app-container">
        <door-header></door-header>
        <!--表格渲染-->
        <el-table :data="tableData" size="small" border class="table-container">
        <el-table-column  width="50px" type="index" align="center"  label="序号" show-overflow-tooltip>  </el-table-column>
        <el-table-column  prop="username" label="业主" align="center"></el-table-column>
        <el-table-column  prop="doorType" label="开门方式" align="center" :formatter="doorType"/>
        <el-table-column  prop="expireDate" label="到期时间" align="center"></el-table-column>
        <el-table-column label="门禁状态" align="center"  width="150px">
          <template slot-scope="scope">
            <el-popover
              :ref="scope.row.id"
              placement="top"
              width="180">
              <p>确定本次操作吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                <el-button type="primary" :loading="updateLoading" size="mini" @click="updataStatus(scope.row)">确定</el-button>
              </div> 
                <el-button v-if="scope.row.userStatus==='DISABLED'"  slot="reference" size="mini" type="success">启用</el-button>
                <el-button v-else  slot="reference" size="mini" type="danger">停用</el-button>
              </el-popover>
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
      <door-dialog :door-form="doorForm" @clearData="clearData"/>
  </div>
</template>

<script type="text/ecmascript-6">
import DoorDialog from './module/DoorDialog'
import DoorHeader from './module/DoorHeader'
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
      doorForm:{
        user:{
          id: ''
        },
        doorType:'',
        expireDate:''
      },
      updateLoading:false,
    }
  },
  mounted() { 
      this.findAll({"page":0,"size":this.pageSize});
   },
  components: {
    DoorDialog,
    DoorHeader
  },
   //计算属性 监听vuex中的数据
   computed: {
    ...mapState({
        tableData: state => state.door.table.data,
        pageCount: state => state.door.table.pageCount,
        pageSize: state => state.door.table.pageSize,
        currentPage: state => state.door.table.currentPage,
    })
   },
   methods:{
    ...mapActions({
        getUserList: 'door/getUserList',
        findAll: 'door/findAll',
        updataStatusData: 'door/updataStatus'
    }),
     pageChange(currPage){
        this.findAll({"page":currPage-1,"size":this.pageSize}); 
     },
    updataStatus(data){
        let sendDate={
          id:data.id,
          userStatus:data.userStatus==='DISABLED'?'ENABLED':'DISABLED',
        }
        this.updateLoading = true;
        this.updataStatusData(sendDate).then((res)=>{
           this.updateLoading = false;
           this.$refs[data.id].doClose();
           this.findAll({"page":this.currentPage-1,"size":this.pageSize});
        }).catch(err => {
            this.updateLoading = false;
            this.$refs[data.id].doClose();
      });
    },
    clearData(){
      Object.assign(this.$data, this.$options.data());
    },
    doorType(row, column){
       if (row.doorType === 'QR') {
          return '二维码'
       }else if(row.doorType === 'NFC'){
          return '门禁卡'
       }
    }
   },
}
</script>

<style scoped lang="less">
</style>
