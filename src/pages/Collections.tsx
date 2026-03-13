import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Product } from '../types';
import { fetchJewellery } from '../services/jewelleryService';
import { ArrowRight } from 'lucide-react';

const COLLECTION_CATEGORIES = [
  { name: 'Ring', query: 'diamond ring jewelry product', description: 'Symbolizing eternal commitment and refined style.' },
  { name: 'Necklace', query: 'gold necklace jewelry product', description: 'Graceful adornments that capture the light.' },
  { name: 'Bracelet', query: 'luxury bracelet jewelry product', description: 'Elegant wristwear for every occasion.' },
  { name: 'Earrings', query: 'diamond earrings jewelry product', description: 'Sophisticated brilliance for a radiant look.' },
  { name: 'Pendant', query: 'emerald pendant jewelry product', description: 'Intricate designs that tell a personal story.' },
];

export const Collections: React.FC = () => {
  const [categoryData, setCategoryData] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllCategories = async () => {
      setLoading(true);
      const data: Record<string, Product[]> = {};
      
      for (const cat of COLLECTION_CATEGORIES) {
        const products = await fetchJewellery(cat.query, cat.name as any);
        data[cat.name] = products.slice(0, 4);
      }
      
      setCategoryData(data);
      setLoading(false);
    };
    
    loadAllCategories();
  }, []);

  return (
    <div className="min-h-screen bg-luxury-paper">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Our Collections</span>
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Curated <span className="italic">Masterpieces</span></h1>
          <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Explore our diverse ranges of fine jewellery, each collection meticulously designed to celebrate life's most precious moments.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-32">
            {COLLECTION_CATEGORIES.map((cat, index) => (
              <motion.section 
                key={cat.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}
              >
                {/* Image Grid */}
                <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                  {categoryData[cat.name]?.map((p, i) => (
                    <div key={p.id} className={`aspect-[4/5] overflow-hidden rounded-2xl luxury-shadow ${i === 1 || i === 2 ? 'mt-8' : ''}`}>
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold block">Collection {index + 1}</span>
                  <h2 className="text-4xl font-serif">{cat.name}s</h2>
                  <p className="text-stone-600 leading-relaxed text-lg">
                    {cat.description} Our {cat.name.toLowerCase()} collection features exceptional gemstones set in the finest precious metals, handcrafted to perfection.
                  </p>
                  <div className="pt-4">
                    <Link 
                      to={`/catalog?category=${cat.name}`} 
                      className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all duration-300 luxury-shadow"
                    >
                      View All {cat.name}s <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
