<template>
   <div>
      <!-- 添加用户 弹窗 -->
      <el-dialog
         :title="isAdd ? '新增用户' : '编辑用户'"
         :show-close="false"
         :close="closeDialog"
         :visible="this.$store.state.user.diglogStatus">
         <el-form ref="resetForm" :model="resetForm"  :rules="rules"  label-width="80px">
            <el-row :gutter="20">
               <el-col :span="12">
                   <el-form-item label="用户名" prop="username">
                     <el-input  v-model="resetForm.username" placeholder="请输入用户名"/>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item label="姓名"  prop="realName">
                     <el-input  v-model="resetForm.realName" placeholder="请输入姓名"/>
                  </el-form-item>
               </el-col>
            </el-row>
         
             <el-row :gutter="20" v-if="isAdd">
               <el-col :span="12">
                  <el-form-item label="密码" prop="password">
                     <el-input  type="password" v-model="resetForm.password"  placeholder="请输入密码"/>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item  label="确认密码" prop="reqPassword" >
                     <el-input  type="password" v-model="resetForm.reqPassword" placeholder="请再次输入密码"/>
                  </el-form-item>
               </el-col>
            </el-row>

            <el-row :gutter="20">
               <el-col :span="12">
                  <el-form-item label="手机号"  prop="phone" >
                        <el-input v-model="resetForm.phone" placeholder="请输入手机号"/>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item label="角色"  prop="role.id">
                     <el-select v-model="resetForm.role.id" placeholder="请选择角色" style="width:100%" >
                        <el-option
                           v-for="item in roleData"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                        </el-option>
                   </el-select>
                  </el-form-item>
               </el-col>
            </el-row>
           
            <el-row :gutter="20">
               <el-col :span="12">
                   <el-form-item label="邮箱" prop="email" >
                     <el-input  v-model="resetForm.email" placeholder="请输入邮箱"/>
                  </el-form-item>
               </el-col>
               <el-col :span="10" :offset="2">
                  <div style="display:flex;  justify-content:center;">
                     <el-button type="primary" @click="onSubmit()">提交</el-button>
                     <el-button @click="cancel()">取消</el-button>
                  </div>
               </el-col>
            </el-row>
            
         </el-form>
      </el-dialog>
   </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
   name: 'UserDialog',
   computed: {
      ...mapState({
         diglogStatus: state => state.role.diglogStatus,
         roleData: state => state.role.tableData,
         isAdd: state => state.user.isAdd,
      })
   },
   data() {
      return {
         rules: {
         username: [
            {required: true,message:'用户名不能为空',trigger:'change'},
            {min:3, max:10, message: '长度在3 到 10 个字符之间'},
            {pattern: /^[0-9a-zA-Z]+$/,message: '用户名只能是字母或数字'}
         ],
         realName:[
            {required: true,message:'姓名不能为空',trigger:'change'},
            {min:1, max:5, message: '长度在1 到 5 个字符之间'},
            {pattern: /^[\u4E00-\u9FA5]+$/,message: '姓名只能为中文'}
         ],
         password:[
            {required: true,message:'密码不能为空',trigger:'change'},
            {pattern: /^(\w){6,20}$/,message:'只能输入6-20个字母、数字、下划线'}
         ],
         reqPassword:[
            {required: true,message:'请再次输入密码',trigger:'change'},
            {validator: (rule,value,callback) =>{
               if(value!==this.resetForm.password){
                  callback('两次输入的密码不一致');
               }else{
                  callback();
               }
            },trigger: 'change'}
         ],
         phone:[
            {required:true,message:'请输入手机号码',trigger:'change'},
            {validator:function(rule,value,callback){
                  if(/^1[34578]\d{9}$/.test(value) == false){
                  callback(new Error("请输入正确的手机号"));
               }else{
                  callback();
               }
            }, trigger: 'blur'}
            ],
         email:[
            {type:'email',message:'请输入正确邮箱',trigger:'change'},
            ],
         role:{
            id:[
               {required: true,message:'请选择角色',trigger:'change'},
            ]
         }
         }
      }
   },
   props: {
      resetForm:{
         type:Object,
         required: true
      },
   },
   methods: {
     ...mapActions({
      'closeDialog': 'user/closeDialog',
      'findAll': 'user/findAll',
      'editUser': 'user/editUser',
      'createUser': 'user/createUser',
      }),
     onSubmit() {
         this.$refs.resetForm.validate(valid => {
            if(valid){
               if(this.isAdd){
                  this.createUser(this.resetForm).then(()=>{
                        this.cancel();
                        this.$notify({
                           title: '添加成功',
                           type: 'success',
                           duration: 1500,
                        }) ;
                        this.findAll();
                  })
               }else{
                  console.log("ssss",this.resetForm);
                  this.editUser(this.resetForm).then(()=>{
                        this.cancel();
                        this.$notify({
                           title: '编辑成功',
                           type: 'success',
                           duration: 1500,
                        }) ;
                        this.findAll();
                  });
               }
            }
         })
     },
     cancel() {
        this.$emit("clearData");
        this.$refs['resetForm'].resetFields();
        this.closeDialog();  
     }
  },
}
</script>

<style scoped>
</style>
