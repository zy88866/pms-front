<template>
  <div class="app-container">
    <el-dialog
      title="用户结算"
      :show-close="false"
      width="500px"
      :visible="diglogStatus">
      <el-form label-width="90px" ref="settleForm" :model="settleForm" :rules="rules">
        <el-row>
            
        <el-col>
            <el-form-item label="用户名:"  prop="user.username">
                <el-input v-model="settleForm.user.username" disabled></el-input>
            </el-form-item>
        </el-col>    

         <el-col>
            <el-form-item label="费用类型:"  prop="costSetting.id">
                <el-select v-model="settleForm.costSetting.id" placeholder="请选择费用类型" @change="costSettingChange">
                <el-option
                    v-for="item in costList"
                    :key="item.id"
                    :label="item.costName"
                    :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>
        </el-col>  

        <el-col>
            <el-form-item label="基数:" prop="multiple">
                <el-input-number @change="multipleChange" v-model="settleForm.multiple"  placeholder="请输入基数" :min="0" :precision="2"/>
            </el-form-item>
        </el-col>

        <el-col>
            <el-form-item label="总费用:">
                <el-input v-model="amt"></el-input>
            </el-form-item>
        </el-col>
      
        <el-col>
          <div style="display:flex;  justify-content:flex-end; margin-right:20px">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary" @click="onSubmit('settleForm')">提交</el-button>
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
        price:0,
        multiple:0,
        amt:0,
        rules:{
            user:{
                id:{required:true,message:'用户不能为空', trigger:'blur'},
                username:{required:true,message:'用户不能为空', trigger:'blur'},
            },
            costSetting:{
                id:{required:true,message:'费项不能为空', trigger:'blur'},
                costName:{required:true,message:'费项不能为空', trigger:'blur'},
            },
            multiple:{required:true,message:'倍数不能为空', trigger:'blur'},
        }
    }
  },
  computed: {
    ...mapState({
        costList : state => state.settle.costList,
        diglogStatus: state => state.settle.diglogStatus,
        currentPage: state => state.settle.table.currentPage,
    })
  },
  props: {
    settleForm:{
      type: Object,
      required: true
    }
  },
   methods:{
      ...mapActions({
          findCostAll: 'settle/findCostAll',
          closeDialog: 'settle/closeDialog',
          findAll: 'settle/findAll',
          create:  'settle/create',
      }),
      cancel(){
            this.price=0;
            this.multiple=0;
            this.amt=0;
            this.closeDialog();
            this.$emit("clearData");
            this.$refs['settleForm'].resetFields();
      },
      onSubmit(){
            this.$refs.settleForm.validate(valid => {
                if(valid){
                    this.create(this.settleForm).then(()=>{
                        this.cancel();
                        this.$notify({
                        title: '结算成功',
                        type: 'success',
                        duration: 1500,
                        }) ;
                        this.findAll({"page":this.currentPage-1,"size":this.pageSize});
                    })
                }
        })
      },
     clearData(){
      Object.assign(this.$data, this.$options.data());
    },  
    multipleChange(multiple){
      this.multiple=multiple;
      this.amt=this.price*this.multiple;
    },
    costSettingChange(data){
      this.price=this.costList.filter(v =>{return v.id===data})[0].costPrice;
      this.amt=this.price*this.multiple;
    }
   },
   mounted () { 
       this.findCostAll();
  }
}
</script>

<style scoped lang="less">
</style>
