<template>
   <div class="main-content">
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
    top: 50px;
    left: 210px;
    right: 0px;
    bottom: 0px;
   }
</style>

