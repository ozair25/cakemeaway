import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight, Phone, MapPin, Clock, CreditCard, ChevronDown } from 'lucide-react';
import { StoreService } from '../services/store';
import { formatCurrency, cn } from '../lib/utils';
import { useToast } from '../components/ui/Toast';

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await StoreService.getOrders();
      setOrders(data || []);
    } catch (err) {
      showToast('Failed to fetch orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await StoreService.updateOrderStatus(orderId, newStatus);
      showToast('Status updated', 'success');
      fetchOrders();
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  if (loading) return <div className="p-20 text-center text-bakery-gold font-serif italic">Loading orders...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif mb-2 text-[#2C1810]">Order Management</h1>
          <p className="text-[#5D4037] text-sm font-medium">Track and manage your bakery's active orders.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.length === 0 ? (
          <div className="p-20 text-center border border-dashed border-bakery-chocolate/20 rounded-3xl bg-bakery-cream/30">
            <ShoppingBag className="mx-auto mb-4 opacity-20 text-[#2C1810]" size={48} />
            <p className="text-[#5D4037] font-serif italic text-lg">No orders received yet.</p>
          </div>
        ) : (
          orders.map((order, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={order.id}
              className="bg-bakery-cream border border-bakery-chocolate/10 rounded-3xl p-8 shadow-xl shadow-bakery-chocolate/5"
            >
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Order Header / Info */}
                <div className="lg:w-1/3 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#D4A373] mb-2 block">
                        Order #{order.id.slice(-6).toUpperCase()}
                      </span>
                      <h3 className="text-2xl font-serif text-[#2C1810]">{order.customerName}</h3>
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      order.status === 'Pending' ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                      order.status === 'Preparing' ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" :
                      "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    )}>
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-bakery-beige rounded-lg border border-bakery-chocolate/5">
                        <Phone size={14} className="text-[#5D4037]" />
                      </div>
                      <p className="text-sm font-bold text-[#2C1810]">{order.customerPhone}</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-bakery-beige rounded-lg border border-bakery-chocolate/5">
                        <MapPin size={14} className="text-[#5D4037]" />
                      </div>
                      <p className="text-sm text-[#5D4037] font-medium leading-relaxed">{order.customerAddress}</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-bakery-beige rounded-lg border border-bakery-chocolate/5">
                        <Clock size={14} className="text-[#5D4037]" />
                      </div>
                      <p className="text-sm text-[#5D4037] font-medium">
                        {order.createdAt?.toDate().toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 flex gap-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest text-[#2C1810] outline-none focus:border-bakery-gold transition-colors cursor-pointer"
                    >
                      <option className="bg-bakery-cream">Pending</option>
                      <option className="bg-bakery-cream">Preparing</option>
                      <option className="bg-bakery-cream">Delivered</option>
                      <option className="bg-bakery-cream">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Order Items */}
                <div className="flex-1 bg-bakery-beige/30 border border-bakery-chocolate/10 rounded-2xl p-8 space-y-6">
                  <div className="flex justify-between items-center border-b border-bakery-chocolate/10 pb-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037]">Items Selection</h4>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037]">
                      {order.items?.length || 0} Products
                    </span>
                  </div>

                  <div className="space-y-4">
                    {order.items?.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center group">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 bg-bakery-cream rounded-lg overflow-hidden flex-shrink-0 border border-bakery-chocolate/10">
                            {item.image && <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />}
                          </div>
                          <div>
                            <p className="text-sm font-serif text-[#2C1810]">{item.name}</p>
                            <p className="text-[10px] font-black text-[#5D4037]">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-bakery-gold">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-bakery-chocolate/10 mt-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <CreditCard size={16} className="text-[#BC8A5F]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#5D4037]">Payment: {order.paymentStatus}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#5D4037] mb-1">Total Amount</p>
                      <p className="text-2xl font-serif text-[#2C1810]">{formatCurrency(order.total)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
