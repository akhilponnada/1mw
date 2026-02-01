/**
 * 1 MW Solar Project - Centralized Configuration
 * All financial parameters and calculations in one place
 */

// ============================================
// PROJECT PARAMETERS
// ============================================
export const PROJECT_CONFIG = {
  // Capacity
  totalMW: 1,
  costPerMW: 3.75, // Crores

  // Financial Structure
  equityPerMW: 1, // Crores (margin money)
  debtPerMW: 2.75, // Crores (term loan)

  // Loan Parameters
  interestRate: 10.5, // % per annum
  loanTenure: 12, // years
  moratoriumMonths: 6,

  // Generation Parameters
  cuf: 0.19, // 19% Capacity Utilization Factor
  hoursPerYear: 8760,
  degradationRate: 0.005, // 0.5% per year

  // Revenue Parameters
  defaultTariff: 4.5, // ₹ per unit
  minTariff: 4.0,
  maxTariff: 5.0,
  ebitdaMargin: 0.73, // 73%

  // Tax Parameters
  corporateTaxRate: 0.25,
  effectiveTaxRate: 0.15, // With depreciation benefits

  // Location Data
  solarIrradianceRange: '5.5-6.0', // kWh/m²/day
  avgTemperatureRange: '25-35', // °C
  sunnyDays: 300,
  peakSunHours: 1650,
  gridCurtailmentRisk: 2, // %
} as const;

// ============================================
// DERIVED CALCULATIONS
// ============================================

// Total Investment
export const getTotalProjectCost = () => PROJECT_CONFIG.totalMW * PROJECT_CONFIG.costPerMW;
export const getTotalEquity = () => PROJECT_CONFIG.totalMW * PROJECT_CONFIG.equityPerMW;
export const getTotalDebt = () => PROJECT_CONFIG.totalMW * PROJECT_CONFIG.debtPerMW;

// EMI Calculation (Standard Loan Formula)
export const calculateMonthlyEMI = (principal: number, annualRate: number, tenureYears: number) => {
  const monthlyRate = annualRate / 100 / 12;
  const months = tenureYears * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
              (Math.pow(1 + monthlyRate, months) - 1);
  return emi;
};

export const getMonthlyEMI = () => {
  return calculateMonthlyEMI(getTotalDebt(), PROJECT_CONFIG.interestRate, PROJECT_CONFIG.loanTenure);
};

export const getAnnualEMI = () => getMonthlyEMI() * 12;

// Generation Calculation
export const getAnnualGenerationMU = (year: number = 1) => {
  const degradation = Math.pow(1 - PROJECT_CONFIG.degradationRate, year - 1);
  return (PROJECT_CONFIG.totalMW * 1000 * PROJECT_CONFIG.cuf * PROJECT_CONFIG.hoursPerYear * degradation) / 1000000;
};

// Revenue Calculation
export const getAnnualRevenue = (tariff: number = PROJECT_CONFIG.defaultTariff, year: number = 1) => {
  return getAnnualGenerationMU(year) * tariff;
};

// EBITDA Calculation
export const getAnnualEBITDA = (tariff: number = PROJECT_CONFIG.defaultTariff, year: number = 1) => {
  return getAnnualRevenue(tariff, year) * PROJECT_CONFIG.ebitdaMargin;
};

// Net Cashflow Calculation
export const getNetCashflow = (year: number, tariff: number = PROJECT_CONFIG.defaultTariff) => {
  const ebitda = getAnnualEBITDA(tariff, year);
  const debtService = year <= PROJECT_CONFIG.loanTenure ? getAnnualEMI() : 0;
  return ebitda - debtService;
};

// Calculate Payback Period
export const calculatePaybackPeriod = (tariff: number = PROJECT_CONFIG.defaultTariff, maxYears: number = 30) => {
  let cumulativeCashflow = -getTotalEquity();
  
  for (let year = 1; year <= maxYears; year++) {
    const cashflow = getNetCashflow(year, tariff);
    const previousCumulative = cumulativeCashflow;
    cumulativeCashflow += cashflow;
    
    if (previousCumulative < 0 && cumulativeCashflow >= 0) {
      // Interpolate for fractional year
      const fraction = -previousCumulative / cashflow;
      return parseFloat((year - 1 + fraction).toFixed(1));
    }
  }
  return maxYears;
};

// Calculate IRR using Newton-Raphson method
export const calculateIRR = (cashflows: number[], guess: number = 0.1): number => {
  const maxIterations = 100;
  const tolerance = 0.0001;
  let rate = guess;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let derivativeNpv = 0;

    for (let t = 0; t < cashflows.length; t++) {
      const discountFactor = Math.pow(1 + rate, t);
      npv += cashflows[t] / discountFactor;
      if (t > 0) {
        derivativeNpv -= (t * cashflows[t]) / Math.pow(1 + rate, t + 1);
      }
    }

    const newRate = rate - npv / derivativeNpv;
    
    if (Math.abs(newRate - rate) < tolerance) {
      return newRate * 100; // Return as percentage
    }
    rate = newRate;
  }
  return rate * 100;
};

