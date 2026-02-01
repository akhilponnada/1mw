import React from 'react';
import { motion, useInView } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Wallet, Building2, Clock, TrendingUp, Shield, Calendar } from 'lucide-react';
import {
  PROJECT_CONFIG,
  getTotalEquity,
  getTotalDebt,
  getTotalProjectCost,
  formatCurrency
} from '@/lib/projectConfig';

const FinancialStructureSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const totalEquity = getTotalEquity();
  const totalDebt = getTotalDebt();
  const totalCost = getTotalProjectCost();

  const capitalData = [
    { name: 'Equity (Margin Money)', value: totalEquity, color: '#f59e0b' },
    { name: 'Term Loan', value: totalDebt, color: '#10b981' },
  ];

  const financialDetails = [
    {
      icon: Wallet,
      label: 'Equity Required',
      value: `₹${PROJECT_CONFIG.equityPerMW} Cr / MW`,
      subValue: `Total: ₹${totalEquity.toFixed(2)} Cr`
    },
    {
      icon: Building2,
      label: 'Term Loan',
      value: `₹${PROJECT_CONFIG.debtPerMW} Cr / MW`,
      subValue: `Total: ₹${totalDebt.toFixed(2)} Cr`
    },
    {
      icon: Clock,
      label: 'Debt Tenure',
      value: `${PROJECT_CONFIG.loanTenure} Years`,
      subValue: 'Bank/NBFC'
    },
    {
      icon: TrendingUp,
      label: 'DSCR',
      value: '>1.4',
      subValue: 'Debt Service Coverage'
    },
    {
      icon: Shield,
      label: 'Interest Rate',
      value: `${PROJECT_CONFIG.interestRate}% p.a.`,
      subValue: 'Competitive Terms'
    },
    {
      icon: Calendar,
      label: 'Moratorium',
      value: `${PROJECT_CONFIG.moratoriumMonths} Months`,
      subValue: 'Grace Period'
    },
  ];

  return (
    <section id="financial-structure" className="relative py-24 bg-slate-950">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Capital Stack</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
            Financial Structure
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
            Optimized debt-equity structure for maximum returns
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8"
          >
            <h3 className="text-xl font-display font-semibold text-center mb-6 text-white">Capital Stack Distribution</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={capitalData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {capitalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`₹${value.toFixed(2)} Cr`, '']}
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f8fafc',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex justify-center gap-8 mt-4">
              {capitalData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-400">{item.name}</span>
                </div>
              ))}
            </div>
            {/* Center Stats */}
            <div className="text-center mt-6">
              <div className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent text-3xl font-display font-bold">
                ₹{totalCost.toFixed(2)} Cr
              </div>
              <div className="text-slate-400 text-sm">Total Project Cost</div>
            </div>
          </motion.div>

          {/* Financial Details Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {financialDetails.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index + 0.3 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 group hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <item.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-sm">{item.label}</span>
                    <div className="text-white text-xl font-semibold">{item.value}</div>
                    <span className="text-slate-500 text-xs">{item.subValue}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinancialStructureSection;
