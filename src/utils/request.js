import axios from 'axios'
import { Notification, Message } from 'element-ui'

//创建实例时设置配置的默认值
const service  = axios.create({
    baseURL=process.env.VUE_APP_BASE_API,
    timeout: 5000 
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  
// 添加响应拦截器
service.interceptors.response.use(function (response) {
    const res = response.data;
    if(res.code!==200){
        Message({
            message: res.message,
            type: 'error',
            duration: 2000
        })
        return Promise.reject(error);
    }
     return response;
  }, function (error) {
      console.log(error)
      Message({
          title:"请求未响应",
          message:"服务器可能出了点问题",
          type:'error'
      });
    return Promise.reject(error);
  });

  export default service
