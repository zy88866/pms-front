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
                            :label="item.username"
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
  name:'RechargeHeader',
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
            userlist : state => state.recharge.userList,
            pageSize : state => state.recharge.table.pageSize,
        })
    },
    methods: {
        ...mapActions({
            getUserList: 'recharge/getUserList',
            search: 'recharge/search',
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
