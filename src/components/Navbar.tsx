import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PROJECT_CONFIG } from '@/lib/projectConfig';
import uniteSolarLogo from '@/assets/logo2.svg';

const navLinks = [
  { label: 'Location', href: '#location' },
  { label: 'Investment', href: '#project-cost' },
  { label: 'Financials', href: '#financial-structure' },
  { label: 'Returns', href: '#revenue-returns' },
  { label: 'Calculator', href: '#roi-calculator' },
  { label: 'Compare', href: '#comparison' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800'
          : 'bg-transparent'
          }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <img
                src={uniteSolarLogo}
                alt="Unite Solar"
                className="h-10 md:h-12"
              />
              <span className="hidden sm:inline-flex items-center text-xs bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full">
                {PROJECT_CONFIG.totalMW} MW
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                className="hidden sm:flex bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium"
                asChild
              >
                <a href="tel:+919667660773">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </a>
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:text-amber-400 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-slate-900/98 backdrop-blur-md border-b border-slate-800 lg:hidden"
          >
            <div className="section-container py-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-300 hover:text-amber-400 transition-colors text-left py-2 font-medium"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  className="mt-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium"
                  asChild
                >
                  <a href="tel:+919667660773">
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Call
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
