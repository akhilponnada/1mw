import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, FileCheck, Lock, Users, Scale, Leaf } from 'lucide-react';

const riskMitigationItems = [
  {
    icon: FileCheck,
    title: '25-Year Power Purchase Agreement',
    description: 'Long-term PPA with creditworthy off-taker ensures stable, predictable revenue stream throughout project life.',
    highlight: 'Guaranteed Offtake'
  },
  {
    icon: Shield,
    title: 'Comprehensive Insurance Coverage',
    description: 'All-risk insurance covering equipment, business interruption, natural calamities, and third-party liability.',
    highlight: '5-Year Coverage'
  },
  {
    icon: Lock,
    title: 'Escrow Account Mechanism',
    description: 'Payment security through escrow arrangements ensuring timely receipt of tariff payments from off-taker.',
    highlight: 'Payment Security'
  },
  {
    icon: Users,
    title: 'Experienced O&M Partner',
    description: 'Professional operations and maintenance by experienced solar EPC company with guaranteed uptime commitments.',
    highlight: 'Performance Guarantee'
  },
  {
    icon: Scale,
    title: 'Regulatory Framework Support',
    description: 'Operating under state electricity regulatory commission guidelines with established dispute resolution mechanisms.',
    highlight: 'Legal Protection'
  },
  {
    icon: Leaf,
    title: 'Technology Risk Mitigation',
    description: 'Tier-1 bankable modules with 25-year performance warranty, backed by manufacturer guarantees and insurance.',
    highlight: 'Equipment Warranty'
  },
];

const RiskMitigationSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="risk-mitigation" className="relative py-24 bg-slate-900">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Security First</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
            Risk Mitigation Framework
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
            Comprehensive protection mechanisms to safeguard your investment
          </p>
        </motion.div>

        {/* Risk Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {riskMitigationItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="group bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 shrink-0 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <item.icon className="w-7 h-7 text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">
                      {item.highlight}
                    </span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-emerald-500/10 via-slate-800/50 to-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Shield className="w-6 h-6 text-emerald-400" />
            <span className="text-white font-semibold text-lg">Bankable Project Structure</span>
          </div>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Project structure designed to meet institutional lending requirements with comprehensive due diligence documentation
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RiskMitigationSection;
