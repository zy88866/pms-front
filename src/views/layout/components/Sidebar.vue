<template>
   <div class="menu-bar-container">
        <!-- logo -->
        <div class="logo"
         :class="collapse?'menu-bar-collapse-width':'menu-bar-width'" @click="$router.push('/home')">
            <i v-if="collapse" class="pms-icon-run" />
            <img v-else src="@/assets/img/logo.png"/>
        </div>
       <!-- 导航菜单 -->
        <el-menu  :default-active="this.$route.path" class="menu" background-color="#304156" text-color="#bfcbd9" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
        active-text-color="#409EFF"  :collapse="collapse" :collapse-transition="false" :unique-opened="true">
           <!-- 导航菜单树组件，动态加载菜单 -->
             <menu-tree v-for="item in navTree" :key="item.id" :menu="item"></menu-tree>
        </el-menu>
   </div>
</template>

<script  >
 import { mapState } from 'vuex'
 import MenuTree from '@/components/MenuTree'
export default {
   name: 'Sidebar',
   components:{
       MenuTree
   },
   computed: mapState({
        collapse: state => state.app.collapse,
        navTree: state => state.menu.addRouters,
    }),
    mounted(){
        //判断菜单列表是否返回
        if(this.navTree!==undefined &&this.navTree[0].children!==undefined){
            const path=this.$router.currentRoute.path;
            if(path==='/home'){
                this.$router.push(this.navTree[0].children[0].path);
            }else{
                this.$router.push(path);
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .menu-bar-container{
        position: fixed;
        top: 0px;
        left: 0;
        bottom: 0;
        z-index: 1020;
        .el-menu {
        position:absolute;
        top: 60px;
        bottom: 0px;
        text-align: left;
    }
        .logo {
            position:absolute;
            top: 0px;
            height: 60px;   
            line-height: 60px;
            background: #304156;
            border-right: solid 1px #e6e6e6;
            cursor:pointer;
            img {
                width:185px;
                height: 40px;
                border-radius: 0px;
                margin: 10px 10px 10px 10px;
                float: left;
            }
            .pms-icon-run{
                position:absolute;
                left: 20px;
                color: aliceblue;
                line-height: 60px;
            }
        }
        .menu-bar-width {
            width: 205px !important;
        }
        .menu-bar-collapse-width {
            width: 65px !important;
        }
    }
</style>

