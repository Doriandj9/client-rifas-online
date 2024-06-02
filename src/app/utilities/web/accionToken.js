
const getAccessTokenFromCookie =  () => {
    if(localStorage.getItem('accessToken')){

      return localStorage.accessToken;
    }
    
    return null;
}

const getKeyTokenFromCookie =  () => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'keyToken') {
        return value;
      }
    }
    return null;
}

const deleteTokens = (name) => {
  if(name === 'accessToken'){
    localStorage.removeItem('accessToken');
    return;
  }
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
export {getAccessTokenFromCookie,getKeyTokenFromCookie, deleteTokens};