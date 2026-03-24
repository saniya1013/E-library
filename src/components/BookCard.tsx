import { Book } from "../types";
import { Star, Heart } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: Book;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export function BookCard({ book, isFavorite, onToggleFavorite }: BookCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col gap-4 card-hover"
    >
      <Link to={`/book/${book.id}`} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
        <img 
          src={book.coverUrl} 
          alt={book.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite?.(book.id);
          }}
          className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-white transition-colors"
        >
          <Heart 
            size={18} 
            className={isFavorite ? "fill-red-500 text-red-500" : "text-ink"} 
          />
        </button>
      </Link>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/50 font-semibold">
          {book.genre[0]}
          <span className="w-1 h-1 rounded-full bg-ink/20" />
          {book.publishedYear}
        </div>
        <Link to={`/book/${book.id}`} className="text-xl font-serif font-semibold hover:text-accent transition-colors leading-tight">
          {book.title}
        </Link>
        <div className="text-sm text-ink/60">{book.author}</div>
        
        <div className="flex items-center gap-1 mt-1">
          <Star size={14} className="fill-accent text-accent" />
          <span className="text-xs font-semibold">{book.rating}</span>
        </div>
      </div>
    </motion.div>
  );
}
