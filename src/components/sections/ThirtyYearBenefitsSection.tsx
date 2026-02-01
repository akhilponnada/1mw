import React from 'react';
import { motion, useInView } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Calendar, Wallet, BadgePercent } from 'lucide-react';
import {
  PROJECT_CONFIG,
  getTotalEquity,
  generateProjectionData
} from '@/lib/projectConfig';

const ThirtyYearBenefitsSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const thirtyYearData = generateProjectionData(30);
  const lastYear = thirtyYearData[thirtyYearData.length - 1];
  const totalEquity = getTotalEquity();
  const roiMultiple = (lastYear.cumNetIncome / totalEquity).toFixed(0);

  const summaryStats = [
    { icon: Wallet, label: '30-Year Total Revenue', value: `₹${lastYear.cumRevenue.toFixed(0)}+ Cr`, color: 'text-amber-400' },
    { icon: TrendingUp, label: 'Before Tax Cashflow', value: `₹${lastYear.cumCashflow.toFixed(0)}+ Cr`, color: 'text-emerald-400' },
    { icon: BadgePercent, label: 'After Tax Returns', value: `₹${lastYear.cumNetIncome.toFixed(0)}+ Cr`, color: 'text-yellow-400' },
    { icon: Calendar, label: 'ROI on Equity', value: `${roiMultiple}x+`, color: 'text-amber-400' },
  ];

  return (
    <section id="30-year-benefits" className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Long-Term Vision</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
            View 30-Year Benefits
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
            Extended projections with before-tax and after-tax analysis
          </p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {summaryStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent text-2xl md:text-3xl font-display font-bold mb-1">
                {stat.value}
              </div>
              <span className="text-slate-400 text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cumulative Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
          >
            <h3 className="text-xl font-display font-semibold mb-6 text-white">Cumulative Revenue (30 Years)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={thirtyYearData}>
                  <defs>
                    <linearGradient id="cumRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="year"
                    stroke="#64748b"
                    tick={{ fill: '#64748b' }}
                    interval={4}
                  />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: '#64748b' }}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                    }}
                    formatter={(value: number) => [`₹${value.toFixed(2)} Cr`, 'Cumulative Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="cumRevenue"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="url(#cumRevenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Before vs After Tax Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
          >
            <h3 className="text-xl font-display font-semibold mb-6 text-white">Before Tax vs After Tax Returns</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={thirtyYearData}>
                  <defs>
                    <linearGradient id="beforeTaxGradient30" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="afterTaxGradient30" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="year"
                    stroke="#64748b"
                    tick={{ fill: '#64748b' }}
                    interval={4}
                  />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: '#64748b' }}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                    }}
                    formatter={(value: number, name: string) => [
                      `₹${value.toFixed(2)} Cr`,
                      name === 'cumCashflow' ? 'Before Tax' : 'After Tax'
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="cumCashflow"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#beforeTaxGradient30)"
                  />
                  <Area
                    type="monotone"
                    dataKey="cumNetIncome"
                    stroke="#eab308"
                    strokeWidth={2}
                    fill="url(#afterTaxGradient30)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 rounded bg-emerald-500" />
                <span className="text-sm text-slate-400">Before Tax</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 rounded bg-yellow-500" />
                <span className="text-sm text-slate-400">After Tax</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Year-by-Year Breakdown Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl px-6 py-4">
            <TrendingUp className="w-6 h-6 text-amber-400" />
            <div className="text-left">
              <span className="text-white font-medium">Repowering at Year 25</span>
              <p className="text-slate-400 text-sm">Technology upgrade extends asset life with new 25-year PPA potential</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThirtyYearBenefitsSection;
