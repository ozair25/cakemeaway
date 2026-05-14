import { motion } from "motion/react";
import SectionHeading from "./ui/SectionHeading";

export default function BrandStory() {
  return (
    <section id="story" className="py-32 bg-bakery-cream overflow-hidden border-t border-bakery-chocolate/10">
      <div className="container mx-auto px-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 rounded-t-[200px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(45,27,20,0.1)] aspect-[4/5]"
            >
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop" 
                alt="Bakery Story"
                className="w-full h-full object-cover transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-bakery-chocolate/10 mix-blend-overlay" />
            </motion.div>
            
            {/* Floating accent label */}
            <motion.div
              initial={{ opacity: 0, rotate: 90 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="absolute -right-16 top-1/2 -translate-y-1/2 origin-center whitespace-nowrap hidden lg:block"
            >
              <span className="text-[100px] font-serif text-bakery-chocolate/5 leading-none select-none">TRADITION</span>
            </motion.div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-bakery-chocolate/5 rounded-full -z-0" />
          </div>

          <div className="w-full lg:w-1/2">
            <SectionHeading 
              subtitle="The Art of Baking" 
              title="Crafting Sweet Memories" 
              align="left"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1 }}
              className="space-y-8 text-bakery-chocolate/80 leading-relaxed font-light text-xl"
            >
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-bakery-gold first-letter:leading-none">
                What started as a small home kitchen in the heart of Indore has blossomed into "Cake Me Away", a destination for those who believe that every celebration deserves a masterpiece.
              </p>
              <p>
                Our philosophy is simple: we blend the finest global ingredients with local heart. From Belgian Callebaut chocolate to farm-fresh fruits, every ingredient is chosen with obsessive care.
              </p>
              <div className="grid grid-cols-2 gap-12 pt-10 border-t border-bakery-chocolate/10">
                <div>
                  <h4 className="font-serif text-5xl text-bakery-gold mb-2 leading-none">10k<span className="text-xl">+</span></h4>
                  <p className="text-[9px] uppercase tracking-[0.4em] font-black opacity-40">Cakes Crafted</p>
                </div>
                <div>
                  <h4 className="font-serif text-5xl text-bakery-gold mb-2 leading-none">100<span className="text-xl">%</span></h4>
                  <p className="text-[9px] uppercase tracking-[0.4em] font-black opacity-40">Handmade Art</p>
                </div>
              </div>
              <div className="pt-10 flex items-center gap-8">
                <div className="w-20 h-20 rounded-full overflow-hidden border border-bakery-chocolate/10 p-1.5">
                  <img src="https://images.unsplash.com/photo-1583394838336-acd97773dbf9?q=80&w=200&auto=format&fit=crop" alt="Head Chef" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <p className="font-serif text-2xl italic mb-1">Chef Ananya Sharma</p>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-bakery-gold font-black">Founder & Artistic Director</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
