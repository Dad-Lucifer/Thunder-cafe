import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { nav, hours } from '@/constants/site';

const NAVIGATION_LINKS = nav.main;
const OPERATING_HOURS = hours;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 animate-fade-in-up">
            <h3 className="text-white font-bold text-xl tracking-tight">
              Thunder Gaming Café
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Unleash the heist within. Experience premium gaming in an atmosphere 
              designed for champions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 animate-fade-in-up animate-stagger-2">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAVIGATION_LINKS.map((link, index) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-red-500 transition-all duration-200 text-sm animate-hover-lift"
                    aria-label={`Navigate to ${link.name}`}
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 animate-fade-in-up animate-stagger-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Hours
            </h4>
            <div className="text-gray-400 text-sm space-y-1">
              <p>{OPERATING_HOURS.weekdays.label}: {OPERATING_HOURS.weekdays.hours}</p>
              <p>{OPERATING_HOURS.weekend.label}: {OPERATING_HOURS.weekend.hours}</p>
              <p>{OPERATING_HOURS.sunday.label}: {OPERATING_HOURS.sunday.hours}</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-red-900/20 animate-fade-in animate-stagger-4" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-gray-400 text-sm animate-fade-in animate-stagger-5">
            © {currentYear} Thunder Gaming Café. All rights reserved.
          </div>
          <div className="text-gray-500 text-xs max-w-md text-center sm:text-right animate-fade-in animate-stagger-6">
            <p>
              Disclaimer: Gaming involves risk. Play responsibly. 
              All gaming sessions are subject to availability and house rules.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;