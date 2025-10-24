import { useState } from 'react';
import { login as apiLogin } from '@/lib/api';
import { setToken, removeToken, isAuthenticated as checkAuth } from '@/lib/auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiLogin({ username, password });
      setToken(response.token);
      setIsAuthenticated(true);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur de connexion');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout, loading, error };
};
