import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      <form onSubmit={handleSubmit} className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for diamond rings, gold necklaces..."
          className="w-full h-16 pl-14 pr-32 bg-white border border-gold/20 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all luxury-shadow"
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gold">
          <Search size={24} />
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-3 bg-stone-900 text-white rounded-full text-sm font-medium tracking-widest uppercase hover:bg-gold transition-colors duration-300"
        >
          Search
        </button>
      </form>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {['Diamond Ring', 'Gold Necklace', 'Ruby Pendant', 'Emerald Bracelet'].map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setQuery(tag);
              onSearch(tag);
            }}
            className="text-xs uppercase tracking-widest text-stone-500 hover:text-gold transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};
