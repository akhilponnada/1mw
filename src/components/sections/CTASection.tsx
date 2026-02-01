import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, Calendar, ArrowRight, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PROJECT_CONFIG, getTotalEquity, getEquityIRR, calculatePaybackPeriod } from '@/lib/projectConfig';

const CTASection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const totalEquity = getTotalEquity();
  const equityIRR = getEquityIRR();
  const paybackYears = calculatePaybackPeriod();

  const highlights = [
    { label: 'Minimum Investment', value: `₹${totalEquity.toFixed(2)} Cr` },
    { label: 'Expected IRR', value: `${equityIRR.toFixed(0)}%+` },
    { label: 'Payback Period', value: `${paybackYears.toFixed(1)} Years` },
    { label: 'PPA Duration', value: '25 Years' },
  ];

  return (
    <section id="cta" className="relative py-24 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10" ref={ref}>
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 md:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Ready to Invest?</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mt-3 mb-6">
                  Schedule Your Investor Call Today
                </h2>
                <p className="text-slate-400 text-lg mb-8">
                  Join forward-thinking investors who are building wealth while contributing to a sustainable future.
                  Our team is ready to walk you through the opportunity.
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {highlights.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4"
                    >
                      <div className="text-slate-400 text-sm">{item.label}</div>
                      <div className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent text-xl font-display font-bold">
                        {item.value}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25 transition-all duration-300 hover:shadow-amber-500/40"
                    asChild
                  >
                    <a href="tel:+919667660773">
                      <Phone className="w-5 h-5 mr-2" />
                      Schedule a Call
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg rounded-xl"
                    asChild
                  >
                    <a href="mailto:invest@unitesolar.com">
                      <Mail className="w-5 h-5 mr-2" />
                      Request Info Pack
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Content - Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-8"
            >
              <h3 className="text-xl font-display font-semibold text-white mb-6">Contact Our Investment Team</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm">Investment Head</div>
                    <div className="text-white font-medium">Dr. Ravi Varma</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm">Call Us</div>
                    <a href="tel:+919667660773" className="text-amber-400 font-medium text-lg hover:text-amber-300 transition-colors">
                      +91 96676 60773
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm">Email</div>
                    <a href="mailto:invest@unitesolar.com" className="text-amber-400 font-medium hover:text-amber-300 transition-colors">
                      invest@unitesolar.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm">Corporate Entities</div>
                    <div className="text-white font-medium">Unite Group Inc. USA</div>
                    <div className="text-white font-medium">Unite Developers Global Inc</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm">Response Time</div>
                    <div className="text-white font-medium">Within 24 Hours</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <button className="w-full flex items-center justify-center gap-2 text-amber-400 font-medium hover:text-amber-300 transition-colors">
                  View Complete Investor Deck
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
