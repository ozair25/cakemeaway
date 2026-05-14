import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Package, label: 'Products', path: '/admin/products' },
  { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
  { icon: MessageSquare, label: 'Inquiries', path: '/admin/inquiries' },
  { icon: Users, label: 'Customers', path: '/admin/customers' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout, user } = useAuth();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-bakery-beige text-bakery-chocolate font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-bakery-chocolate/5 flex flex-col bg-bakery-cream">
        <div className="p-8">
          <Link to="/" className="block">
            <img 
              src="/icon.png" 
              alt="CMA Admin" 
              className="h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                location.pathname === item.path 
                  ? "bg-bakery-gold/20 text-[#2C1810]" 
                  : "text-[#2C1810]/60 hover:text-[#2C1810] hover:bg-bakery-chocolate/5"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {location.pathname === item.path && (
                <motion.div 
                  layoutId="active-nav"
                  className="ml-auto"
                >
                  <ChevronRight className="w-3 h-3" />
                </motion.div>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-bakery-chocolate/5 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-bakery-gold/20 flex items-center justify-center text-bakery-gold text-xs font-bold ring-1 ring-bakery-gold/30">
              {user?.displayName?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate text-[#2C1810]">{user?.displayName || 'Admin User'}</p>
              <p className="text-[10px] text-[#2C1810]/60 truncate italic font-medium">Bakery Controller</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bakery-gold/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
        
        <header className="sticky top-0 z-30 bg-bakery-beige/80 backdrop-blur-xl border-b border-bakery-chocolate/10 px-8 py-6 flex justify-between items-center">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#2C1810] opacity-80">System Core</h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">Live System</span>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
