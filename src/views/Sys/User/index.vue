<template>
   <div class="app-container">
    <user-header/>
    <!--表格渲染-->
    <el-table :data="tableData" size="small" border class="table-container">
      <el-table-column type="selection" width="50px" align="center" >  </el-table-column>
      <el-table-column  prop="username" label="用户名" align="center"  ></el-table-column>
      <el-table-column  prop="realName" label="姓名" align="center"></el-table-column>
      <el-table-column  prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column  prop="email" label="邮箱" align="center"></el-table-column>
      <el-table-column  prop="role.name" label="角色" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
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
import {getUserList} from '@/api/user'
import UserHeader from './module/UserHeader'
export default {
  name: 'User',
  data () {
    return {
      tableData: [],
      total: 0,
    }
  },
  components: {
      UserHeader,
  },
  methods: {
    loading () {
      return false
    },
    sizeChange () {

    },
    pageChange () {

    },
    getData () {
      getUserList().then(res => {
        this.tableData = res,
        this.total = res.length
      })
    },
    add () {

    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
   .head-container{
      .head-text{
         display: initial;
      }
     
   }
   .table-container{
      margin-top: 20px;
   }

</style>
