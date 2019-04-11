import request from '../utils/request'

export function login(username, password) {
    return request({
      url: '/login',
      method: 'post',
      data: {
        username,
        password
      }
    })
  }

  export function getInfo() {
    return request({
      url: 'user/info',
      method: 'get'
    })
  }