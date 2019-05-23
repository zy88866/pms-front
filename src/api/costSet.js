import request from '../utils/request'

export function findCostAll(page,size){
    return new request({
        url: '/cost/all',
        method: 'GET',
        params:{
            "page": page,
            "size": size
        }
    })
}
export function findCostAllNoPage(){
    return new request({
        url: '/cost/costAll',
        method: 'GET',
    })
}

export function createCost(cost){
    return new request({
        url: '/cost',
        method: 'POST',
        data: cost
    })
}

export function deleteCost(id){
    return new request({
        url: '/cost/'+id,
        method: 'DELETE',
    })
}

export function findOne(id){
    return new request({
        url: '/cost/'+id,
        method: 'GET',
    })
}

export function updateCost(costSet){
    return new request({
        url: '/cost',
        method: 'PUT',
        data: costSet
    })
}

export function search(costName,page,size){
    return new request({
        url: '/cost/search',
        method: 'GET',
        params: {
            "costName":costName,
            "page": page,
            "size": size
        }
    })
}
