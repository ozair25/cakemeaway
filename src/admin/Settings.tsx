import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Globe, Phone, Mail, Instagram, Facebook, Clock, User, Shield } from 'lucide-react';
import { StoreService } from '../services/store';
import { useToast } from '../components/ui/Toast';
import Button from '../components/ui/Button';

export default function Settings() {
  const [settings, setSettings] = useState<any>({
    bakeryName: 'Cake Me Away',
    email: '',
    phone: '',
    address: '',
    instagram: '',
    facebook: '',
    openingHours: '',
    deliveryRadius: '10km',
    adminEmail: 'admin@cma'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await StoreService.getSettings();
      if (data) setSettings(data);
    } catch (err) {
      showToast('Failed to load settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await StoreService.updateSettings(settings);
      showToast('Settings saved successfully', 'success');
    } catch (err) {
      showToast('Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-20 text-center text-bakery-gold font-serif italic">Accessing control system...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif mb-2 text-[#2C1810]">Bakery Configuration</h1>
          <p className="text-[#5D4037] text-sm font-medium">Global settings and administrative controls.</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="px-10 py-5"
        >
          {saving ? 'SAVING...' : 'SAVE CONFIGURATION'}
        </Button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Core Branding */}
        <section className="bg-bakery-cream border border-bakery-chocolate/10 rounded-3xl p-8 space-y-6 shadow-lg shadow-bakery-chocolate/5">
          <div className="flex items-center gap-4 mb-4">
            <Globe className="text-[#BC8A5F]" />
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#2C1810]">Corporate Identity</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037] mb-2">Bakery Name</label>
              <input 
                type="text" 
                value={settings.bakeryName}
                onChange={e => setSettings({...settings, bakeryName: e.target.value})}
                className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-6 py-4 outline-none focus:border-bakery-gold transition-colors font-serif text-[#2C1810]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037] mb-2">Official Address</label>
              <textarea 
                rows={3}
                value={settings.address}
                onChange={e => setSettings({...settings, address: e.target.value})}
                className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-6 py-4 outline-none focus:border-bakery-gold transition-colors text-[#2C1810] font-medium"
              />
            </div>
          </div>
        </section>

        {/* Contact Intelligence */}
        <section className="bg-bakery-cream border border-bakery-chocolate/10 rounded-3xl p-8 space-y-6 shadow-lg shadow-bakery-chocolate/5">
          <div className="flex items-center gap-4 mb-4">
            <Phone className="text-[#BC8A5F]" />
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#2C1810]">Communication</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037] mb-2">Support Phone</label>
              <input 
                type="text" 
                value={settings.phone}
                onChange={e => setSettings({...settings, phone: e.target.value})}
                className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-6 py-4 outline-none focus:border-bakery-gold transition-colors text-[#2C1810]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037] mb-2">Inquiry email</label>
              <input 
                type="email" 
                value={settings.email}
                onChange={e => setSettings({...settings, email: e.target.value})}
                className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-6 py-4 outline-none focus:border-bakery-gold transition-colors text-[#2C1810]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037] mb-2 font-black">
                <Instagram size={14} className="inline mr-2" /> Instagram Handle
              </label>
              <input 
                type="text" 
                value={settings.instagram}
                onChange={e => setSettings({...settings, instagram: e.target.value})}
                className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-6 py-4 outline-none focus:border-bakery-gold transition-colors text-[#2C1810]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037] mb-2 font-black">
                <Facebook size={14} className="inline mr-2" /> Facebook Page
              </label>
              <input 
                type="text" 
                value={settings.facebook}
                onChange={e => setSettings({...settings, facebook: e.target.value})}
                className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-6 py-4 outline-none focus:border-bakery-gold transition-colors text-[#2C1810]"
              />
            </div>
          </div>
        </section>

        {/* Operational Schedule */}
        <section className="bg-bakery-cream border border-bakery-chocolate/10 rounded-3xl p-8 space-y-6 shadow-lg shadow-bakery-chocolate/5">
          <div className="flex items-center gap-4 mb-4">
            <Clock className="text-[#BC8A5F]" />
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#2C1810]">Operations</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037] mb-2">Opening Hours (e.g. 10:00 AM - 08:00 PM)</label>
              <input 
                type="text" 
                value={settings.openingHours}
                onChange={e => setSettings({...settings, openingHours: e.target.value})}
                className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-6 py-4 outline-none focus:border-bakery-gold transition-colors text-[#2C1810]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#5D4037] mb-2">Standard Delivery Radius</label>
              <input 
                type="text" 
                value={settings.deliveryRadius}
                onChange={e => setSettings({...settings, deliveryRadius: e.target.value})}
                className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-6 py-4 outline-none focus:border-bakery-gold transition-colors text-[#2C1810]"
              />
            </div>
          </div>
        </section>

        {/* Access Control */}
        <section className="bg-bakery-cream border border-bakery-chocolate/10 rounded-3xl p-8 space-y-6 lg:col-span-2 shadow-lg shadow-bakery-chocolate/5">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="text-[#BC8A5F]" />
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#2C1810]">System & Privacy</h3>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center p-8 bg-bakery-beige rounded-2xl border border-bakery-chocolate/10 italic font-serif">
            <div className="w-20 h-20 bg-bakery-gold/20 rounded-full flex items-center justify-center text-[#BC8A5F]">
              <User size={32} />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-[#5D4037] text-[10px] uppercase tracking-widest font-black">Primary Administrator</p>
              <h4 className="text-xl text-[#2C1810]">Chef Admin</h4>
              <p className="text-xs text-[#5D4037]">Access configured for: <span className="text-[#2C1810] font-bold">{settings.adminEmail}</span></p>
            </div>
            <button 
              type="button" 
              className="px-6 py-3 border border-bakery-chocolate/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-bakery-chocolate/5 transition-all text-[#5D4037]"
              onClick={() => showToast('Security password reset email triggered', 'success')}
            >
              Reset Private Key
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
