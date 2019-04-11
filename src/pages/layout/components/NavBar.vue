<template>
   <div class="navbar">
      <el-dropdown class="avatar-container" >
          <span class="el-dropdown-link">
            <span>{{username}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                        <span @click="userInfo"> 个人中心 </span>
                </el-dropdown-item>
              <el-dropdown-item >
                        <span @click="logOut"> 退出登陆</span>
              </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
   </div>
</template>

<script>
export default {
   name: 'NavBar',
   data() {
       return {
          username:'张三'
       }
   },
   methods:{
        userInfo(){
            this.$router.push({ path: '/' })
        },
        logOut(){
        }
   },
  components: {}
}
</script>

<style lang="less" scoped>
    .navbar{
      height: 50px;
      line-height: 50px;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
    }
    .avatar-container{
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .el-dropdown-link{
        font-size: 16px;
      }
    }
</style>

