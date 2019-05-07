<template>
     <div>
     <el-card class="head-container">
           <!-- 搜索 -->
         <el-form ref="search" :model="searchRole" label-width="80px" class="search" @submit.native.prevent>
            <el-row>
               <el-col :span="8">
                  <el-form-item label="角色:" >
                     <el-input v-model="searchRole.name"  placeholder="请输入角色名称" />
                  </el-form-item>
               </el-col>
                <el-col :span="6" :offset="10">
                  <div class="serch-button">
                    <el-button size="medium"  type="primary" icon="el-icon-search" @click="searchData()">搜索</el-button>
                    <el-button size="medium"  type="success" icon="el-icon-plus" @click="addDialog()" >添加</el-button>
                    <el-button size="medium"  type="danger" icon="el-icon-delete" :disabled="deleteStatus" @click="deleteDialog()">删除</el-button>
                  </div>
                </el-col>
            </el-row>
         </el-form>
     </el-card>
   </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
      searchRole:{
        name:""
      },
      deleteStatus:true
    }
  },
  props: {
    checkList: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions({
      addDialog: 'role/addDialog',
      search: 'role/search',
      batchDelete: 'role/batchDelete',
      findRoleAll: 'role/findRoleAll',
    }),
    searchData(){
      this.search(this.searchRole);
    },
    deleteDialog(){
      this.$confirm('确认删除？','提示',{type:"warning"})
        .then(_ => {
            this.batchDelete(this.checkList.map(v => v.id)).then(_ =>{
                this.findRoleAll();
            })
        }).catch(_=>{})
    }
  },
  components: {
  },
  watch: {
    checkList(newValue,oldVlaue) {
      if(newValue.length ==0){
        this.deleteStatus=true;
      }else{
          for(let i=0;i<newValue.length;i++){
            if(newValue[i].citeNum>0){
              return this.deleteStatus=true;
            }
          }
        return this.deleteStatus=false;
      }
    }
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
