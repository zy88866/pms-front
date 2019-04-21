<template>
   <div class="app-container">
             <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
            <el-table-column type="selection" width="55">  </el-table-column>
            <el-table-column  prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column  prop="role" label="角色" width="180"></el-table-column>
              <el-table-column label="操作">
                  <template slot-scope="scope">
                  <el-button size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini"  type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
               </el-table-column>
    </el-table>
   </div>
</template>

<script>
export default {
   name: 'User',
   data() {
       return {}
   },
  components: {}
}
</script>

<style scoped>
</style>
