import React, { useState, useMemo } from 'react';
import {
    BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Users, Award, TrendingUp, Search, Filter, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { rawRetentionData } from '../data/retentionData';

const RetentionPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory] = useState('all');

    const customerData = useMemo(() => {
        return rawRetentionData.trim().split('\n').map(line => {
            const [id, count] = line.split('\t');
            return { id, registrations: parseInt(count, 10) || 0 };
        });
    }, []);

    const stats = useMemo(() => {
        const total = customerData.reduce((sum, c) => sum + c.registrations, 0);
        const avgRegistrations = Math.round(total / (customerData.length || 1));
        const loyalCustomers = customerData.filter(c => c.registrations >= 50).length;

        return {
            totalCustomers: customerData.length,
            totalRegistrations: total,
            avgRegistrations,
            loyalCustomers,
            retentionRate: ((loyalCustomers / (customerData.length || 1)) * 100).toFixed(1)
        };
    }, [customerData]);

    const categoryData = useMemo(() => {
        const categories = [
            { name: 'عملاء VIP (100+)', count: 0, color: '#8b5cf6' },
            { name: 'عملاء مخلصين (50-99)', count: 0, color: '#3b82f6' },
            { name: 'عملاء منتظمين (20-49)', count: 0, color: '#10b981' },
            { name: 'عملاء عاديين (10-19)', count: 0, color: '#f59e0b' },
            { name: 'عملاء جدد (5-9)', count: 0, color: '#ef4444' },
            { name: 'عملاء نادرين (1-4)', count: 0, color: '#6b7280' }
        ];

        customerData.forEach(c => {
            if (c.registrations >= 100) categories[0].count++;
            else if (c.registrations >= 50) categories[1].count++;
            else if (c.registrations >= 20) categories[2].count++;
            else if (c.registrations >= 10) categories[3].count++;
            else if (c.registrations >= 5) categories[4].count++;
            else categories[5].count++;
        });

        return categories;
    }, [customerData]);

    const topCustomers = useMemo(() => {
        return [...customerData]
            .sort((a, b) => b.registrations - a.registrations)
            .slice(0, 15);
    }, [customerData]);

    const filteredCustomers = useMemo(() => {
        let filtered = customerData;
        if (searchTerm) {
            filtered = filtered.filter(c => c.id.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (filterCategory !== 'all') {
            filtered = filtered.filter(c => {
                switch (filterCategory) {
                    case 'vip': return c.registrations >= 100;
                    case 'loyal': return c.registrations >= 50 && c.registrations < 100;
                    default: return true;
                }
            });
        }
        return filtered.sort((a, b) => b.registrations - a.registrations);
    }, [customerData, searchTerm, filterCategory]);

    const StatCard = ({ title, value, icon: Icon, color, delay = 0 }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="glass-card group p-6 rounded-2xl border-l-4"
            style={{ borderLeftColor: color }}
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-slate-500 text-xs font-medium mb-1">{title}</p>
                    <p className="text-2xl font-black text-slate-800 tracking-tight">{value}</p>
                </div>
                <div className="stat-icon-container" style={{ color }}>
                    <Icon size={22} strokeWidth={2.5} />
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-8 pb-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="عدد العملاء الفريدين" value={stats.totalCustomers} icon={Users} color="#3b82f6" />
                <StatCard title="إجمالي التسجيلات" value={stats.totalRegistrations.toLocaleString()} icon={TrendingUp} color="#10b981" />
                <StatCard title="متوسط التسجيلات" value={stats.avgRegistrations} icon={Award} color="#8b5cf6" delay={0.1} />
                <StatCard title="معدل الاحتفاظ" value={`${stats.retentionRate}%`} icon={Users} color="#f59e0b" delay={0.2} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 font-sans">توزيع العملاء حسب الفئة</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="count"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">أفضل 15 عملاء</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topCustomers} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis
                                    dataKey="id"
                                    angle={-45}
                                    textAnchor="end"
                                    interval={0}
                                    height={80}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 11, fontWeight: '700', fill: '#1e293b' }}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="registrations" radius={[4, 4, 0, 0]}>
                                    {topCustomers.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#8b5cf6' : '#3b82f6'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Modern Table Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">قائمة العملاء التفصيلية</h3>
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative flex-1">
                            <Search className="absolute right-3 top-2.5 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="بحث بالكود..."
                                className="w-full pr-10 pl-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-400 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">كود العميل</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">التسجيلات</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">فئة العميل</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredCustomers.slice(0, 10).map((customer) => (
                                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-primary-600">{customer.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-700 font-medium">{customer.registrations}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${customer.registrations >= 100 ? 'bg-purple-100 text-purple-700' :
                                            customer.registrations >= 50 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {customer.registrations >= 100 ? 'VIP' : customer.registrations >= 50 ? 'Premium' : 'Standard'}
                                        </span>
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

export default RetentionPage;
