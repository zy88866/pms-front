import request from '../utils/request'

export function create(door){
    return new request({
        url: '/door',
        method: 'POST',
        data: door
    })
}

export function findAll(page,size){
    return new request({
        url: '/door/all',
        method: 'GET',
        params:{
            "page": page,
            "size": size
        }
    })
}

export function search(id,page,size){
    return new request({
        url: '/door/search?userId='+id,
        method: 'GET',
        params:{
            "page": page,
            "size": size
        }
    })
}

export function updateStatus(door){
    return new request({
        url: '/door/updateStatus',
        method: 'PUT',
        data: door
    })
}



