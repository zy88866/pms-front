import {createCost,findCostAll,deleteCost,findOne,updateCost,search} from '@/api/costSet'
export default  {
    namespaced: true,
    state: {
        isAdd:true,
        diglogStatus: false,
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
        FIND_ALL(state,data){
            state.table.data=data.content;
            state.table.pageCount=data.totalPages;
            state.table.pageSize=data.size;
            state.table.currentPage=data.number+1;
        },
        CHECK_IS_ADD(state,status){
            state.isAdd=status
        }
    },
    actions: {
        openDialog({commit}){
            commit('CHECK_DIALOG',true);
        },
        closeDialog({commit}){
            commit('CHECK_DIALOG',false);
        },
        addDialog({commit,dispatch}){
            dispatch('openDialog');
            commit('CHECK_IS_ADD',true)
        },
        editDialog({commit,dispatch},id){
            dispatch('openDialog');
            commit('CHECK_IS_ADD',false)
            const costSet=findOne(id);
            return costSet;
        },
        async search({commit},cost){
            const data = await search(cost.costName,cost.page,cost.size);
            commit('FIND_ALL',data);
        },
        async findCostAll({commit},pageable){
            const data=await findCostAll(pageable.page,pageable.size);
            commit('FIND_ALL',data)
        },
        async createCost({},costSet){
            await createCost(costSet); 
        },
        async editCost({},costSet){
            await updateCost(costSet); 
        },
        async deleteCostSet({},id){
            await deleteCost(id);
        },
    }
}