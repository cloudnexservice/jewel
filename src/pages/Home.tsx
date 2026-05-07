import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Award } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { fetchJewellery } from '../services/jewelleryService';

const categoryConfigs = [
  {
    label: 'Rings',
    slug: 'rings',
    description: 'Elegant bands and statement solitaires.',
    searchQuery: 'luxury gold ring jewelry'
  },
  {
    label: 'Bangles',
    slug: 'bangles',
    description: 'Graceful wrist adornments with refined detail.',
    searchQuery: 'luxury bangle bracelet jewelry'
  },
  {
    label: 'Necklaces',
    slug: 'necklaces',
    description: 'Timeless neckpieces for every occasion.',
    searchQuery: 'luxury necklace chain jewelry'
  },
  {
    label: 'Earrings',
    slug: 'earrings',
    description: 'Refined studs, hoops, and chandelier designs.',
    searchQuery: 'luxury earrings studs jewelry'
  },
  {
    label: 'Bracelets',
    slug: 'bracelets',
    description: 'Statement pieces that shimmer with every movement.',
    searchQuery: 'luxury bracelet wrist jewelry'
  },
  {
    label: 'Pendants',
    slug: 'pendants',
    description: 'Delicate charms layered with timeless luxury.',
    searchQuery: 'luxury pendant locket jewelry'
  }
];

export const Home: React.FC = () => {
  const [heroImage, setHeroImage] = useState('');
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>({});
  const [categoryCards, setCategoryCards] = useState(categoryConfigs);

  useEffect(() => {
    const loadData = async () => {
      const heroResults = await fetchJewellery('luxury diamond necklace jewelry product', 'Necklace');
      if (heroResults.length > 0) {
        setHeroImage(heroResults[0].image);
      }

      // Fetch images for each category
      const images: Record<string, string> = {};
      for (const config of categoryConfigs) {
        const results = await fetchJewellery(config.searchQuery, config.label as any);
        if (results.length > 0) {
          images[config.slug] = results[0].image;
        }
      }
      setCategoryImages(images);

      // Update category cards with fetched images
      const updatedCards = categoryConfigs.map(config => ({
        ...config,
        image: images[config.slug] || 'https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?auto=format&fit=crop&q=80'
      }));
      setCategoryCards(updatedCards);
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

      {/* Shop By Category */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Explore By Category</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Shop By Category</h2>
            <p className="max-w-2xl mx-auto text-stone-500 leading-relaxed">
              Discover our signature pieces through refined categories designed to guide you to the perfect luxury jewellery moment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryCards.map((card) => (
              <Link
                key={card.slug}
                to={`/category/${card.slug}`}
                className="group relative overflow-hidden rounded-[2rem] border border-gold/10 bg-stone-950 text-white shadow-[0_20px_60px_rgba(15,12,8,0.18)] transition-transform duration-500 hover:-translate-y-2 h-96"
              >
                <img
                  src={card.image}
                  alt={card.label}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.onerror = null;
                    img.style.backgroundColor = '#3a3126';
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-3 py-1 mb-4 text-[10px] uppercase tracking-[0.3em] font-semibold text-gold bg-white/10 rounded-full border border-white/10">
                    {card.label}
                  </span>
                  <h3 className="text-3xl font-serif mb-3">{card.label}</h3>
                  <p className="text-sm text-stone-300 leading-relaxed mb-6">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center text-xs uppercase tracking-[0.3em] text-gold font-bold">
                    Explore {card.label}
                  </span>
                </div>
              </Link>
            ))}
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
