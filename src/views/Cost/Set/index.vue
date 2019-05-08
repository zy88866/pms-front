<template>
   <div class="app-container">
    <set-header/>
    <!--表格渲染-->
    <el-table :data="tableData" size="small" border class="table-container">
      <el-table-column type="selection" width="50px" align="center" >  </el-table-column>
      <el-table-column  prop="costName" label="费用名称" align="center"></el-table-column>
      <el-table-column  prop="costPrice" label="价格" align="center">
           <template slot-scope="scope">
            <span style="margin-left: 10px">￥{{scope.row.costPrice}}</span>
          </template>
        </el-table-column>
      <el-table-column  prop="regular" label="计费规则" align="center"  ></el-table-column>
      <el-table-column label="操作" align="center"  width="150px">
        <template slot-scope="scope">
        <el-button size="mini"  @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-popover
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      background
      :page-count="pageCount"
      :page-size="pageSize"
      :current-page="currentPage"
      style="margin-top:8px; float:right"
      layout="prev,pager,next"
      @current-change="pageChange"/>

   <set-dialog :cost-form="costForm" @clearData="clearData"/>
   </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapActions} from 'vuex'
import SetHeader from './module/SetHeader'
import SetDialog from './module/SetDialog'
export default {
  data() {
    return {
      costForm:{
        costName: '',
        costPrice: '',
        regular: ''
      }
    }
  },
  //页面初始化方法向后台请求数据
  mounted() { 
      this.findCostAll({"page":0,"size":this.pageSize});
   },
   //计算属性 监听vuex中的数据
   computed: {
      ...mapState({
         tableData: state => state.costSet.table.data,
         pageCount: state => state.costSet.table.pageCount,
         pageSize: state => state.costSet.table.pageSize,
         currentPage: state => state.costSet.table.currentPage,
      })
   },
  components: {
      SetHeader,
      SetDialog,
  },
  methods: {
    ...mapActions({
        findCostAll: 'costSet/findCostAll',
        deleteCostSet: 'costSet/deleteCostSet',
        editDialog: 'costSet/editDialog',
    }),
    handleEdit(id){
        this.editDialog(id).then((data)=>{
          this.costForm=data;
        });
    },
    pageChange(currPage){
       this.findCostAll({"page":currPage-1,"size":this.pageSize});
    },
    subDelete(id){
      this.deleteCostSet(id).then(()=>{
        this.$refs[id].doClose();
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 1500,
        }) ;
        this.findCostAll({"page":this.currentPage-1,"size":this.pageSize});
      }).catch(err => {
          this.$refs[id].doClose();
      });
    },
    clearData(){
      Object.assign(this.$data, this.$options.data());
    }
  },
}
</script>

<style scoped lang="less">
</style>
