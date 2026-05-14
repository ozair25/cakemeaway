import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, ShoppingBag, LayoutDashboard } from "lucide-react";
import Button from "./ui/Button";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";

export default function Navbar() {
  const { isAdmin } = useAuth();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Menu", href: "#menu" },
    { name: "Custom Cakes", href: "#custom" },
    { name: "Our Story", href: "#story" },
    { name: "Contact", href: "#contact" },
    { name: "Admin", href: "/admin/login", isRoute: true },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled ? "bg-bakery-champagne/95 backdrop-blur-xl py-6 shadow-sm border-b border-bakery-chocolate/5" : "bg-transparent py-10"
        }`}
      >
        <div className="container mx-auto px-10 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <Link to="/" className="group flex items-center">
              <img 
                src="/icon.png" 
                alt="Cake Me Away" 
                className="h-28 md:h-36 w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className={`hidden lg:flex items-center gap-12 font-bold text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 ${isScrolled ? 'text-bakery-chocolate' : 'text-white'}`}>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {link.isRoute ? (
                  <Link
                    to={link.href}
                    className="hover:text-bakery-gold transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-bakery-gold transition-all group-hover:w-full" />
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="hover:text-bakery-gold transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-bakery-gold transition-all group-hover:w-full" />
                  </a>
                )}
              </motion.div>
            ))}
            
            <div className="h-4 w-[1px] bg-current opacity-20" />
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative group p-2 hover:text-bakery-gold transition-colors"
            >
              <ShoppingBag size={20} className="group-hover:rotate-12 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-bakery-gold text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {isAdmin && (
              <Link 
                to="/admin" 
                className="flex items-center gap-2 text-bakery-gold"
              >
                <LayoutDashboard size={16} />
                <span>Controller</span>
              </Link>
            )}
            
            <Button 
              variant={isScrolled ? "primary" : "secondary"} 
              className="rounded-none px-12 py-4 text-[9px]"
              onClick={() => setIsCartOpen(true)}
            >
              ORDER NOW
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-6">
            <button 
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 transition-colors duration-500 ${isScrolled ? 'text-bakery-chocolate' : 'text-white'}`}
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-bakery-gold text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">
                  {totalItems}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors duration-500 ${isScrolled ? 'text-bakery-chocolate' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-bakery-beige z-40 lg:hidden flex flex-col pt-40 px-10"
            >
              <div className="flex flex-col gap-12">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-4xl font-serif text-bakery-chocolate hover:text-bakery-gold transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-4xl font-serif text-bakery-chocolate hover:text-bakery-gold transition-colors"
                      >
                        {link.name}
                      </a>
                    )}
                  </motion.div>
                ))}
                
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-serif text-bakery-gold flex items-center gap-4"
                  >
                    <LayoutDashboard size={28} />
                    Controller
                  </Link>
                )}
                
                <Button 
                  variant="primary" 
                  className="w-full mt-10 py-8 text-sm"
                  onClick={() => setIsCartOpen(true)}
                >
                  START ORDER
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
