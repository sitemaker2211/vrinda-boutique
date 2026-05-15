import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthChange, loginUser as firebaseLogin, registerUser as firebaseRegister, signOut as firebaseSignOut, getUserData } from '../firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (firebaseUser) => {
    if (!firebaseUser) return null;
    
    const { data: userData, error } = await getUserData(firebaseUser.uid);
    
    if (userData) {
      return {
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        displayName: userData.displayName || firebaseUser.displayName || firebaseUser.email.split('@')[0],
        ...userData
      };
    } else {
      return {
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0]
      };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await fetchUserData(firebaseUser);
        setUser(userData);
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
    setLoading(true);

    const { user, error } = await firebaseLogin(email, password);

    if (error) {
      setLoading(false);
      throw new Error(error);
    }

    setIsAuthenticated(true);
    setUser(user);
    setLoading(false);

    return user;
  };

  const register = async (email, password, name = '') => {
    const { user, error } = await firebaseRegister(email, password, name);
    if (error) {
      throw new Error(error);
    }
    return user;
  };

  const logout = async () => {
    try {
      setLoading(true);

      const { error } = await firebaseSignOut();

      if (error) {
        throw new Error(error);
      }

      // Reset auth state
      setUser(null);
      setIsAuthenticated(false);

    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = async () => {
    if (user) {
      const userData = await fetchUserData(user);
      setUser(userData);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, refreshUserData }}>
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
