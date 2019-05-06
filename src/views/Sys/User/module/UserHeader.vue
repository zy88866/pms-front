<template>
   <div>
     <el-card  class="head-container">
           <!-- 搜索 -->
         <el-form ref="query" :model="query" label-width="80px">
            <el-row>
               <el-col :span="8">
                  <el-form-item label="姓名:" prop="realName">
                     <el-input v-model="query.realName"  placeholder="请输入姓名"></el-input>
                  </el-form-item>
               </el-col>
               <el-col :span="8">
                  <el-form-item label="手机号:" prop="phone">
                     <el-input v-model="query.phone" placeholder="请输入手机号" ></el-input>
                   </el-form-item>
               </el-col>
               <el-col :span="8">
                  <el-form-item label="邮箱:" prop="email">
                     <el-input v-model="query.email" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
               </el-col>
            </el-row>
            <el-row>
               <el-col :span="8">
                  <el-form-item label="角色:" prop="roleId">
                     <el-select v-model="query.roleId" placeholder="请选择角色" style="width:100%;" :clearable=true>
                        <el-option
                           v-for="item in roleData"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                        </el-option>
                     </el-select>
                  </el-form-item>
               </el-col>
               <el-col :span="6" :offset="10">
                     <div class="serch-button">
                        <el-button size="medium"  type="success" icon="el-icon-plus" @click="addDialog()" >添加</el-button>
                        <el-button size="medium"  type="primary" icon="el-icon-search" @click="searchData()">搜索</el-button>
                        <el-button size="medium"  icon="el-icon-delete" @click="clearData()">清除</el-button>
                     </div>
               </el-col>
            </el-row>
         </el-form>
     </el-card>
   </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
   name: 'UserHeader',
   data() {
       return {
         query: {
            realName: null,
            phone: null,
            email: null,
            roleId: null,
         }
       }
   },
   methods: {
      ...mapActions({
         'findRoleAll': 'role/findRoleAll',
         'search': 'user/search',
         'addDialog': 'user/addDialog',
      }),
      searchData() {
         this.search(this.query);
      },
      clearData(){
         this.$refs['query'].resetFields();
      }
   },
   computed: {
      ...mapState({
         roleData: state=> state.role.tableData
      })
   },
   mounted() { //页面初始化方法
      this.findRoleAll();
   },
}
</script>

<style scoped>
   .serch-button{
      display: flex;
      justify-content: flex-end;
   }
</style>
