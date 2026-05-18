import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Users,
    BarChart2,
    LayoutDashboard,
    Menu,
    X,
    LogOut,
    Bell,
    Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const menuItems = [
        { name: 'نظرة عامة', path: '/', icon: LayoutDashboard },
        { name: 'تحليل الاحتفاظ', path: '/retention', icon: Users },
        { name: 'الأداء المالي', path: '/financial', icon: BarChart2 },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans" dir="rtl">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="fixed inset-y-0 right-0 z-50 bg-white border-l border-slate-200 shadow-sm flex flex-col"
            >
                <div className="p-6 flex items-center justify-between">
                    <AnimatePresence mode="wait">
                        {isSidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-xl font-bold bg-gradient-to-l from-primary-600 to-primary-400 bg-clip-text text-transparent"
                            >
                                Cloud CRM
                            </motion.span>
                        )}
                    </AnimatePresence>
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${location.pathname === item.path
                                    ? 'bg-primary-50 text-primary-600 shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <item.icon className={`${location.pathname === item.path ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`} size={22} />
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="mr-3 font-medium whitespace-nowrap"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 space-y-2">
                    <button className="flex items-center w-full p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors group">
                        <Settings size={22} className="text-slate-400 group-hover:text-slate-600" />
                        {isSidebarOpen && <span className="mr-3 font-medium">الإعدادات</span>}
                    </button>
                    <button className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors group">
                        <LogOut size={22} className="text-red-400 group-hover:text-red-600" />
                        {isSidebarOpen && <span className="mr-3 font-medium">تسجيل الخروج</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main
                className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-[280px]' : 'mr-[80px]'}`}
            >
                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-semibold text-slate-800">
                            {menuItems.find(i => i.path === location.pathname)?.name || 'لوحة التحكم'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold border border-primary-200">
                            AS
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
