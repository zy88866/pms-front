<template>
  <div class="page">
    <el-dialog
      :title="isAdd ? '新增角色' : '编辑角色'"
      :show-close="false"
      width="500px"
      :visible="diglogStatus">
      <el-form label-width="60px" ref="roleForm" :model="roleForm" :rules="rules">
        <el-row>
          <el-col>
            <el-form-item label="名称" prop="name">
              <el-input  v-model="roleForm.name"  placeholder="请输入角色名称"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="描述" prop="remark">
              <el-input type="textarea" v-model="roleForm.remark" placeholder="请输入描述信息!!!"
              :autosize="{ minRows:2, maxRows: 4}"/>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="权限" prop="menus">
              <el-tree
                :data="menus"
                show-checkbox
                node-key="id"
                ref="tree"
                highlight-current>
              </el-tree>
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
        name:[
          {required:true,message:'名称不能为空', trigger:'blur'},
          {min:2,max:6, message: '长度必须在2-6位之间'}
        ],
        remark:[
          {required:true,message:'描述不能为空', trigger:'blur'},
        ],
      }
    }
  },
  props: {
    roleForm:{
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapState({
        diglogStatus: state => state.role.diglogStatus,
        isAdd: state => state.role.isAdd,
        menus: state => state.role.menus,
    })
   },
  methods: {
    ...mapActions({
      closeDialog: 'role/closeDialog',
      createRole: 'role/createRole',
      editRole: 'role/editRole',
      findRoleAll: 'role/findRoleAll'
    }),
    cancel(){
      this.$emit("clearData");
      this.$refs['tree'].setCheckedKeys([]);
      this.$refs['roleForm'].resetFields();
      this.closeDialog();
    },
    onSubmit(){
      this.$refs.roleForm.validate(valid => {
          if(valid){
            //选中菜单
            this.roleForm.menus=this.$refs.tree.getCheckedNodes(false,true);
            if(this.isAdd){
              this.createRole(this.roleForm).then(()=>{
                this.cancel();
                this.$notify({
                  title: '添加成功',
                  type: 'success',
                  duration: 1500,
                }) ;
                this.findRoleAll();
              })
            }else{
              this.editRole(this.roleForm).then(()=>{
                this.cancel();
                this.$notify({
                  title: '编辑成功',
                  type: 'success',
                  duration: 1500,
                }) ;
                this.findRoleAll();
              })
            }
          }
      })
    },
    setCheckedNodes(data){
       this.$nextTick(function() {
          const ids=data.map(item => item.id);
          this.$refs['tree'].setCheckedKeys(ids);
      })
    }
  },
}
</script>

<style scoped lang="less">
.el-tree-node__content{
  height: 40px;
}
</style>
