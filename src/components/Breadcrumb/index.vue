<template>
    <el-breadcrumb class="app-breadcrumb"  separator-class="el-icon-arrow-right">
			<el-breadcrumb-item v-for="(item) in levelList" :key="item.path">
			<a v-if="item.name=='首页'" @click.prevent="handleLink(item)">{{ item.name }}</a>
			<span v-else class="no-redirect">{{ item.name }}</span>
			</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
        levelList: []      
    }
  },
  watch: {
      $route() {
      this.getBreadcrumb()
    } 
  },
  created() {
     this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
        let matched = this.$route.matched.filter(item => {
        if (item.name) {
          return true
        }
			})
      const first = matched[0]
      if (first && first.name !== '首页') {
        matched = [{ path: '/home', name: '首页' }].concat(matched)
      }
			this.levelList = matched
		},
		handleLink(item) {
			const {path} =item;
			if(path){
				this.$route.push(path)
			}
		}
  }
}
</script>

<style lang="less" scoped>
    .el-breadcrumb{
        display: inline-block;
        font-size: 14px;
        line-height: 60px;
				margin-left: 10px;
				 .no-redirect {
					color: #97a8be;
					cursor: text;
				}
    }
</style>
