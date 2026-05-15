import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification as firebaseSendEmailVerification
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc
} from 'firebase/firestore';

// Firebase configuration - Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDklQSpeI5TzVTAMKrT-7ZZmQ8UqWMP2J0",
  authDomain: "vrinda-0406.firebaseapp.com",
  projectId: "vrinda-0406",
  storageBucket: "vrinda-0406.firebasestorage.app",
  messagingSenderId: "983610667209",
  appId: "1:983610667209:web:035b7327981c7fec561d18",
  measurementId: "G-G805QTHQ7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication functions
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const registerUser = async (email, password, name = '') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile with display name
    if (name) {
      await updateProfile(user, { displayName: name });
    }
    
    // Save user data to Firestore
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: name || user.email.split('@')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return { user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Firestore functions
export const getUserData = async (uid) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return { data: userDoc.data(), error: null };
    } else {
      return { data: null, error: 'User data not found' };
    }
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const updateUserData = async (uid, data) => {
  try {
    const userDocRef = doc(db, 'users', uid);

    await setDoc(
      userDocRef,
      {
        ...data,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );

    return { error: null };
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

// Email verification function
export const sendVerificationEmail = async () => {
  try {
    const user = auth.currentUser;

    if (!user) {
      return { error: 'No user is currently signed in' };
    }

    await firebaseSendEmailVerification(user);

    return { error: null };

  } catch (error) {
    console.error('Error sending email verification:', error);

    return { error: error.message };
  }
};

export { auth, db };
export default app;
