<template>
   <div>
     <el-card  class="head-container">
           <!-- 搜索 -->
         <el-form ref="search" :model="search" label-width="80px">
            <el-row>
               <el-col :span="8">
                  <el-form-item label="姓名:" >
                     <el-input v-model="search.realName"  placeholder="请输入姓名"></el-input>
                  </el-form-item>
               </el-col>
               <el-col :span="8">
                  <el-form-item label="手机号:">
                     <el-input v-model="search.phone" placeholder="请输入手机号" ></el-input>
                   </el-form-item>
               </el-col>
               <el-col :span="8">
                  <el-form-item label="邮箱:">
                     <el-input v-model="search.email" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
               </el-col>
            </el-row>
               <el-row>
                     <el-col :span="8">
                        <el-form-item label="角色:">
                           <el-select v-model="options.key" placeholder="请选择角色" style="width:100%;" :clearable=true>
                              <el-option
                                 v-for="item in options"
                                 :key="item.key"
                                 :label="item.value"
                                 :value="item.key">
                              </el-option>
                           </el-select>
                        </el-form-item>
                     </el-col>
                     <el-col :span="6" :offset="10">
                           <div class="serch-button">
                              <el-button size="medium"  type="success" icon="el-icon-plus" @click="openDialog" >添加</el-button>
                              <el-button size="medium"  type="primary" icon="el-icon-search">搜索</el-button>
                              <el-button size="medium"  type="" icon="el-icon-delete">清除</el-button>
                           </div>
                     </el-col>
               </el-row>
         </el-form>
     </el-card>
     <user-dialog/>
   </div>
</template>

<script>
import UserDialog from './UserDialog';
export default {
   name: 'UserHeader',
   data() {
       return {
          options: [
            { key: 1, value: '管理员' },
            { key: 2, value: '业主' }
         ],
         search: {
            username: '',
            phone: '',
            email: ''
         }
       }
   },
   props:{
      
   },
   components: {
      UserDialog,
   },
   methods: {
      openDialog(){
         this.$store.dispatch('openDialog');
      },
   }
}
</script>

<style scoped>
   .serch-button{
      display: flex;
      justify-content: flex-end;
   }
</style>
