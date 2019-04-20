export default  {
    state: {
        collapse:false, //导航栏收缩状态
        loadMenus: false // 菜单和路由是否已经加载状态
    },
    getters:{
        collapses: state =>{// 对应着上面state
            return state.collapse;
        },
        loadMenus: state =>{
            return state.loadMenus;
        }
    },
    mutations: {
        onCollapse(state){  // 改变收缩状态
            state.collapse = !state.collapse
        },
        SET_LOAD_MENUS(state, loadMenus){  // 改变菜单和路由的加载状态
            state.loadMenus = loadMenus;
        }
    },
    action: {
        updateLoadMenus({ commit },status) {
            return new Promise((resolve, reject) => {
              commit('SET_LOAD_MENUS', status)
            })
          }
    }
}