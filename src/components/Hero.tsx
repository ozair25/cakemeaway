import { motion } from "motion/react";
import { MessageSquare, ArrowRight } from "lucide-react";
import Button from "./ui/Button";
import HeroVideo from "../Flow_202605122347.mp4";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-bakery-chocolate">
      {/* Cinematic Full-Screen Background Video */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={HeroVideo} type="video/mp4" />
        </video>
        
        {/* Cinematic Vignette and Overlays */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-bakery-chocolate/20 to-bakery-chocolate/80 z-10" />
        <div className="absolute inset-0 bg-bakery-chocolate/30 mix-blend-multiply z-10" />
        <div className="absolute inset-0 backdrop-blur-[2px] z-10 opacity-30" />
      </motion.div>

      {/* Editorial Grid Overlay */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.03] z-20">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-white h-full"></div>
        ))}
      </div>

      {/* Central Brand Content */}
      <div className="relative z-30 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-8"
          >
            <span className="inline-block px-8 py-3 border border-bakery-gold/30 rounded-full text-[9px] md:text-[11px] uppercase tracking-[0.6em] font-extrabold text-[#E5C05E] bg-white/10 backdrop-blur-xl shadow-xl">
              Indore's Signature Artistry
            </span>
          </motion.div>
          
          <div className="relative select-none py-12 mb-12 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="relative z-10 flex flex-col items-center"
            >
              <h1 className="font-script text-[15vw] md:text-[10vw] lg:text-[8vw] text-red-600 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] leading-none mb-4 brightness-110">
                Cake me Away
              </h1>
              
              <h2 className="font-condensed text-[5vw] md:text-[3vw] lg:text-[2.5vw] text-[#532E7C] tracking-[0.8em] font-black leading-none translate-y-[-10%] drop-shadow-md">
                BAKERY
              </h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="max-w-4xl relative"
          >
            {/* Clean slogan without any background highlight */}
            <div className="px-6 py-4 relative z-10">
              <p className="text-white font-bold text-xl md:text-3xl lg:text-4xl tracking-tight leading-relaxed italic font-serif drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                Cinematic desserts for life's most <span className="text-red-500 font-black not-italic px-2">unforgettable</span> moments.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12">
              <Button 
                variant="secondary" 
                className="px-16 py-7 text-[12px] w-full sm:w-auto shadow-2xl shadow-bakery-gold/20 rounded-none"
                onClick={() => {
                  const el = document.getElementById('menu');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                OUR COLLECTIONS
              </Button>
              <Button 
                variant="outline" 
                className="px-16 py-7 text-[12px] text-white border-white/30 hover:border-white w-full sm:w-auto shadow-xl bg-white/5 backdrop-blur-md rounded-none"
                onClick={() => {
                  const el = document.getElementById('contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                CUSTOM ORDERS
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative vertical rails */}
      <div className="absolute top-0 left-20 h-full w-[1px] bg-white/[0.03] z-20" />
      <div className="absolute top-0 right-20 h-full w-[1px] bg-white/[0.03] z-20" />
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-30">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-16 bg-gradient-to-b from-[#E5C05E] to-transparent shadow-[0_0_10px_rgba(229,192,94,0.5)]" 
        />
      </div>

      {/* Floating Particles Simulation */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden h-full w-full">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: [null, "-30%", "30%"],
              opacity: [0, 0.3, 0],
              scale: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 8 + Math.random() * 12, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 md:w-3 md:h-3 rounded-full bg-bakery-gold/30 blur-md"
          />
        ))}
      </div>

      {/* Sidebar Elements */}
      <div className="absolute top-1/2 left-12 -translate-y-1/2 hidden lg:flex flex-col gap-12 z-40 opacity-30">
        <div className="w-[1px] h-32 bg-white/50" />
        <span className="rotate-90 text-[9px] uppercase tracking-[0.5em] text-white whitespace-nowrap origin-left">ESTD. 2024</span>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col gap-4">
        {/* Instagram CTA */}
        <motion.a
          href="https://www.instagram.com/cakemeaway.bakery/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.3 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white p-5 rounded-full shadow-2xl flex items-center justify-center group pointer-events-auto"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-6 h-6 invert" alt="IG" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-4 transition-all duration-500 ease-in-out whitespace-nowrap font-black text-[10px] tracking-[0.3em] uppercase">
            Instagram
          </span>
        </motion.a>

        {/* WhatsApp CTA */}
        <motion.a
          href="https://wa.me/910000000000"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#25D366] text-white p-5 rounded-full shadow-2xl flex items-center justify-center group pointer-events-auto"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-4 transition-all duration-500 ease-in-out whitespace-nowrap font-black text-[10px] tracking-[0.3em] uppercase">
            WhatsApp
          </span>
        </motion.a>
      </div>
    </section>
  );
}
