import {getUserList} from '@/api/user'
import {report} from '@/api/recharge'
export default  {
    namespaced: true,
    state: {
        diglogStatus: false,
        userList:[],
        table:{
            totalData: [],
            currData: [],
            size:7,
            currpage:1,
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
            state.table.totalData=data;
            state.table.total=data.length;
        },
        PAGE_HEPLER(state,currpage){
            state.table.currpage=currpage;
            state.table.currData=state.table.totalData.slice((currpage-1)*state.table.size,currpage*state.table.size); 
        }
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
        async report({state,commit,dispatch},userId){
            const data = await report(userId);
            commit('FIND_ALL',data);
            dispatch('pageable',1);
        },
        pageable({commit},currpage){
            commit('PAGE_HEPLER',currpage);
        },
    }
}