import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, ShoppingCart, Heart, Plus } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";
import { StoreService } from "../services/store";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../lib/utils";
import { useToast } from "./ui/Toast";

export default function BestSellers() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await StoreService.getProducts();
        setProducts(data || []);
      } catch (err) {
        showToast("Failed to load delicacies", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="py-40 text-center">
      <div className="animate-pulse font-serif text-bakery-gold italic">Gathering our best creations...</div>
    </div>
  );

  return (
    <section id="best-sellers" className="py-32 bg-bakery-beige relative overflow-hidden">
      {/* ... grid background ... */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.02]">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-bakery-chocolate h-full"></div>
        ))}
      </div>

      <div className="container mx-auto px-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
          <div className="w-full md:w-auto">
            <SectionHeading 
              subtitle="The Favorites" 
              title="Curated Collections" 
              align="left"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-bakery-cream mb-8 border border-bakery-chocolate/10 group-hover:shadow-2xl group-hover:shadow-bakery-chocolate/5 transition-all duration-700">
                {product.image && (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                )}
                
                {product.stock < 5 && (
                  <div className="absolute top-6 right-6">
                    <span className="bg-rose-500 text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest">
                      Low Stock
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-bakery-chocolate/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center gap-6 px-10">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      addToCart(product);
                      showToast(`${product.name} added to tray`);
                    }}
                    className="w-full bg-bakery-chocolate text-bakery-cream py-5 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl"
                  >
                    <Plus size={16} /> ADD TO TRAY
                  </motion.button>
                </div>
              </div>

              <div className="flex flex-col items-start translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-bakery-gold" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">Hand-finished</span>
                </div>
                <h3 className="font-serif text-2xl mb-2 group-hover:text-bakery-gold transition-colors tracking-tight leading-none">{product.name}</h3>
                <div className="flex items-center gap-4">
                  <p className="text-bakery-chocolate/60 font-bold text-sm tracking-widest italic">{formatCurrency(product.price)}</p>
                  <p className="text-[10px] font-medium text-bakery-chocolate/30 uppercase tracking-widest">• {product.weight || '500g'}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
