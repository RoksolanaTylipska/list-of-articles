import React, { createContext, useState } from 'react';

export const LogInContext = createContext();

const LogInContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState([]);
  const [loginButton, setLoginButton] = useState(localStorage.getItem('loginStatus') || "open");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [articles, setArticles] = useState([])


  return (
    <LogInContext.Provider value={{ 
      loginButton, 
      setLoginButton, 
      email, 
      setEmail, 
      password, 
      setPassword, 
      user, 
      setUser, 
      userId, 
      setUserId,
      articles,
      setArticles
    }}>
      {children}
    </LogInContext.Provider>
  );
};

export default LogInContextProvider;