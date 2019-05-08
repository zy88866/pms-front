<template>
   <div class="app-container">
    <!-- <set-header :check-list="checkList"/> -->
    <!--表格渲染-->
    <el-table :data="tableData" size="small" border class="table-container" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50px" align="center" >  </el-table-column>
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
      layout="sizes,prev,pager,next"
      @size-change="sizeChange"
      @current-change="pageChange"/>

   <!-- <set-dialog  ref="RoleDialog" :role-form="roleFrom" @clearData="clearData"/> -->
   </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapActions} from 'vuex'
import SetHeader from './module/SetHeader'
import SetDialog from './module/SetDialog'
export default {
  data() {
    return {

    }
  },
  components: {
      SetHeader,
      SetDialog,
  }
}
</script>

<style scoped lang="less">
</style>
