import { SEED_BOOKS } from "../data";
import { BookCard } from "../components/BookCard";
import { useState, useEffect } from "react";
import { Filter, Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../AuthContext";

export function Catalog() {
  const { profile, toggleFavorite, recordSearch } = useAuth();
  const favorites = profile?.favorites || [];
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        recordSearch(searchQuery.trim());
      }
    }, 1500); // Debounce search recording

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const genres = ["All", ...Array.from(new Set(SEED_BOOKS.flatMap(b => b.genre)))];

  const filteredBooks = SEED_BOOKS.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All" || book.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-serif font-medium">The Catalog</h1>
          <p className="text-lg text-ink/60">Explore our full collection of curated books.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl bg-white border border-black/5 shadow-sm">
          <div className="relative flex-grow group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30 group-focus-within:text-accent transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-paper/50 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <Filter size={18} className="text-ink/40 mr-2" />
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedGenre === genre 
                  ? "bg-ink text-paper" 
                  : "bg-paper hover:bg-black/5 text-ink/60"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {filteredBooks.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              isFavorite={favorites.includes(book.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <div className="text-4xl font-serif text-ink/20 italic">No books found</div>
            <p className="text-ink/40">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
