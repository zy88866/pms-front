function set(key,value){
   var curTime = new Date().getTime();
   sessionStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
}

function get(key,exp){
   var data = sessionStorage.getItem(key);
   if(data!==null){
      var dataObj = JSON.parse(data);
      if (new Date().getTime() - dataObj.time>exp) {
         sessionStorage.removeItem(key);
      }else{
         return dataObj.data;
      }
   }
}

 const accessTokenKey="accessToken"
 const refreshTokenKey="refreshToken"
 
function setSessionStorage(key,value) {
   sessionStorage.setItem(key, JSON.stringify(value));
}
function getSessionStorage(key) {
   return JSON.parse(sessionStorage.getItem(key));
}

export function getUserInfo(){
   return  getSessionStorage("userInfo");
}

export  function setUserInfo(value){
      setSessionStorage("userInfo",value);
 }

 export function getToken(){
    return get(accessTokenKey,5*60*1000);
 }

export function getRefreshToken(){
   return get(refreshTokenKey,5*60*1000);
}
 
export  function setToken(value){
   set(accessTokenKey,value.accessToken);
   set(refreshTokenKey,value.refreshToken);
}

