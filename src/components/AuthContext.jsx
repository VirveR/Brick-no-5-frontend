import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  //variables
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //functions
  const login = async (name, password) => {
    try {
      const response = await axios.post('/api/users/login', {name, password});
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      console.error('Authentication failed:', err);
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    alert('You are logged out now');
  };

  //effects
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value = {{user, setUser, loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};