import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Setup axios defaults
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

interface User {
  _id: string;
  username: string;
  email: string;
  fullname: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = async () => {
    try {
      await axios.post('/users/logout');
    } catch (e) {
      console.error(e);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
