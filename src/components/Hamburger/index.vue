<template>
   <div>
        <i class="pms-icon-sortlight"  :class="{'is-active':isActive}" @click="toggleClick"/>
   </div>
</template>

<script>
export default {
   name: 'Hamburger',
   data() {
       return {}
   },
   props: {
       isActive: {
           type: Boolean,
           default: false
       },
       toggleClick: {
           type: Function,
           default: null
       }
   },
  components: {}
}
</script>

<style  lang="less" scoped>
 .pms-icon-sortlight{
     display: inline-block;
     cursor: pointer;
    font-size:38px;
    transform: rotate(0deg);
	transition: .38s;
    transform-origin: 50% 50%;
 }
.is-active{
    transform: rotate(90deg);
}
</style>
