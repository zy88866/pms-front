<template>
  <div class="app-container">
    <el-dialog
      title="新增门禁"
      :show-close="false"
      :visible="diglogStatus">
      <el-form label-width="90px" ref="doorForm" :model="doorForm" :rules="rules">
        <el-row>
          
          <el-col>
              <el-form-item label="用户名:"  prop="user.id">
                  <el-select v-model="doorForm.user.id" placeholder="请选择用户" filterable>
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
          <el-form-item label="开门方式:"  prop="doorType">
            <el-select v-model="doorForm.doorType" placeholder="请选择开门方式" >
                <el-option
                  v-for="item in DoorType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>

        <el-col>
          <el-form-item label="过期时间:" prop="expireDate">
            <el-date-picker
              type="date"
              :clearable=false
              format="yyyy-MM-dd"
              v-model="doorForm.expireDate"
              :picker-options="pickerOptions"
              placeholder="选择过期时间">
            </el-date-picker>
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
  name:"DoorDialog",  
  data() {
    return {
      DoorType:[{
        value: 'QR',
        label: '二维码'
      },{
        value: 'NFC',
        label: '门禁卡'
    }],
      pickerOptions: {
        // disabledDate是一个函数,参数是当前选中的日期值,这个函数需要返回一个Boolean值,
           disabledDate: (time) => {
          // 如果函数处理比较简单,可以直接在这里写逻辑方法
          // return time.getTime() < Date.now() - 8.64e7;
          return time.getTime() < Date.now();
        }
      },
      rules:{
        user:{
          id:{required:true,message:'小区名称不能为空', trigger:'blur'}
        },
        doorType:{required:true,message:'开门方式不能为空', trigger:'blur'},
        expireDate:{required:true,message:'过期时间不能为空', trigger:'blur'}
      }
    }
  },
  props: {
    doorForm:{
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
        diglogStatus: state => state.door.diglogStatus,
        userList:  state => state.door.userList,
        pageSize: state => state.door.table.pageSize,
    })
   },
   methods: {
      ...mapActions({
      createDoor: 'door/createDoor',
      closeDialog: 'door/closeDialog',
      findAll: 'door/findAll',
    }),
    cancel(){
      this.$emit("clearData");
      this.$refs['doorForm'].resetFields();
      this.closeDialog();
    },
    onSubmit(){
      this.$refs.doorForm.validate(valid => {
          if(valid){
              this.createDoor(this.doorForm).then(()=>{
                this.cancel();
                this.$notify({
                  title: '添加成功',
                  type: 'success',
                  duration: 1500,
                }) ;
                this.findAll({"page":0,"size":this.pageSize});;
              })
            }
      })
    }
   }
}
</script>

<style scoped lang="less">
</style>
