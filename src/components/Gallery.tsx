import { motion } from "motion/react";
import { Play } from "lucide-react";

const galleryItems = [
  { id: 1, type: 'video', src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop', span: 'col-span-1 row-span-2' },
  { id: 2, type: 'image', src: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=600&auto=format&fit=crop', span: 'col-span-1' },
  { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=600&auto=format&fit=crop', span: 'col-span-1' },
  { id: 4, type: 'video', src: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop', span: 'col-span-1 row-span-2' },
  { id: 5, type: 'image', src: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=600&auto=format&fit=crop', span: 'col-span-2' },
];

export default function Gallery() {
  return (
    <section className="py-24 bg-bakery-beige">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-bakery-gold font-medium uppercase tracking-[0.2em] text-sm block mb-4"
          >
            #CakeMeAwayIndore
          </motion.span>
          <h2 className="font-serif text-4xl md:text-6xl mb-4">Instagram Vibes</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl ${item.span}`}
            >
              <img 
                src={item.src} 
                alt="Instagram"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-bakery-chocolate/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {item.type === 'video' ? (
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                    <Play className="fill-white text-white w-6 h-6 ml-1" />
                  </div>
                ) : (
                  <span className="text-white text-sm font-medium tracking-widest uppercase">View Post</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
