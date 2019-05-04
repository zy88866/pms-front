import {findAll} from '@/api/role'
export default {
    namespaced: true,
    state:{
        tableData:[],
        total:0
    },
    mutations: {
        FIND_ALL(state,role){
            state.tableData=role,
            state.total=role.length
        }
    },
    actions: {
        findRoleAll({commit}){
            findAll().then(res =>{
                commit('FIND_ALL',res)
            })
        }
    }
}