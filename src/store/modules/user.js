export default{
    state: {
        username:'',
        realName:'',
        role:'',
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
    },
    actions: {
    }
}