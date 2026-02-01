import React from 'react';
import { motion, useInView } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Percent, Clock, ShieldCheck } from 'lucide-react';
import { getEquityIRR, calculatePaybackPeriod } from '@/lib/projectConfig';

const ComparisonSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const solarIRR = getEquityIRR();
  const solarPayback = calculatePaybackPeriod();

  const comparisonData = [
    { name: 'Fixed Deposit', returns: 7, color: '#64748b', payback: '10+ years', risk: 'Low' },
    { name: 'Mutual Funds', returns: 12, color: '#3b82f6', payback: '8-10 years', risk: 'Medium-High' },
    { name: 'Real Estate', returns: 10, color: '#8b5cf6', payback: '15+ years', risk: 'Medium' },
    { name: 'Gold', returns: 8, color: '#eab308', payback: '12+ years', risk: 'Medium' },
    { name: 'Solar PPA', returns: Math.round(solarIRR), color: '#f59e0b', payback: `${solarPayback.toFixed(1)} years`, risk: 'Low' },
  ];

  const comparisonFeatures = [
    { feature: 'Guaranteed Returns', solar: true, fd: true, mf: false, re: false, gold: false },
    { feature: 'Inflation Protection', solar: true, fd: false, mf: true, re: true, gold: true },
    { feature: 'Asset Ownership', solar: true, fd: false, mf: false, re: true, gold: true },
    { feature: 'Tax Benefits', solar: true, fd: false, mf: true, re: true, gold: false },
    { feature: 'ESG Compliant', solar: true, fd: false, mf: false, re: false, gold: false },
    { feature: 'Passive Income', solar: true, fd: true, mf: false, re: true, gold: false },
  ];

  return (
    <section id="comparison" className="relative py-24 bg-slate-950">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Smart Investment</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
            Compare Your Options
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
            See how solar investment stacks up against traditional investment avenues
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Returns Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
          >
            <h3 className="text-xl font-display font-semibold mb-6 text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              Expected Returns Comparison
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="#64748b"
                    tick={{ fill: '#64748b' }}
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 30]}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8' }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                    }}
                    formatter={(value: number) => [`${value}% IRR`, 'Returns']}
                  />
                  <Bar dataKey="returns" radius={[0, 4, 4, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {comparisonData.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className={`bg-slate-800/50 border rounded-xl p-5 ${item.name === 'Solar PPA' ? 'border-amber-500/50 bg-amber-500/5' : 'border-slate-700/50'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className={`font-medium ${item.name === 'Solar PPA' ? 'text-amber-400' : 'text-white'}`}>
                      {item.name}
                    </span>
                    {item.name === 'Solar PPA' && (
                      <span className="text-xs bg-amber-500 text-slate-900 px-2 py-0.5 rounded-full font-medium">
                        BEST
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <Percent className="w-4 h-4 text-slate-500" />
                      <span className="text-white font-medium">{item.returns}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-400">{item.payback}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-400">{item.risk}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-4 text-slate-400 font-medium">Feature</th>
                <th className="text-center py-4 px-4 text-amber-400 font-medium bg-amber-500/5">Solar PPA</th>
                <th className="text-center py-4 px-4 text-slate-400 font-medium">FD</th>
                <th className="text-center py-4 px-4 text-slate-400 font-medium">Mutual Funds</th>
                <th className="text-center py-4 px-4 text-slate-400 font-medium">Real Estate</th>
                <th className="text-center py-4 px-4 text-slate-400 font-medium">Gold</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row, index) => (
                <tr key={index} className="border-b border-slate-800">
                  <td className="py-3 px-4 text-white">{row.feature}</td>
                  <td className="py-3 px-4 text-center bg-amber-500/5">
                    {row.solar ? '✓' : '✗'}
                  </td>
                  <td className="py-3 px-4 text-center text-slate-400">
                    {row.fd ? '✓' : '✗'}
                  </td>
                  <td className="py-3 px-4 text-center text-slate-400">
                    {row.mf ? '✓' : '✗'}
                  </td>
                  <td className="py-3 px-4 text-center text-slate-400">
                    {row.re ? '✓' : '✗'}
                  </td>
                  <td className="py-3 px-4 text-center text-slate-400">
                    {row.gold ? '✓' : '✗'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
