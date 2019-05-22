import {getUserList} from '@/api/user'
import {create,findAllDto,startDispatch,endDispatch,search} from '@/api/repairs'
export default  {
    namespaced: true,
    state: {
        diglogStatus: false,
        userList:[],
        table:{
            data: [],
            pageCount: 0, //总页数
            pageSize: 7, //每页大小
            currentPage: 1, //当前页数
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
        openDialog({commit}){
            commit('CHECK_DIALOG',true);
        },
        async create({},recharge){
            await create(recharge);
        },
        async findAllDto({commit},pageable){
            const data=await findAllDto(pageable);
            commit('FIND_ALL',data);
        },
        async search({commit},pageable){
            const data=await search(pageable.userId,pageable.page,pageable.size);
            commit('FIND_ALL',data);
        },
        async getUserList({commit}){
            const data = await getUserList();
            commit('FILL_USER_LIST',data);
        },
        async startDispatch({commit},repair){
            await startDispatch(repair);
        },
        async endDispatch({commit},repair){
            await endDispatch(repair);
        },
    }
}