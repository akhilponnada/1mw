import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import LocationSection from '@/components/sections/LocationSection';
import ProjectCostSection from '@/components/sections/ProjectCostSection';
import FinancialStructureSection from '@/components/sections/FinancialStructureSection';
import EMIScheduleSection from '@/components/sections/EMIScheduleSection';
import RevenueReturnsSection from '@/components/sections/RevenueReturnsSection';
import InvestorBenefitsSection from '@/components/sections/InvestorBenefitsSection';
import RiskMitigationSection from '@/components/sections/RiskMitigationSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import ExitStrategySection from '@/components/sections/ExitStrategySection';
import ROICalculator from '@/components/sections/ROICalculator';
import ThirtyYearBenefitsSection from '@/components/sections/ThirtyYearBenefitsSection';
import CTASection from '@/components/sections/CTASection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Location & Solar Efficiency */}
        <LocationSection />

        {/* Project Cost Structure */}
        <ProjectCostSection />

        {/* Financial Structure */}
        <FinancialStructureSection />

        {/* EMI Schedule */}
        <EMIScheduleSection />

        {/* Revenue & Returns */}
        <RevenueReturnsSection />

        {/* ROI Calculator */}
        <ROICalculator />

        {/* Investor Benefits */}
        <InvestorBenefitsSection />

        {/* Risk Mitigation */}
        <RiskMitigationSection />

        {/* Comparative Returns */}
        <ComparisonSection />

        {/* Exit Strategy */}
        <ExitStrategySection />

        {/* 30-Year Benefits */}
        <ThirtyYearBenefitsSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
