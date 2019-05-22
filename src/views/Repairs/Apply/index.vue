<template>
  <div class="app-container">
      <div class="table">
          <h2 class="title"> 报修申请单 </h2>
          <el-form class="from" label-width="90px" ref="applyFrom" :model="applyFrom" :rules="rules">
              <el-row>

                <el-col>
                    <el-form-item label="报修问题" prop="repairsType">
                        <el-input  v-model="applyFrom.repairsType"  placeholder="请输入报修问题"/>    
                    </el-form-item>
                </el-col>

                <el-col>
                  <el-form-item label="问题描述" prop="remark">
                    <el-input type="textarea" v-model="applyFrom.remark" placeholder="请输入描述信息!!!"
                    :autosize="{ minRows:4, maxRows: 8}"/>  
                  </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item label="联系人" prop="linkman">
                        <el-input  v-model="applyFrom.linkman"  placeholder="请输入联系电话"/>    
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item label="联系电话" prop="linkPhone">
                        <el-input  v-model="applyFrom.linkPhone"  placeholder="请输入联系电话"/>    
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item label="联系地址" prop="linkAddress">
                        <el-input  v-model="applyFrom.linkAddress"  placeholder="请输入联系地址"/>    
                    </el-form-item>
                </el-col>
                
                <el-col>
                  <div style="display:flex; justify-content:flex-end; margin-right:20px;">
                      <el-button @click="cancel()">重置</el-button>
                      <el-button type="primary" @click="onSubmit()">提交</el-button>
                  </div>
                </el-col>

              </el-row>
            </el-form>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapActions} from 'vuex'
import {getUserInfo} from '~utils/sessionStorage';
export default {
  data() {
    const {id,realName}=getUserInfo();
    return {
        applyFrom:{
          user:{
            id:id,
          },
          repairsType:'',
          remark:'',
          linkman:'',
          linkPhone:'',
          linkAddress:''
        },
        rules:{
          repairsType:{required: true,message:'报修问题不能为空',trigger:'blur'},
          linkman:{required: true,message:'联系人不能为空',trigger:'blur'},
          linkAddress:{required: true,message:'联系地址不能为空',trigger:'blur'},
          linkPhone:[
            {required:true,message:'联系电话不能为空',trigger:'change'},
            {validator:function(rule,value,callback){
                  if(/^1[34578]\d{9}$/.test(value) == false){
                  callback(new Error("请输入正确的手机号码"));
               }else{
                  callback();
               }
            }, trigger: 'blur'}
          ],
        },
    }
  },
  components: {

  },
  methods:{
    ...mapActions({
      create: 'repairs/create'
    }),
    cancel(){
      this.$refs['applyFrom'].resetFields();
    },
    onSubmit(){
        this.$refs.applyFrom.validate(valid => {
            if(valid){
                this.create(this.applyFrom).then(()=>{
                    this.cancel();
                    this.$notify({
                      title: '提交成功',
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
.app-container{
  display: flex;
  justify-content:center;
   .table{
    width: 600px;
    .title{
      text-align:center;
      color: #606266;
      font-family:"黑体"
    }
    .from{
      margin-top: 30px;
    }
}
}
 

</style>
