<template>
  <div class="app-container">
    <house-header :checkList="deleteList"/>
     <!--表格渲染-->
    <el-table :data="tableData" size="small" border class="table-container" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50px" align="center" >  </el-table-column>
      <el-table-column  prop="username" label="业主" align="center"></el-table-column>
      <el-table-column  prop="position" label="位置" align="center"></el-table-column>
      <el-table-column  prop="storey" label="类型" align="center">
        <template slot-scope="sc">
           <span v-if="sc.row.storey=== 'HEIGHT'">高层</span>
           <span v-if="sc.row.storey=== 'LOW'">低层</span>
        </template>
      </el-table-column>
      <el-table-column  prop="cellName" label="小区名称" align="center"></el-table-column>
      <el-table-column label="操作" align="center"  width="150px">
        <template slot-scope="scope">
        <el-button size="mini"  @click="handleEdit(scope.row.id)">编辑</el-button>
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
    <house-dialog :house-form="houseForm"  @clearData="clearData"/>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapActions} from 'vuex'
import HouseHeader from './module/HouseHeader'
import HouseDialog from './module/HouseDialog'
export default {
  data() {
    return {
      houseForm:{
        id:'',
        user:{
          id: '',
        },
        position:'',
        storey:'',
        cellName:''
      },
      deleteList:[]
    }
  },
  mounted() { 
      this.findAll({"page":0,"size":this.pageSize});
   },
  components: {
    HouseHeader,
    HouseDialog,
  },
   //计算属性 监听vuex中的数据
   computed: {
      ...mapState({
         tableData: state => state.house.table.data,
         pageCount: state => state.house.table.pageCount,
         pageSize: state => state.house.table.pageSize,
         currentPage: state => state.house.table.currentPage,
      })
   },
   methods: {
     ...mapActions({
        getUserList: 'house/getUserList',
        findAll: 'house/findAll',
        editDialog: 'house/editDialog',
    }),
    handleEdit(id){
       this.editDialog(id).then((res) =>{
          this.houseForm.id=res.id;
          this.houseForm.position=res.position;
          this.houseForm.storey=res.storey;
          this.houseForm.cellName=res.cellName;
          this.houseForm.user.id=Number(res.username);   
       })
    },
    pageChange(currPage){

    },
    handleSelectionChange(val){
      this.deleteList=val.map((item)=>item.id);
    },
    clearData(){
      Object.assign(this.$data, this.$options.data());
    }
   },
   created(){
     this.getUserList();
   }
}
</script>

<style scoped lang="less">
</style>
