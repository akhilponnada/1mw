import React from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, TrendingUp, Building2, Wallet, Landmark, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Steady Income Stream',
    description: 'Guaranteed revenue from 25-year PPA with assured tariff rates, providing predictable cash flows.'
  },
  {
    icon: Landmark,
    title: 'Real Asset Ownership',
    description: 'Tangible infrastructure asset with appreciating land value and residual equipment value.'
  },
  {
    icon: Building2,
    title: 'Inflation Hedge',
    description: 'Tariff escalation clauses protect against inflation while maintaining purchasing power of returns.'
  },
  {
    icon: Wallet,
    title: 'Tax Advantages',
    description: 'Accelerated depreciation benefits, GST input credits, and green energy tax incentives.'
  },
];

const keyFeatures = [
  'Zero operational management required',
  'Professional EPC & O&M by Unite Group',
  'Monthly revenue deposits to investor account',
  'Real-time monitoring dashboard access',
  'Quarterly performance reports',
  'Annual site visit & audit rights',
];

const InvestorBenefitsSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="investor-benefits" className="relative py-24 bg-slate-950">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Why Invest</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
            Investor Benefits
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
            A hassle-free investment with professional management and transparent reporting
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Benefits Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 group hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">{benefit.title}</h4>
                <p className="text-slate-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Key Features List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-display font-semibold text-white mb-6">
              What You <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">Get</span>
            </h3>
            <div className="space-y-4">
              {keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-white">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 pt-6 border-t border-slate-700/50"
            >
              <button className="group flex items-center gap-2 text-amber-400 font-medium hover:text-amber-300 transition-colors">
                Download Investor Deck
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InvestorBenefitsSection;
