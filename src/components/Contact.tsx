import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { StoreService } from '../services/store';
import { useToast } from './ui/Toast';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';

export default function Contact() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await StoreService.submitInquiry(formData);
      showToast('Thank you for your message. We will get back to you shortly.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-40 bg-bakery-latte relative overflow-hidden">
      <div className="container mx-auto px-10">
        <div className="flex flex-col lg:flex-row gap-24">
          {/* Contact Info */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <SectionHeading 
              subtitle="Get in Touch" 
              title="Let's Start a Sweet Conversation" 
              align="left"
            />
            
            <div className="mt-16 space-y-10">
              <div className="flex items-start gap-8 group">
                <div className="p-4 rounded-2xl bg-bakery-cream border border-bakery-chocolate/5 group-hover:bg-bakery-gold group-hover:text-white transition-all duration-500">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-bakery-chocolate/40 mb-2">Write to us</h4>
                  <p className="font-serif text-xl">hello@cakemeaway.com</p>
                </div>
              </div>

              <div className="flex items-start gap-8 group">
                <div className="p-4 rounded-2xl bg-bakery-cream border border-bakery-chocolate/5 group-hover:bg-bakery-gold group-hover:text-white transition-all duration-500">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-bakery-chocolate/40 mb-2">Call our studio</h4>
                  <p className="font-serif text-xl">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-8 group">
                <div className="p-4 rounded-2xl bg-bakery-cream border border-bakery-chocolate/5 group-hover:bg-bakery-gold group-hover:text-white transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-bakery-chocolate/40 mb-2">Visit our bakery</h4>
                  <p className="font-serif text-xl leading-relaxed">Saket, South Extension,<br/>New Delhi, 110017</p>
                </div>
              </div>
            </div>

            <div className="mt-20 flex gap-10">
              <a href="#" className="text-bakery-chocolate/40 hover:text-bakery-gold transition-colors"><Instagram size={28} /></a>
              <a href="#" className="text-bakery-chocolate/40 hover:text-bakery-gold transition-colors"><Facebook size={28} /></a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-bakery-cream p-12 md:p-20 shadow-2xl shadow-bakery-chocolate/5 border border-bakery-chocolate/5"
            >
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-bakery-chocolate/40">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-transparent border-b border-bakery-chocolate/10 py-4 font-serif text-2xl outline-none focus:border-bakery-gold transition-colors placeholder:text-bakery-chocolate/10"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-bakery-chocolate/40">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="rahul@example.com"
                      className="w-full bg-transparent border-b border-bakery-chocolate/10 py-4 font-serif text-2xl outline-none focus:border-bakery-gold transition-colors placeholder:text-bakery-chocolate/10"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-bakery-chocolate/40">Inquiry Subject</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                    placeholder="e.g. Wedding Cake Consultation"
                    className="w-full bg-transparent border-b border-bakery-chocolate/10 py-4 font-serif text-xl outline-none focus:border-bakery-gold transition-colors placeholder:text-bakery-chocolate/10"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-bakery-chocolate/40">Message Details</label>
                  <textarea 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your celebration..."
                    className="w-full bg-transparent border-b border-bakery-chocolate/10 py-4 font-serif text-xl outline-none focus:border-bakery-gold transition-colors resize-none placeholder:text-bakery-chocolate/10"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-20 py-8 flex items-center justify-center gap-4 group"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND INQUIRY'}
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
