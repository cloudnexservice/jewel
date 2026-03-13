import React from 'react';
import { SortOption } from '../types';
import { ChevronDown } from 'lucide-react';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="relative inline-block group">
      <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-stone-600 cursor-pointer">
        <span>Sort By: {value.replace('-', ' ')}</span>
        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
      </div>
      
      <div className="absolute right-0 mt-2 w-48 bg-white border border-gold/10 rounded-xl luxury-shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
        <div className="py-2">
          <button
            onClick={() => onChange('newest')}
            className="block w-full text-left px-4 py-2 text-xs uppercase tracking-widest text-stone-600 hover:bg-gold/5 hover:text-gold"
          >
            Newest
          </button>
          <button
            onClick={() => onChange('price-low')}
            className="block w-full text-left px-4 py-2 text-xs uppercase tracking-widest text-stone-600 hover:bg-gold/5 hover:text-gold"
          >
            Price: Low to High
          </button>
          <button
            onClick={() => onChange('price-high')}
            className="block w-full text-left px-4 py-2 text-xs uppercase tracking-widest text-stone-600 hover:bg-gold/5 hover:text-gold"
          >
            Price: High to Low
          </button>
        </div>
      </div>
    </div>
  );
};
