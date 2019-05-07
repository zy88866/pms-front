import request from '../utils/request'

export function findAll(){
    return new request({
        url: '/role',
        method: 'get',
    })
}

export function search(role){
    return new request({
        url: '/role/search',
        method: 'get',
        params: role
    })
}

export function batchDelete(ids){
    return new request({
        url: '/role/batchDelete',
        method: 'delete',
        data: ids
    })
}

export function createRole(role){
    return new request({
        url: '/role',
        method: 'post',
        data: role
    })
}

export function findAllMenus(){
    return new request({
        url: '/menus/findAllMenus',
        method: 'get',
    })
}

export function findOne(id){
    return new request({
        url: '/role/'+id,
        method: 'get',
    })
}

export function editRole(role){
    return new request({
        url: '/role',
        method: 'put',
        data: role
    })
}