// Generate Equity IRR Cashflows
export const getEquityIRR = (tariff: number = PROJECT_CONFIG.defaultTariff, years: number = 25) => {
  const cashflows = [-getTotalEquity()]; // Initial investment
  
  for (let year = 1; year <= years; year++) {
    cashflows.push(getNetCashflow(year, tariff));
  }
  
  return Math.min(calculateIRR(cashflows), 35); // Cap at 35% for display
};

// Generate Project IRR Cashflows
export const getProjectIRR = (tariff: number = PROJECT_CONFIG.defaultTariff, years: number = 25) => {
  const totalInvestment = getTotalProjectCost();
  const cashflows = [-totalInvestment];
  
  for (let year = 1; year <= years; year++) {
    cashflows.push(getAnnualEBITDA(tariff, year));
  }
  
  return Math.min(calculateIRR(cashflows), 25);
};

// Generate multi-year projection data
export const generateProjectionData = (years: number = 25, tariff: number = PROJECT_CONFIG.defaultTariff) => {
  const data = [];
  let cumRevenue = 0;
  let cumCashflow = 0;
  let cumNetIncome = 0;

  for (let year = 1; year <= years; year++) {
    const annualRevenue = getAnnualRevenue(tariff, year);
    const ebitda = annualRevenue * PROJECT_CONFIG.ebitdaMargin;
    const debtService = year <= PROJECT_CONFIG.loanTenure ? getAnnualEMI() : 0;
    const netCashflow = ebitda - debtService;
    const netIncome = netCashflow * (1 - PROJECT_CONFIG.effectiveTaxRate);

    cumRevenue += annualRevenue;
    cumCashflow += netCashflow;
    cumNetIncome += netIncome;

    data.push({
      year: `Y${year}`,
      yearNum: year,
      generation: parseFloat(getAnnualGenerationMU(year).toFixed(2)),
      revenue: parseFloat(annualRevenue.toFixed(2)),
      ebitda: parseFloat(ebitda.toFixed(2)),
      debtService: parseFloat(debtService.toFixed(2)),
      cashflow: parseFloat(netCashflow.toFixed(2)),
      cumRevenue: parseFloat(cumRevenue.toFixed(2)),
      cumCashflow: parseFloat(cumCashflow.toFixed(2)),
      cumNetIncome: parseFloat(cumNetIncome.toFixed(2)),
    });
  }

  return data;
};

// Generate EMI Schedule
export const generateEMISchedule = () => {
  const schedule = [];
  let balance = getTotalDebt();
  const annualRate = PROJECT_CONFIG.interestRate / 100;
  const annualEMI = getAnnualEMI();
  
  for (let year = 1; year <= PROJECT_CONFIG.loanTenure; year++) {
    const openingBalance = balance;
    const interestForYear = openingBalance * annualRate;
    const principalForYear = annualEMI - interestForYear;
    balance = Math.max(0, openingBalance - principalForYear);
    
    schedule.push({
      year,
      openingBalance: parseFloat(openingBalance.toFixed(2)),
      emi: parseFloat(annualEMI.toFixed(2)),
      principal: parseFloat(principalForYear.toFixed(2)),
      interest: parseFloat(interestForYear.toFixed(2)),
      closingBalance: parseFloat(balance.toFixed(2)),
    });
  }
  
  const totalEMI = schedule.reduce((sum, row) => sum + row.emi, 0);
  const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
  
  return { schedule, totalEMI, totalInterest };
};

// Monthly Irradiance Data
export const irradianceData = [
  { month: 'Jan', value: 4.8 },
  { month: 'Feb', value: 5.3 },
  { month: 'Mar', value: 6.1 },
  { month: 'Apr', value: 6.5 },
  { month: 'May', value: 6.8 },
  { month: 'Jun', value: 5.2 },
  { month: 'Jul', value: 4.1 },
  { month: 'Aug', value: 4.3 },
  { month: 'Sep', value: 5.0 },
  { month: 'Oct', value: 5.4 },
  { month: 'Nov', value: 5.1 },
  { month: 'Dec', value: 4.6 },
];

// Format number for display
export const formatCurrency = (value: number, decimals: number = 2): string => {
  if (value >= 1) {
    return `₹${value.toFixed(decimals)} Cr`;
  } else {
    return `₹${(value * 100).toFixed(0)} Lakhs`;
  }
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};
