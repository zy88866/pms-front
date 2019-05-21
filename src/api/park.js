import request from '../utils/request'

export function create(park){
    return new request({
        url: '/park',
        method: 'POST',
        data: park
    })
}

export function findAll(page,size){
    return new request({
        url: '/park/all',
        method: 'GET',
        params:{
            "page": page,
            "size": size
        }
    })
}

export function search(id,page,size){
    return new request({
        url: '/park/search?userId='+id,
        method: 'GET',
        params:{
            "page": page,
            "size": size
        }
    })
}

export function updateStatus(park){
    return new request({
        url: '/park/updateStatus',
        method: 'PUT',
        data: park
    })
}