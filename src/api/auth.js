import {getAccessToken,getRefreshToken} from "~utils/sessionStorage"
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

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function refreshToken() {
  return request({
    url: 'auth/token',
    method: 'post',
    data: {
          "accessToken": getAccessToken(-1),
          "refreshToken": getRefreshToken(-1),
      },  
  })
}