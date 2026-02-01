import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Repeat, Building2, Users, ArrowRight } from 'lucide-react';

const exitOptions = [
  {
    icon: Clock,
    title: 'Hold to Maturity',
    timeline: '25+ Years',
    description: 'Maximize returns by holding the asset through the full PPA period. Enjoy steady income and potential repowering opportunity at Year 25.',
    returns: 'Maximum Returns',
    recommended: true,
  },
  {
    icon: Repeat,
    title: 'Secondary Market Sale',
    timeline: 'Year 5+',
    description: 'Sell your equity stake to institutional investors or infrastructure funds in the growing renewable energy secondary market.',
    returns: '15-20% Premium',
    recommended: false,
  },
  {
    icon: Building2,
    title: 'Portfolio Acquisition',
    timeline: 'Year 7+',
    description: 'Large IPPs and infrastructure funds actively acquire operational solar portfolios at premium valuations.',
    returns: '1.2-1.4x Book Value',
    recommended: false,
  },
  {
    icon: Users,
    title: 'Strategic Partnership',
    timeline: 'Year 3+',
    description: 'Partner with larger developers for joint ventures or partial stake sale while retaining management rights.',
    returns: 'Flexible Terms',
    recommended: false,
  },
];

const ExitStrategySection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="exit-strategy" className="relative py-24 bg-slate-900">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Flexibility</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
            Exit Strategy Options
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
            Multiple liquidity options available throughout the investment lifecycle
          </p>
        </motion.div>

        {/* Exit Options Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {exitOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className={`relative bg-slate-800/50 border rounded-xl p-6 group hover:border-amber-500/30 transition-all duration-300 ${option.recommended ? 'border-amber-500/50' : 'border-slate-700/50'
                }`}
            >
              {option.recommended && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-amber-500 text-slate-900 text-xs font-medium px-3 py-1 rounded-full">
                    Recommended
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 shrink-0 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <option.icon className="w-7 h-7 text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold text-lg">{option.title}</h4>
                    <span className="text-amber-400 text-sm font-medium">{option.timeline}</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">{option.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full">
                      {option.returns}
                    </span>
                    <button className="flex items-center gap-1 text-amber-400 text-sm hover:text-amber-300 transition-colors">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            * Exit timelines and valuations are indicative and subject to market conditions.
            Early exits may be subject to lock-in provisions as per investment agreement.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExitStrategySection;
