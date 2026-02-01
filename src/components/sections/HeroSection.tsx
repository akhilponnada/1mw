import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, ChevronDown } from 'lucide-react';
import {
  PROJECT_CONFIG,
  getTotalProjectCost,
  getEquityIRR,
  calculatePaybackPeriod,
  generateProjectionData
} from '@/lib/projectConfig';
import heroImage from '@/assets/hero-solar-plant.jpg';

const HeroSection: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate dynamic values
  const totalCost = getTotalProjectCost();
  const projectionData = generateProjectionData(25);
  const lifetimeRevenue = projectionData[projectionData.length - 1].cumRevenue;
  const equityIRR = getEquityIRR();
  const paybackYears = calculatePaybackPeriod();

  const stats = [
    { value: `₹${totalCost.toFixed(2)}`, label: 'Cr Total Investment' },
    { value: `${equityIRR.toFixed(0)}-${(equityIRR + 5).toFixed(0)}%`, label: 'Expected IRR' },
    { value: `₹${lifetimeRevenue.toFixed(0)}+`, label: 'Cr Lifetime Revenue' },
    { value: paybackYears.toFixed(1), label: 'Years Payback' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Solar Power Plant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-5 py-2.5 mb-8"
        >
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-amber-400 text-sm font-medium tracking-wide">Investment Opportunity • 2025</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-5xl md:text-6xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">{PROJECT_CONFIG.totalMW} MW Open Access</span>
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
            Solar Power Plant
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 mb-4 font-medium"
        >
          25-Year Assured Revenue @ ₹{PROJECT_CONFIG.minTariff}–₹{PROJECT_CONFIG.maxTariff}/unit | Bankable Returns | ESG Asset
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-slate-400 text-lg mb-12 max-w-3xl mx-auto"
        >
          All-Inclusive Project | Grid-Ready | Finance-Supported | Zero Operational Risk
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25 transition-all duration-300 hover:shadow-amber-500/40 hover:scale-105"
          >
            <Phone className="w-5 h-5 mr-2" />
            Schedule Investor Call
          </Button>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-amber-500/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent text-2xl md:text-3xl font-display font-bold">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => scrollToSection('location')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-amber-400 transition-colors"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
