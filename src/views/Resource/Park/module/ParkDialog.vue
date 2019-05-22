<template>
  <div class="app-container">
    <el-dialog
      title="新增停车位"
      :show-close="false"
      width="500px"
      :visible="diglogStatus">
      <el-form label-width="90px" ref="parkForm" :model="parkForm" :rules="rules">
        <el-row>
          
          <el-col>
              <el-form-item label="用户名:"  prop="user.id">
                  <el-select v-model="parkForm.user.id" placeholder="请选择用户" style="width:100%" filterable>
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
          <el-form-item label="车位类型:"  prop="parkType">
            <el-select v-model="parkForm.parkType" placeholder="请选择车位类型" style="width:100%">
                <el-option
                  v-for="item in parkType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>

        <el-col>
            <el-form-item label="位置:"  prop="position">
                  <el-input  v-model="parkForm.position"  placeholder="请输入车位位置"/>    
            </el-form-item>
        </el-col>

        <el-col>
          <el-form-item label="过期时间:" prop="expireDate" >
            <el-date-picker
              type="date"
              :clearable=false
              format="yyyy 年 M 月 d 日"
              value-format="yyyy-M-d"
              v-model="parkForm.expireDate"
              :picker-options="pickerOptions"
              style="width:100%"
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
      parkType:[{
        value: 'SMALL_CAR',
        label: '小车'
      },{
        value: 'BIG_CAR',
        label: '大车'
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
          id:{required:true,message:'用户不能为空', trigger:'blur'}
        },
        parkType:{required:true,message:'车位类型不能为空', trigger:'blur'},
        position:{required:true,message:'位置不能为空', trigger:'blur'},
        expireDate:{required:true,message:'过期时间不能为空', trigger:'blur'}
      }
    }
  },
  props: {
    parkForm:{
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
        diglogStatus: state => state.park.diglogStatus,
        userList:  state => state.park.userList,
        pageSize: state => state.park.table.pageSize,
    })
   },
   methods: {
      ...mapActions({
      createPark: 'park/createPark',
      closeDialog: 'park/closeDialog',
      findAll: 'park/findAll',
    }),
    cancel(){
      this.$emit("clearData");
      this.$refs['parkForm'].resetFields();
      this.closeDialog();
    },
    onSubmit(){
      this.$refs.parkForm.validate(valid => {
          if(valid){
              this.createPark(this.parkForm).then(()=>{
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
  el-form-item{
    width: 100%;
  }
</style>
