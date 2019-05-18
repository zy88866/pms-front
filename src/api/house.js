import request from '../utils/request'

export function create(house){
    return new request({
        url: '/house',
        method: 'POST',
        data: house
    })
}

export function findAll(page,size){
    return new request({
        url: '/house/all',
        method: 'GET',
        params:{
            "page": page,
            "size": size
        }
    })
}

export function findOne(id){
    return new request({
        url: '/house/'+id,
        method: 'GET',
    })
}

export function search(id,page,size){
    return new request({
        url: '/house/search?userId='+id,
        method: 'GET',
        params:{
            "page": page,
            "size": size
        }
    })
}

export function update(house){
    return new request({
        url: '/house',
        method: 'PUT',
        data: house
    })
}

export function batchDelete(ids){
    return new request({
        url: '/house?ids=',
        method: 'DELETE',
        data: ids
    })
}


