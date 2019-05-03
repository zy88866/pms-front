export default{
    state: {
        username:'',
        realName:'',
        role:'',
        diglogStatus:false,
    },
    getters:{
        getUsername: state=>{
            return state.username;
        },
        getrealName: state=>{
            return state.realName;
        }  
    },
    mutations: {
        SET_INFO(state, info){  
            state.username = info.username,
            state.realName = info.realName,
            state.role = info.role
        },
        CHECK_DIALOG(state,status){
            state.diglogStatus=status;
        }
    },
    actions: {
        openDialog({ commit }){
            commit('CHECK_DIALOG',true)
        },
        closeDialog({ commit }){
            commit('CHECK_DIALOG',false)
        }
    }
}