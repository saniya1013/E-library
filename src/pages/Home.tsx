import { Hero } from "../components/Hero";
import { BookCard } from "../components/BookCard";
import { RecommendationSection } from "../components/RecommendationSection";
import { SEED_BOOKS } from "../data";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export function Home() {
  const { profile, toggleFavorite, user, signIn } = useAuth();
  const favorites = profile?.favorites || [];
  
  const userPreferences = profile?.preferences.length ? profile.preferences : ["Fantasy", "Science Fiction"];
  const searchHistory = profile?.searchHistory || [];
  const favoriteBooks = SEED_BOOKS.filter(b => favorites.includes(b.id));

  return (
    <div className="flex flex-col gap-20">
      <Hero />
      
      <section className="px-6 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-12">
          <div className="flex flex-col gap-2">
            <div className="text-xs uppercase tracking-widest font-semibold text-accent">New Arrivals</div>
            <h2 className="text-5xl font-serif font-medium">Recently Added</h2>
          </div>
          <Link to="/catalog" className="flex items-center gap-2 text-sm font-semibold hover:text-accent transition-colors group">
            View All Catalog
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {SEED_BOOKS.slice(0, 4).map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              isFavorite={favorites.includes(book.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>

      <RecommendationSection 
        userPreferences={userPreferences} 
        favorites={favoriteBooks} 
        searchHistory={searchHistory}
      />

      <section className="px-6 py-20 bg-accent/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-8">
            <h2 className="text-6xl font-serif font-light leading-tight">
              Join our community of <span className="italic font-medium">passionate readers.</span>
            </h2>
            <p className="text-lg text-ink/60 leading-relaxed">
              Create your personal library, track your reading progress, and get personalized recommendations from our AI librarian.
            </p>
            {!user && (
              <div className="flex items-center gap-4">
                <button 
                  onClick={signIn}
                  className="px-8 py-4 rounded-full bg-ink text-paper font-semibold hover:bg-accent transition-colors"
                >
                  Sign Up Now
                </button>
                <button className="px-8 py-4 rounded-full border border-black/10 font-semibold hover:bg-black/5 transition-colors">
                  Learn More
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl translate-y-12">
              <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800" alt="Book 1" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800" alt="Book 2" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
