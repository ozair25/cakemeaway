import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 pointer-events-none w-full max-w-md px-6">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border shadow-2xl backdrop-blur-md ${
                toast.type === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                  : toast.type === 'error'
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                  : 'bg-bakery-gold/10 border-bakery-gold/20 text-bakery-gold'
              }`}
            >
              <div className="flex items-center gap-3">
                {toast.type === 'success' && <CheckCircle size={18} />}
                {toast.type === 'error' && <AlertCircle size={18} />}
                {toast.type === 'info' && <Info size={18} />}
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold">{toast.message}</p>
              </div>
              <button 
                onClick={() => removeToast(toast.id)}
                className="opacity-50 hover:opacity-100 transition-opacity ml-4"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
