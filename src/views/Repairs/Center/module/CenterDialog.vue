<template>
  <div class="app-container">
      <el-dialog
      title="开始派单"
      :show-close="false"
      width="500px"
      :visible="diglogStatus">
      <el-form label-width="90px" ref="centerForm" :model="centerForm" :rules="rules">
        <el-row>
          
        <el-col>
            <el-form-item label="订单号:"  prop="repairsBillNo">
                <el-input v-model="centerForm.repairsBillNo" disabled></el-input>
            </el-form-item>
        </el-col>

        <el-col>
            <el-form-item label="维修费用" prop="repairsPrice">
                <el-input-number v-model="centerForm.repairsPrice"  placeholder="请输入维修费用" :min="0" :precision="2"/>
            </el-form-item>
        </el-col>
      
        <el-col>
          <div style="display:flex;  justify-content:flex-end; margin-right:20px">
              <el-button @click="cancel()">取消</el-button>
              <el-button type="primary" @click="onSubmit()">提交</el-button>
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
            repairsBillNo:{required:true,message:'维修单号不能为空', trigger:'blur'},
            repairsPrice:{required:true,message:'维修价格不能为空', trigger:'blur'}
        }
    }
  },
  computed: {
    ...mapState({
        diglogStatus: state => state.repairs.diglogStatus,
        pageSize: state => state.repairs.table.pageSize,
        currentPage: state => state.repairs.table.currentPage,
    }),
   },
  props: {
     centerForm:{
      type: Object,
      required: true
    }
  },
  methods:{
        ...mapActions({
            closeDialog:'repairs/closeDialog',
            startDispatch: 'repairs/startDispatch',
            findAll: 'repairs/findAllDto',
        }),
        cancel(){
             this.$refs['centerForm'].resetFields();
             this.closeDialog();
        },
        onSubmit(){
           this.$refs.centerForm.validate(valid => {
            if(valid){
                this.startDispatch(this.centerForm).then(()=>{
                    this.cancel();
                    this.$notify({
                        title: '派单成功',
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
