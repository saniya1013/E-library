import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { BookDetails } from "./pages/BookDetails";
import { MyLibrary } from "./pages/MyLibrary";
import { ReadingView } from "./pages/ReadingView";
import { Profile } from "./pages/Profile";
import { useState, useEffect } from "react";
import { Book } from "./types";
import { SEED_BOOKS } from "./data";
import { AuthProvider, useAuth } from "./AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "./firebase";

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

function AppContent() {
  const { isAuthReady } = useAuth();
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      } else {
        setHasApiKey(true); // Assume true if not in AI Studio environment
      }
    };
    checkApiKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true); // Assume success after opening dialog
    }
  };

  if (!isAuthReady || hasApiKey === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="animate-pulse text-2xl font-serif italic text-accent">Lumina Lib...</div>
      </div>
    );
  }

  if (hasApiKey === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper p-6">
        <div className="max-w-md w-full p-10 rounded-3xl bg-white border border-black/5 shadow-xl text-center flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-serif font-medium">AI Access Required</h2>
            <p className="text-ink/60">To provide personalized book recommendations and insights, please select your Gemini API key.</p>
          </div>
          <button 
            onClick={handleSelectKey}
            className="w-full py-4 rounded-full bg-accent text-paper font-semibold hover:bg-accent-dark transition-colors"
          >
            Select Gemini API Key
          </button>
          <p className="text-xs text-ink/40">
            You can get a key at <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline">ai.google.dev</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/read/:id" element={<ReadingView />} />
          <Route path="/library" element={<MyLibrary />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
