<template>
   <div class="headbar" :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
      <hamburger :toggle-click="toggleSideBar" :is-active="$store.state.app.collapse" class="hamburger-container" />
      <breadcrumb/>
      <el-dropdown class="avatar-container" :hide-timeout="300" placement="bottom-start">
          <span class="el-dropdown-link">
            <span>{{realName}}</span>
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
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import {logout} from '@/api/auth'
import {getUserInfo} from '~utils/sessionStorage';
import {mapMutations} from 'vuex'
export default {
   name: 'TitleBar',
   data() {
      const {realName}=getUserInfo();
       return {
         realName
       }
   },
   methods:{
        userInfo(){
          this.$router.push({ path: '/home' })
        },
        logOut(){
          logout().then(()=>{
              sessionStorage.clear();
              self.location.href="/login"
          })
        },
        ...mapMutations({
          toggleSideBar: 'app/toggleSideBar'
        }),
   },
    components: {
      Hamburger,
      Breadcrumb
   },
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

