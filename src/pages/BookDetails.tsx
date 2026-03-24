import { useParams, Link } from "react-router-dom";
import { SEED_BOOKS } from "../data";
import { useEffect, useState } from "react";
import { getBookInsights } from "../lib/gemini";
import { Star, Clock, BookOpen, Share2, Heart, Sparkles, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../AuthContext";

export function BookDetails() {
  const { profile, toggleFavorite, recordReading } = useAuth();
  const favorites = profile?.favorites || [];
  const { id } = useParams();
  const book = SEED_BOOKS.find(b => b.id === id);
  const isFavorite = favorites.includes(id || "");
  const [insight, setInsight] = useState("");
  const [loadingInsight, setLoadingInsight] = useState(false);

  useEffect(() => {
    if (book) {
      setLoadingInsight(true);
      getBookInsights(book).then(res => {
        setInsight(res);
        setLoadingInsight(false);
      });
    }
  }, [book]);

  if (!book) return <div className="pt-40 text-center">Book not found.</div>;

  const handleReadNow = () => {
    if (book) {
      recordReading(book.id);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
      <Link to="/catalog" className="flex items-center gap-2 text-sm font-semibold text-ink/40 hover:text-accent transition-colors mb-12 group">
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Catalog
      </Link>

      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
        >
          <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
        </motion.div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest">
                <Star size={12} className="fill-accent" />
                {book.rating}
              </div>
              <div className="text-xs uppercase tracking-widest font-semibold text-ink/40">
                {book.genre.join(" • ")}
              </div>
            </div>
            <h1 className="text-7xl font-serif font-medium leading-tight">{book.title}</h1>
            <div className="text-2xl text-ink/60 italic">by {book.author}</div>
          </div>

          <div className="grid grid-cols-3 gap-8 py-8 border-y border-black/5">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-ink/40 text-xs font-semibold uppercase tracking-widest">
                <BookOpen size={14} />
                Pages
              </div>
              <div className="text-xl font-medium">{book.pages}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-ink/40 text-xs font-semibold uppercase tracking-widest">
                <Clock size={14} />
                Year
              </div>
              <div className="text-xl font-medium">{book.publishedYear}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-ink/40 text-xs font-semibold uppercase tracking-widest">
                <Share2 size={14} />
                Format
              </div>
              <div className="text-xl font-medium">Digital</div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-serif font-semibold">Synopsis</h3>
            <p className="text-lg text-ink/70 leading-relaxed">{book.description}</p>
          </div>

          <div className="p-8 rounded-2xl bg-ink text-paper flex flex-col gap-6 relative overflow-hidden">
            <div className="flex items-center gap-2 text-accent font-semibold tracking-widest uppercase text-xs">
              <Sparkles size={14} />
              AI Librarian Insight
            </div>
            <div className="text-lg italic leading-relaxed opacity-90">
              {loadingInsight ? (
                <div className="animate-pulse flex flex-col gap-2">
                  <div className="h-4 w-full bg-paper/10 rounded" />
                  <div className="h-4 w-5/6 bg-paper/10 rounded" />
                  <div className="h-4 w-4/6 bg-paper/10 rounded" />
                </div>
              ) : (
                <ReactMarkdown>{insight}</ReactMarkdown>
              )}
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Link 
              to={`/read/${book.id}`}
              onClick={handleReadNow}
              className="flex-grow h-16 rounded-full bg-accent text-paper font-semibold hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20 flex items-center justify-center"
            >
              Start Reading
            </Link>
            <button 
              onClick={() => toggleFavorite(book.id)}
              className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              <Heart size={24} className={isFavorite ? "fill-red-500 text-red-500" : "text-ink"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
