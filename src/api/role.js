import request from '../utils/request'

export function findAll(){
    return new request({
        url: '/role/findAll',
        method: 'get',
    })
}