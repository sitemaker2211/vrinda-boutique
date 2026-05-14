import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthChange, loginUser as firebaseLogin, registerUser as firebaseRegister, signOut as firebaseSignOut } from '../firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0]
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { user, error } = await firebaseLogin(email, password);
    if (error) {
      throw new Error(error);
    }
    return user;
  };

  const register = async (email, password) => {
    const { user, error } = await firebaseRegister(email, password);
    if (error) {
      throw new Error(error);
    }
    return user;
  };

  const logout = async () => {
    const { error } = await firebaseSignOut();
    if (error) {
      throw new Error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
