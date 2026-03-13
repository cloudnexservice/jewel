import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { fetchJewellery } from '../services/jewelleryService';

export const Heritage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const results = await fetchJewellery('vintage luxury jewelry craftsmanship heritage', 'All');
      setImages(results.map(r => r.image).slice(0, 4));
    };
    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-luxury-paper">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={images[0] || 'https://images.unsplash.com/photo-1515562141207-7a18b5ce7142?auto=format&fit=crop&q=80'} 
              alt="Heritage" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-[1px]" />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Since 1985</span>
              <h1 className="text-5xl md:text-7xl font-serif mb-6">Our <span className="italic text-gold">Heritage</span></h1>
              <p className="text-stone-300 max-w-2xl mx-auto leading-relaxed italic font-serif text-xl">
                "A legacy of brilliance, passed down through generations."
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Sections */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
          {/* Section 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold block">The Beginning</span>
              <h2 className="text-4xl font-serif">A Vision of <span className="italic">Excellence</span></h2>
              <p className="text-stone-600 leading-relaxed">
                Sri Lakshmi Jewels was founded in 1985 with a simple yet profound vision: to create jewellery that transcends time. What started as a small atelier in the heart of Hyderabad has grown into a beacon of luxury, known for its uncompromising quality and artisanal spirit.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Our founder's passion for gemstones and traditional Indian craftsmanship laid the foundation for what we are today. Every piece we create is a tribute to this heritage, blending ancient techniques with modern design sensibilities.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden luxury-shadow">
                <img src={images[1] || 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80'} alt="Heritage Workshop" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold/10 backdrop-blur-md border border-gold/20 rounded-2xl hidden md:flex items-center justify-center p-6 text-center">
                <p className="text-gold font-serif italic text-sm">"Crafting stories in gold and diamonds for over 35 years."</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center lg:flex-row-reverse">
            <div className="lg:order-2 space-y-8">
              <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold block">The Craft</span>
              <h2 className="text-4xl font-serif">Unrivaled <span className="italic">Craftsmanship</span></h2>
              <p className="text-stone-600 leading-relaxed">
                At the core of Sri Lakshmi Jewels is our commitment to the art of jewellery making. Our master artisans are the custodians of centuries-old techniques, from intricate filigree work to the precise setting of rare diamonds.
              </p>
              <p className="text-stone-600 leading-relaxed">
                We believe that true luxury lies in the details that are often unseen. The weight of the gold, the clarity of the stone, and the smoothness of the finish—all are meticulously checked to meet our exacting standards.
              </p>
            </div>
            <div className="lg:order-1 relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden luxury-shadow">
                <img src={images[2] || 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80'} alt="Artisan at work" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>

          {/* Section 3 - Quote */}
          <div className="text-center py-20 border-y border-gold/10">
            <h3 className="text-3xl md:text-4xl font-serif italic text-stone-800 max-w-4xl mx-auto leading-relaxed">
              "Our jewellery is not just an adornment; it is a legacy of love, a celebration of life, and a masterpiece of human skill."
            </h3>
            <p className="mt-8 text-gold uppercase tracking-[0.3em] text-xs font-bold">— Sri Lakshmi Jewels</p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="bg-stone-900 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Visual Legacy</span>
              <h2 className="text-4xl font-serif text-white">The Archive</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {images.map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden luxury-shadow group">
                  <img 
                    src={img} 
                    alt={`Archive ${i}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
