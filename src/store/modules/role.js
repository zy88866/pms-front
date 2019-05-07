import {findAll,createRole,search,findAllMenus,batchDelete,editRole,findOne} from '@/api/role'
export default {
    namespaced: true,
    state:{
        isAdd:true,
        diglogStatus: false,
        table:{
            data: [],
            total: 0,
        },
        menus: [] 
    },
    mutations: {
        FIND_ALL(state,role){
            state.table.data=role;
            state.table.total=role.length;
        },
        CHECK_IS_ADD(state,status){
            state.isAdd=status;
        },
        CHECK_DIALOG(state,status){
            state.diglogStatus=status;
        },
        FIND_MENUS(state,menus){
            state.menus=menus;
        }
    },
     actions: {
        async openDialog({commit}){
            commit('CHECK_DIALOG',true);
            const menus=await findAllMenus();
            const list=JSON.parse(JSON.stringify(menus).replace(/name/g,'label'));
            commit('FIND_MENUS',list);
        },
        closeDialog({commit}){
            commit('CHECK_DIALOG',false);
        },
        addDialog({commit,dispatch}){
            dispatch('openDialog');
            commit('CHECK_IS_ADD',true);
        },
        editDialog({commit,dispatch},id){
            dispatch('openDialog');
            commit('CHECK_IS_ADD',false);
            const data=dispatch('findOne',id);
            return data;
        },
        async findRoleAll({commit}){
            const data=await findAll();
            commit('FIND_ALL',data)
        },
        async createRole({},role){
            await createRole(role);
        },
        async editRole({},role){
            await editRole(role);
        },
        async findOne({},id){
           const role = await findOne(id);
           return role;
        },
        async search({commit},role){
            const data = await search(role);
            commit('FIND_ALL',data);
        },
        async batchDelete({},ids){
             await batchDelete(ids);
        },
    }
}