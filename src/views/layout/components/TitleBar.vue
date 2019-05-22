<template>
   <div class="headbar" :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
      <hamburger :toggle-click="toggleSideBar" :is-active="$store.state.app.collapse" class="hamburger-container" />
      <breadcrumb/>
      <el-dropdown class="avatar-container" :hide-timeout="300" trigger="click">
          <span class="el-dropdown-link">
            <span>{{realName}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="openDialog">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logOut">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
   </div>
</template>
<script>
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import {logout} from '@/api/auth'
import {mapMutations, mapActions} from 'vuex'
export default {
   name: 'TitleBar',
   data() {
     return{

     }
   },
   methods:{
        logOut(){
          logout().then(()=>{
              self.location.href="/login"
              sessionStorage.clear();
          })
        },
        ...mapMutations({
          toggleSideBar: 'app/toggleSideBar',
        }),
        ...mapActions({
            openDialog: 'app/openDialog'
        })
   },
    components: {
      Hamburger,
      Breadcrumb,
   },
   props:{
     realName:{
       type:String,
       required:true
     }
   }
}
</script>

<style lang="less" scoped>
    .headbar{
      position: fixed;
      top: 0;
      right: 0;
      z-index: 1030;
      height: 60px;
      line-height: 60px;
      background-color: white;
      border-color: rgba(180, 190, 190, 0.8);
      border-left-width: 1px;
      border-left-style: solid;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
        .hamburger-container {
          line-height: 60px;
          height: 60px;
          float: left;
          padding: 0 10px;
        }
    }
    .avatar-container{
      height: 60px;
      cursor:pointer;
      display: inline-block;
      position: absolute;
      right: 35px;
      .el-dropdown-link{
        font-size: 16px;
      }
    }
  .position-left {
    left: 204px;
  }
  .position-collapse-left {
    left: 64px;
  }
</style>

