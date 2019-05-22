<template>
   <div class="app-wrapper">
        <sidebar class="sidebar-container"/>
        <div class="main-container"> 
            <title-bar :real-name="passwordFrom.realName"/>
            <app-main/>
        </div>
        <edit-password :password-from="passwordFrom" @clearData="clearData"/>
   </div>
</template>

<script>
import {getUserInfo} from '~utils/sessionStorage';
import  {AppMain,Sidebar,TitleBar} from './components'
import EditPassword from './EditPassword'
export default {
   name: 'Layout',
    components: {
         AppMain,
         TitleBar,
         Sidebar,
         EditPassword,
     },

   data() {
      const {id,realName}=getUserInfo();
       return {
          passwordFrom:{
           id:id,
           realName:realName,
           oldPassword:'',
           newPassword:'',
           reqPassword:'',
         }
       }
   },
   methods:{
    clearData(){
      Object.assign(this.$data, this.$options.data());
    },
   }

}
</script>

<style  lang="less" scoped>
@sideBarWidth:210px;
 .sidebar-container {
    transition: width 0.28s;
    width: @sideBarWidth !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
     .main-container {
        min-height: 100%;
        transition: margin-left .28s;
        margin-left: @sideBarWidth;
        position: relative;
    }
  }

</style>
