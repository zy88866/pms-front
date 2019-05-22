import request from '../utils/request'

export function create(repairs){
    return new request({
        url: '/repairs',
        method: 'POST',
        data: repairs
    })
}