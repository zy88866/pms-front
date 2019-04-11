<template>
   <div>
        <el-menu 
            class="menu"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
            :unique-opened="true"
            :collapse="isCollapse"
        >
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项1</el-menu-item>
        </el-menu>
   </div>
</template>

<script>
export default {
   name: 'Sidebar',
   data() {
       return {
           isCollapse:false
       }
   },
  components: {}
}
</script>

<style lang="less" scoped>

</style>

