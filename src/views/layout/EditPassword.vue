<template>
  <div class="app-container">
    <el-dialog
      :show-close="false"
      title="修改密码"
      width="500px"
      :visible="diglogStatus">
      <el-form label-width="90px" ref="passwordFrom" :model="passwordFrom" :rules="rules">
        <el-row>

        <el-col>
            <el-form-item label="账户:"  prop="realName">
                <el-input v-model="passwordFrom.realName" disabled/>
            </el-form-item>
        </el-col>

        <el-col>
           <el-form-item label="旧密码:"  prop="oldPassword">
              <el-input type="password" v-model="passwordFrom.oldPassword"/>
            </el-form-item>
        </el-col>  

        <el-col>
           <el-form-item label="新密码:"  prop="newPassword">
                 <el-input type="password" v-model="passwordFrom.newPassword" />
            </el-form-item>
        </el-col>  

        <el-col>
           <el-form-item label="确认密码:"  prop="reqPassword">
                 <el-input type="password"  v-model="passwordFrom.reqPassword" />
            </el-form-item>
        </el-col>  
       
        <el-col>
          <div style="display:flex;  justify-content:flex-end; margin-right:20px">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary" @click="onSubmit()">确认</el-button>
          </div>
        </el-col>

        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
        rules:{
            id:{required: true,message:'用户id不能为空',trigger:'bluer'},
            realName:{required: true,message:'用户不能为空',trigger:'bluer'},
            oldPassword:{required: true,message:'新密码不能为空',trigger:'change'},
            newPassword:[
                {required: true,message:'新密码不能为空',trigger:'change'},
                {pattern: /^(\w){6,20}$/,message:'只能输入6-20个字母、数字、下划线'}
            ],
            reqPassword:[
                {required: true,message:'请再次输入密码',trigger:'change'},
                {validator: (rule,value,callback) =>{
                if(value!==this.passwordFrom.newPassword){
                    callback('两次输入的密码不一致');
                }else{
                    callback();
                }
                },trigger: 'change'}
            ],
        }
    }
  },
  props: {
    passwordFrom:{
      type: Object,
      required: true
    }
  },
   computed: {
    ...mapState({
        diglogStatus: state => state.app.diglogStatus,
    })
   },
   methods:{
       ...mapActions({
           closeDialog: 'app/closeDialog',
           updatePassword: 'app/updatePassword'
       }),
       cancel(){
            this.$emit("clearData");
            this.$refs['passwordFrom'].resetFields();
            this.closeDialog();
       },
       onSubmit(){
            this.$refs.passwordFrom.validate(valid => {
                if(valid){
                    this.updatePassword(this.passwordFrom).then(()=>{
                        this.cancel();
                        this.$notify({
                        title: '修改成功',
                        type: 'success',
                        duration: 1500,
                        }) ;
                    })
                }
            })  
       }
   }
}
</script>

<style scoped lang="less">
</style>
