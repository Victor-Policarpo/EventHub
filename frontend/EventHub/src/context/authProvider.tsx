import React, { useState, useEffect } from 'react';
import { AuthContext } from './authContext';
import { type LoginResponse } from '../utils/types';
import { api } from '../lib/axios';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const recoverSession = async () => {
      try {
        const response = await api.post('/access/refresh');
        const { accessToken: newToken } = response.data;
        
        setAccessToken(newToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      } catch {
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };
    recoverSession();
  }, []);

  const login = (data: LoginResponse) => {
    setAccessToken(data.accessToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
  };

  const logout = async () => {
    try {
      await api.post('/access/logout'); 
    } catch (error) {
      console.error("Erro ao invalidar sessão no servidor", error);
    } finally {
      setAccessToken(null);
      delete api.defaults.headers.common['Authorization'];
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ 
      accessToken, 
      authenticated: !!accessToken, 
      login, 
      logout,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};