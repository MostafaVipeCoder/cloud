import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, Clock, Target } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, AreaChart, Area, Cell
} from 'recharts';

const DashboardOverview = () => {
    // Aggregated data from financial and retention modules
    const stats = {
        totalRevenue: 848601, // Total annual income
        totalProfit: 279532,  // Total annual net
        totalCustomers: 3279, // Total customer IDs
        avgMonthlyGrowth: 15.4,
        activeRoomsHours: 3798, // Estimated sum of room hours
    };

    const performanceData = [
        { month: 'Jan', revenue: 64244, profit: 24216, expenses: 40028 },
        { month: 'Feb', revenue: 64309, profit: -30, expenses: 64339 },
        { month: 'Mar', revenue: 34635, profit: -3079, expenses: 37714 },
        { month: 'Apr', revenue: 75336, profit: -13623, expenses: 88959 },
        { month: 'May', revenue: 100462, profit: 54917, expenses: 45545 },
        { month: 'Jun', revenue: 66925, profit: 20263, expenses: 46662 },
        { month: 'Jul', revenue: 74570, profit: 39736, expenses: 34834 },
        { month: 'Aug', revenue: 55623, profit: 15697, expenses: 39926 },
        { month: 'Sep', revenue: 50784, profit: 24304, expenses: 26480 },
        { month: 'Oct', revenue: 68807, profit: 19921, expenses: 48886 },
        { month: 'Nov', revenue: 69657, profit: 43595, expenses: 26062 },
        { month: 'Dec', revenue: 98331, profit: 54711, expenses: 43620 },
    ];

    const QuickStat = ({ title, value, icon: Icon, color, trend }: any) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="glass-card group p-6 rounded-3xl relative overflow-hidden"
        >
            <div className="flex justify-between items-start mb-6">
                <div className="stat-icon-container" style={{ color }}>
                    <Icon size={24} strokeWidth={2.5} />
                </div>
                {trend && (
                    <div className="flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                        <TrendingUp size={12} />
                        {trend}%
                    </div>
                )}
            </div>
            <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-black text-slate-800 tracking-tight">{value}</p>
                    {title === "توسع قاعدة العملاء" && (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">نمو سنوي</span>
                    )}
                </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-24 h-24 blur-3xl opacity-10 rounded-full" style={{ backgroundColor: color }}></div>
        </motion.div>
    );

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">الملخص التنفيذي 📊</h1>
                    <p className="text-slate-500 mt-1">نظرة سريعة على أداء الشركة السنوي بناءً على البيانات المحللة.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <QuickStat title="إجمالي الإيرادات" value={`${stats.totalRevenue.toLocaleString()} ج.م`} icon={DollarSign} color="#10b981" />
                <QuickStat title="صافي الأرباح" value={`${stats.totalProfit.toLocaleString()} ج.م`} icon={Target} color="#6366f1" trend={stats.avgMonthlyGrowth} />
                <QuickStat title="توسع قاعدة العملاء" value={`+${stats.totalCustomers.toLocaleString()}`} icon={Users} color="#8b5cf6" />
                <QuickStat title="نشاط الغرف" value={`${stats.activeRoomsHours} ساعة`} icon={Clock} color="#f59e0b" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-8 rounded-2xl">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-lg font-bold text-slate-800">اتجاهات النمو السنوي</h3>
                        <div className="flex gap-4 text-xs font-medium">
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> الإيرادات</span>
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500" /> المصروفات</span>
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#6366f1]" /> الأرباح</span>
                        </div>
                    </div>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.1} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.05} /><stop offset="95%" stopColor="#f43f5e" stopOpacity={0} /></linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                <YAxis hide />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="revenue" name="الإيرادات" stroke="#10b981" strokeWidth={3} fill="url(#colorRev)" />
                                <Area type="monotone" dataKey="expenses" name="المصروفات" stroke="#f43f5e" strokeWidth={2} fill="url(#colorExp)" strokeDasharray="5 5" />
                                <Area type="monotone" dataKey="profit" name="الأرباح" stroke="#6366f1" strokeWidth={3} fill="none" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                    <h3 className="text-lg font-bold text-slate-800 mb-8 font-sans">توزيع الأرباح الشهرية</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} />
                                <Bar dataKey="profit" name="الربح" radius={[4, 4, 0, 0]}>
                                    {performanceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.profit > 0 ? '#6366f1' : '#f43f5e'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-center text-xs text-slate-400 mt-4 italic">* توضح الأعمدة الحمراء الأشهر ذات العجز المالي</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
