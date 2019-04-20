<template>
   <div>
       <!-- 导航菜单 -->
        <el-menu 
            class="menu"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
            :unique-opened="true"
            :collapse="isCollapse"
        >
             <menu-tree v-for="item in navTree" :key="item.id" :menu="item"></menu-tree>
        </el-menu>
   </div>
</template>

<script>
 import MenuTree from '@/components/MenuTree'
export default {
   name: 'Sidebar',
   components:{
       MenuTree
   },
   data() {
       return {
           isCollapse:false
       }
   },
  computed: {
    navTree(){
        return  this.$store.state.menu.addRouters;
    }
  },
  methods:{
  }
}
</script>

<style lang="less" scoped>

</style>

