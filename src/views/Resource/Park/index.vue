<template>
  <div class="app-container">
        <park-header/>
        <el-table :data="tableData" size="small" border class="table-container">
        <el-table-column  width="50px" type="index" align="center"  label="序号" show-overflow-tooltip>  </el-table-column>
        <el-table-column  prop="username" label="业主" align="center"></el-table-column>
        <el-table-column  prop="position" label="位置" align="center"/>
        <el-table-column  prop="parkType" label="车位类型" align="center" :formatter="doorType"/>
        <el-table-column  prop="expireDate" label="到期时间" align="center"></el-table-column>
        <el-table-column label="车位状态" align="center"  width="150px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.useStatus==='DISABLED'" size="mini" :loading="updataLoading" type="success"  @click="updataStatus(scope.row)">启用</el-button>
            <el-button v-else  size="mini" :loading="updataLoading"  type="danger" @click="updataStatus(scope.row)">停用</el-button>
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
        <park-dialog :parkForm="parkForm" @clearData="clearData"/>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapActions} from 'vuex'
import ParkDialog from './module/ParkDialog'
import ParkHeader from './module/ParkHeader'
export default {
  data() {
    return {
        parkForm:{
            user:{
                id:''
            },
            position:'',
            parkType:'',
            expireDate:'',
        },
        updataLoading: false,
    }
  },
  components: {
    ParkDialog,
    ParkHeader
  },
     //计算属性 监听vuex中的数据
   computed: {
    ...mapState({
        tableData: state => state.park.table.data,
        pageCount: state => state.park.table.pageCount,
        pageSize: state => state.park.table.pageSize,
        currentPage: state => state.park.table.currentPage,
    })
  },
  methods:{
    ...mapActions({
        getUserList: 'park/getUserList',
        findAll: 'park/findAll',
        updataStatusData: 'park/updataStatus'
    }),
    clearData(){
      Object.assign(this.$data, this.$options.data());
    },
    doorType(row, column){
       if (row.parkType === 'SMALL_CAR') {
          return '小车'
       }else if(row.parkType === 'BIG_CAR'){
          return '大车'
       }
    },
    pageChange(curPage){
      this.findAll({"page":curPage-1,"size":this.pageSize});
    },
    updataStatus(data){
      this.updataLoading=true;
       let sendDate={
          id:data.id,
          useStatus:data.useStatus==='DISABLED'?'ENABLED':'DISABLED',
        }
        this.updataStatusData(sendDate).then((res)=>{
           this.findAll({"page":this.currentPage-1,"size":this.pageSize});
           this.updataLoading = false;
        }).catch(err => {
            this.updataLoading = false;
      });
    }
  },
  mounted () { //页面初始化完成
     this.findAll({"page":0,"size":this.pageSize});
  }
}
</script>

<style scoped lang="less">
</style>
