import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, User, X, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Collections', path: '/collections' },
    { name: 'Bespoke', path: '/bespoke' },
    { name: 'Heritage', path: '/heritage' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleUserClick = () => {
    if (user) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      navigate('/login');
    }
  };

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

          <div className="flex items-center space-x-4 relative">
            <button 
              onClick={handleUserClick}
              className="p-2 text-stone-600 hover:text-gold transition-colors"
              title={user ? 'Open user menu' : 'Go to login'}
            >
              <User size={20} />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && user && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gold/10 py-2 z-50">
                <div className="px-4 py-3 border-b border-gold/10">
                  <p className="text-sm font-semibold text-stone-800">{user.name}</p>
                  <p className="text-xs text-stone-600">{user.email}</p>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-stone-700 hover:bg-gold/5 transition"
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}

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
