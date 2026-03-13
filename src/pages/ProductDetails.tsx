import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MessageCircle, Calendar, ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { fetchJewellery } from '../services/jewelleryService';
import { ProductCard } from '../components/ProductCard';
import { Navbar } from '../components/Navbar';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProduct = async () => {
      setLoading(true);
      // In a real app, we'd fetch by ID. For now, we fetch all and find it
      // or just generate a dummy one if not found.
      const allProducts = await fetchJewellery('', 'All');
      const found = allProducts.find(p => p.id === id);
      
      if (found) {
        setProduct({
          ...found,
          material: found.title.split(' ')[0], // Extract material from title
          specifications: {
            metal: '18K Yellow Gold',
            purity: 'VVS-VS Clarity',
            weight: '4.50 Grams',
            stone: found.title.split(' ')[0] + ' Diamonds'
          }
        });
        setMainImage(found.image);
      } else {
        // Fallback dummy data
        const dummy: Product = {
          id: id || 'dummy',
          title: 'Exquisite Heritage Piece',
          price: 125000,
          category: 'Necklace',
          image: 'https://picsum.photos/seed/luxury-jewelry/800/1000',
          description: 'A masterpiece of timeless elegance, handcrafted with the finest materials and attention to detail.',
          material: 'Gold',
          specifications: {
            metal: '22K Yellow Gold',
            purity: 'BIS Hallmarked',
            weight: '12.8 Grams',
            stone: 'Uncut Diamonds'
          }
        };
        setProduct(dummy);
        setMainImage(dummy.image);
      }

      // Fetch related products
      const related = await fetchJewellery('', found?.category as any || 'All');
      setRelatedProducts(related.slice(0, 4));
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-paper flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-luxury-paper">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-stone-500 hover:text-gold transition-colors mb-8 uppercase tracking-widest text-xs font-bold">
          <ArrowLeft size={16} className="mr-2" />
          Back to Catalog
        </Link>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[4/5] bg-white rounded-3xl overflow-hidden luxury-shadow border border-gold/5 group"
            >
              <img
                src={mainImage}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
            </motion.div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[product.image, 'https://picsum.photos/seed/alt1/800/1000', 'https://picsum.photos/seed/alt2/800/1000', 'https://picsum.photos/seed/alt3/800/1000'].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="px-4 py-1.5 bg-gold/10 text-gold text-[10px] uppercase tracking-[0.2em] font-bold rounded-full border border-gold/20 mb-6 inline-block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">
                {product.title}
              </h1>
              <p className="text-3xl text-gold font-medium mb-8">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
              
              <div className="space-y-6 mb-10">
                <p className="text-stone-600 leading-relaxed text-lg italic font-serif">
                  "{product.description}"
                </p>
                <div className="flex items-center space-x-4 text-sm text-stone-500">
                  <span className="font-bold uppercase tracking-widest text-stone-400">Material:</span>
                  <span className="text-stone-800">{product.material || 'Premium Gold'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <button className="flex items-center justify-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-xl text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all duration-300 luxury-shadow">
                  <MessageCircle size={18} />
                  Inquire Now
                </button>
                <button className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-gold/30 text-gold rounded-xl text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold/5 transition-all duration-300">
                  <Calendar size={18} />
                  Book Consultation
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gold/10">
                <div className="text-center">
                  <ShieldCheck size={24} className="mx-auto text-gold mb-2" />
                  <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Certified Quality</p>
                </div>
                <div className="text-center">
                  <Truck size={24} className="mx-auto text-gold mb-2" />
                  <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Secure Shipping</p>
                </div>
                <div className="text-center">
                  <RefreshCw size={24} className="mx-auto text-gold mb-2" />
                  <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Easy Exchange</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Details & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-serif mb-6 border-b border-gold/10 pb-4">The Craftsmanship</h2>
              <p className="text-stone-600 leading-relaxed">
                Each piece at Sri Lakshmi Jewels is a testament to our rich heritage and commitment to excellence. Our master artisans spend hundreds of hours meticulously handcrafting every detail, ensuring that each jewel is not just an accessory, but a wearable work of art. We source only the most exceptional gemstones and use traditional techniques passed down through generations, blended with modern precision.
              </p>
            </section>
            
            <section>
              <h3 className="text-xl font-serif mb-6">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                {Object.entries(product.specifications || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gold/5 pb-2">
                    <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">{key}</span>
                    <span className="text-sm text-stone-800">{value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="bg-white p-8 rounded-3xl luxury-shadow border border-gold/5 h-fit">
            <h3 className="text-lg font-serif mb-6 text-gold">Bespoke Services</h3>
            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              Looking for something unique? Our designers can help you customize this piece or create something entirely new from scratch.
            </p>
            <button className="w-full py-4 bg-gold/10 text-gold rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-gold hover:text-white transition-all duration-300">
              Start Customization
            </button>
          </div>
        </div>

        {/* Related Products Section */}
        <section className="pt-12 border-t border-gold/10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif mb-2">Related Treasures</h2>
              <p className="text-xs text-stone-400 uppercase tracking-widest">Pieces you might also admire</p>
            </div>
            <Link to="/" className="text-xs uppercase tracking-widest font-bold text-gold hover:underline underline-offset-8">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer (Simplified or reused) */}
      <footer className="bg-stone-900 text-white py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xl font-serif tracking-widest text-gold font-bold uppercase block mb-4">
            Sri Lakshmi Jewels
          </span>
          <p className="text-stone-500 text-xs uppercase tracking-[0.3em]">
            Excellence in every facet
          </p>
        </div>
      </footer>
    </div>
  );
};
