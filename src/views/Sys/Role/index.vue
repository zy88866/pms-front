<template>
   <div class="app-container">
    <role-header :check-list="checkList"/>
    <!--表格渲染-->
    <el-table :data="tableData" size="small" border class="table-container" @selection-change="handleSelectionChange">
      <el-table-column  type="selection" width="50px" align="center">  </el-table-column>
      <el-table-column  prop="name" label="名称" align="center" width="200px"></el-table-column>
      <el-table-column  prop="citeNum" label="所含用户数" align="center"  width="100px"></el-table-column>
      <el-table-column  prop="remark" label="描述" align="center"  ></el-table-column>
      <el-table-column label="操作" align="center"  width="150px">
        <template slot-scope="scope">
        <el-button size="mini"  @click="handleEdit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      background
      :total="total"
      style="margin-top:8px; float:right"
      layout="sizes,prev,pager,next"/>

   <role-dialog  ref="RoleDialog" :role-form="roleFrom" @clearData="clearData"/>
   </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import RoleHeader from './module/RoleHeader'
import RoleDialog from './module/RoleDialog'
export default {
   name: 'Role',
   components: {
      RoleHeader,
      RoleDialog,
   },
   //页面初始化方法向后台请求数据
   mounted() { 
      this.findRoleAll();
   },
   //计算属性 监听vuex中的数据
   computed: {
      ...mapState({
         tableData: state => state.role.table.data,
         total: state => state.role.table.total,
      })
   },
   data() {
       return {
          roleFrom:{
             id:'',
             name: '',
             remark: '',
             menus:[],
          },
          checkList:[],
       }
   },
   methods: {
      ...mapActions({
         findRoleAll: 'role/findRoleAll',
         editDialog: 'role/editDialog',
      }),
      handleSelectionChange(val){
         this.checkList=val;
      },
      handleEdit(id){
         this.editDialog(id).then((data)=>{
            this.roleFrom=data;
            this.$refs.RoleDialog.setCheckedNodes(data.menus);
         });
      },
      clearData(){
        Object.assign(this.$data.roleFrom, this.$options.data().roleFrom);
      }
   },
}
</script>

<style scoped>
</style>
