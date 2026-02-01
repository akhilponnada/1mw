import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Calculator, TrendingDown, Wallet, Calendar } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  PROJECT_CONFIG,
  getTotalDebt,
  getMonthlyEMI,
  getAnnualEMI,
  generateEMISchedule
} from '@/lib/projectConfig';

const EMIScheduleSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const totalDebt = getTotalDebt();
  const monthlyEMI = getMonthlyEMI();
  const annualEMI = getAnnualEMI();
  const { schedule, totalEMI, totalInterest } = generateEMISchedule();

  const summaryStats = [
    { icon: Wallet, label: 'Loan Amount', value: `₹${totalDebt.toFixed(2)} Cr` },
    { icon: TrendingDown, label: 'Interest Rate', value: `${PROJECT_CONFIG.interestRate}% p.a.` },
    { icon: Calendar, label: 'Tenure', value: `${PROJECT_CONFIG.loanTenure} Years` },
    { icon: Calculator, label: 'Monthly EMI', value: monthlyEMI >= 0.01 ? `₹${monthlyEMI.toFixed(2)} Cr` : `₹${(monthlyEMI * 100).toFixed(0)} Lakhs` },
  ];

  return (
    <section id="emi-schedule" className="relative py-24 bg-slate-900">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Debt Repayment</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
            EMI Payment Schedule
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
            Year-by-year breakdown of ₹{totalDebt.toFixed(2)} Cr term loan repayment
          </p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {summaryStats.map((stat, index) => (
            <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 flex items-center justify-center mb-3">
                <stat.icon className="w-6 h-6 text-amber-400" />
              </div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
              <div className="text-white text-xl font-semibold">{stat.value}</div>
            </div>
          ))}
        </motion.div>

        {/* EMI Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 bg-slate-800/80">
                  <TableHead className="text-white font-semibold">Year</TableHead>
                  <TableHead className="text-white font-semibold text-right">Opening Balance</TableHead>
                  <TableHead className="text-white font-semibold text-right">Annual EMI</TableHead>
                  <TableHead className="text-white font-semibold text-right">Principal</TableHead>
                  <TableHead className="text-white font-semibold text-right">Interest</TableHead>
                  <TableHead className="text-white font-semibold text-right">Closing Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((row, index) => (
                  <motion.tr
                    key={row.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    className="border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                  >
                    <TableCell className="font-medium text-white">
                      Year {row.year}
                    </TableCell>
                    <TableCell className="text-right text-slate-400">
                      ₹{row.openingBalance.toFixed(2)} Cr
                    </TableCell>
                    <TableCell className="text-right text-white font-medium">
                      ₹{row.emi.toFixed(2)} Cr
                    </TableCell>
                    <TableCell className="text-right text-amber-400">
                      ₹{row.principal.toFixed(2)} Cr
                    </TableCell>
                    <TableCell className="text-right text-slate-400">
                      ₹{row.interest.toFixed(2)} Cr
                    </TableCell>
                    <TableCell className="text-right text-white">
                      ₹{row.closingBalance.toFixed(2)} Cr
                    </TableCell>
                  </motion.tr>
                ))}
                {/* Totals Row */}
                <TableRow className="border-t-2 border-amber-500/30 bg-amber-500/5">
                  <TableCell className="font-bold text-white">TOTAL</TableCell>
                  <TableCell className="text-right text-slate-400">—</TableCell>
                  <TableCell className="text-right font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                    ₹{totalEMI.toFixed(2)} Cr
                  </TableCell>
                  <TableCell className="text-right text-amber-400 font-bold">
                    ₹{totalDebt.toFixed(2)} Cr
                  </TableCell>
                  <TableCell className="text-right text-slate-400 font-bold">
                    ₹{totalInterest.toFixed(2)} Cr
                  </TableCell>
                  <TableCell className="text-right text-white">₹0.00 Cr</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </motion.div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-2">Moratorium Period</h4>
            <p className="text-slate-400 text-sm">
              {PROJECT_CONFIG.moratoriumMonths} months grace period before EMI commencement, allowing project to stabilize revenue
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-2">DSCR Maintained</h4>
            <p className="text-slate-400 text-sm">
              Debt Service Coverage Ratio &gt;1.4x ensures comfortable repayment with revenue buffer
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
            <h4 className="text-white font-semibold mb-2">Prepayment Option</h4>
            <p className="text-slate-400 text-sm">
              Flexible prepayment terms available after Year 3 to reduce overall interest burden
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EMIScheduleSection;
