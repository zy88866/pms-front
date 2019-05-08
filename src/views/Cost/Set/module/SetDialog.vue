<template>
  <div class="app-container">
    <el-dialog
      :title="isAdd ? '新增费用' : '编辑费用'"
      :show-close="false"
      width="500px"
      :visible="diglogStatus">
      <el-form label-width="60px" ref="costForm" :model="costForm" :rules="rules">
        <el-row>
          <el-col>
            <el-form-item label="名称" prop="costName">
              <el-input  v-model="costForm.costName"  placeholder="请输入费用名称"/>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="价格" prop="costPrice">
              <el-input-number v-model="costForm.costPrice"  placeholder="请输入价格" :min="0" :precision="2"/>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="规则" prop="regular">
              <el-input  v-model="costForm.regular"  placeholder="请输入计费规则"/>
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
        costName:[
           {required:true,message:'名称不能为空', trigger:'blur'},
           {min:2,max:6, message: '长度必须在2-6位之间'}
        ],
        costPrice:[
          {required:true,message:'价格不能为空', trigger:'blur'},
        ],
        regular:[
          {required:true,message:'计费规则不能为空', trigger:'blur'},
        ]
      }
    }
  },
  props: {
    costForm:{
      type: Object,
      required: true
    }
  },
  computed: {
      ...mapState({
        isAdd: state => state.costSet.isAdd,
         diglogStatus: state => state.costSet.diglogStatus,
         pageSize: state => state.costSet.table.pageSize,
         currentPage: state => state.costSet.table.currentPage,
      })
   },
  methods: {
    ...mapActions({
        createCost:'costSet/createCost',
        findCostAll: 'costSet/findCostAll',
        closeDialog: 'costSet/closeDialog',
        editCost:'costSet/editCost'
    }),
    cancel(){
        this.$emit("clearData");
        this.closeDialog();
    },
    onSubmit(){
      this.$refs.costForm.validate(valid => {
          if(valid){
            if(this.isAdd){
              this.createCost(this.costForm).then(()=>{
                this.cancel();
                this.$notify({
                  title: '添加成功',
                  type: 'success',
                  duration: 1500,
                }) ;
              this.findCostAll({"page":0,"size":this.pageSize});
              })
            }else{
              this.editCost(this.costForm).then(()=>{
                this.cancel();
                this.$notify({
                  title: '编辑成功',
                  type: 'success',
                  duration: 1500,
                }) ;
                this.findCostAll({"page":this.currentPage-1,"size":this.pageSize});
              })
            }
          }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
