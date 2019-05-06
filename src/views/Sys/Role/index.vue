<template>
   <div class="app-container">
    <role-header/>
    <!--表格渲染-->
    <el-table :data="tableData" size="small" border class="table-container">
      <el-table-column type="selection" width="50px" align="center" >  </el-table-column>
      <el-table-column  prop="name" label="角色" align="center"  ></el-table-column>
      <el-table-column  prop="remark" label="备注" align="center"  ></el-table-column>
      <el-table-column label="操作" align="center"  width="200px">
        <template slot-scope="scope">
        <el-button size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini"  type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      background
      :total="total"
      style="margin-top:8px; float:right"
      layout="sizes,prev,pager,next"
      @size-change="sizeChange"
      @current-change="pageChange"/>
   </div>
</template>

<script>
import RoleHeader from './module/RoleHeader'
export default {
   name: 'Role',
   data() {
       return {
      
       }
   },
   methods: {
      sizeChange(){

      },
      pageChange(){

      }
   },
   mounted() { //页面初始化方法
      this.$store.dispatch("role/findRoleAll");
   },
   computed: {
      tableData() {
          return this.$store.state.role.tableData;
      },
      total(){
         return this.$store.state.role.total;
      }
   },
   components: {
      RoleHeader,
   }
}
</script>

<style scoped>
</style>
