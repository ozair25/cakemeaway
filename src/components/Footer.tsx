import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bakery-chocolate text-white pt-24 pb-12 overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <img 
              src="/icon.png" 
              alt="Cake Me Away" 
              className="h-32 w-auto object-contain mb-8 filter brightness-200"
              referrerPolicy="no-referrer"
            />
            <p className="text-white/50 font-light leading-relaxed mb-8">
              Crafting premium cinematic desserts and artisanal celebration cakes in the heart of Indore. Every bite is a moment of pure happiness.
            </p>
          <div className="lg:col-span-1">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8">Access Portal</h4>
            <div className="space-y-6">
              <Link 
                to="/admin/login" 
                className="group flex items-center gap-4 text-white/50 hover:text-bakery-gold transition-colors"
              >
                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-bakery-gold/50 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Bakery Controller</span>
              </Link>
              <p className="text-[9px] text-white/20 uppercase tracking-[0.1em] leading-relaxed">
                Management systems restricted to authorized personnel only. Indore's signature backend v2.4.
              </p>
            </div>
          </div>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: "#C5A059" }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-colors hover:border-bakery-gold"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest font-bold mb-8 text-bakery-gold">Quick Links</h4>
            <ul className="space-y-4">
              {["Our Menu", "Special Collections", "Customized Cakes", "Store Locator", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-white transition-colors flex items-center group text-sm">
                    {link} <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest font-bold mb-8 text-bakery-gold">Store Timings</h4>
            <div className="space-y-4 text-white/60 font-light text-sm">
              <div className="flex justify-between">
                <span>Mon - Sat</span>
                <span className="text-white">09:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-white">10:00 AM - 11:30 PM</span>
              </div>
              <p className="pt-4 text-[10px] italic">
                *Order customized cakes at least 24h in advance for best quality.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest font-bold mb-8 text-bakery-gold">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="text-bakery-gold shrink-0" size={20} />
                <span className="text-white/60 text-sm leading-relaxed">
                  123 Luxury Lane, Vijay Nagar,<br />Indore, Madhya Pradesh 452010
                </span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-bakery-gold shrink-0" size={20} />
                <span className="text-white/60 text-sm leading-relaxed">
                  +91 98765 43210
                </span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-bakery-gold shrink-0" size={20} />
                <span className="text-white/60 text-sm leading-relaxed">
                  hello@cakemeaway.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Big Background Text */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full text-[15vw] font-serif opacity-[0.05] whitespace-nowrap pointer-events-none select-none text-bakery-chocolate">
          CAKE ME AWAY BAKERY
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            © {currentYear} Cake Me Away. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
