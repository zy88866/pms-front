import {findAll} from '@/api/role'
export default {
    namespaced: true,
    state:{
        table:{
            data: [],
            total: 0,
        }
    },
    mutations: {
        FIND_ALL(state,role){
            state.table.data=role,
            state.table.data.total=role.length
        }
    },
     actions: {
        async findRoleAll({commit}){
            const data=await findAll();
            commit('FIND_ALL',data)
        }
    }
}