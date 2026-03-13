import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SearchBar } from '../components/SearchBar';
import { CatalogGrid } from '../components/CatalogGrid';
import { FilterSidebar } from '../components/FilterSidebar';
import { SortDropdown } from '../components/SortDropdown';
import { Category, Product, SortOption } from '../types';
import { fetchJewellery } from '../services/jewelleryService';

export const Catalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    const results = await fetchJewellery(query, category);
    setProducts(results);
    setLoading(false);
  };

  useEffect(() => {
    handleSearch('');
  }, [category]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // 'newest' is default order from service
  });

  return (
    <div className="min-h-screen flex flex-col bg-luxury-paper">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with Search */}
        <section className="bg-white border-b border-gold/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif mb-4 tracking-tight"
            >
              Timeless <span className="italic text-gold">Elegance</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-stone-500 uppercase tracking-[0.3em] text-xs mb-8"
            >
              Discover our curated collection of fine jewellery
            </motion.p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>

        {/* Catalog Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <FilterSidebar 
                selectedCategory={category} 
                onCategoryChange={setCategory} 
              />
            </aside>

            {/* Main Content */}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-2xl font-serif">
                    {searchQuery ? `Results for "${searchQuery}"` : `${category} Collection`}
                  </h2>
                  <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">
                    {sortedProducts.length} Pieces Found
                  </p>
                </div>
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>

              <AnimatePresence mode="wait">
                <CatalogGrid products={sortedProducts} loading={loading} />
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
