import React from 'react';
import { motion, useInView } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AnimatedCounter from '@/components/AnimatedCounter';
import {
  PROJECT_CONFIG,
  generateProjectionData,
  getEquityIRR,
  getProjectIRR,
  calculatePaybackPeriod,
  getAnnualGenerationMU
} from '@/lib/projectConfig';

const RevenueReturnsSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const revenueData = generateProjectionData(25);
  const lastYearData = revenueData[revenueData.length - 1];

  const equityIRR = getEquityIRR();
  const projectIRR = getProjectIRR();
  const paybackYears = calculatePaybackPeriod();
  const annualGeneration = getAnnualGenerationMU(1);

  const assumptions = [
    { label: 'CUF', value: `${(PROJECT_CONFIG.cuf * 100).toFixed(0)}%` },
    { label: 'Annual Generation', value: `~${annualGeneration.toFixed(2)} MU` },
    { label: 'Average Tariff', value: `₹${PROJECT_CONFIG.defaultTariff}/unit` },
    { label: 'Annual Revenue', value: `₹${revenueData[0].revenue.toFixed(2)} Cr` },
    { label: 'EBITDA Margin', value: `${(PROJECT_CONFIG.ebitdaMargin * 100).toFixed(0)}%` },
  ];

  const keyMetrics = [
    { end: lastYearData.cumCashflow, suffix: '+', label: 'Lifetime Cashflow (₹ Cr)', duration: 2500 },
    { end: paybackYears, decimals: 1, label: 'Payback Period (Years)', duration: 2000 },
    { end: projectIRR, suffix: '%', label: 'Project IRR', duration: 2000 },
    { end: equityIRR, suffix: '%', label: 'Equity IRR', duration: 2000 },
  ];

  return (
    <section id="revenue-returns" className="relative py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Financial Projections</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
            Revenue & Returns
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
            25-year guaranteed returns with locked PPA rates
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {keyMetrics.map((metric, index) => (
            <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
              <AnimatedCounter
                end={metric.end}
                duration={metric.duration}
                decimals={metric.decimals || 0}
                suffix={metric.suffix || ''}
                prefix={metric.label.includes('₹') ? '₹' : ''}
                label={metric.label}
              />
            </div>
          ))}
        </motion.div>

        {/* Assumptions & Chart */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Assumptions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
          >
            <h3 className="text-xl font-display font-semibold mb-6 text-white">Key Assumptions</h3>
            <div className="space-y-4">
              {assumptions.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-slate-700/50 last:border-0">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="text-amber-400 font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
          >
            <h3 className="text-xl font-display font-semibold mb-6 text-white">25-Year Revenue Curve</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
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
                      name === 'revenue' ? 'Annual Revenue' : 'Cumulative Revenue'
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="cumRevenue"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#cumulativeGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 rounded bg-amber-500" />
                <span className="text-sm text-slate-400">Annual Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 rounded bg-emerald-500" />
                <span className="text-sm text-slate-400">Cumulative Revenue</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RevenueReturnsSection;
