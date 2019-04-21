import axios from 'axios'
import {getRefreshToken,getToken,setToken,removeUserInfo} from "~utils/sessionStorage"
import router from "@/router/"
import { refreshToken } from "@/api/auth"
import { Notification, Message } from 'element-ui'

//创建实例时设置配置的默认值
const service  = axios.create({
    baseURL:process.env.BASE_API,
    timeout: 5000 
});

// 添加请求拦截器
service.interceptors.request.use(function (request) {
    // 在发送请求之前做些什么
     if(request.url!=="/login"){
         const token = getToken();
        if(token!==null){
          request.headers['Authorization'] = 'Bearer ' + token;
        }
        request.headers['Content-Type'] = 'application/json'
     }
    return request;
  }, function (error) {
    console.log(error);
    return Promise.reject(error);
  });


// 添加响应拦截器
service.interceptors.response.use(function (response) {
    const res = response.data;
    console.log(response);
    if(res.code!==200){
        if( res.code===401){
            if(response.config.url.replace(response.config.baseURL,'')!=="/auth/token"){
                const jwtToken={
                  "accessToken": getToken(),
                  "refreshToken":getRefreshToken()
                }
                refreshToken(jwtToken).then((response)=>{
                      setToken(response.data.data);      
                })
            }else{
                removeUserInfo();
                router.push("/login");
            }
            return res;
        }else {
          Message({
            message: res.message,
            type: 'error',
            duration: 2000
        })
        return Promise.reject(res);
    }
  }
     return res;
  }, function (error) {
    console.log( Promise.reject(error));
      Message({
          message:"服务器可能出了点问题",
          type:'error'
      });
    return Promise.reject(error);
  });

  export default service
