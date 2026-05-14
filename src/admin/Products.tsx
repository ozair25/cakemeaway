import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  AlertTriangle,
  Image as ImageIcon,
  Package
} from 'lucide-react';
import { collection, onSnapshot, query, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';
import { formatCurrency, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import Button from '../components/ui/Button';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  stock: number;
  images: string[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Cakes',
    stock: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
      setProducts(prods);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
    });

    return unsubscribe;
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        stock: Number(formData.stock),
        status: Number(formData.stock) > 10 ? 'in-stock' : (Number(formData.stock) > 0 ? 'low-stock' : 'out-of-stock'),
        images: [],
        createdAt: Timestamp.now(),
      });
      setIsAddModalOpen(false);
      setFormData({ name: '', price: '', category: 'Cakes', stock: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'products');
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'in-stock': return 'text-emerald-500 bg-emerald-500/10';
      case 'low-stock': return 'text-amber-500 bg-amber-500/10';
      case 'out-of-stock': return 'text-rose-500 bg-rose-500/10';
      default: return 'text-white/40 bg-white/5';
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif mb-2 text-[#2C1810]">Inventory</h1>
          <p className="text-[#5D4037] text-sm font-medium">Manage your bakery collections and stock levels.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3 bg-bakery-gold text-black text-xs font-bold uppercase tracking-widest hover:bg-bakery-gold/90 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-bakery-cream border border-bakery-chocolate/10 rounded-2xl shadow-sm">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D4037]" />
          <input 
            type="text" 
            placeholder="Search by name, category, or tag..."
            className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl pl-12 pr-4 py-3 text-sm text-[#2C1810] placeholder:text-[#5D4037]/50 focus:outline-none focus:border-bakery-gold transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex items-center gap-2 px-6 py-3 bg-bakery-beige border border-bakery-chocolate/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#2C1810] hover:bg-bakery-chocolate/5 transition-all">
            <Filter className="w-3 h-3" />
            Filter
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-bakery-cream border border-bakery-chocolate/10 rounded-3xl overflow-hidden shadow-xl shadow-bakery-chocolate/5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-bakery-chocolate/10 text-[10px] uppercase tracking-[0.2em] text-[#2C1810]">
              <th className="px-8 py-4 font-black">Item</th>
              <th className="px-8 py-4 font-black">Category</th>
              <th className="px-8 py-4 font-black">Price</th>
              <th className="px-8 py-4 font-black">Stock</th>
              <th className="px-8 py-4 font-black">Status</th>
              <th className="px-8 py-4 font-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs font-medium">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={p.id} 
                  className="border-b border-bakery-chocolate/10 hover:bg-bakery-chocolate/[0.05] transition-all group"
                >
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-bakery-beige overflow-hidden flex items-center justify-center border border-bakery-chocolate/10 group-hover:border-bakery-gold transition-all">
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-[#2C1810]/20" />
                        )}
                      </div>
                      <span className="font-serif text-base text-[#2C1810]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-[10px] font-black px-2 py-1 bg-bakery-beige border border-bakery-chocolate/10 rounded uppercase tracking-widest text-[#5D4037]">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-8 py-4 font-mono font-bold text-[#2C1810]">{formatCurrency(p.price)}</td>
                  <td className="px-8 py-4 italic font-medium text-[#5D4037]">{p.stock} units</td>
                  <td className="px-8 py-4">
                    <span className={cn(
                      "px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest",
                      getStatusColor(p.status)
                    )}>
                      {p.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2 px-2">
                      <button className="p-2 hover:bg-bakery-beige rounded-lg text-[#5D4037] hover:text-bakery-gold transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-rose-50 rounded-lg text-rose-500/60 hover:text-rose-500 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {filteredProducts.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="px-8 py-20 text-center text-[#5D4037]">
                  <div className="flex flex-col items-center gap-4">
                    <Package className="w-12 h-12 opacity-20" />
                    <p className="text-sm font-medium italic">No products found matching your search.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal (Simplified) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-bakery-chocolate/60 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-2xl bg-bakery-cream border border-bakery-chocolate/20 rounded-3xl p-10 overflow-hidden shadow-2xl"
          >
             <h2 className="text-2xl font-serif mb-8 text-[#2C1810]">Artisanal Creation</h2>
             <form className="space-y-6" onSubmit={handleAddProduct}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037] pl-1">Product Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-4 py-3 text-sm text-[#2C1810] outline-none focus:border-bakery-gold" 
                      placeholder="e.g. Midnight Truffle"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037] pl-1">Base Price (INR)</label>
                    <input 
                      type="number" 
                      required
                      className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-4 py-3 text-sm text-[#2C1810] outline-none focus:border-bakery-gold" 
                      placeholder="e.g. 1200"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037] pl-1">Category</label>
                    <select 
                      className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-4 py-3 text-sm text-[#2C1810] outline-none focus:border-bakery-gold cursor-pointer"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option className="bg-bakery-cream" value="Cakes">Cakes</option>
                      <option className="bg-bakery-cream" value="Pastries">Pastries</option>
                      <option className="bg-bakery-cream" value="Cookies">Cookies</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037] pl-1">Initial Stock</label>
                    <input 
                      type="number" 
                      required
                      className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-4 py-3 text-sm text-[#2C1810] outline-none focus:border-bakery-gold" 
                      placeholder="e.g. 20"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />
                  </div>
                </div>
                <div className="pt-6 flex gap-4">
                  <button className="flex-1 py-4 bg-bakery-chocolate text-bakery-cream text-[10px] font-black uppercase tracking-widest hover:bg-bakery-chocolate/90 transition-all rounded-xl">Create Masterpiece</button>
                  <button 
                    type="button" 
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-8 py-4 bg-bakery-beige border border-bakery-chocolate/10 text-[10px] font-black uppercase tracking-widest text-[#2C1810] hover:bg-bakery-chocolate/5 transition-all rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
             </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
