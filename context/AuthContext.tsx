import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    const storedUser = await AsyncStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.register(name, email, password);
  
    if (!res.data.success) throw new Error(res.data.message);
  
    setToken(res.data.token);
    setUser(res.data.user);
  
    await AsyncStorage.setItem('token', res.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
  
    return res.data.user; // ← return user for immediate use
  };  

  const login = async (email: string, password: string) => {
    const res = await api.login(email, password);

    if (!res.data.success) throw new Error(res.data.message);

    setToken(res.data.token);
    setUser(res.data.user);

    await AsyncStorage.setItem('token', res.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(res.data.user));

    return res.data.user;
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
