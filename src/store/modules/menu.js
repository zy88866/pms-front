export default {
    namespaced: true,
    state: {
        addRouters: []
    },
    mutations: {
        SET_ROUTERS(state, routers){  // 设置导航菜单树
            state.addRouters = routers
        }
    },
    actions: {
        GenerateRoutes({ commit },asyncRouter){
            commit('SET_ROUTERS', asyncRouter)
        }
    }
}