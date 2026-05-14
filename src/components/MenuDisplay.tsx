import React from "react";
import { motion } from "motion/react";
import SectionHeading from "./ui/SectionHeading";
import { Download, ZoomIn } from "lucide-react";

const MENU_IMAGE_URL = "https://b.zmtcdn.com/data/menus/984/18276984/14de0f760c4f9f4b6da1ee2d659419f9.jpg";

export default function MenuDisplay() {
  return (
    <section id="menu" className="py-24 bg-bakery-cream">
      <div className="container mx-auto px-10">
        <SectionHeading 
          subtitle="Our Offerings" 
          title="The Official Menu" 
          align="center"
        />
        
        <div className="mt-16 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group max-w-2xl w-full"
          >
            <div className="absolute -inset-4 bg-bakery-chocolate/5 rounded-[2rem] blur-2xl group-hover:bg-bakery-gold/10 transition-colors duration-700" />
            
            <div className="relative bg-white p-4 shadow-2xl overflow-hidden rounded-xl border border-bakery-chocolate/10">
              <img 
                src={MENU_IMAGE_URL} 
                alt="Bakery Menu" 
                className="w-full h-auto rounded-lg shadow-sm"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-bakery-chocolate/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6">
                <a 
                  href={MENU_IMAGE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-bakery-cream text-bakery-chocolate p-5 rounded-full hover:scale-110 transition-transform shadow-xl"
                >
                  <ZoomIn size={24} />
                </a>
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = MENU_IMAGE_URL;
                    link.download = 'CakeMeAway-Menu.jpg';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="bg-bakery-gold text-white p-5 rounded-full hover:scale-110 transition-transform shadow-xl"
                >
                  <Download size={24} />
                </button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="font-serif italic text-bakery-chocolate/60 text-lg">
                Click to explore our full artisanal collection in detail.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
