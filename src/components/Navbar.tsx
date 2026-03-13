import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, User, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Collections', path: '/collections' },
    { name: 'Bespoke', path: '/bespoke' },
    { name: 'Heritage', path: '/heritage' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <button 
              className="p-2 lg:hidden text-stone-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="ml-4 lg:ml-0">
              <span className="text-xl sm:text-2xl font-serif tracking-widest gold-text-gradient font-bold uppercase">
                Sri Lakshmi Jewels
              </span>
            </Link>
          </div>
          
          <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${
                  isActive(link.path) ? 'text-gold' : 'text-stone-600 hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-stone-600 hover:text-gold transition-colors">
              <User size={20} />
            </button>
            <button className="p-2 text-stone-600 hover:text-gold transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gold/10 py-4 px-4 space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              onClick={() => setIsMenuOpen(false)}
              className={`block text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${
                isActive(link.path) ? 'text-gold' : 'text-stone-600 hover:text-gold'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
