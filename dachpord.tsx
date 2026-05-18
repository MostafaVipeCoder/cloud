import React, { useState, useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, TrendingUp, Award, Search, Filter } from 'lucide-react';

const CustomerRetentionDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const rawData = `NA	2639
R1	363
R3	243
R2	191
A087	178
D017	177
B680	132
E165	128
C711	125
E913	110
E161	107
EN1	99
A736	94
E264	91
Ry	89
E474	81
E912	76
B285	74
A439	69
E630	62
F286	62
UPS	62
A385	61
A250	60
E911	58
B427	56
B233	55
D199	54
F103	52
A074	51
D048	51
D417	51
E342	51
A503	48
F104	48
A654	45
E519	43
A135	42
A779	42
B399	42
D828	42
Fy1	42
R4	42
C945	41
E027	41
D118	39
E225	38
A906	37
D103	37
F051	37
A394	36
ASH	36
E248	36`;

  const customerData = useMemo(() => {
    return rawData.split('\n').map(line => {
      const [id, count] = line.split('\t');
      return { id: id.trim(), registrations: parseInt(count) };
    });
  }, []);

  const stats = useMemo(() => {
    const total = customerData.reduce((sum, c) => sum + c.registrations, 0);
    const avgRegistrations = Math.round(total / customerData.length);
    const loyalCustomers = customerData.filter(c => c.registrations >= 50).length;
    const newCustomers = customerData.filter(c => c.registrations <= 5).length;
    
    return {
      totalCustomers: customerData.length,
      totalRegistrations: total,
      avgRegistrations,
      loyalCustomers,
      newCustomers,
      retentionRate: ((loyalCustomers / customerData.length) * 100).toFixed(1)
    };
  }, [customerData]);

  const categoryData = useMemo(() => {
    const categories = [
      { name: 'عملاء VIP (100+)', count: 0, color: '#10b981' },
      { name: 'عملاء مخلصين (50-99)', count: 0, color: '#3b82f6' },
      { name: 'عملاء منتظمين (20-49)', count: 0, color: '#8b5cf6' },
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
      .slice(0, 20);
  }, [customerData]);

  const distributionData = useMemo(() => {
    const ranges = [
      { range: '1-10', count: 0 },
      { range: '11-20', count: 0 },
      { range: '21-30', count: 0 },
      { range: '31-50', count: 0 },
      { range: '51-100', count: 0 },
      { range: '100+', count: 0 }
    ];

    customerData.forEach(c => {
      if (c.registrations <= 10) ranges[0].count++;
      else if (c.registrations <= 20) ranges[1].count++;
      else if (c.registrations <= 30) ranges[2].count++;
      else if (c.registrations <= 50) ranges[3].count++;
      else if (c.registrations <= 100) ranges[4].count++;
      else ranges[5].count++;
    });

    return ranges;
  }, [customerData]);

  const filteredCustomers = useMemo(() => {
    let filtered = customerData;

    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(c => {
        switch(filterCategory) {
          case 'vip': return c.registrations >= 100;
          case 'loyal': return c.registrations >= 50 && c.registrations < 100;
          case 'regular': return c.registrations >= 20 && c.registrations < 50;
          case 'normal': return c.registrations >= 10 && c.registrations < 20;
          case 'new': return c.registrations >= 5 && c.registrations < 10;
          case 'rare': return c.registrations < 5;
          default: return true;
        }
      });
    }

    return filtered.sort((a, b) => b.registrations - a.registrations);
  }, [customerData, searchTerm, filterCategory]);

  const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-r-4" style={{ borderColor: color }}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">لوحة تحكم الاحتفاظ بالعملاء</h1>
          <p className="text-gray-600">تحليل شامل لسلوك العملاء ومعدلات الاحتفاظ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="إجمالي العملاء"
            value={stats.totalCustomers.toLocaleString()}
            icon={Users}
            color="#3b82f6"
          />
          <StatCard
            title="إجمالي التسجيلات"
            value={stats.totalRegistrations.toLocaleString()}
            icon={TrendingUp}
            color="#10b981"
          />
          <StatCard
            title="متوسط التسجيلات"
            value={stats.avgRegistrations}
            subtitle="لكل عميل"
            icon={Award}
            color="#8b5cf6"
          />
          <StatCard
            title="معدل الاحتفاظ"
            value={`${stats.retentionRate}%`}
            subtitle={`${stats.loyalCustomers} عميل مخلص`}
            icon={Users}
            color="#10b981"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">توزيع العملاء حسب الفئة</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.count}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">توزيع عدد التسجيلات</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">أفضل 20 عميل</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topCustomers} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="id" type="category" width={60} />
              <Tooltip />
              <Bar dataKey="registrations" fill="#10b981">
                {topCustomers.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.registrations >= 100 ? '#10b981' : '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="ابحث عن عميل..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">كل الفئات</option>
                <option value="vip">VIP (100+)</option>
                <option value="loyal">مخلصين (50-99)</option>
                <option value="regular">منتظمين (20-49)</option>
                <option value="normal">عاديين (10-19)</option>
                <option value="new">جدد (5-9)</option>
                <option value="rare">نادرين (1-4)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-right">#</th>
                  <th className="p-3 text-right">كود العميل</th>
                  <th className="p-3 text-right">عدد التسجيلات</th>
                  <th className="p-3 text-right">الفئة</th>
                  <th className="p-3 text-right">نسبة المساهمة</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.slice(0, 50).map((customer, index) => {
                  const percentage = ((customer.registrations / stats.totalRegistrations) * 100).toFixed(2);
                  let category = '';
                  let categoryColor = '';
                  
                  if (customer.registrations >= 100) {
                    category = 'VIP';
                    categoryColor = 'bg-green-100 text-green-800';
                  } else if (customer.registrations >= 50) {
                    category = 'مخلص';
                    categoryColor = 'bg-blue-100 text-blue-800';
                  } else if (customer.registrations >= 20) {
                    category = 'منتظم';
                    categoryColor = 'bg-purple-100 text-purple-800';
                  } else if (customer.registrations >= 10) {
                    category = 'عادي';
                    categoryColor = 'bg-yellow-100 text-yellow-800';
                  } else if (customer.registrations >= 5) {
                    category = 'جديد';
                    categoryColor = 'bg-orange-100 text-orange-800';
                  } else {
                    category = 'نادر';
                    categoryColor = 'bg-gray-100 text-gray-800';
                  }

                  return (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{index + 1}</td>
                      <td className="p-3 font-bold text-blue-600">{customer.id}</td>
                      <td className="p-3 font-semibold">{customer.registrations.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
                          {category}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${Math.min(parseFloat(percentage) * 5, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredCustomers.length > 50 && (
              <p className="text-center text-gray-500 mt-4">
                عرض 50 من {filteredCustomers.length} عميل
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {categoryData.map((cat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800">{cat.name}</h3>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.color }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: cat.color }}>{cat.count}</p>
              <p className="text-sm text-gray-600 mt-1">
                {((cat.count / stats.totalCustomers) * 100).toFixed(1)}% من إجمالي العملاء
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerRetentionDashboard;



import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Clock, UserPlus } from 'lucide-react';

const Dashboard = () => {
  const [view, setView] = useState('overview');

  const monthlyData = [
    { month: 'Jan', registrations: 1472, hours: 274.44, newCustomers: 198, income: 64244, expenses: 40028.3, net: 24215.7 },
    { month: 'Feb', registrations: 1331, hours: 392.96, newCustomers: 155, income: 64308.7, expenses: 64339.1, net: -30.4 },
    { month: 'Mar', registrations: 860, hours: 315.07, newCustomers: 124, income: 34635, expenses: 37714.4, net: -3079.4 },
    { month: 'Apr', registrations: 1533, hours: 326.21, newCustomers: 218, income: 75336, expenses: 88958.95, net: -13622.95 },
    { month: 'May', registrations: 1998, hours: 334.69, newCustomers: 310, income: 100462.35, expenses: 45545, net: 54917.35 },
    { month: 'Jun', registrations: 1177, hours: 236.22, newCustomers: 165, income: 66925, expenses: 46662, net: 20263 },
    { month: 'Jul', registrations: 1172, hours: 273.75, newCustomers: 97, income: 74570, expenses: 34834, net: 39736 },
    { month: 'Aug', registrations: 958, hours: 350.61, newCustomers: 80, income: 55623, expenses: 39926, net: 15697 },
    { month: 'Sep', registrations: 831, hours: 311.14, newCustomers: 82, income: 50784, expenses: 26479.5, net: 24304.5 },
    { month: 'Oct', registrations: 1589, hours: 235.39, newCustomers: 235, income: 68806.5, expenses: 48886.29, net: 19920.21 },
    { month: 'Nov', registrations: 1644, hours: 314.86, newCustomers: 193, income: 69656.5, expenses: 26062.25, net: 43594.25 },
    { month: 'Dec', registrations: 2198, hours: 343.65, newCustomers: 239, income: 98331.2, expenses: 33619.55, net: 64711.65 }
  ];

  const totals = {
    registrations: monthlyData.reduce((sum, m) => sum + m.registrations, 0),
    hours: monthlyData.reduce((sum, m) => sum + m.hours, 0),
    newCustomers: monthlyData.reduce((sum, m) => sum + m.newCustomers, 0),
    income: monthlyData.reduce((sum, m) => sum + m.income, 0),
    expenses: monthlyData.reduce((sum, m) => sum + m.expenses, 0),
    net: monthlyData.reduce((sum, m) => sum + m.net, 0)
  };

  const avgMonthly = {
    registrations: Math.round(totals.registrations / 12),
    hours: Math.round(totals.hours / 12),
    newCustomers: Math.round(totals.newCustomers / 12),
    income: Math.round(totals.income / 12),
    expenses: Math.round(totals.expenses / 12),
    net: Math.round(totals.net / 12)
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-r-4" style={{ borderColor: color }}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );

  const COLORS = ['#3b82f6', '#ef4444', '#10b981'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">لوحة التحكم المالية والإحصائية</h1>
          <p className="text-gray-600">نظرة شاملة على أداء العام</p>
        </div>

        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setView('overview')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              view === 'overview' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            نظرة عامة
          </button>
          <button
            onClick={() => setView('financial')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              view === 'financial' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            التحليل المالي
          </button>
          <button
            onClick={() => setView('operations')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              view === 'operations' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            العمليات
          </button>
        </div>

        {view === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="إجمالي التسجيلات"
                value={totals.registrations.toLocaleString()}
                icon={Users}
                color="#3b82f6"
                subtitle={`متوسط ${avgMonthly.registrations.toLocaleString()} شهرياً`}
              />
              <StatCard
                title="إجمالي ساعات الإيجار"
                value={`${Math.round(totals.hours)} ساعة`}
                icon={Clock}
                color="#8b5cf6"
                subtitle={`متوسط ${avgMonthly.hours} ساعة شهرياً`}
              />
              <StatCard
                title="عملاء جدد"
                value={totals.newCustomers.toLocaleString()}
                icon={UserPlus}
                color="#10b981"
                subtitle={`متوسط ${avgMonthly.newCustomers} شهرياً`}
              />
              <StatCard
                title="إجمالي الدخل"
                value={`${totals.income.toLocaleString()} ج.م`}
                icon={DollarSign}
                color="#059669"
                subtitle={`متوسط ${avgMonthly.income.toLocaleString()} ج.م شهرياً`}
              />
              <StatCard
                title="إجمالي المصروفات"
                value={`${Math.round(totals.expenses).toLocaleString()} ج.م`}
                icon={TrendingDown}
                color="#ef4444"
                subtitle={`متوسط ${avgMonthly.expenses.toLocaleString()} ج.م شهرياً`}
              />
              <StatCard
                title="صافي الربح"
                value={`${Math.round(totals.net).toLocaleString()} ج.م`}
                icon={totals.net >= 0 ? TrendingUp : TrendingDown}
                color={totals.net >= 0 ? '#10b981' : '#ef4444'}
                subtitle={`متوسط ${avgMonthly.net.toLocaleString()} ج.م شهرياً`}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">التسجيلات الشهرية</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="registrations" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">العملاء الجدد شهرياً</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="newCustomers" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {view === 'financial' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">الأداء المالي الشهري</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${Math.round(value).toLocaleString()} ج.م`} />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="الدخل" />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="المصروفات" />
                  <Line type="monotone" dataKey="net" stroke="#3b82f6" strokeWidth={2} name="صافي الربح" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">صافي الربح الشهري</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Math.round(value).toLocaleString()} ج.م`} />
                    <Bar dataKey="net" fill="#3b82f6">
                      {monthlyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.net >= 0 ? '#10b981' : '#ef4444'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">التوزيع المالي السنوي</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'الدخل', value: totals.income },
                        { name: 'المصروفات', value: totals.expenses },
                        { name: 'الربح', value: totals.net }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${Math.round(entry.value).toLocaleString()}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${Math.round(value).toLocaleString()} ج.م`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {view === 'operations' && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">ساعات الإيجار الشهرية</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${Math.round(value)} ساعة`} />
                  <Bar dataKey="hours" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">جدول البيانات الشهرية</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-right">الشهر</th>
                      <th className="p-3 text-right">التسجيلات</th>
                      <th className="p-3 text-right">ساعات الإيجار</th>
                      <th className="p-3 text-right">عملاء جدد</th>
                      <th className="p-3 text-right">الدخل</th>
                      <th className="p-3 text-right">المصروفات</th>
                      <th className="p-3 text-right">صافي الربح</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyData.map((row, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{row.month}</td>
                        <td className="p-3">{row.registrations.toLocaleString()}</td>
                        <td className="p-3">{Math.round(row.hours)}</td>
                        <td className="p-3">{row.newCustomers}</td>
                        <td className="p-3">{Math.round(row.income).toLocaleString()}</td>
                        <td className="p-3">{Math.round(row.expenses).toLocaleString()}</td>
                        <td className={`p-3 font-medium ${row.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {Math.round(row.net).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;