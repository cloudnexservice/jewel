import React from 'react';
import { Category } from '../types';

interface FilterSidebarProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: Category[] = ['All', 'Ring', 'Necklace', 'Bracelet', 'Earrings', 'Pendant'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="w-full lg:w-64 space-y-8">
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-400 mb-6">Categories</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`block w-full text-left text-sm tracking-widest transition-all duration-300 ${
                selectedCategory === cat 
                  ? 'text-gold font-bold translate-x-2' 
                  : 'text-stone-600 hover:text-gold hover:translate-x-1'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-gold/10">
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-400 mb-6">Material</h3>
        <div className="space-y-3">
          {['Yellow Gold', 'Rose Gold', 'White Gold', 'Platinum'].map((material) => (
            <label key={material} className="flex items-center space-x-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 border-gold/20 rounded text-gold focus:ring-gold" />
              <span className="text-sm text-stone-600 group-hover:text-gold transition-colors">{material}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-8 border-t border-gold/10">
        <div className="p-6 bg-gold/5 rounded-2xl border border-gold/10">
          <p className="text-xs italic text-gold-dark font-serif leading-relaxed">
            "Every piece tells a story of heritage and timeless elegance."
          </p>
        </div>
      </div>
    </div>
  );
};
