import React from 'react';
import { Product } from '../types';
import { ExternalLink, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white rounded-2xl overflow-hidden luxury-shadow luxury-card-hover border border-gold/5"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-widest font-semibold text-stone-600 rounded-full border border-gold/10">
            {product.category}
          </span>
        </div>
      </Link>
      
      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-serif mb-2 group-hover:text-gold transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <p className="text-gold font-medium mb-4">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <Link 
            to={`/product/${product.id}`}
            className="flex items-center justify-center gap-2 px-4 py-2 text-[10px] uppercase tracking-widest font-bold border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
          >
            <ExternalLink size={14} />
            Details
          </Link>
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-[10px] uppercase tracking-widest font-bold bg-stone-900 text-white rounded-lg hover:bg-gold transition-colors">
            <MessageCircle size={14} />
            Inquire
          </button>
        </div>
      </div>
    </motion.div>
  );
};
