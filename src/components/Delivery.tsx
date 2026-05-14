import { motion } from "motion/react";
import { Timer, Truck, ShieldCheck, MapPin } from "lucide-react";
import Button from "./ui/Button";

export default function Delivery() {
  const features = [
    { icon: Timer, title: "Same Day Delivery", desc: "Freshly baked and delivered within 4 hours." },
    { icon: Truck, title: "Special Handling", desc: "Our cakes travel in temperature-controlled vans." },
    { icon: ShieldCheck, title: "Hygiene Priority", desc: "100% contactless preparation and packaging." },
    { icon: MapPin, title: "Free Within City", desc: "Complimentary delivery in 5km radius of store." }
  ];

  return (
    <section className="py-24 bg-bakery-cream overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-bakery-gold font-medium uppercase tracking-[0.2em] text-sm block mb-4"
            >
              Order & Collect
            </motion.span>
            <h2 className="font-serif text-4xl md:text-6xl mb-8">From Our Oven to Your Door</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 mb-12">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-bakery-gold/10">
                    <f.icon className="w-6 h-6 text-bakery-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{f.title}</h4>
                    <p className="text-sm text-bakery-chocolate/60 leading-relaxed font-light">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 p-6 bg-white/50 backdrop-blur-md rounded-3xl border border-white">
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest font-bold text-bakery-gold mb-2">Partnered With</p>
                <div className="flex items-center gap-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                  <span className="font-bold text-xl">Swiggy</span>
                  <span className="font-bold text-xl">Zomato</span>
                </div>
              </div>
              <Button className="shrink-0">Track My Order</Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative aspect-square md:aspect-video lg:aspect-square"
            >
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop" 
                alt="Delivery"
                className="w-full h-full object-cover rounded-[100px] shadow-2xl"
              />
              <div className="absolute inset-0 border-[20px] border-bakery-cream -m-8 rounded-[110px]" />
            </motion.div>
            
            {/* Delivery Stats Popup */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-bakery-chocolate p-6 rounded-3xl text-white shadow-2xl z-20"
            >
              <p className="text-xs uppercase tracking-widest text-[#B8D8BA] font-bold mb-1">Live Status</p>
              <p className="text-2xl font-serif">400+ Orders Today</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-medium opacity-70">On-time Delivery Guaranteed</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
