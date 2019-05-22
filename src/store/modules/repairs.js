import {create} from '@/api/repairs'
export default  {
    namespaced: true,
    state: {
     
    },
    mutations: {
    
    },
    actions: {
        async create({},recharge){
            await create(recharge);
        },
    }
}