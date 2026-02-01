import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube, User } from 'lucide-react';
import uniteSolarLogo from '@/assets/logo2.svg';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="section-container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <img
              src={uniteSolarLogo}
              alt="Unite Solar"
              className="h-12 rounded-lg mb-4"
            />
            <p className="text-slate-400 mb-6 max-w-md">
              A global renewable energy developer delivering premium solar infrastructure
              investments with assured returns and complete project delivery.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500/10 hover:text-amber-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500/10 hover:text-amber-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500/10 hover:text-amber-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Project Overview', 'Financial Model', 'Investment Calculator', 'Risk Framework', 'Exit Strategy', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <User className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  Dr. Ravi Varma
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <a href="tel:+919667660773" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
                  +91 96676 60773
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <a href="mailto:invest@unitesolar.com" className="text-amber-400 hover:text-amber-300 transition-colors">
                  invest@unitesolar.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-slate-400">
                  <div>Unite Group Inc. USA</div>
                  <div>Unite Developers Global Inc</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Unite Solar. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 text-sm hover:text-amber-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 text-sm hover:text-amber-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-slate-500 text-sm hover:text-amber-400 transition-colors">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
