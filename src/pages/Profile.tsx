import { User as UserIcon, Settings, Shield, Bell, CreditCard, LogOut, Heart, BookOpen, Clock, LogIn, Check } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../AuthContext";
import { SEED_BOOKS } from "../data";

export function Profile() {
  const { user, profile, logout, signIn, updatePreferences } = useAuth();
  const allGenres = Array.from(new Set(SEED_BOOKS.flatMap(b => b.genre)));

  if (!user) {
    return (
      <div className="pt-40 pb-20 px-6 max-w-md mx-auto w-full text-center flex flex-col gap-8">
        <div className="w-24 h-24 bg-accent/5 text-accent rounded-full flex items-center justify-center mx-auto">
          <UserIcon size={48} />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-serif font-medium">Welcome Back</h1>
          <p className="text-ink/60">Please sign in to view your profile and manage your library.</p>
        </div>
        <button 
          onClick={signIn}
          className="px-8 py-4 rounded-full bg-ink text-paper font-semibold hover:bg-accent transition-colors flex items-center justify-center gap-2"
        >
          <LogIn size={20} />
          Sign In with Google
        </button>
      </div>
    );
  }

  const stats = [
    { label: "Books Read", value: profile?.readingHistory.length || "0", icon: BookOpen },
    { label: "Favorites", value: profile?.favorites.length || "0", icon: Heart },
    { label: "Hours Read", value: "156", icon: Clock },
  ];

  const toggleGenre = (genre: string) => {
    const current = profile?.preferences || [];
    const updated = current.includes(genre)
      ? current.filter(g => g !== genre)
      : [...current, genre];
    updatePreferences(updated);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row items-center gap-8 pb-12 border-b border-black/5">
          <div className="w-32 h-32 rounded-full bg-accent/10 border-4 border-white shadow-xl flex items-center justify-center text-accent overflow-hidden">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
            ) : (
              <UserIcon size={64} />
            )}
          </div>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-4xl font-serif font-medium">{user.displayName || "Reader"}</h1>
            <p className="text-ink/40">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <button className="px-4 py-2 rounded-full bg-ink text-paper text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors">
                Edit Profile
              </button>
              <button className="p-2 rounded-full border border-black/10 hover:bg-black/5 transition-colors">
                <Settings size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white border border-black/5 shadow-sm flex flex-col gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/5 text-accent flex items-center justify-center">
                <stat.icon size={20} />
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-serif font-medium">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest font-bold text-ink/30">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-serif font-semibold">Reading Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {allGenres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${
                      profile?.preferences.includes(genre)
                      ? "bg-accent text-white"
                      : "bg-paper text-ink/60 hover:bg-black/5"
                    }`}
                  >
                    {genre}
                    {profile?.preferences.includes(genre) && <Check size={12} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-serif font-semibold">Account Settings</h3>
              <div className="flex flex-col gap-1">
                {[
                  { label: "Security", icon: Shield },
                  { label: "Notifications", icon: Bell },
                  { label: "Billing", icon: CreditCard },
                  { label: "Sign Out", icon: LogOut, danger: true },
                ].map((item) => (
                  <button 
                    key={item.label}
                    onClick={item.label === "Sign Out" ? logout : undefined}
                    className={`flex items-center justify-between p-4 rounded-xl hover:bg-black/5 transition-colors ${item.danger ? "text-red-500" : "text-ink/60"}`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-serif font-semibold">Recent Activity</h3>
            <div className="flex flex-col gap-4">
              {profile?.searchHistory && profile.searchHistory.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-widest font-bold text-ink/30 mb-3">Recent Searches</div>
                  <div className="flex flex-wrap gap-2">
                    {profile.searchHistory.map((query, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-paper text-xs text-ink/60 italic">"{query}"</span>
                    ))}
                  </div>
                </div>
              )}
              
              {profile?.readingHistory && profile.readingHistory.length > 0 ? (
                profile.readingHistory.map((bookId, i) => {
                  const book = SEED_BOOKS.find(b => b.id === bookId);
                  if (!book) return null;
                  return (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/5">
                      <div className="w-12 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-semibold">Read "{book.title}"</div>
                        <div className="text-xs text-ink/40">Recently</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 rounded-2xl bg-paper/30 border border-dashed border-black/10 text-center text-ink/40 italic text-sm">
                  No recent reading activity.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
