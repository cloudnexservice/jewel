import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CatalogGrid } from '../components/CatalogGrid';
import { Product, Category } from '../types';
import { fetchJewellery } from '../services/jewelleryService';

const categoryRouteMap: Record<string, Category> = {
  rings: 'Ring',
  bangles: 'Bracelet',
  bracelets: 'Bracelet',
  necklaces: 'Necklace',
  earrings: 'Earrings',
  pendants: 'Pendant'
};

const categoryDisplayName: Record<Category, string> = {
  Ring: 'Rings',
  Necklace: 'Necklaces',
  Bracelet: 'Bracelets',
  Earrings: 'Earrings',
  Pendant: 'Pendants',
  All: 'Jewellery'
};

export const CategoryPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const categoryKey = name?.toLowerCase() ?? '';
  const category = categoryRouteMap[categoryKey] ?? null;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchJewellery('', category, 1).then((results) => {
      setProducts(results);
      setLoading(false);
    });
  }, [category]);

  if (!name || !category) {
    return (
      <div className="min-h-screen bg-luxury-paper">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-serif mb-6">Category Not Found</h1>
          <p className="text-stone-500 mb-10">Please choose from one of our curated categories below.</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-10 py-4 bg-gold text-white rounded-full uppercase tracking-[0.2em] text-xs font-bold hover:bg-white hover:text-gold transition-all duration-300"
          >
            Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const displayName = categoryDisplayName[category];

  return (
    <div className="min-h-screen bg-luxury-paper">
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-stone-900 text-white py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,215,0,0.18),_transparent_45%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-gold/20 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-gold">
                Shop By Category
              </span>
              <h1 className="text-5xl md:text-6xl font-serif mb-6">{displayName}</h1>
              <p className="text-stone-300 leading-relaxed text-lg">
                Discover our handpicked selection of luxury {displayName.toLowerCase()} crafted for timeless elegance.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500 mb-2">Curated Pieces</p>
              <h2 className="text-3xl md:text-4xl font-serif">Fine {displayName}</h2>
            </div>
            <p className="text-sm text-stone-500 max-w-xl">
              Elegant designs, exceptional quality and refined craftsmanship in every piece.
            </p>
          </div>

          <CatalogGrid products={products} loading={loading} />
        </section>
      </main>

      <Footer />
    </div>
  );
};
