<template>
  <div class="app-container">
    <el-card class="head-container">
        <el-form ref="search" :model="searchFrom" label-width="80px" class="search" @submit.native.prevent>
          <el-row>
              <el-col :span="8">
                <el-form-item label="业主:" >
                    <el-select v-model="searchFrom.id" placeholder="请选择用户" filterable>
                    <el-option
                        v-for="item in userList"
                        :key="item.id"
                        :label="item.username"
                        :value="item.id">
                    </el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="10">
                <div class="serch-button">
                  <el-button size="medium"  type="primary" icon="el-icon-search" @click="searchData()">搜索</el-button>
                  <el-button size="medium"  type="success" icon="el-icon-plus" @click="addDialog()" >添加</el-button>
                   <el-button size="medium"  type="danger" icon="el-icon-delete" :disabled="checkList.length===0" @click="batchDeleteDialog()">删除</el-button>
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
  name:'HouseHeader',
  data() {
    return {
      searchFrom:{
        id:''
      }
    }
  },
  computed:{
    ...mapState({
        userList:  state => state.house.userList,
        pageSize: state => state.house.table.pageSize,
    })
   },
   props :{
    checkList: {
      type: Array,
      required: true
    }
   },
  mounted() { 
    this.getUserList();
  },
  methods: {
    ...mapActions({
      getUserList: 'house/getUserList',
      addDialog: 'house/addDialog',
      batchDelete: 'house/batchDelete',
      findAll: 'house/findAll',
      search: 'house/search',
    }),
    searchData(){
        this.search({"page":0,"size":this.pageSize,"id":this.searchFrom.id});
    },
    batchDeleteDialog(){
      this.batchDelete(this.checkList).then((res)=>{
        this.findAll({"page":0,"size":this.pageSize});
      })
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
