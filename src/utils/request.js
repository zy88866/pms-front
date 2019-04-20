import axios from 'axios'
import {getToken,removeUserInfo} from "~utils/sessionStorage"
import router from "@/router/"
import { Notification, Message } from 'element-ui'


//创建实例时设置配置的默认值
const service  = axios.create({
    baseURL:process.env.BASE_API,
    timeout: 5000 
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
     if(config.url!=="/login"){
         const token = getToken();
        if(token!==null){
          config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json'
     }
    return config;
  }, function (error) {
    console.log(error);
    return Promise.reject(error);
  });


// 添加响应拦截器
service.interceptors.response.use(function (response) {
    const res = response.data;
    if(res.code!==200){
        if( res.code===401){
          removeUserInfo();
          router.push("/login");
        }else {
          Message({
            message: res.message,
            type: 'error',
            duration: 2000
        })
        return Promise.reject(error);
    }
  }
     return res;
  }, function (error) {
      console.log(error)
      Message({
          message:"服务器可能出了点问题",
          type:'error'
      });
    return Promise.reject(error);
  });

  export default service
