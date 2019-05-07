<template>
   <div class="app-container">
    <role-header/>
    <!--表格渲染-->
    <el-table :data="tableData" size="small" border class="table-container">
      <el-table-column type="selection" width="50px" align="center" >  </el-table-column>
      <el-table-column  prop="name" label="角色" align="center"  ></el-table-column>
      <el-table-column  prop="remark" label="备注" align="center"  ></el-table-column>
      <el-table-column label="操作" align="center"  width="150px">
        <template slot-scope="scope">
        <el-button size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      
       }
   },
   methods: {
      ...mapActions({
         findRoleAll: 'role/findRoleAll',
      }),
      sizeChange(){

      },
      pageChange(){

      }
   },
}
</script>

<style scoped>
</style>
