import {getUserList} from '@/api/user'
import {create,findAll,search,updateStatus} from '@/api/door'
export default  {
    namespaced: true,
    state: {
        diglogStatus: false,
        userList:[],
        table:{
            data: [],
            pageCount: 0, //总页数
            pageSize: 7, //每页大小
            currentPage: 0, //当前页数
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
            state.table.data=data.content;
            state.table.pageCount=data.totalPages;
            state.table.pageSize=data.size;
            state.table.currentPage=data.number+1;
        },
    },
    actions: {
        closeDialog({commit}){
            commit('CHECK_DIALOG',false);
        },    
        addDialog({commit}){
            commit('CHECK_DIALOG',true);
        },
        async getUserList({commit}){
            const data = await getUserList();
            commit('FILL_USER_LIST',data);
        },
        async createDoor({},house){
            await create(house);
        },
        async findAll({commit},pageable){
            const data=await findAll(pageable.page,pageable.size);
            commit('FIND_ALL',data)
        },
        async search({commit},pageable){
            const data= await search(pageable.userId,pageable.page,pageable.size);
            commit('FIND_ALL',data)
        },
        async updataStatus({},door){
            return await updateStatus(door);
        }
    }
}