import request from '../utils/request'

export function create(repairs){
    return new request({
        url: '/repairs',
        method: 'POST',
        data: repairs
    })
}

export function findAllDto(pageable){
    return new request({
        url: '/repairs',
        method: 'GET',
        params: pageable
    })
}

export function search(id,page,size){
    return new request({
        url: '/repairs/search?userId='+id,
        method: 'GET',
        params:{
            "page": page,
            "size": size
        }
    })
}

export function startDispatch(repair){
    return new request({
        url: '/repairs/startDispatch',
        method: 'PUT',
        data:repair
    })
}

export function endDispatch(repair){
    return new request({
        url: '/repairs/endDispatch',
        method: 'PUT',
        data:repair
    })
}