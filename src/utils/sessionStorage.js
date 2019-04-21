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

 export function removeUserInfo(){
   sessionStorage.removeItem("userInfo");
 }

 export function getToken(){
    return  getSessionStorage("accessToken");
 }

 export function getRefreshToken(){
   return  getSessionStorage("refreshToken");
}
 
 export  function setToken(value){
       setSessionStorage("accessToken",value.accessToken);
       setSessionStorage("refreshToken",value.refreshToken);
  }

