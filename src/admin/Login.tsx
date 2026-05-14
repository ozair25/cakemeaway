import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, ArrowRight, Home } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await loginWithEmail(email, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid credentials. Please contact the system administrator.');
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bakery-beige flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bakery-gold/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-bakery-chocolate/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-bakery-cream border border-bakery-chocolate/10 p-12 shadow-2xl rounded-3xl backdrop-blur-md">
          <div className="flex flex-col items-center mb-12">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-bakery-beige rounded-full flex items-center justify-center mb-6 border border-bakery-chocolate/10"
            >
              <Lock className="text-[#BC8A5F] w-8 h-8" />
            </motion.div>
            <h1 className="font-serif text-3xl text-[#2C1810] mb-2 tracking-tight">Bakery Controller</h1>
            <p className="text-[#5D4037] text-[10px] uppercase tracking-[0.4em] font-black">Secure Access for Management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5 focus-within:text-bakery-gold transition-colors">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#5D4037] px-1">Identity ID</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D4037] opacity-50" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cma"
                  className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-12 py-4 text-[#2C1810] text-sm focus:outline-none focus:border-bakery-gold transition-all placeholder:text-[#5D4037]/30 font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5 focus-within:text-bakery-gold transition-colors">
              <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#5D4037] px-1">Access Pin</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D4037] opacity-50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-bakery-beige border border-bakery-chocolate/10 rounded-xl px-12 py-4 text-[#2C1810] text-sm focus:outline-none focus:border-bakery-gold transition-all placeholder:text-[#5D4037]/30 font-medium"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-rose-600 text-[10px] uppercase tracking-widest font-black text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-bakery-chocolate text-bakery-cream rounded-xl flex items-center justify-center group text-[10px] font-black uppercase tracking-[0.2em] hover:bg-bakery-chocolate/90 transition-all shadow-lg shadow-bakery-chocolate/10"
            >
              {isLoading ? "AUTHENTICATING..." : "VERIFY ACCESS"}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-bakery-chocolate/10 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-[10px] uppercase tracking-[0.3em] text-[#5D4037] hover:text-[#2C1810] transition-colors flex items-center justify-center mx-auto font-black"
            >
              <Home className="w-3 h-3 mr-2" />
              Return to Storefront
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-[#5D4037] text-[9px] uppercase tracking-[0.5em] font-black italic">
          Indore's Signature Backend Systems v2.4
        </p>
      </motion.div>
    </div>
  );
}
