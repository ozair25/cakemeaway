import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | { email: string, uid: string } | null;
  loading: boolean;
  isAdmin: boolean;
  login: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | { email: string, uid: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for "Custom Admin" session in localStorage for this specific request
    const customAdmin = localStorage.getItem('cma_admin_session');
    if (customAdmin === 'true') {
      setUser({ email: 'admin@cma', uid: 'admin-hardcoded' });
      setIsAdmin(true);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Check if user exists in Firestore, if not create record
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        let role = 'customer';
        // Auto-promote specific owner email
        if (user.email === 'sayedozair25@gmail.com' || user.email === 'admin@cma') {
          role = 'admin';
        }

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: user.email,
            displayName: user?.displayName || 'Admin',
            role: role,
            createdAt: new Date().toISOString(),
          });
          setIsAdmin(role === 'admin');
        } else {
          const cloudRole = userSnap.data()?.role;
          // Ensure owner is always admin even if role was changed
          if ((user.email === 'sayedozair25@gmail.com' || user.email === 'admin@cma') && cloudRole !== 'admin') {
            await setDoc(userRef, { role: 'admin' }, { merge: true });
            setIsAdmin(true);
          } else {
            setIsAdmin(cloudRole === 'admin');
          }
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    if (email === 'admin@cma' && pass === 'admin@123') {
      localStorage.setItem('cma_admin_session', 'true');
      setUser({ email: 'admin@cma', uid: 'admin-hardcoded' });
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = async () => {
    localStorage.removeItem('cma_admin_session');
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, login, loginWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
