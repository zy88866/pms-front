import request from '../utils/request'

export function create(settle){
    return new request({
        url: '/settle',
        method: 'POST',
        data:settle
    })
}