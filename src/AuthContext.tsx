import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, onSnapshot, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db, googleProvider, handleFirestoreError, OperationType } from "./firebase";
import { UserProfile } from "./types";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
  toggleFavorite: (bookId: string) => Promise<void>;
  updatePreferences: (genres: string[]) => Promise<void>;
  recordSearch: (query: string) => Promise<void>;
  recordReading: (bookId: string) => Promise<void>;
  isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
      
      if (currentUser) {
        // Sync profile
        const userDocRef = doc(db, "users", currentUser.uid);
        
        // Initial check/create
        try {
          const docSnap = await getDoc(userDocRef);
          if (!docSnap.exists()) {
            const newProfile: UserProfile = {
              uid: currentUser.uid,
              displayName: currentUser.displayName || "Reader",
              email: currentUser.email || "",
              photoURL: currentUser.photoURL || undefined,
              favorites: [],
              readingHistory: [],
              preferences: [],
              searchHistory: []
            };
            await setDoc(userDocRef, newProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, `users/${currentUser.uid}`);
        }

        // Real-time listener
        const unsubProfile = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setProfile(doc.data() as UserProfile);
          }
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
        });

        return () => unsubProfile();
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleFavorite = async (bookId: string) => {
    if (!user || !profile) {
      alert("Please sign in to save favorites.");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    const isFav = profile.favorites.includes(bookId);

    try {
      await updateDoc(userDocRef, {
        favorites: isFav ? arrayRemove(bookId) : arrayUnion(bookId)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const updatePreferences = async (genres: string[]) => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    try {
      await updateDoc(userDocRef, { preferences: genres });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const recordSearch = async (query: string) => {
    if (!user || !query.trim()) return;
    const userDocRef = doc(db, "users", user.uid);
    try {
      // Keep only last 10 searches
      const currentHistory = profile?.searchHistory || [];
      const newHistory = [query, ...currentHistory.filter(q => q !== query)].slice(0, 10);
      await updateDoc(userDocRef, { searchHistory: newHistory });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const recordReading = async (bookId: string) => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    try {
      // Keep only last 20 books in history
      const currentHistory = profile?.readingHistory || [];
      const newHistory = [bookId, ...currentHistory.filter(id => id !== bookId)].slice(0, 20);
      await updateDoc(userDocRef, { readingHistory: newHistory });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, logout, toggleFavorite, updatePreferences, recordSearch, recordReading, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
