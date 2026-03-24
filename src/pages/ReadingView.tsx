import { useParams, Link } from "react-router-dom";
import { SEED_BOOKS } from "../data";
import { useState, useEffect } from "react";
import { ChevronLeft, Settings, Type, Moon, Sun, Bookmark } from "lucide-react";
import { motion } from "motion/react";

export function ReadingView() {
  const { id } = useParams();
  const book = SEED_BOOKS.find(b => b.id === id);
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!book) return <div className="pt-40 text-center">Book not found.</div>;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-zinc-900 text-zinc-300" : "bg-paper text-ink"}`}>
      {/* Reader Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 border-b transition-colors ${darkMode ? "bg-zinc-900/80 border-white/10" : "bg-paper/80 border-black/5"} backdrop-blur-md`}>
        <div className="flex items-center gap-4">
          <Link to={`/book/${book.id}`} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex flex-col">
            <div className="text-sm font-serif font-semibold leading-none">{book.title}</div>
            <div className="text-[10px] uppercase tracking-widest opacity-50">Chapter 1: The Beginning</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <Type size={18} />
          </button>
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <Bookmark size={18} />
          </button>
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <Settings size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto pt-32 pb-40 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: `${fontSize}px` }}
          className="flex flex-col gap-8 leading-[1.8] font-serif"
        >
          <h1 className="text-4xl mb-8">Chapter One</h1>
          <p>
            The library was silent, save for the faint hum of the AI servers cooling in the basement. It wasn't a traditional library of dust and paper, though it held those too. It was a library of light, of data, of every story ever told and every story yet to be written.
          </p>
          <p>
            Elias walked through the rows of glowing glass shelves. Each one pulsed with a soft, rhythmic light, like a heartbeat. When he touched a shelf, a holographic display would bloom into existence, showing the covers of books that matched his current mood.
          </p>
          <p>
            "Looking for something specific today, Elias?" a voice echoed. It was Lumina, the AI librarian. Her voice was warm, like a crackling fire on a winter evening.
          </p>
          <p>
            "I don't know, Lumina," Elias replied, his fingers tracing the edge of a shelf. "Something that feels like... a new beginning."
          </p>
          <p>
            The shelves around him shifted. The blue light turned to a soft, golden amber. Three books slid forward, their covers shimmering.
          </p>
          <p>
            "I think you'll find these interesting," Lumina said. "They are stories of people who lost everything and found something better in the ruins."
          </p>
          <p>
            This was the magic of Lumina Lib. It didn't just store books; it understood them. It understood the readers. It was a bridge between the human heart and the infinite sea of stories.
          </p>
          {/* Add more filler text to enable scrolling */}
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          ))}
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className={`fixed bottom-0 left-0 right-0 h-10 flex items-center justify-center text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 transition-colors ${darkMode ? "bg-zinc-900" : "bg-paper"}`}>
        {Math.round(progress)}% Completed
      </div>
    </div>
  );
}
