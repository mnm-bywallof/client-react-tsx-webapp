import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider, registerWithEmail, loginWithEmail } from '../firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User, UserCredential } from 'firebase/auth';

interface AuthContextType {
    user: User | null;
    loginWithGoogle: () => void;
    loginWithEmail: (email: string, password: string) => Promise<UserCredential>;
    registerWithEmail: (email: string, password: string) => Promise<UserCredential>;
    logout: () => void;
  }
  

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithEmail = async (email: string, password: string): Promise<UserCredential> => {
    return await loginWithEmail(email, password); 
  };
  
  const registerWithEmail = async (email: string, password: string): Promise<UserCredential> => {
    return await registerWithEmail(email, password); 
  };
  

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, loginWithEmail, registerWithEmail, logout }}>
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
