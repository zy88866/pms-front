<template>
   <div class="app-container">
    <user-header/>
    <!--表格渲染-->
    <el-table :data="data" size="small" border class="table-container" v-loading="loading">
      <el-table-column  type="index" width="50px" align="center" label="序号">  </el-table-column>
      <el-table-column  prop="username" label="用户名" align="center"  ></el-table-column>
      <el-table-column  prop="realName" label="姓名" align="center"></el-table-column>
      <el-table-column  prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column  prop="email" label="邮箱" align="center"></el-table-column>
      <el-table-column  prop="role.name" label="角色" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
         <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-popover
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <el-pagination
      background
      :total="total"
      style="margin-top:8px; float:right"
      layout="sizes,prev,pager,next"/>

    <!-- 编辑对话框 -->
    <user-dialog :reset-form="resetForm" @clearData='clearData'/>
   </div>
</template>

<script>
import UserHeader from './module/UserHeader'
import UserDialog from './module/UserDialog'
import {mapState,mapActions} from 'vuex'
export default {
  name: 'User',
  data () {
    return {
      delLoading: false,
      resetForm: {
        id: '',
        username: '',
        realName: '',
        password: '',
        reqPassword: '',
        phone: '',
        email: '',
        role: {
            id: ''
        },
      },
    }
  },
  components: {
      UserHeader,
      UserDialog
  },
  methods: {
    ...mapActions({
      'editDialog': 'user/editDialog',
      'deleteUser':'user/deleteUser',
      'findAll':'user/findAll',
      }),
    subDelete(id) {
      this.delLoading = true;
      this.deleteUser(id).then(()=>{
        this.delLoading = false;
        this.$refs[id].doClose()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 1500,
        }) ;
        this.findAll();
      }).catch(err => {
          this.delLoading = false;
          this.$refs[id].doClose();
      });
    },
    handleEdit(id){
     this.editDialog(id).then((data)=>{
          this.resetForm=data;
      });
    },
    clearData(){
      Object.assign(this.$data, this.$options.data())
    }
  },

  computed: {
    ...mapState({
      loading: state => state.user.loading,
      data: state => state.user.table.data,
      total: state => state.user.table.total,
    })
  },
  mounted () { //页面初始化完成
    this.findAll();
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
