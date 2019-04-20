<template>
   <div class="app-wrapper">
            <sidebar class="sidebar-container"/>
            <div class="main-container"> 
                <title-bar/>
                <app-main/>
            </div>
   </div>
</template>

<script>
import  {AppMain,Sidebar,TitleBar} from './components'

export default {
   name: 'Layout',
    components: {
         AppMain,
         TitleBar,
         Sidebar
     },
   data() {
       return {}
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
