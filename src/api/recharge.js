import request from '../utils/request'

export function findAll(page,size){
    return new request({
        url: '/account/all',
        method: 'GET',
        params:{
            "page": page,
            "size": size
        }
    })
}

export function search(userId){
    return new request({
        url: '/account/search?userId='+userId,
        method: 'GET',
    })
}

export function payment(AccountDetail){
    return new request({
        url: '/account',
        method: 'POST',
        data: AccountDetail
    })
}

export function report(userId){
    return new request({
        url: '/account/report?userId='+userId,
        method: 'GET',
    })
}