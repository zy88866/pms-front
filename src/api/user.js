import request from '../utils/request'
import qs from 'qs'

export function login(username, password) {
  const data = { 'username': username, 'password': password }
    return request({
      url: '/login',
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data)
    })
  };

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