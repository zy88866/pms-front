<template>
   <div>
      <!-- 添加用户 弹窗 -->
      <el-dialog
         title="添加用户"
         :show-close="false"
         :close="closeDialog"
         :visible="this.$store.state.user.diglogStatus">
         <el-form ref="resetForm" :model="resetForm"  :rules="rules"  label-width="80px" >
            <el-form-item label="用户名" prop="username">
               <el-input  v-model="resetForm.username" placeholder="请输入用户名"/>
            </el-form-item>

            <el-form-item label="姓名"  prop="realName">
               <el-input  v-model="resetForm.realName" placeholder="请输入姓名"/>
            </el-form-item>

            <el-form-item label="密码" prop="password">
               <el-input  type="password" v-model="resetForm.password"  placeholder="请输入密码"/>
            </el-form-item>

            <el-form-item label="确认密码"  prop="reqPassword" >
               <el-input  type="password" v-model="resetForm.reqPassword" placeholder="请再次输入密码"/>
            </el-form-item>

            <el-form-item label="手机号"  prop="phone" >
                  <el-input v-model="resetForm.phone" placeholder="请输入手机号"/>
            </el-form-item>

            <el-form-item label="邮箱" prop="email" >
               <el-input  v-model="resetForm.email" placeholder="请输入邮箱"/>
            </el-form-item>

            <div style="display:flex; justify-content:flex-end;">
               <el-button @click="closeDialog">取消</el-button>
               <el-button type="primary" @click="onSubmit('resetForm')">提交</el-button>
            </div>

         </el-form>
      </el-dialog>
   </div>
</template>

<script>
import {createUser} from '@/api/user'
export default {
   name: 'UserDialog',
   data() {
       return {
          resetForm: {
            username: 'zhangsan',
            realName: '张三',
            password: '123123',
            reqPassword: '123123',
            phone: '15665437878',
            email: '',
          },
          rules: {
            username: [
               {required: true,message:'用户名不能为空',trigger:'blur'},
               {min:3, max:10, message: '长度在3 到 10 个字符之间'},
               {pattern: /^[0-9a-zA-Z]+$/,message: '用户名只能是字母或数字'}
            ],
            realName:[
               {required: true,message:'姓名不能为空',trigger:'blur'},
               {min:1, max:5, message: '长度在1 到 5 个字符之间'},
               {pattern: /^[\u4E00-\u9FA5]+$/,message: '姓名只能为中文'}
            ],
            password:[
               {required: true,message:'密码不能为空',trigger:'blur'},
               {pattern: /^(\w){6,20}$/,message:'只能输入6-20个字母、数字、下划线'}
            ],
            reqPassword:[
               {required: true,message:'请再次输入密码',trigger:'blur'},
               {validator: (rule,value,callback) =>{
                  if(value!==this.resetForm.password){
                     callback('两次输入的密码不一致');
                  }else{
                     callback();
                  }
               },trigger: 'blur'}
            ],
            phone:[
               {required:true,message:'请输入手机号码',trigger:'blur'},
               {validator:function(rule,value,callback){
                   if(/^1[34578]\d{9}$/.test(value) == false){
                     callback(new Error("请输入正确的手机号"));
                  }else{
                     callback();
                  }
               }, trigger: 'blur'}
            ],
            email:[
               {type:'email',message:'请输入正确邮箱',trigger:'blur'}
            ]
         }
       }
   },
  methods: {
     onSubmit() {
         this.$refs.resetForm.validate(valid => {
            if(valid){
               createUser(this.resetForm).then((res)=>{
                  closeDialog();  
                  this.$message({
                     type: "success",
                     message: "添加成功"
                  });
               })
            }
         })
     },
     closeDialog() {
        this.$store.dispatch('closeDialog');
     }
  },
}
</script>

<style scoped>
</style>
