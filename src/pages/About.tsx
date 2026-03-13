import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { fetchJewellery } from '../services/jewelleryService';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export const About: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const results = await fetchJewellery('luxury jewelry store interior lifestyle', 'All');
      setImages(results.map(r => r.image).slice(0, 3));
    };
    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-luxury-paper">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-white py-24 border-b border-gold/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">About Us</span>
              <h1 className="text-5xl md:text-6xl font-serif mb-8">Excellence in Every <span className="italic text-gold">Facet</span></h1>
              <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed text-lg">
                Sri Lakshmi Jewels is more than a jewellery brand; it is a destination for those who appreciate the finer things in life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Info Sections */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden luxury-shadow">
                <img src={images[0] || 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80'} alt="Store Interior" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-serif">Our <span className="italic">Philosophy</span></h2>
              <p className="text-stone-600 leading-relaxed">
                We believe that every piece of jewellery tells a story. Our philosophy is rooted in the belief that beauty should be accessible, yet exclusive. We strive to create pieces that are not only visually stunning but also emotionally resonant.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs text-gold mb-2">Ethical Sourcing</h4>
                  <p className="text-stone-500 text-sm">We only work with suppliers who adhere to the highest ethical standards.</p>
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs text-gold mb-2">Artisanal Spirit</h4>
                  <p className="text-stone-500 text-sm">Every piece is handcrafted with passion and precision.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-3xl luxury-shadow border border-gold/5 text-center space-y-6">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto text-gold">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-serif">Visit Us</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                123 Heritage Lane, Jewellery Quarter,<br />Hyderabad, India
              </p>
            </div>
            <div className="bg-white p-10 rounded-3xl luxury-shadow border border-gold/5 text-center space-y-6">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto text-gold">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-serif">Call Us</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                +91 40 1234 5678<br />+91 98765 43210
              </p>
            </div>
            <div className="bg-white p-10 rounded-3xl luxury-shadow border border-gold/5 text-center space-y-6">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto text-gold">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-serif">Email Us</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                concierge@srilakshmijewels.com<br />info@srilakshmijewels.com
              </p>
            </div>
          </div>
        </section>

        {/* Social Section */}
        <section className="bg-stone-900 py-24 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif mb-12">Connect With Us</h2>
            <div className="flex justify-center gap-12">
              <a href="#" className="text-stone-400 hover:text-gold transition-colors flex flex-col items-center gap-3 group">
                <Instagram size={32} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Instagram</span>
              </a>
              <a href="#" className="text-stone-400 hover:text-gold transition-colors flex flex-col items-center gap-3 group">
                <Facebook size={32} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Facebook</span>
              </a>
              <a href="#" className="text-stone-400 hover:text-gold transition-colors flex flex-col items-center gap-3 group">
                <Twitter size={32} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Twitter</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
