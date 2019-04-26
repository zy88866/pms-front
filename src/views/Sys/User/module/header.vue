<template>
   <div>
     <el-card  class="head-container">
           <!-- 搜索 -->
         <el-form ref="form" label-width="80px">
            <el-row>
               <el-col :span="8">
                     <el-form-item label="姓名:">
                           <el-input   placeholder="请输入用户名"></el-input>
                     </el-form-item>
               </el-col>
               <el-col :span="8">
                  <el-form-item label="手机号:">
                     <el-input  placeholder="请输入手机号" ></el-input>
                   </el-form-item>
               </el-col>
               <el-col :span="8">
                  <el-form-item label="邮箱:">
                        <el-input placeholder="请输入邮箱"></el-input>
                  </el-form-item>
               </el-col>
            </el-row>
               <el-row>
                     <el-col :span="8">
                        <el-form-item label="角色:">
                           <el-select placeholder="请选择角色" style="width:100%;">
                                 <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                              </el-option>
                           </el-select>
                        </el-form-item>
                     </el-col>
                     <el-col :span="6" offset="10">
                           <div class="serch-button">
                              <el-button size="medium"  type="success" icon="el-icon-plus" @click="dialogFormVisible=true" >添加用户</el-button>
                              <el-button size="medium"  type="primary" icon="el-icon-search">搜索</el-button>
                              <el-button size="medium"  type="" icon="el-icon-delete">清除</el-button>
                           </div>
                     </el-col>
               </el-row>
         </el-form>
     </el-card>
   </div>
</template>

<script>
export default {
   name: 'header',
   data() {
       return {}
   },
  components: {}
}
</script>

<style scoped>
</style>
