<template>
 <div class="app-container">
       <el-card class="head-container">
        <el-form ref="search" :model="searchFrom" label-width="80px" class="search" @submit.native.prevent>
          <el-row>
              <el-col :span="8">
                <el-form-item label="业主:" >
                    <el-select v-model="searchFrom.id" placeholder="请选择用户" filterable clearable>
                        <el-option
                            v-for="item in userlist"
                            :key="item.id"
                            :label="item.realName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="10">
                <div class="serch-button">
                  <el-button size="medium"  type="primary" icon="el-icon-search" @click="searchData(searchFrom.id)">搜索</el-button>
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
  name:'CenterHeader',
  data() {
    return {
      searchFrom:{
        id:''
      }
    }
  },
  mounted() { 
    this.getUserList();
  },
  computed: {
      ...mapState({
          userlist : state => state.repairs.userList,
          pageSize : state => state.repairs.table.pageSize,
      })
  },
  methods: {
      ...mapActions({
          getUserList: 'repairs/getUserList',
          search: 'repairs/search',
      }),
      searchData(data){
        this.search({"userId":data,"page":0,"size":this.pageSize});
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
