<template>
   <section class="app-main">
         <transition name="fade-transform" mode="out-in"> 
              <router-view/>
         </transition>
   </section>
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
   .app-main{
         min-height: calc(100vh - 50px);
          position: relative;
          overflow: hidden;
   }
</style>

