import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface CatalogGridProps {
  products: Product[];
  loading: boolean;
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl aspect-[4/6] animate-pulse border border-gold/5" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-serif text-2xl text-stone-400 italic">No treasures found for your search...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
