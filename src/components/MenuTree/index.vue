<template>
  <el-submenu v-if="menu.children  &&  menu.children.length>1" :index="'' + menu.id"> 
        <template slot="title">
            <i :class="menu.icon"> </i>
            <span slot="title">{{menu.name}}</span>
        </template>   
        <menu-tree  v-for="item in menu.children" :key="item.id" :menu="item"/> 
  </el-submenu>
  <el-menu-item v-else :index="''+menu.id" @click="handleRoute(menu)">
      <i :class="menu.icon"> </i>
      <span slot="title">{{menu.name}} </span>
  </el-menu-item>
</template>

<script>
import router from '@/router'
export default {
   name: 'MenuTree',
   props: {
       menu: {
           type: Object,
           required: true
       }
   },
  methods: {
      handleRoute (menu){
          let path=menu.path;
          if(path!==null){
             router.push(path);
          }
      }
  }
}
</script>

<style scoped>
    i {
        padding-right: 5px;
        color: azure;
    }
</style>
