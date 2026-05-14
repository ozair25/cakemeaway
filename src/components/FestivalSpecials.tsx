import { motion } from "motion/react";
import { Sparkles, Gift } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";

const festivalItems = [
  {
    id: 1,
    name: "Summer Mango Delights",
    desc: "Experience the king of fruits in 5 luxurious dessert forms.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d2ad7?q=80&w=800&auto=format&fit=crop",
    color: "bg-[#FFD700]"
  },
  {
    id: 2,
    name: "Ramadan Iftar Box",
    desc: "A curated collection of sweet & savory tea-time essentials.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop",
    color: "bg-bakery-gold"
  }
];

export default function FestivalSpecials() {
  return (
    <section className="py-24 bg-bakery-champagne relative overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading 
          subtitle="Seasonal Magic" 
          title="Festival Specials" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {festivalItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl flex flex-col justify-end p-8 md:p-12"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bakery-chocolate via-bakery-chocolate/20 to-transparent opacity-80" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center`}>
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Limited Edition</span>
                </div>
                <h3 className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">
                  {item.name}
                </h3>
                <p className="text-white/70 text-lg mb-8 max-w-md font-light">
                  {item.desc}
                </p>
                <Button variant="secondary" className="w-full md:w-auto">
                  <Gift className="w-4 h-4" /> Discover Collection
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
