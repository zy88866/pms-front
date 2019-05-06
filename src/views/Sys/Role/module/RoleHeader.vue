<template>
     <div>
     <el-card class="head-container">
           <!-- 搜索 -->
         <el-form ref="search" :model="search" label-width="80px" class="search">
            <el-row>
               <el-col :span="8">
                  <el-form-item label="角色:" >
                     <el-input v-model="search.name"  placeholder="请输入角色名称"></el-input>
                  </el-form-item>
               </el-col>
                <el-col :span="6" :offset="10">
                  <div class="serch-button">
                    <el-button size="medium"  type="success" icon="el-icon-plus" @click="openDialog" >添加</el-button>
                    <el-button size="medium"  type="primary" icon="el-icon-search">搜索</el-button>
                  </div>
                </el-col>
            </el-row>
         </el-form>
     </el-card>
     <!-- <user-dialog/> -->
   </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      search:{}
    }
  },
  methods: {
    openDialog(){

    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
  .head-container{
    height: 80px;
    margin-bottom: 10px;
    .search{
      line-height: 80px;
      .serch-button{
        display: flex;
        justify-content: flex-end;
      }
    }
  }
 
</style>
