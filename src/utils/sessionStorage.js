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
   sessionStorage.remove("userInfo")
 }

 export function getToken(){
    return  getSessionStorage("token");
 }
 
 export  function setToken(value){
       setSessionStorage("token",value);
  }
