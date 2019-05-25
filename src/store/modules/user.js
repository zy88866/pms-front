import {getUserList,deleteUser,search,editUser,createUser,getUser,resetPassword} from '@/api/user'
export default{
    namespaced: true,
    state: {
        username:'',
        realName:'',
        role:'',
        diglogStatus:false,
        isAdd:true,
        loading:true,
        table: {
            data: [],
            total: 0,
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
        },
        CHECK_LOADING(state,status){
            state.loading=status;
        },
        FILL_DATA(state,data){
            state.table.data=data;
            state.table.total=data.length;
        },
        CHECK_IS_ADD(state,status){
            state.isAdd=status;
        }
    },
    actions: {
        openDialog({ commit }){
            commit('CHECK_DIALOG',true)
        },
        closeDialog({ commit }){
            commit('CHECK_DIALOG',false)
        },
        addDialog({commit,dispatch}){
            dispatch('openDialog');
            commit('CHECK_IS_ADD',true);
        },
        async editDialog({commit,dispatch},id){
            dispatch('openDialog');
            commit('CHECK_IS_ADD',false);
            const user=await dispatch('getUser',id)
            return user;
        },
        async findAll({commit}){
            commit('CHECK_LOADING',true);
            const data =await getUserList();
            commit('FILL_DATA',data); 
            commit('CHECK_LOADING',false);
        },
        async deleteUser({},id){
            await deleteUser(id);
        },
        async search({commit},user){
            commit('CHECK_LOADING',true); 
            const data =await search(user);
            commit('FILL_DATA',data); 
            commit('CHECK_LOADING',false);
        },
        async createUser({},user){
            await createUser(user)
        },
        async resetPassword({},userId){
            await resetPassword(userId);
        },
        async editUser({},user){
            await editUser(user);
        },
        async getUser({},id){
           const user= await getUser(id);
           return user;
        }
    }
}