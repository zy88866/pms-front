const accessTokenKey="accessToken";
const refreshTokenKey="refreshToken";

function set(key,value){
   var curTime = new Date().getTime();
   sessionStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
}

function get(key,exp=5*60*1000){
   var data = sessionStorage.getItem(key);
   if(data!==null){
      var json = JSON.parse(data);
      if((new Date().getTime() - json.time<=exp) || exp === -1){
         return json.data;
      }
   }
}

export function getUserInfo(){
   return get("userInfo",-1);
}

export  function setUserInfo(value){
   set("userInfo",value);
 }

export function getAccessToken(ext){
   return get(accessTokenKey,ext);
}

export function getRefreshToken(ext){
   return get(refreshTokenKey,ext);
}
 
export function setToken(value){
   set(accessTokenKey,value.accessToken);
   set(refreshTokenKey,value.refreshToken);
}