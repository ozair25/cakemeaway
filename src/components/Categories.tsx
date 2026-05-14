import { motion } from "motion/react";
import SectionHeading from "./ui/SectionHeading";

const categories = [
  {
    id: 1,
    name: "Celebration Cakes",
    description: "Multi-layered masterpieces for your biggest moments.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1080&auto=format&fit=crop",
    size: "large"
  },
  {
    id: 2,
    name: "Customized Cakes",
    description: "Your imagination, baked to perfection.",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1080&auto=format&fit=crop",
    size: "small"
  },
  {
    id: 3,
    name: "Artisanal Pastries",
    description: "Delicate layers and luxurious fillings.",
    image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=1080&auto=format&fit=crop",
    size: "small"
  },
  {
    id: 4,
    name: "Tea-Time Snacks",
    description: "Perfect companions for your evening brew.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1080&auto=format&fit=crop",
    size: "small"
  },
  {
    id: 5,
    name: "Dessert Boxes",
    description: "Curated collections for sweet gifting.",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1080&auto=format&fit=crop",
    size: "large"
  },
  {
    id: 6,
    name: "Breads & Buns",
    description: "Freshly baked daily with natural ingredients.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1080&auto=format&fit=crop",
    size: "small"
  }
];

export default function Categories() {
  return (
    <section id="categories" className="py-32 bg-bakery-beige relative">
      <div className="container mx-auto px-10">
        <SectionHeading 
          subtitle="Our Collection" 
          title="Signature Categories" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`group relative overflow-hidden h-[500px] cursor-pointer ${
                cat.size === 'large' ? 'lg:col-span-2' : ''
              }`}
            >
              <motion.img 
                src={cat.image} 
                alt={cat.name}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-bakery-chocolate/40 group-hover:bg-bakery-chocolate/10 transition-all duration-500" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-3 font-bold opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {cat.id.toString().padStart(2, '0')} — Discovery
                </span>
                <h3 className="font-serif text-4xl text-white mb-4 leading-none tracking-tighter transition-transform duration-500 group-hover:-translate-y-2">{cat.name}</h3>
                <p className="text-white/60 text-sm max-w-xs font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                  {cat.description}
                </p>
                <motion.div 
                  className="w-20 h-[1px] bg-bakery-gold mt-8"
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  transition={{ delay: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
