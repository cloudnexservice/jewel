import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Award } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { fetchJewellery } from '../services/jewelleryService';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [heroImage, setHeroImage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      // Fetch featured products
      const products = await fetchJewellery('luxury jewelry product', 'All');
      setFeaturedProducts(products.slice(0, 6));
      
      // Fetch a specific hero image
      const heroResults = await fetchJewellery('luxury diamond necklace jewelry product', 'Necklace');
      if (heroResults.length > 0) {
        setHeroImage(heroResults[0].image);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-luxury-paper">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage || 'https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?auto=format&fit=crop&q=80'} 
            alt="Luxury Jewellery" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-gold/20 backdrop-blur-md border border-gold/30 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold mb-6">
              Est. 1985 • Heritage of Excellence
            </span>
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
              Crafting <span className="italic text-gold">Eternal</span> Memories
            </h1>
            <p className="text-lg text-stone-200 mb-10 font-light leading-relaxed max-w-lg">
              Discover the pinnacle of artisanal craftsmanship and timeless design with Sri Lakshmi Jewels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog" className="px-10 py-4 bg-gold text-white rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-gold transition-all duration-300 luxury-shadow flex items-center justify-center gap-2">
                Explore Collection <ArrowRight size={16} />
              </Link>
              <Link to="/bespoke" className="px-10 py-4 border border-white/30 backdrop-blur-md text-white rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                Bespoke Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-gold" size={28} />
              </div>
              <h3 className="text-xl font-serif mb-3">Exquisite Design</h3>
              <p className="text-stone-500 text-sm leading-relaxed">Unique pieces that blend traditional heritage with contemporary aesthetics.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-gold" size={28} />
              </div>
              <h3 className="text-xl font-serif mb-3">Certified Quality</h3>
              <p className="text-stone-500 text-sm leading-relaxed">Every gemstone and metal is ethically sourced and rigorously certified.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-gold" size={28} />
              </div>
              <h3 className="text-xl font-serif mb-3">Master Craftsmanship</h3>
              <p className="text-stone-500 text-sm leading-relaxed">Handcrafted by artisans with decades of experience in fine jewellery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-luxury-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Curated Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Featured Treasures</h2>
            <div className="w-24 h-1 bg-gold/20 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/catalog" className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs hover:underline underline-offset-8 transition-all">
              View Full Catalog <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Split Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-[600px] relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80" 
            alt="Craftsmanship" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="bg-stone-900 text-white p-12 md:p-24 flex flex-col justify-center">
          <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">Our Legacy</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">A Tradition of <span className="italic">Brilliance</span></h2>
          <p className="text-stone-400 mb-10 leading-relaxed">
            For over three decades, Sri Lakshmi Jewels has been at the forefront of luxury jewellery. Our heritage is built on a foundation of trust, quality, and an unwavering commitment to beauty.
          </p>
          <Link to="/heritage" className="w-fit px-10 py-4 border border-gold/30 text-gold rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold hover:text-white transition-all duration-300">
            Learn Our Story
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
