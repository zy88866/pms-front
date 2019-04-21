<template>
   <div class="main-content" :class="$store.state.app.collapse?'position-collapse-left':'position-left'">
         <keep-alive>
               <transition name="fade" mode="out-in">
                     <router-view></router-view>
               </transition>
      </keep-alive>
   </div>
</template>

<script>
export default {
   name: 'AppMain',
   data() {
       return {
       }
   }
}
</script>

<style lang="less" scoped>
   .main-content{
      position: absolute;
      top: 60px;
      right: 0px;
      bottom: 0px;
      padding: 0 5px 5px;
   }
   .position-left {
      left: 205px;
   }
   .position-collapse-left {
       left: 65px;
   }
</style>

