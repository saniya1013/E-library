import { motion } from "motion/react";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-accent font-semibold tracking-widest uppercase text-xs"
            >
              <Sparkles size={14} />
              AI-Powered Discovery
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl md:text-8xl font-serif font-light leading-[0.9] tracking-tight"
            >
              Your Next <br />
              <span className="italic font-medium">Great Story</span> <br />
              Starts Here.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-ink/60 max-w-md leading-relaxed"
            >
              Explore a curated collection of thousands of books. Let our AI librarian find the perfect match for your mood, interests, and reading style.
            </motion.p>

            <motion.form 
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-xl group"
            >
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-ink/40 group-focus-within:text-accent transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search by title, author, or genre..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-16 pl-16 pr-6 rounded-full border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-lg"
              />
            </motion.form>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl hidden lg:block"
          >
            <img 
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
              alt="Library"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 text-paper">
              <div className="text-xs uppercase tracking-widest font-semibold mb-2 opacity-80">Featured Collection</div>
              <div className="text-3xl font-serif font-medium leading-tight">The Art of Modern Storytelling</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-accent/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
    </section>
  );
}
