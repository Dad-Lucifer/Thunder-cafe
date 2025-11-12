import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X } from 'lucide-react';
import { nav } from '@/constants/site';

const NAVIGATION_LINKS = nav.main;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-red-900/30 shadow-lg' 
        : 'bg-black/70 backdrop-blur-sm border-b border-red-900/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-white font-bold text-xl sm:text-2xl tracking-tight hover:text-red-500 transition-all duration-200 hover:scale-105 animate-hover-glow"
            aria-label="Thunder Gaming Café Home"
          >
            Thunder Gaming Café
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION_LINKS.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-gray-300 hover:text-white hover:text-red-500 transition-all duration-200 font-medium animate-hover-lift '
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                aria-label={`Navigate to ${link.name}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-red-500 hover:bg-red-950/20 transition-all duration-200 animate-hover-scale animate-hover-glow"
                  aria-label="Toggle navigation menu"
                >
                  {isOpen ? (
                    <X className="h-6 w-6 animate-scale-in" />
                  ) : (
                    <Menu className="h-6 w-6 animate-scale-in" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-black/95 border border-red-900/30 min-w-[200px] animate-fade-in-up"
              >
                {NAVIGATION_LINKS.map((link, index) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white hover:bg-red-950/20 transition-colors w-full px-3 py-2 animate-hover-lift"
                      onClick={() => setIsOpen(false)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;