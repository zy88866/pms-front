import request from '../utils/request'

export function create(settle){
    return new request({
        url: '/settle',
        method: 'POST',
        data:settle
    })
}

export function report(userId){
    return new request({
        url: '/settle/report?userId='+userId,
        method: 'GET',
    })
}