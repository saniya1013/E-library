import { Link } from "react-router-dom";
import { Book, Library, User as UserIcon, Search, LogIn } from "lucide-react";
import { useAuth } from "../AuthContext";

export function Navbar() {
  const { user, signIn } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-ink text-paper rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
            <Library size={20} />
          </div>
          <span className="text-2xl font-serif font-semibold tracking-tight">Lumina Lib</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link to="/catalog" className="text-sm font-medium hover:text-accent transition-colors">Catalog</Link>
          <Link to="/library" className="text-sm font-medium hover:text-accent transition-colors">My Library</Link>
          <Link to="/about" className="text-sm font-medium hover:text-accent transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <Search size={20} />
          </button>
          
          {user ? (
            <Link to="/profile" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors overflow-hidden">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={20} />
              )}
            </Link>
          ) : (
            <button 
              onClick={signIn}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-paper text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors"
            >
              <LogIn size={14} />
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
