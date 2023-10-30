import React, { useState } from 'react';

import App from '../../App';

const AuthContext=React.createContext()



export const AuthProvider = () => {
  const[isLoggedIn, setIsLoggedIn]=useState(false)
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = (newToken) => {
    setIsLoggedIn(true)
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setIsLoggedIn(false)
    setToken(null);
    localStorage.removeItem('token');
  };
  // setTimeout(()=>{
  //   setIsLoggedIn(false)
  // },30000)

  return <AuthContext.Provider value={{isLoggedIn, login, logout, token}}>
    
    <App/>
  </AuthContext.Provider>;
};


export const useAuth=()=>React.useContext(AuthContext)