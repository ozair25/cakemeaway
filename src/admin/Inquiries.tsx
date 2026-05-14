import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Clock, Trash2, CheckCircle, Reply } from 'lucide-react';
import { StoreService } from '../services/store';
import { cn } from '../lib/utils';
import { useToast } from '../components/ui/Toast';

export default function Inquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const data = await StoreService.getInquiries();
      setInquiries(data || []);
    } catch (err) {
      showToast('Failed to fetch inquiries', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await StoreService.updateInquiryStatus(id, status);
      showToast('Status updated', 'success');
      fetchInquiries();
    } catch (err) {
      showToast('Failed to update inquiry', 'error');
    }
  };

  if (loading) return <div className="p-20 text-center text-bakery-gold font-serif italic">Loading inquiries...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif mb-2 text-[#2C1810]">Customer Inquiries</h1>
          <p className="text-[#5D4037] text-sm font-medium">Response and track customer messages from society.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {inquiries.length === 0 ? (
          <div className="p-20 text-center border border-dashed border-bakery-chocolate/20 rounded-3xl bg-bakery-cream/30">
            <Mail className="mx-auto mb-4 opacity-20 text-[#2C1810]" size={48} />
            <p className="text-[#5D4037] font-serif italic text-lg">No messages yet.</p>
          </div>
        ) : (
          inquiries.map((inquiry, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              key={inquiry.id}
              className="bg-bakery-cream border border-bakery-chocolate/10 rounded-3xl p-8 group relative overflow-hidden shadow-xl shadow-bakery-chocolate/5"
            >
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="md:w-1/4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-bakery-beige flex items-center justify-center font-serif text-[#BC8A5F] border border-bakery-chocolate/5 shadow-inner">
                      {inquiry.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#2C1810]">{inquiry.name}</h4>
                      <p className="text-[10px] text-[#5D4037] font-bold">{inquiry.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#5D4037] font-black uppercase tracking-widest pt-4">
                    <Clock size={12} />
                    {inquiry.createdAt?.toDate().toLocaleString()}
                  </div>
                  <div className={cn(
                    "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                    inquiry.status === 'new' ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                  )}>
                    {inquiry.status}
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="bg-bakery-beige border border-bakery-chocolate/10 rounded-2xl p-6 relative">
                    <MessageSquare size={32} className="absolute top-4 right-6 opacity-5 rotate-12 text-[#2C1810]" />
                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037] mb-3">Subject: {inquiry.subject || 'General Inquiry'}</h5>
                    <p className="text-[#2C1810] leading-relaxed font-serif italic text-lg lg:text-xl">
                      "{inquiry.message}"
                    </p>
                  </div>

                  <div className="flex gap-4">
                    {inquiry.status === 'new' && (
                      <button 
                        onClick={() => handleStatusChange(inquiry.id, 'responded')}
                        className="flex items-center gap-2 px-6 py-3 bg-bakery-chocolate text-bakery-cream text-[10px] font-black uppercase tracking-widest hover:bg-bakery-chocolate/90 transition-all rounded-xl shadow-lg shadow-bakery-chocolate/10"
                      >
                        <CheckCircle size={14} />
                        Mark Responded
                      </button>
                    )}
                    <a 
                      href={`mailto:${inquiry.email}`}
                      className="flex items-center gap-2 px-6 py-3 bg-bakery-beige border border-bakery-chocolate/10 text-[#2C1810] text-[10px] font-black uppercase tracking-widest hover:bg-bakery-chocolate/5 transition-all rounded-xl"
                    >
                      <Reply size={14} />
                      Send Email
                    </a>
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
