import { SEED_BOOKS } from "../data";
import { BookCard } from "../components/BookCard";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useAuth } from "../AuthContext";

export function MyLibrary() {
  const { profile, toggleFavorite } = useAuth();
  const favorites = profile?.favorites || [];
  const favoriteBooks = SEED_BOOKS.filter(b => favorites.includes(b.id));

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-serif font-medium">My Library</h1>
          <p className="text-lg text-ink/60">Your personal collection of saved stories.</p>
        </div>

        {favoriteBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {favoriteBooks.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                isFavorite={true} 
                onToggleFavorite={toggleFavorite} 
              />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center flex flex-col items-center gap-6 bg-accent/5 rounded-3xl border border-dashed border-accent/20">
            <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center">
              <BookOpen size={40} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-3xl font-serif font-medium">Your library is empty</div>
              <p className="text-ink/40 max-w-xs mx-auto">Start exploring the catalog and save your favorite books to see them here.</p>
            </div>
            <Link to="/catalog" className="px-8 py-4 rounded-full bg-ink text-paper font-semibold hover:bg-accent transition-colors">
              Browse Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
