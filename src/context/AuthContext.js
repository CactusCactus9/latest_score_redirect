import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [islog, setIslog] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIslog(true);
    }
  }, []); // Run once on component mount

  const login = (email, password) => {
    return axios({
      method: 'post',
      url: 'http://localhost:8000/api/token/',
      data: {
        email: email,
        password: password,
      },
    },
    {withCredentials:true,})
      .then((response) => {
        const { access, refresh } = response.data;

        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        setIslog(true);
        return response.data;
      })
      .catch((error) => {
        console.error('Login error:', error);
        throw error;
      });
  };

  const logout = () => {
    setIslog(false); 
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  return (
    <AuthContext.Provider value={{ islog, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
