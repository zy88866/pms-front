import request from '../utils/request'

  export function getUserInfo() {
    return request({
      url: '/user/info',
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
      url: '/user',
      method: 'post',
      data: user,
    })
  }

  export function deleteUser(id){
    return request({
      url:'/user/'+id,
      method: 'delete',
    })
  }

  export function search(user){
    return request({
      url: '/user/search',
      method: 'get',
      params: user,
    })
  }

  export function editUser(user){
    return request({
      url: '/user/edit',
      method: 'put',
      data: user,
    })
  }

  export function getUser(id){
    return request({
      url: '/user/'+id,
      mothod: 'get', 
    })
  }