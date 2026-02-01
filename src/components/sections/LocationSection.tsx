import React from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Sun, Thermometer, Wind, Zap, Mountain, Gauge, Calendar } from 'lucide-react';
import { PROJECT_CONFIG, irradianceData, getAnnualGenerationMU } from '@/lib/projectConfig';
import locationImage from '@/assets/solar-location-india.jpg';

const LocationSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const annualGeneration = getAnnualGenerationMU(1);
  const maxIrradiance = Math.max(...irradianceData.map(d => d.value));

  const locationStats = [
    { icon: Sun, label: 'Solar Irradiance', value: PROJECT_CONFIG.solarIrradianceRange, unit: 'kWh/m²/day', description: 'Excellent solar resource' },
    { icon: Thermometer, label: 'Avg Temperature', value: PROJECT_CONFIG.avgTemperatureRange, unit: '°C', description: 'Optimal for PV efficiency' },
    { icon: Calendar, label: 'Sunny Days', value: `${PROJECT_CONFIG.sunnyDays}+`, unit: 'days/year', description: 'High generation potential' },
    { icon: Gauge, label: 'CUF Achieved', value: `${(PROJECT_CONFIG.cuf * 100).toFixed(0)}%`, unit: 'capacity', description: 'Above national average' },
  ];

  const geographicalAdvantages = [
    { icon: MapPin, title: 'Strategic Location', description: 'Located in high-irradiance belt of India with proximity to 33/11 kV substation and grid infrastructure' },
    { icon: Zap, title: 'Grid Connectivity', description: 'Direct HT line connection to DISCOM grid ensuring minimal transmission losses and maximum revenue' },
    { icon: Mountain, title: 'Terrain Advantage', description: 'Flat agricultural land with minimal shading, optimal for large-scale ground-mounted solar installations' },
    { icon: Wind, title: 'Low Dust Region', description: 'Relatively low dust accumulation zone reducing cleaning frequency and O&M costs' },
  ];

  return (
    <section id="location" className="relative py-24 bg-slate-950 overflow-hidden">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-medium text-sm uppercase tracking-wider">Project Site</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
            Location & Solar Efficiency
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
            Strategically positioned in India's high solar irradiance zone for maximum energy generation
          </p>
        </motion.div>

        {/* Location Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden mb-12 h-[300px] md:h-[400px]"
        >
          <img
            src={locationImage}
            alt="Solar Project Location in India"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Prime Solar Belt Location</span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-white">
              {PROJECT_CONFIG.totalMW} MW Ground-Mounted Solar Installation
            </h3>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {locationStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center group hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                <stat.icon className="w-7 h-7 text-amber-400" />
              </div>
              <div className="text-slate-400 text-sm mb-1">{stat.label}</div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent text-2xl md:text-3xl font-display font-bold">
                  {stat.value}
                </span>
                <span className="text-slate-500 text-sm">{stat.unit}</span>
              </div>
              <div className="text-slate-500 text-xs mt-2">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Monthly Irradiance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6"
          >
            <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2 text-white">
              <Sun className="w-5 h-5 text-amber-400" />
              Monthly Solar Irradiance (kWh/m²/day)
            </h3>
            <div className="space-y-3">
              {irradianceData.map((data, index) => (
                <motion.div
                  key={data.month}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-8 text-slate-400 text-sm">{data.month}</span>
                  <div className="flex-1 h-6 bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${(data.value / maxIrradiance) * 100}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.05 }}
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"
                    />
                  </div>
                  <span className="w-10 text-right text-white font-medium text-sm">{data.value}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/50">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Annual Average</span>
                <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent font-semibold">
                  5.35 kWh/m²/day
                </span>
              </div>
            </div>
          </motion.div>

          {/* Geographical Advantages */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-display font-semibold mb-4 flex items-center gap-2 text-white">
              <Mountain className="w-5 h-5 text-amber-400" />
              Geographical Advantages
            </h3>
            {geographicalAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 group hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <advantage.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{advantage.title}</h4>
                    <p className="text-slate-400 text-sm">{advantage.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 bg-gradient-to-r from-amber-500/10 via-slate-800/50 to-amber-500/10 border border-amber-500/20 rounded-2xl p-6"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent text-3xl font-display font-bold">
                ~{annualGeneration.toFixed(2)} MU
              </div>
              <div className="text-slate-400 text-sm">Annual Generation</div>
            </div>
            <div>
              <div className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent text-3xl font-display font-bold">
                {PROJECT_CONFIG.peakSunHours}+ hrs
              </div>
              <div className="text-slate-400 text-sm">Peak Sun Hours/Year</div>
            </div>
            <div>
              <div className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent text-3xl font-display font-bold">
                &lt;{PROJECT_CONFIG.gridCurtailmentRisk}%
              </div>
              <div className="text-slate-400 text-sm">Grid Curtailment Risk</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
