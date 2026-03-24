import { motion } from "motion/react";
import { BookOpen, Users, Sparkles, ShieldCheck, Globe, Library } from "lucide-react";

export function About() {
  const values = [
    {
      icon: BookOpen,
      title: "Curation",
      description: "We hand-pick every title in our collection to ensure a high-quality reading experience."
    },
    {
      icon: Users,
      title: "Community",
      description: "Lumina Lib is a place for readers to connect and share their love for literature."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Using AI to help you find your next favorite book through personalized recommendations."
    },
    {
      icon: ShieldCheck,
      title: "Privacy",
      description: "Your reading habits are personal. We protect your data with state-of-the-art security."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making literature accessible to everyone, everywhere, on any device."
    },
    {
      icon: Library,
      title: "Preservation",
      description: "Digitizing and preserving rare and classic works for future generations."
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <section className="px-6 max-w-7xl mx-auto w-full mb-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="text-xs uppercase tracking-widest font-bold text-accent">Our Story</div>
            <h1 className="text-7xl font-serif font-light leading-tight">
              Illuminating the world through <span className="italic font-medium">digital literature.</span>
            </h1>
            <p className="text-xl text-ink/60 leading-relaxed">
              Lumina Lib was founded with a simple mission: to create the most beautiful and intuitive digital reading experience in the world. We believe that technology should enhance, not distract from, the magic of a great book.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200" 
              alt="Library" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-32 bg-accent/5">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col gap-4">
            <h2 className="text-4xl font-serif font-medium">Our Core Values</h2>
            <p className="text-ink/40">The principles that guide everything we do at Lumina Lib.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/5 text-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-4">{value.title}</h3>
                <p className="text-ink/60 leading-relaxed text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-32 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 flex flex-col gap-8">
            <h2 className="text-5xl font-serif font-medium leading-tight">
              A new way to <span className="italic">experience</span> books.
            </h2>
            <div className="flex flex-col gap-6 text-ink/60">
              <p>
                Traditional e-readers often feel clinical and disconnected. Lumina Lib brings back the warmth and tactility of physical books through thoughtful design, beautiful typography, and immersive reading views.
              </p>
              <p>
                Whether you're reading a classic novel or a modern technical guide, our platform adapts to give you the perfect environment for deep focus and comprehension.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg translate-y-8">
              <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800" alt="Reading" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800" alt="Books" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
