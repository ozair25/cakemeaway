import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency, cn } from '../lib/utils';
import { StoreService } from '../services/store';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-bakery-cream border border-bakery-chocolate/10 rounded-2xl p-6 relative overflow-hidden group shadow-lg shadow-bakery-chocolate/5"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-bakery-beige rounded-xl border border-bakery-chocolate/5 group-hover:border-bakery-gold/30 transition-all">
        <Icon className="w-5 h-5 text-bakery-gold" />
      </div>
      {trend && (
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full",
          trend === 'up' ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10"
        )}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trendValue}
        </div>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-[#5D4037] text-[10px] uppercase tracking-[0.2em] font-black">{title}</p>
      <h3 className="text-2xl font-serif text-[#2C1810]">{value}</h3>
    </div>
    {/* Subtle decorative background icon */}
    <Icon className="absolute -right-4 -bottom-4 w-24 h-24 text-bakery-chocolate/5 -rotate-12 pointer-events-none" />
  </motion.div>
);

export default function Dashboard() {
  const [stats, setStats] = React.useState({
    totalRevenue: 0,
    dailyOrders: 0,
    newCustomers: 0,
    lowStockItems: 0
  });
  const [loading, setLoading] = React.useState(true);
  const [recentOrders, setRecentOrders] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const s = await StoreService.getDashboardStats();
        if (s) setStats(s);
        
        // Fetch recent orders
        const ordersSnapshot = await StoreService.getOrders(); // Need to implement this
        setRecentOrders(ordersSnapshot?.slice(0, 5) || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-20 text-center animate-pulse text-bakery-gold font-serif italic">Analyzing bakery data...</div>;

  const chartData = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: stats.totalRevenue * 0.4 },
    { name: 'Sun', revenue: stats.totalRevenue * 0.6 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif mb-2 text-[#2C1810]">Morning, Chef</h1>
          <p className="text-[#5D4037] text-sm font-medium">Here's what's happening at Cake Me Away today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={formatCurrency(stats.totalRevenue)} 
          icon={TrendingUp} 
          trend="up" 
          trendValue="+12.5%"
          delay={0.1}
        />
        <StatCard 
          title="Daily Orders" 
          value={stats.dailyOrders} 
          icon={ShoppingCart} 
          trend="up" 
          trendValue="+5.2%"
          delay={0.2}
        />
        <StatCard 
          title="New Customers" 
          value={stats.newCustomers} 
          icon={Users} 
          delay={0.3}
        />
        <StatCard 
          title="Stock Alert" 
          value={`${stats.lowStockItems} Items`} 
          icon={AlertCircle} 
          delay={0.4}
        />
      </div>
      {/* ... Rest of the component ... */}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-8 bg-bakery-cream border border-bakery-chocolate/10 rounded-3xl p-8 shadow-xl shadow-bakery-chocolate/5"
        >
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#2C1810]">Revenue Overview</h3>
            <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-[#BC8A5F] outline-none cursor-pointer hover:text-[#2C1810] transition-colors">
              <option className="bg-bakery-cream" value="weekly">Weekly</option>
              <option className="bg-bakery-cream" value="monthly">Monthly</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#BC8A5F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#BC8A5F" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(0,0,0,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(0,0,0,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `₹${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FDF9F3', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#BC8A5F' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#BC8A5F" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-4 bg-bakery-cream border border-bakery-chocolate/10 rounded-3xl p-8 shadow-xl shadow-bakery-chocolate/5"
        >
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#2C1810] mb-10">Popular Categories</h3>
          <div className="space-y-6">
            {[
              { name: 'Cakes', value: 65, color: '#D4A373' },
              { name: 'Pastries', value: 45, color: '#EBE3D5' },
              { name: 'Cookies', value: 30, color: '#BC8A5F' },
              { name: 'Snacks', value: 20, color: '#8B4513' },
            ].map((cat) => (
              <div key={cat.name} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-[#5D4037]">{cat.name}</span>
                  <span className="text-[#2C1810] font-black">{cat.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-bakery-chocolate/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cat.value}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 bg-bakery-beige rounded-2xl border border-bakery-chocolate/5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-bakery-gold mb-2">Bestseller of the Week</p>
            <p className="font-serif text-lg text-bakery-chocolate">Signature Truffle Cake</p>
            <p className="text-xs text-bakery-chocolate/40 mt-1">Found in 42 orders this week</p>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-bakery-cream border border-bakery-chocolate/10 rounded-3xl overflow-hidden shadow-xl shadow-bakery-chocolate/5"
      >
        <div className="p-8 border-b border-bakery-chocolate/10 flex justify-between items-center">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#2C1810]">Active Orders</h3>
          <Link to="/admin/orders" className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373] hover:underline">View All Orders</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-bakery-chocolate/10 text-[10px] uppercase tracking-[0.2em] text-[#2C1810]/60">
                <th className="px-8 py-4 font-black">Order ID</th>
                <th className="px-8 py-4 font-black">Customer</th>
                <th className="px-8 py-4 font-black">Items</th>
                <th className="px-8 py-4 font-black">Amount</th>
                <th className="px-8 py-4 font-black">Status</th>
                <th className="px-8 py-4 font-black text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs font-medium">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-[#5D4037] italic font-medium">No active orders found</td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-bakery-chocolate/10 hover:bg-bakery-chocolate/[0.05] transition-all">
                    <td className="px-8 py-4 font-mono text-[#5D4037]">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="px-8 py-4 font-serif text-sm text-[#2C1810]">{order.customerName}</td>
                    <td className="px-8 py-4 text-[#5D4037] font-medium">{order.items?.length || 0} Products</td>
                    <td className="px-8 py-4 font-bold text-bakery-gold">{formatCurrency(order.total || 0)}</td>
                    <td className="px-8 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest",
                        order.status === 'Pending' ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-500"
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right hover:translate-x-1 transition-transform">
                      <Link to={`/admin/orders`} className="text-bakery-gold hover:underline font-bold text-[10px] uppercase tracking-widest">Details</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
