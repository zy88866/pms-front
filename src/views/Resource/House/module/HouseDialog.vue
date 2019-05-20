<template>
  <div class="app-container">
    <el-dialog
      :title="isAdd ? '新增房产' : '编辑房产'"
      :show-close="false"
      :visible="diglogStatus">
      <el-form label-width="90px" ref="houseForm" :model="houseForm" :rules="rules">
        <el-row>
          
          <el-col>
              <el-form-item label="用户名:"  prop="user.id">
                  <el-select v-model="houseForm.user.id" placeholder="请选择用户" filterable>
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
              <el-form-item label="小区名称:"  prop="cellName"> 
                  <el-input  v-model="houseForm.cellName" placeholder="请输入小区名称"> </el-input>    
              </el-form-item>
          </el-col>

          <el-col>
              <el-form-item label="位置:"  prop="position"> 
                  <el-input  v-model="houseForm.position" placeholder="请输入具体位置"> </el-input>    
              </el-form-item>
          </el-col>

          <el-col>
              <el-form-item label="类型:"  prop="storey">
                  <el-select v-model="houseForm.storey" placeholder="请选择类型" >
                    <el-option
                        v-for="item in storeyData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
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
  name:'HouseDialog',
  data() {
    return {
        storeyData:[{
          value: 'HEIGHT',
          label: '高层'
        },{
          value: 'LOW',
          label: '低层'
        }],
        rules:{
          cellName:[
             {required:true,message:'小区名称不能为空', trigger:'blur'},
          ],
          position:[
              {required:true,message:'位置不能为空', trigger:'blur'}, 
          ],
          storey:[
              {required:true,message:'类型不能为空', trigger:'blur'}, 
          ],
          user:{
              id:[
              {required:true,message:'用户名不能为空', trigger:'blur'}, 
            ],
          }
        }   
    }
  },
  props: {
    houseForm:{
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
        isAdd: state => state.house.isAdd,
        diglogStatus: state => state.house.diglogStatus,
        userList:  state => state.house.userList,
        pageSize: state => state.house.table.pageSize,
        currentPage: state => state.house.table.currentPage,
    })
   },
  methods: {
    ...mapActions({
      createHouse: 'house/createHouse',
      editHouse: 'house/editHouse',
      closeDialog: 'house/closeDialog',
      findAll: 'house/findAll',
    }),
    cancel(){
      this.$emit("clearData");
      this.$refs['houseForm'].resetFields();
      this.closeDialog();
    },
    onSubmit(){
      this.$refs.houseForm.validate(valid => {
          if(valid){
            if(this.isAdd){
              this.createHouse(this.houseForm).then(()=>{
                this.cancel();
                this.$notify({
                  title: '添加成功',
                  type: 'success',
                  duration: 1500,
                }) ;
                this.findAll({"page":0,"size":this.pageSize});;
              })
            }else{
              this.editHouse(this.houseForm).then(()=>{
                this.cancel();
                this.$notify({
                  title: '编辑成功',
                  type: 'success',
                  duration: 1500,
                }) ;
                this.findAll({"page":this.currentPage-1,"size":this.pageSize});
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
