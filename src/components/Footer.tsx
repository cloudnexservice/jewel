import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-serif tracking-widest text-gold font-bold uppercase block mb-6">
              Sri Lakshmi Jewels
            </span>
            <p className="text-stone-400 max-w-md leading-relaxed">
              Crafting heritage since generations. We specialize in bespoke diamond and gold jewellery that captures the essence of luxury and tradition.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-gold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-stone-400">
              <li><Link to="/catalog" className="hover:text-white transition-colors">Catalog</Link></li>
              <li><Link to="/collections" className="hover:text-white transition-colors">Collections</Link></li>
              <li><Link to="/bespoke" className="hover:text-white transition-colors">Bespoke Services</Link></li>
              <li><Link to="/heritage" className="hover:text-white transition-colors">Our Heritage</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-gold mb-6">Visit Us</h4>
            <p className="text-sm text-stone-400 leading-relaxed">
              123 Heritage Lane,<br />
              Jewellery Quarter,<br />
              Hyderabad, India
            </p>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-stone-500">
            © 2026 Sri Lakshmi Jewels. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-stone-500 hover:text-gold transition-colors text-[10px] uppercase tracking-widest">Instagram</a>
            <a href="#" className="text-stone-500 hover:text-gold transition-colors text-[10px] uppercase tracking-widest">Facebook</a>
            <a href="#" className="text-stone-500 hover:text-gold transition-colors text-[10px] uppercase tracking-widest">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
