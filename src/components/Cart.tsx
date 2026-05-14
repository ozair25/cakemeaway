import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from './ui/Button';
import { formatCurrency } from '../lib/utils';
import { useToast } from './ui/Toast';
import { StoreService } from '../services/store';

export default function Cart({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { items, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
  const { showToast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    try {
      await StoreService.createOrder({
        customerName: formData.name,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        items,
        total: totalAmount,
        status: 'Pending',
        paymentStatus: 'Pending'
      });
      showToast('Order placed successfully!', 'success');
      clearCart();
      setIsCheckingOut(false);
      onClose();
    } catch (err) {
      showToast('Failed to place order', 'error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-bakery-cream shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-8 border-b border-bakery-chocolate/10 flex justify-between items-center bg-bakery-beige/30">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-bakery-gold" />
                <h2 className="text-xl font-serif">Your Selection</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-bakery-chocolate/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag size={48} className="mb-4" />
                  <p className="font-serif italic text-lg">Your tray is empty</p>
                  <button onClick={onClose} className="mt-4 text-xs font-bold uppercase tracking-widest text-bakery-gold">Start Browsing</button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-6 group"
                  >
                    <div className="w-24 h-24 bg-bakery-beige rounded-xl overflow-hidden flex-shrink-0">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-lg">{item.name}</h3>
                        <p className="font-bold text-bakery-gold">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 bg-bakery-beige border border-bakery-chocolate/5 rounded-full px-4 py-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-bakery-chocolate/40 hover:text-bakery-gold transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-bakery-chocolate/40 hover:text-bakery-gold transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-rose-500/40 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}

              {isCheckingOut && items.length > 0 && (
                <motion.form 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="pt-8 border-t border-bakery-chocolate/10 space-y-6"
                >
                  <h3 className="text-sm font-black uppercase tracking-[0.2em]">Delivery Details</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-bakery-cream border border-bakery-chocolate/10 px-6 py-4 rounded-xl text-sm outline-none focus:border-bakery-gold transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-bakery-cream border border-bakery-chocolate/10 px-6 py-4 rounded-xl text-sm outline-none focus:border-bakery-gold transition-colors"
                    />
                    <textarea
                      placeholder="Complete Address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-bakery-cream border border-bakery-chocolate/10 px-6 py-4 rounded-xl text-sm outline-none focus:border-bakery-gold transition-colors resize-none"
                    />
                  </div>
                </motion.form>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 bg-bakery-beige/30 border-t border-bakery-chocolate/10 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-bakery-chocolate/40">Subtotal</span>
                  <span className="text-2xl font-serif text-bakery-chocolate">{formatCurrency(totalAmount)}</span>
                </div>
                {!isCheckingOut ? (
                  <Button 
                    variant="primary" 
                    className="w-full flex items-center justify-center gap-3 group px-10 py-5"
                    onClick={() => setIsCheckingOut(true)}
                  >
                    CONTINUE TO CHECKOUT
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsCheckingOut(false)}
                    >
                      BACK
                    </Button>
                    <Button 
                      variant="primary" 
                      className="flex-[2]"
                      onClick={handleSubmit}
                    >
                      CONFIRM ORDER
                    </Button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
