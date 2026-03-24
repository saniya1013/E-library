import { useEffect, useState } from "react";
import { Book, Recommendation } from "../types";
import { getBookRecommendations } from "../lib/gemini";
import { SEED_BOOKS } from "../data";
import { BookCard } from "./BookCard";
import { Sparkles, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RecommendationSectionProps {
  userPreferences: string[];
  favorites: Book[];
  searchHistory?: string[];
  readingHistory?: string[];
}

export function RecommendationSection({ 
  userPreferences, 
  favorites, 
  searchHistory = [], 
  readingHistory = [] 
}: RecommendationSectionProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const recs = await getBookRecommendations(
        userPreferences, 
        favorites, 
        SEED_BOOKS, 
        searchHistory, 
        readingHistory
      );
      setRecommendations(recs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [userPreferences, favorites, searchHistory, readingHistory]);

  return (
    <section className="py-20 px-6 bg-ink text-paper overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-accent font-semibold tracking-widest uppercase text-xs">
              <Sparkles size={14} />
              AI Librarian
            </div>
            <h2 className="text-4xl font-serif font-medium">Recommended for You</h2>
          </div>
          
          <button 
            onClick={fetchRecommendations}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-paper/20 hover:bg-paper/10 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            <span className="text-sm font-medium">Refresh AI</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <AnimatePresence mode="wait">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col gap-4">
                  <div className="aspect-[3/4] bg-paper/10 rounded-xl" />
                  <div className="h-6 w-3/4 bg-paper/10 rounded" />
                  <div className="h-4 w-1/2 bg-paper/10 rounded" />
                </div>
              ))
            ) : (
              recommendations.map((rec) => {
                const book = SEED_BOOKS.find(b => b.id === rec.bookId);
                if (!book) return null;
                return (
                  <motion.div
                    key={rec.bookId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col gap-6 p-6 rounded-2xl bg-paper/5 border border-paper/10"
                  >
                    <BookCard book={book} />
                    <div className="text-sm text-paper/60 italic leading-relaxed">
                      "{rec.reason}"
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
