import { createContext, useState, useEffect } from 'react';
import api from '../api/apiClient';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function login(data) {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  }

  async function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return logout();

    try {
      const response = await api.post('/auth/refresh', { refreshToken });
      localStorage.setItem('accessToken', response.data.accessToken);
    } catch (err) {
      logout();
    }
  }

  const value = {
    user,
    login,
    logout,
    refreshToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
