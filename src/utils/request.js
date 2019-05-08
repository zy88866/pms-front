import axios from 'axios'
import {setToken,getAccessToken} from "~utils/sessionStorage"
import { refreshToken } from "@/api/auth"
import { Message } from 'element-ui'

//创建实例时设置配置的默认值
const service  = axios.create({
    baseURL:process.env.BASE_API,
    timeout: 5000 
});

//token 刷新标志位
window.isRefreshing = false;

// 存储请求的数组
let refreshSubscribers = [];

/*将所有的请求都push到数组中*/
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

// 数组中的请求得到新的token之后自执行，用新的token去请求数据
function onRrefreshed(accessToken) {
  refreshSubscribers.map(cb => cb(accessToken));
}

// 添加请求拦截器
service.interceptors.request.use(function (request) {
  // 在发送请求之前做些什么
    if(request.url!=="/login"){
      request.headers['Content-Type'] = 'application/json'
      const token = getAccessToken();
      if(token){
        request.headers['Authorization'] = 'Bearer ' + token;
      }else if(request.url.indexOf('/auth/token')===-1){
        if(!window.isRefreshing){
          window.isRefreshing=true;
          refreshToken().then((res)=>{
            window.isRefreshing = false;
            setToken(res);
            onRrefreshed(res.accessToken);
            refreshSubscribers=[];
          }).catch(err=>{
            logout();
          });
          return new Promise((resolve,reject) => {
            subscribeTokenRefresh((accessToken)=>{
              request.headers['Authorization'] = 'Bearer ' + accessToken;
              resolve(request);
            }) 
          })
        }
      } 
     }
    return request;
  }, function (error) {
    console.log(error);
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    const res = response.data;
    if(res.code!==200){
        if(res.code===401){
          logout();
        }else {
          Message({
            message: res.message,
            type: 'error',
            duration: 2000
        })
        return Promise.reject(res);
    }
  }else{
    return res.data;
  }  
  }, function (error) {
    console.log( Promise.reject(error));
      Message({
          message:"服务器可能出了点问题",
          type:'error'
      });
    return Promise.reject(error);
  });

  /**
   * 跳转到首页
   */
  function logout(){
    self.location.href="/login"
    sessionStorage.clear();
  }

  export default service
