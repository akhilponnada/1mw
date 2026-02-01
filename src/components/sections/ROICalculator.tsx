import React, { useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calculator, TrendingUp, Calendar, Wallet, BarChart3 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import {
  PROJECT_CONFIG,
  getTotalEquity,
  getTotalDebt,
  getTotalProjectCost,
  getAnnualEMI,
  getAnnualRevenue,
  getAnnualEBITDA,
  getNetCashflow,
  calculatePaybackPeriod,
  getEquityIRR,
  getProjectIRR,
  generateProjectionData
} from '@/lib/projectConfig';

const ROICalculator: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [tariff, setTariff] = useState(PROJECT_CONFIG.defaultTariff);
  const [years, setYears] = useState(25);

  const calculations = useMemo(() => {
    const totalEquity = getTotalEquity();
    const projectionData = generateProjectionData(years, tariff);
    const lastYear = projectionData[projectionData.length - 1];

    const paybackYears = calculatePaybackPeriod(tariff, years);
    const equityIRR = getEquityIRR(tariff, years);
    const projectIRR = getProjectIRR(tariff, years);
    const annualEMI = getAnnualEMI();

    const annualRevenue = projectionData[0].revenue;
    const totalRevenue = lastYear.cumRevenue;
    const lifetimeCashflow = lastYear.cumCashflow;
    const afterTaxReturn = lastYear.cumNetIncome;

    return {
      annualRevenue: annualRevenue.toFixed(2),
      totalRevenue: totalRevenue.toFixed(2),
      paybackYears: paybackYears.toFixed(1),
      equityIRR: equityIRR.toFixed(1),
      projectIRR: projectIRR.toFixed(1),
      lifetimeCashflow: lifetimeCashflow.toFixed(2),
      annualEMI: annualEMI.toFixed(2),
      beforeTaxReturn: lifetimeCashflow.toFixed(2),
      afterTaxReturn: afterTaxReturn.toFixed(2),
    };
  }, [tariff, years]);

  return (
    <section id="roi-calculator" className="relative py-24 bg-slate-950">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Interactive Tool</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
            ROI Calculator
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
            Customize your projections with different tariff scenarios
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-display font-semibold text-white">Adjust Parameters</h3>
            </div>

            {/* Tariff Slider */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <label className="text-white font-medium">PPA Tariff Rate</label>
                <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent font-bold text-xl">
                  ₹{tariff.toFixed(2)}/unit
                </span>
              </div>
              <Slider
                value={[tariff]}
                onValueChange={(value) => setTariff(value[0])}
                min={PROJECT_CONFIG.minTariff}
                max={PROJECT_CONFIG.maxTariff}
                step={0.25}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-slate-400 mt-2">
                <span>₹{PROJECT_CONFIG.minTariff.toFixed(2)}</span>
                <span>₹{PROJECT_CONFIG.maxTariff.toFixed(2)}</span>
              </div>
            </div>

            {/* Years Slider */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <label className="text-white font-medium">Investment Horizon</label>
                <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent font-bold text-xl">
                  {years} Years
                </span>
              </div>
              <Slider
                value={[years]}
                onValueChange={(value) => setYears(value[0])}
                min={10}
                max={30}
                step={5}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-slate-400 mt-2">
                <span>10 Years</span>
                <span>30 Years</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="pt-6 border-t border-slate-700/50">
              <span className="text-slate-400 text-sm mb-3 block">Quick Presets</span>
              <div className="flex gap-3">
                {[
                  { label: '₹4.00', value: 4 },
                  { label: '₹4.50', value: 4.5 },
                  { label: '₹5.00', value: 5 },
                ].map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setTariff(preset.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tariff === preset.value
                        ? 'bg-amber-500 text-slate-900'
                        : 'bg-slate-700/50 text-white hover:bg-slate-700'
                      }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Primary Results */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center">
                <TrendingUp className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <div className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent text-3xl font-display font-bold">
                  {calculations.equityIRR}%
                </div>
                <span className="text-slate-400 text-sm">Equity IRR</span>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center">
                <Calendar className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <div className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent text-3xl font-display font-bold">
                  {calculations.paybackYears}
                </div>
                <span className="text-slate-400 text-sm">Payback Years</span>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <h4 className="text-lg font-display font-semibold mb-4 text-white">Projected Returns</h4>
              <div className="space-y-4">
                {[
                  { label: 'Annual Revenue', value: `₹${calculations.annualRevenue} Cr`, icon: Wallet },
                  { label: 'Total Revenue (Lifetime)', value: `₹${calculations.totalRevenue} Cr`, icon: BarChart3 },
                  { label: 'Project IRR', value: `${calculations.projectIRR}%`, icon: TrendingUp },
                  { label: `Annual EMI (${PROJECT_CONFIG.loanTenure} yrs)`, value: `₹${calculations.annualEMI} Cr`, icon: Calendar },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-amber-400" />
                      <span className="text-slate-400">{item.label}</span>
                    </div>
                    <span className="text-white font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Before/After Tax */}
            <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl p-6">
              <h4 className="text-lg font-display font-semibold mb-4 text-white">
                {years}-Year Returns <span className="text-slate-400 text-sm">(Net Cashflow)</span>
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <span className="text-slate-400 text-sm block mb-1">Before Tax</span>
                  <div className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent text-2xl font-display font-bold">
                    ₹{calculations.beforeTaxReturn} Cr
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-slate-400 text-sm block mb-1">After Tax</span>
                  <div className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent text-2xl font-display font-bold">
                    ₹{calculations.afterTaxReturn} Cr
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
