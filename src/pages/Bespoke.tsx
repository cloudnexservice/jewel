import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { fetchJewellery } from '../services/jewelleryService';
import { Send, Calendar, Clock, MapPin } from 'lucide-react';

export const Bespoke: React.FC = () => {
  const [bgImage, setBgImage] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    jewelleryType: 'Ring',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadBg = async () => {
      const results = await fetchJewellery('luxury jewelry workshop craftsmanship', 'All');
      if (results.length > 0) {
        setBgImage(results[0].image);
      }
    };
    loadBg();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, send to API
  };

  return (
    <div className="min-h-screen bg-luxury-paper">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={bgImage || 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80'} 
              alt="Bespoke Craftsmanship" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px]" />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Tailored Excellence</span>
              <h1 className="text-5xl md:text-7xl font-serif mb-6">Bespoke <span className="italic">Consultation</span></h1>
              <p className="text-stone-300 max-w-2xl mx-auto leading-relaxed">
                Bring your vision to life with our master artisans. From initial sketch to final polish, we create pieces as unique as your story.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left: Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-serif mb-6">The Bespoke Journey</h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold font-serif text-xl">1</div>
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Initial Consultation</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">Meet with our designers to discuss your ideas, inspirations, and preferences.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold font-serif text-xl">2</div>
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Design & Sketching</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">We provide detailed sketches and 3D renders to visualize your unique piece.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold font-serif text-xl">3</div>
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Material Selection</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">Choose from our curated selection of ethically sourced gemstones and precious metals.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold font-serif text-xl">4</div>
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Master Crafting</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">Our artisans bring the design to life with meticulous attention to every detail.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl luxury-shadow border border-gold/5 space-y-6">
                <h3 className="text-xl font-serif text-gold">Visit Our Atelier</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-stone-600">
                    <MapPin size={20} className="text-gold" />
                    <span className="text-sm">123 Heritage Lane, Jewellery Quarter, Hyderabad</span>
                  </div>
                  <div className="flex items-center gap-4 text-stone-600">
                    <Clock size={20} className="text-gold" />
                    <span className="text-sm">Mon - Sat: 10:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex items-center gap-4 text-stone-600">
                    <Calendar size={20} className="text-gold" />
                    <span className="text-sm">By Appointment Only</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white p-10 md:p-12 rounded-[2rem] luxury-shadow border border-gold/10 relative overflow-hidden">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
                >
                  <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                    <Send size={40} />
                  </div>
                  <h3 className="text-3xl font-serif">Inquiry Received</h3>
                  <p className="text-stone-500 leading-relaxed">
                    Thank you for reaching out. Our concierge will contact you within 24 hours to schedule your private consultation.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-gold font-bold uppercase tracking-widest text-xs hover:underline"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-3xl font-serif mb-8">Book a Consultation</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 ml-1">Full Name</label>
                        <input 
                          required
                          type="text" 
                          className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                          placeholder="John Doe"
                          value={formState.name}
                          onChange={(e) => setFormState({...formState, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 ml-1">Phone Number</label>
                        <input 
                          required
                          type="tel" 
                          className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                          placeholder="+91 98765 43210"
                          value={formState.phone}
                          onChange={(e) => setFormState({...formState, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 ml-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 ml-1">Jewellery Type</label>
                      <select 
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all appearance-none"
                        value={formState.jewelleryType}
                        onChange={(e) => setFormState({...formState, jewelleryType: e.target.value})}
                      >
                        <option>Ring</option>
                        <option>Necklace</option>
                        <option>Bracelet</option>
                        <option>Earrings</option>
                        <option>Pendant</option>
                        <option>Other / Multiple</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 ml-1">Your Message</label>
                      <textarea 
                        rows={4}
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none"
                        placeholder="Tell us about your dream piece..."
                        value={formState.message}
                        onChange={(e) => setFormState({...formState, message: e.target.value})}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-5 bg-stone-900 text-white rounded-xl text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all duration-300 luxury-shadow flex items-center justify-center gap-3"
                    >
                      Schedule Appointment <Send size={16} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
