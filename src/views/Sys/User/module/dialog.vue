<template>
   <div>
         <!-- 添加用户 弹窗 -->
           <el-dialog
               title="添加用户"
               :show-close="false"
               :visible.sync="dialogFormVisible">
               <el-form  :model="rules"  :rules="rules"  label-width="80px" >

                  <el-form-item label="用户名"  prop="username">
                     <el-input placeholder="请输入用户名"/>
                  </el-form-item>

                   <el-form-item label="姓名" prop="realName">
                     <el-input placeholder="请输入姓名"/>
                  </el-form-item>

                   <el-form-item label="密码"  prop="password">
                     <el-input placeholder="请输入密码"/>
                  </el-form-item>

                  <el-form-item label="确认密码" prop="reqPassword" >
                     <el-input placeholder="请再次输入密码"/>
                  </el-form-item>

                  <el-form-item label="手机号" prop="phone" >
                        <el-input placeholder="请输入手机号"/>
                  </el-form-item>

                   <el-form-item label="邮箱" prop="email" >
                        <el-input placeholder="请输入邮箱"/>
                  </el-form-item>

                  <el-form-item style="display: flex;   justify-content:center">
                        <el-button type="text" @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                    
                  </el-form-item>

               </el-form>
      </el-dialog>
   </div>
</template>

<script>
export default {
   name: '',
   data() {
       return {
          rules: {
                username: [
                    {required: true,message:'姓名不能为空',trigger:'blur'},
                    {min:3, max:8, message: '长度在3 到 5 个字符之间', trigger:'change'}
                ],
                realName:[
                    {required: true,message:'姓名不能为空',trigger:'blur'},
                    {min:3, max:8, message: '长度在3 到 5 个字符之间', trigger:'change'}
                ],
                password:[

                ],
                phone:[
                    {required:true,message:'手机号码不能为空',trigger:'blur'},
                    {type:'mobile',message:"请输入正确手机号"}
                ],
                email:[
                    {type:'email',message:'请输入正确邮箱'}
                ]
            }
       }
   },
  components: {}
}
</script>

<style scoped>
</style>
