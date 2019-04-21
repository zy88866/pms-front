<template>
   <div>
        <el-table  ref="mutipleTable" :data="tableData | pagination(currentPage,pagesize)" style="width:100%" @selection-change="handleSelectionChange">
           <el-table-column type="selection" width="55">  </el-table-column>
            <el-table-column  prop="name" label="用户名" ></el-table-column>
            <el-table-column  prop="name" label="姓名"></el-table-column>
            <el-table-column  prop="role" label="角色"></el-table-column>
             <el-table-column label="操作">
                  <template slot-scope="scope">
                  <el-button size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini"  type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
               </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                  background
                  layout="prev, pager, next"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-size="pagesize"
                  :current-page="currentPage"
                  :total="tableData.length">
            </el-pagination>
        </div>
   </div>
</template>

<script>
export default {
   name: 'AppMain',
   data() {
       return {
          title:[

          ],
          tableData:[{
               name: '王大虎',
               role: '超级管理员'
          },{
               name: '王小虎',
               role: '超级管理员'
          }
          ],
        // tableData:[], 
         pagesize:2,
         currentPage:1,
         multipleSelection:[]
       }
   },
   methods:{
      handleEdit(index,row){
      },
       handleDelete(index,row){
         alert(index)
      },
      handleSizeChange(val) {
        this.pageSize=val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      //多选
      handleSelectionChange(val){
         this.multipleSelection=val
      }
   },
    filters:{
      pagination(array,pageNo,pageSize){
        let offset = (pageNo - 1) * pageSize;
        let data=(offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
        return data
      }
    }
}
</script>

<style lang="less" scoped>
   .pagination{
         text-align: right;
         margin-top: 30px;
         margin-right: 50px;
   }
</style>

