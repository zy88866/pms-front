import request from '../utils/request'

  export function getUserInfo() {
    return request({
      url: 'user/info',
      method: 'get',
    })
  }

  export function loadCurrMenu(){
    return request({
      url: '/menus/menuList',
      method:'get',
    }) 
  }

  export function getUserList(){
    return request({
      url: '/user/list',
      method: 'get',
    })
  }

  export function createUser(user){
    return request({
      url: 'user',
      method: 'post',
      data: user,
    })
  }