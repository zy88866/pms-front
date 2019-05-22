<template>
  <div class="app-container">
    <el-dialog
      :show-close="false"
      title="充值"
      width="500px"
      :visible="diglogStatus">
      <el-form label-width="90px" ref="accountFrom" :model="accountFrom" :rules="rules">
        <el-row>

      <el-col>
        <el-form-item label="账户:"  prop="user.id">
          <el-select v-model="accountFrom.user.id" placeholder="请选择用户" disabled>
              <el-option
                  v-for="item in userList"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col>
           <el-form-item label="充值方式:"  prop="rechargeType">
              <el-radio-group v-model="accountFrom.rechargeType">
                  <el-radio-button border
                  v-for="item in rechargeType"
                  :label="item.key"
                  :key="item.key">
                  {{item.label}}
                  </el-radio-button>
              </el-radio-group>
            </el-form-item>
        </el-col>  

        <el-col>
           <el-form-item label="充值金额:"  prop="money">
              <el-radio-group v-model="accountFrom.money">
                  <el-radio
                  v-for="item in money"
                  :label="item.key"
                  :key="item.key">
                  {{item.label}}
                  </el-radio>
              </el-radio-group>
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
  name:'RechargeDialog',
  data() {
    return {
      rechargeType:[
        {key:"WECHART",label:"微信"},
        {key:"ALIPAY",label:"支付宝"},
        {key:"CASH",label:"现金"},
        {key:"CARD",label:"银行卡"},
      ], 
      money:[
        {key:5,label:"5元"},
        {key:10,label:"10元"},
        {key:50,label:"50元"},
        {key:100,label:"100元"},
      ],
      rules:{
        user:{
          id:{required:true,message:'用户不能为空', trigger:'blur'}
        },
        rechargeType:{required:true,message:'充值类型不能为空'},
        money:{required:true,message:'充值金额不能为空'}
      }
    }
  },
  props: {
    accountFrom:{
      type: Object,
      required: true
    }
  },
  computed: {
      ...mapState({
          diglogStatus : state => state.recharge.diglogStatus,
          userList:  state => state.recharge.userList,
          pageSize: state => state.recharge.table.pageSize,
          currentPage: state => state.recharge.table.currentPage,
      })
  },
  methods:{
    ...mapActions({
        closeDialog: 'recharge/closeDialog',
        payment:'recharge/payment',
        findAll: 'recharge/findAll',
    }),
    cancel(){
      this.$emit("clearData");
      this.$refs['accountFrom'].resetFields();
      this.closeDialog();
    },
    onSubmit(){
        this.$refs.accountFrom.validate(valid => {
          if(valid){
              this.payment(this.accountFrom).then(()=>{
                this.cancel();
                this.$notify({
                  title: '充值成功',
                  type: 'success',
                  duration: 1500,
                }) ;
                this.findAll({"page":this.currentPage-1,"size":this.pageSize});
              })
            }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
