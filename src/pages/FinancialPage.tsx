import { useMemo } from 'react';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';
import { TrendingUp, DollarSign, Target, Home, Gift, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const FinancialPage = () => {
    const monthlyData = [
        { month: 'Jan', registrations: 1472, hours: '274:26', newCustomers: 198, expenses: 40028.3, spaceIncome: 46660, cateringIncome: 17507, cateringInvesting: 13371, cateringProfit: 4136, income: 64244, net: 24215.7 },
        { month: 'Feb', registrations: 1331, hours: '392:57', newCustomers: 155, expenses: 64339.1, spaceIncome: 53221.5, cateringIncome: 11082.2, cateringInvesting: 8222, cateringProfit: 2860.2, income: 64308.7, net: -30.4 },
        { month: 'Mar', registrations: 860, hours: '315:04', newCustomers: 124, expenses: 37714.4, spaceIncome: 30739, cateringIncome: 3884, cateringInvesting: 2044, cateringProfit: 1840, income: 34635, net: -3079.4 },
        { month: 'Apr', registrations: 1533, hours: '326:12', newCustomers: 218, expenses: 88958.95, spaceIncome: 57748, cateringIncome: 16564, cateringInvesting: 17993.25, cateringProfit: -1429.25, income: 75336, net: -13622.95 },
        { month: 'May', registrations: 1998, hours: '334:41', newCustomers: 310, expenses: 45545, spaceIncome: 77090.35, cateringIncome: 20835, cateringInvesting: 36861, cateringProfit: -16026, income: 100462.35, net: 54917.35 },
        { month: 'Jun', registrations: 1177, hours: '236:13', newCustomers: 165, expenses: 46662, spaceIncome: 49997, cateringIncome: 14359, cateringInvesting: 10347, cateringProfit: 4012, income: 66925, net: 20263 },
        { month: 'Jul', registrations: 1172, hours: '273:45', newCustomers: 97, expenses: 34834, spaceIncome: 58515, cateringIncome: 14766, cateringInvesting: 17840, cateringProfit: -3074, income: 74570, net: 39736 },
        { month: 'Aug', registrations: 958, hours: '350:36', newCustomers: 80, expenses: 39926, spaceIncome: 41094, cateringIncome: 14174, cateringInvesting: 15780, cateringProfit: -1606, income: 55623, net: 15697 },
        { month: 'Sep', registrations: 831, hours: '311:08', newCustomers: 82, expenses: 26479.5, spaceIncome: 41232, cateringIncome: 9482, cateringInvesting: 4486.5, cateringProfit: 4995.5, income: 50784, net: 24304.5 },
        { month: 'Oct', registrations: 1589, hours: '235:23', newCustomers: 235, expenses: 48886.29, spaceIncome: 53749.5, cateringIncome: 14757, cateringInvesting: 13144.29, cateringProfit: 1612.71, income: 68806.5, net: 19920.21 },
        { month: 'Nov', registrations: 1644, hours: '314:51', newCustomers: 193, expenses: 26062.25, spaceIncome: 53338.5, cateringIncome: 16187, cateringInvesting: 18709.5, cateringProfit: -2522.5, income: 69656.5, net: 43594.25 },
        { month: 'Dec', registrations: 2198, hours: '343:39', newCustomers: 239, expenses: 43619.55, spaceIncome: 82087.2, cateringIncome: 22472, cateringInvesting: 20754.58, cateringProfit: 1717.42, income: 98331.2, net: 54711.65 }
    ];

    const totals = useMemo(() => ({
        income: monthlyData.reduce((sum, m) => sum + m.income, 0),
        expenses: monthlyData.reduce((sum, m) => sum + m.expenses, 0),
        net: monthlyData.reduce((sum, m) => sum + m.net, 0),
        spaceIncome: monthlyData.reduce((sum, m) => sum + m.spaceIncome, 0),
        cateringIncome: monthlyData.reduce((sum, m) => sum + m.cateringIncome, 0),
        assetInvestment: 81375,
        socialGrants: 10000,
    }), []);

    const StatCard = ({ title, value, icon: Icon, color, delay = 0 }: any) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className="glass-card p-6 rounded-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-16 h-16 -mr-6 -mt-6 bg-slate-900/5 rounded-full blur-2xl"></div>
            <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-white shadow-sm border border-slate-100 rounded-xl" style={{ color }}>
                    <Icon size={22} />
                </div>
                <h4 className="text-slate-500 font-medium text-sm">{title}</h4>
            </div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </motion.div>
    );

    return (
        <div className="space-y-8 pb-12">
            {/* Top Summaries */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="إجمالي الدخل" value={`${Math.round(totals.income).toLocaleString()} ج.م`} icon={DollarSign} color="#10b981" />
                <StatCard title="إجمالي المصروفات" value={`${Math.round(totals.expenses).toLocaleString()} ج.م`} icon={Target} color="#f43f5e" delay={0.1} />
                <StatCard title="صافي الأرباح" value={`${Math.round(totals.net).toLocaleString()} ج.م`} icon={TrendingUp} color="#6366f1" delay={0.2} />
            </div>

            {/* Special Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5 rounded-2xl flex items-center gap-5 border-l-4 border-amber-400">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shadow-sm">
                        <Home size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs font-medium mb-0.5">الاستثمار في الأصول (إجمالي السنة)</p>
                        <p className="text-xl font-black text-slate-800 tracking-tight">{totals.assetInvestment.toLocaleString()} ج.م</p>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5 rounded-2xl flex items-center gap-5 border-l-4 border-purple-400">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shadow-sm">
                        <Gift size={24} />
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs font-medium mb-0.5">منح ومكافآت اجتماعية (موظف النظافة)</p>
                        <p className="text-xl font-black text-slate-800 tracking-tight">{totals.socialGrants.toLocaleString()} ج.م</p>
                    </div>
                </motion.div>
            </div>

            {/* Critical Performance Insight */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6 rounded-2xl border-r-4 border-rose-500 bg-rose-50/30">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="p-4 bg-rose-100 text-rose-600 rounded-2xl">
                        <AlertTriangle size={32} />
                    </div>
                    <div className="flex-1 space-y-2">
                        <h4 className="text-rose-900 font-bold text-lg flex items-center gap-2">
                            تنبيه: أداء قطاع المقصف والكاترينج
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
                            <div className="bg-white/60 p-3 rounded-xl border border-rose-100">
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">استثمار البضاعة</p>
                                <p className="text-lg font-bold text-slate-800">180,000 ج.م</p>
                            </div>
                            <div className="bg-white/60 p-3 rounded-xl border border-rose-100">
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">المبيعات المتوقعة</p>
                                <p className="text-lg font-bold text-slate-800">235,000 ج.م</p>
                            </div>
                            <div className="bg-rose-100 p-3 rounded-xl border border-rose-200">
                                <p className="text-rose-700 text-[10px] uppercase font-bold tracking-wider">الربح الفعلي</p>
                                <p className="text-lg font-bold text-rose-700">-500 ج.م</p>
                            </div>
                        </div>
                        <p className="text-rose-800 text-sm leading-relaxed font-medium">
                            <span className="font-bold underline">تحليل:</span> تعود هذه الفجوة الكبيرة في الأداء المالي إلى عدم وجود رقابة مباشرة وفعالة على عمليات البيع والشراء، مما أدى لخسارة كامل العائد المتوقع.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Main Financial Area Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 rounded-2xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">تحليل الإيرادات والمصروفات</h3>
                        <p className="text-slate-500 text-sm mt-1">مقارنة شهرية للأداء المالي العام</p>
                    </div>
                </div>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyData}>
                            <defs>
                                <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.2} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                                <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1} /><stop offset="95%" stopColor="#f43f5e" stopOpacity={0} /></linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                            <YAxis hide />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Area type="monotone" dataKey="income" name="إجمالي الدخل" stroke="#10b981" strokeWidth={3} fill="url(#colorInc)" />
                            <Area type="monotone" dataKey="expenses" name="المصروفات" stroke="#f43f5e" strokeWidth={2} fill="url(#colorExp)" strokeDasharray="5 5" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Space vs Catering */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8 rounded-2xl">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">مصادر الدخل التفصيلية</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData} stackOffset="expand">
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="spaceIncome" name="إيجار المساحات" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="cateringIncome" name="خدمات الطعام" stackId="a" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Catering Profitability */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-8 rounded-2xl">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">هامش ربح خدمات الطعام</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="cateringProfit" name="صافي ربح الطعام" stroke="#f59e0b" strokeWidth={4} dot={{ r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} />
                                <Line type="monotone" dataKey="cateringInvesting" name="استثمار الطعام" stroke="#cbd5e1" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Detailed Table */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800">جدول البيانات المالية الكامل</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 text-slate-600 font-semibold">الشهر</th>
                                <th className="p-4 text-slate-600 font-semibold">الساعات</th>
                                <th className="p-4 text-slate-600 font-semibold">دخل المساحة</th>
                                <th className="p-4 text-slate-600 font-semibold">دخل الطعام</th>
                                <th className="p-4 text-slate-600 font-semibold">إجمالي الدخل</th>
                                <th className="p-4 text-slate-600 font-semibold">صافي الربح</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {monthlyData.map((row) => (
                                <tr key={row.month} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-bold text-slate-800">{row.month}</td>
                                    <td className="p-4 text-slate-500 font-mono text-xs">{row.hours}</td>
                                    <td className="p-4 text-primary-600 font-medium">{Math.round(row.spaceIncome).toLocaleString()}</td>
                                    <td className="p-4 text-amber-600 font-medium">{Math.round(row.cateringIncome).toLocaleString()}</td>
                                    <td className="p-4 font-bold text-slate-800">{Math.round(row.income).toLocaleString()}</td>
                                    <td className={`p-4 font-bold ${row.net >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {Math.round(row.net).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default FinancialPage;
