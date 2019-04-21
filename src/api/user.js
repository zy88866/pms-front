import request from '../utils/request'

  export function getUserInfo() {
    return request({
      url: 'user/info',
      method: 'get'
    })
  }

  export function loadCurrMenu(){
    return request({
      url: '/menus/menuList',
      method:'get'
    }) 
  }