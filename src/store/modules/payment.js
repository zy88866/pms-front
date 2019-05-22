import {getUserList} from '@/api/user'
import {report} from '@/api/recharge'
export default  {
    namespaced: true,
    state: {
        diglogStatus: false,
        userList:[],
        table:{
            data: [],
            total: 0,
        },
    },
    mutations: {
        CHECK_DIALOG(state,status){
            state.diglogStatus=status;
        },
        FILL_USER_LIST(state,data){
            state.userList=data;
        },
        FIND_ALL(state,data){
            state.table.data=data;
            state.table.total=data.length;
        },
    },
    actions: {
        closeDialog({commit}){
            commit('CHECK_DIALOG',false);
        },    
        rechargDialog({commit}){
            commit('CHECK_DIALOG',true);
        },
        async getUserList({commit}){
            const data = await getUserList();
            commit('FILL_USER_LIST',data);
        },
        async report({commit},userId){
            const data = await report(userId);
            commit('FIND_ALL',data);
        },
    }
}