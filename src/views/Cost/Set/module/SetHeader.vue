<template>
  <div class="page">
    <el-card class="head-container">
          <!-- 搜索 -->
        <el-form ref="search" :model="searchCost" label-width="80px" class="search" @submit.native.prevent>
          <el-row>
              <el-col :span="8">
                <el-form-item label="费用名称:" >
                    <el-input v-model="searchCost.costName"  placeholder="请输入费用名称" />
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="10">
                <div class="serch-button">
                  <el-button size="medium"  type="primary" icon="el-icon-search" @click="searchData()">搜索</el-button>
                  <el-button size="medium"  type="success" icon="el-icon-plus" @click="addDialog()" >添加</el-button>
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
  name: 'SetHrader',
  data() {
    return {
      searchCost: {
        costName: ''
      }
    }
  },
  computed:{
    ...mapState({
        pageSize: state => state.costSet.table.pageSize,
    })
  },
  methods:{
    ...mapActions({
        search: 'costSet/search',
        addDialog: 'costSet/addDialog'
    }),
    searchData(){
      this.search({
        "costName":this.searchCost.costName,
        "page":0,
        "size":this.pageSize,
        });
    },
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
