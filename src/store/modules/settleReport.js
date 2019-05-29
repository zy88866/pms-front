import {getUserList} from '@/api/user'
import {report} from '@/api/settle'
export default  {
    namespaced: true,
    state: {
        userList:[],
        table:{
            data: [],
            total:0
        },
    },
    mutations: {
        FIND_ALL(state,data){
            state.table.data=data;
            state.table.total=data.length;
        },
        FILL_USER_LIST(state,data){
            state.userList=data;
        },
    },
    actions: {
        async report({commit},repair){
            const data=await report(repair);
            commit('FIND_ALL',data)
        },
        async getUserList({commit}){
            const data = await getUserList();
            commit('FILL_USER_LIST',data);
        },
    }
}