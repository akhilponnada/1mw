import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import {
  MapPin,
  Cpu,
  Zap,
  Building,
  Monitor,
  FileCheck,
  Shield,
  Fence,
  Wrench,
  ShieldCheck,
  Sparkles,
  BarChart3,
  Landmark
} from 'lucide-react';
import { PROJECT_CONFIG, getTotalProjectCost, formatCurrency } from '@/lib/projectConfig';

const costItems = [
  { icon: MapPin, label: 'Land & Development' },
  { icon: Cpu, label: 'Tier-1 Modules & Inverters' },
  { icon: Zap, label: 'HT Transmission Line' },
  { icon: Building, label: 'Substation Bay Extension' },
  { icon: Monitor, label: 'SCADA & Remote Monitoring' },
  { icon: FileCheck, label: 'Open Access Approvals & PPA' },
  { icon: Shield, label: 'Liaisoning & Statutory Charges' },
  { icon: Fence, label: 'Fencing, Roads & Drainage' },
  { icon: Wrench, label: '5-Year Comprehensive AMC' },
  { icon: ShieldCheck, label: '5-Year Insurance' },
  { icon: Sparkles, label: '5-Year Module Cleaning' },
  { icon: BarChart3, label: 'Energy Forecasting & Scheduling' },
  { icon: Landmark, label: 'Finance Arrangement Support' },
];

const ProjectCostSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const totalCost = getTotalProjectCost();

  return (
    <section id="project-cost" className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Investment Breakdown</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
            Project Cost Structure
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
            Comprehensive all-inclusive pricing with zero hidden costs
          </p>
        </motion.div>

        {/* Cost Highlight Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center hover:border-amber-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-slate-400 text-sm">Cost Per MW</span>
            <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent text-4xl md:text-5xl font-display font-bold mt-2">
              ₹{PROJECT_CONFIG.costPerMW} Cr
            </div>
            <p className="text-white mt-3 font-medium">All Inclusive</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative overflow-hidden group bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center hover:border-amber-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-slate-400 text-sm">Total for {PROJECT_CONFIG.totalMW} MW</span>
            <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent text-4xl md:text-5xl font-display font-bold mt-2">
              ₹{totalCost.toFixed(2)} Cr
            </div>
            <p className="text-white mt-3 font-medium">Complete Project</p>
          </motion.div>
        </div>

        {/* What's Included Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-display font-semibold text-center mb-8 text-white">
            What's <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">Included</span>
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {costItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="flex items-center gap-4 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 group cursor-default hover:border-amber-500/30 hover:bg-slate-800/80 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <item.icon className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-white font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Unite Group Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-2 bg-slate-800/50 border border-amber-500/20 rounded-xl px-8 py-5">
            <span className="text-slate-400 text-sm">Delivered By</span>
            <span className="text-white font-display font-semibold text-lg">Unite Group Inc. USA</span>
            <span className="text-slate-500 text-sm">Unite Developers Global Inc</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectCostSection;
