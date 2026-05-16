import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  onAuthChange,
  loginUser as firebaseLogin,
  registerUser as firebaseRegister,
  signOut as firebaseSignOut,
  getUserData,
  sendVerificationEmail,
  reloadUser,
  updateUserData
} from '../firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Derived auth state
  const isAuthenticated = !!user;

  const fetchUserData = async (firebaseUser) => {
    if (!firebaseUser) return null;

    const { data: userData } = await getUserData(firebaseUser.uid);

    if (userData) {
      return {
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        emailVerified: firebaseUser.emailVerified,
        displayName:
          userData.displayName ||
          firebaseUser.displayName ||
          firebaseUser.email.split('@')[0],
        ...userData
      };
    } else {
      return {
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        emailVerified: firebaseUser.emailVerified,
        displayName:
          firebaseUser.displayName ||
          firebaseUser.email.split('@')[0]
      };
    }
  };

  useEffect(() => {
  const unsubscribe = onAuthChange(async (firebaseUser) => {

    if (firebaseUser) {
      const userData = await fetchUserData(firebaseUser);
      setUser(userData);
    } else {
      setUser(null);
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

  // Set basic user state immediately for fast redirect
  setUser({
    email: user.email,
    uid: user.uid,
    emailVerified: user.emailVerified,
    displayName: user.displayName || user.email.split('@')[0]
  });

  // Set loading to false to enable redirect
  setLoading(false);

  // Fetch Firestore data in background
  fetchUserData(user).then(userData => {
    setUser(userData);
  }).catch(err => {
    console.error('Error fetching user data:', err);
  });

  return user;
};

  const register = async (email, password, name = '') => {
    const { user, error } = await firebaseRegister(email, password, name);

    if (error) {
      throw new Error(error);
    }

    // Set basic user state immediately for fast redirect
    setUser({
      email: user.email,
      uid: user.uid,
      emailVerified: user.emailVerified,
      displayName: name || user.displayName || user.email.split('@')[0]
    });

    // Set loading to false to enable redirect
    setLoading(false);

    // Fetch Firestore data in background
    fetchUserData(user).then(userData => {
      setUser(userData);
    }).catch(err => {
      console.error('Error fetching user data:', err);
    });

    return user;
  };

  const logout = async () => {
    try {
      setLoading(true);

      const { error } = await firebaseSignOut();

      if (error) {
        throw new Error(error);
      }

      setUser(null);

    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = async () => {
    if (user) {
      
    }
  };

  const checkEmailVerification = async () => {
    try {
      const { user: firebaseUser, error } = await reloadUser();

      if (error) {
        throw new Error(error);
      }

      if (firebaseUser) {
        // Save emailVerified status to Firestore
        await updateUserData(firebaseUser.uid, {
          emailVerified: firebaseUser.emailVerified
        });

        const userData = await fetchUserData(firebaseUser);
        setUser(userData);
      }

      return firebaseUser?.emailVerified || false;
    } catch (error) {
      console.error('Error checking email verification:', error);
      throw error;
    }
  };

  const sendVerificationEmailToUser = async () => {
    try {
      const { error } = await sendVerificationEmail();

      if (error) {
        throw new Error(error);
      }

      return { error: null };
    } catch (error) {
      console.error('Error sending verification email:', error);
      return { error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        refreshUserData,
        checkEmailVerification,
        sendVerificationEmailToUser
      }}
    >
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