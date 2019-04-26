import request from '../utils/request'
import {getToken,getRefreshToken} from "~utils/sessionStorage"
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

  // export function refreshToken(data) {
  //   return request({
  //     url: 'auth/token',
  //     method: 'post',
  //     data: data,
  //   })
  // }

export function refreshToken(){
      return new Promise((resolve,reject)=>{
              return request({
                  url: 'auth/token',
                  method: 'post',
                  data: {
                      "accessToken": getToken(),
                      "refreshToken":getRefreshToken()
                  },
          })
      })
  }