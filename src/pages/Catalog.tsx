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
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [page, setPage] = useState(1);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    setPage(1); // Reset to page 1 on new search
    const results = await fetchJewellery(query, category, 1);
    setProducts(results);
    setLoading(false);
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const results = await fetchJewellery(searchQuery, category, nextPage);
    setProducts((prev) => [...prev, ...results]); // Append new results
    setPage(nextPage);
    setLoadingMore(false);
  };

  useEffect(() => {
    setLoading(true);
    setPage(1); // Reset to page 1 when category changes
    fetchJewellery('', category, 1).then((results) => {
      setProducts(results);
      setLoading(false);
    });
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-serif mb-3 tracking-tight font-medium"
            >
              Fine <span className="italic text-gold">Jewellery</span> Collection
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-stone-600 uppercase tracking-widest text-xs mb-8 font-medium"
            >
              Explore our premium collection
            </motion.p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>

        {/* Mobile Category Filter */}
        <section className="lg:hidden bg-white border-b border-gold/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="overflow-x-auto">
              <div className="flex gap-3 pb-2">
                {['All', 'Ring', 'Necklace', 'Bracelet', 'Earrings', 'Pendant'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat as Category)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all flex-shrink-0 ${
                        category === cat
                          ? 'bg-gold text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>
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
                  <h2 className="text-lg font-serif font-medium text-stone-800">
                    {searchQuery ? `Results for "${searchQuery}"` : `${category} Collection`}
                  </h2>
                  <p className="text-xs text-stone-500 uppercase tracking-widest mt-2">
                    {sortedProducts.length} pieces found
                  </p>
                </div>
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>

              <AnimatePresence mode="wait">
                <CatalogGrid products={sortedProducts} loading={loading} />
              </AnimatePresence>

              {/* Load More Button */}
              <div className="flex justify-center mt-16">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-12 py-3 border-2 border-gold text-gold font-serif uppercase tracking-widest text-sm hover:bg-gold hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
