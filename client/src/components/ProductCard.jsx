import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Handle image path logic (backend serves /ads/, frontend might need full URL)
  const getImageUrl = (image) => {
    if (!image) return 'https://via.placeholder.com/400x500?text=Balobali';
    if (image.startsWith('/ads/')) {
      return import.meta.env.VITE_API_BASE_URL 
        ? `${import.meta.env.VITE_API_BASE_URL}${image}`
        : (import.meta.env.PROD ? image : `http://localhost:5000${image}`);
    }
    return image;
  };

  const imageUrl = getImageUrl(product.images?.[0] || product.imagePath);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative flex flex-col"
    >
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <img 
            src={imageUrl} 
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Tags/Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {product.tags?.slice(0, 1).map((tag, i) => (
              <span key={i} className="bg-gold text-prime text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center text-center">
          <p className="text-[10px] text-gold font-bold uppercase tracking-[0.3em] mb-2">
            {product.category}
          </p>
          <h3 className="text-xl font-playfair tracking-tight text-prime group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
          <p className="mt-4 text-sm font-bold tracking-widest text-prime/40">
            {product.price} MAD
          </p>
        </div>
      </Link>

      {/* Quick Add Button */}
      <button 
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCart(product);
          setIsAdded(true);
          setTimeout(() => setIsAdded(false), 2000);
        }}
        className={`absolute top-[40%] left-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 btn-gold flex items-center justify-center space-x-2 z-20 ${isAdded ? 'bg-green-600 text-white' : ''}`}
      >
        <ShoppingBag size={18} />
        <span className="text-sm">{isAdded ? "Ajouté !" : t('shop.addToCart')}</span>
      </button>
    </motion.div>
  );
};

export default ProductCard;
