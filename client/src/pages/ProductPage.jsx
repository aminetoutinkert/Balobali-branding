import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft, ChevronRight, ChevronLeft, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { productApi } from '../api/productApi';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, selectedSize, selectedColor });
    navigate('/cart');
  };
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const [productData, recsData] = await Promise.all([
          productApi.getProductById(id),
          productApi.getRecommendations(id)
        ]);
        setProduct(productData);
        setRecommendations(recsData);
        
        if (productData.sizes?.length) setSelectedSize(productData.sizes[0]);
        if (productData.colors?.length) setSelectedColor(productData.colors[0]);
        
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="pt-40 pb-20 flex justify-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-3xl font-playfair mb-6 text-prime">{t('product.notFound')}</h2>
        <Link to="/shop" className="btn-gold">{t('product.backToShop')}</Link>
      </div>
    );
  }

  const getImageUrl = (image) => {
    if (!image) return 'https://via.placeholder.com/800x1200?text=Balobali';
    if (image.startsWith('/ads/')) {
      return import.meta.env.VITE_API_BASE_URL 
        ? `${import.meta.env.VITE_API_BASE_URL}${image}`
        : (import.meta.env.PROD ? image : `http://localhost:5000${image}`);
    }
    return image;
  };

  const currentImageUrl = getImageUrl(product.images?.[selectedImage]);

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gray-400 mb-12">
          <Link to="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-gold transition-colors text-prime/40">{t('nav.shop')}</Link>
          <ChevronRight size={10} />
          <span className="text-gold font-bold">{product.category}</span>
          <ChevronRight size={10} />
          <span className="text-prime font-bold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Image Gallery */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4">
            {/* Thumbnails (Vertical on desktop) */}
            <div className="hidden md:flex col-span-2 flex-col space-y-4">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-[3/4] border-2 transition-all ${
                    selectedImage === idx ? 'border-gold' : 'border-transparent hover:border-gray-100'
                  }`}
                >
                  <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="col-span-12 md:col-span-10 relative aspect-[3/4] bg-gray-50 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={currentImageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Mobile Thumbnails (Horizontal) */}
              <div className="md:hidden absolute bottom-4 left-0 w-full flex justify-center space-x-2">
                {product.images?.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-2 h-2 rounded-full ${selectedImage === idx ? 'bg-gold' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold block mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-playfair text-prime mb-6 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-8">
                <p className="text-3xl font-bold text-prime">{product.price} MAD</p>
                {product.compareAtPrice > product.price && (
                  <p className="text-xl text-gray-300 line-through font-light">
                    {product.compareAtPrice} MAD
                  </p>
                )}
              </div>

              <div className="h-px bg-gray-100 w-full mb-8" />

              <p className="text-gray-500 font-light leading-relaxed mb-10">
                {product.description}
              </p>

              {/* Selection Options */}
              <div className="space-y-8 mb-10">
                {/* Colors */}
                {product.colors?.length > 0 && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-4 block font-bold">
                      {t('product.color')}: <span className="text-prime">Select</span>
                    </label>
                    <div className="flex space-x-3">
                      {product.colors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                            selectedColor === color ? 'border-gold scale-110' : 'border-transparent'
                          }`}
                        >
                          <div className="w-full h-full rounded-full" style={{ backgroundColor: color }} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes?.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 block font-bold">
                        {t('product.size')}
                      </label>
                      <button className="text-[10px] uppercase tracking-widest text-gold font-bold hover:underline">
                        {t('product.sizeGuide')}
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 text-xs font-bold transition-all border ${
                            selectedSize === size 
                              ? 'bg-prime text-white border-prime' 
                              : 'text-prime border-gray-100 hover:border-gold'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-4 block font-bold">
                    {t('product.quantity')}
                  </label>
                  <div className="flex items-center w-32 border border-gray-100">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-12 flex items-center justify-center text-prime hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="flex-grow text-center text-sm font-bold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-12 flex items-center justify-center text-prime hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={handleAddToCart}
                  className="w-full btn-gold py-5 flex items-center justify-center space-x-3 group"
                >
                  <ShoppingBag size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                  <span className="uppercase tracking-widest text-sm font-bold">{t('shop.addToCart')}</span>
                </button>
                
                <Link 
                  to="/shop"
                  className="w-full bg-prime text-white py-5 flex items-center justify-center space-x-3 hover:bg-black transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span className="uppercase tracking-widest text-sm font-bold">{t('product.continueShopping')}</span>
                </Link>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 py-8 border-t border-gray-100">
                <div className="flex flex-col items-center text-center">
                  <Truck size={20} className="text-gold mb-3" />
                  <p className="text-[10px] uppercase tracking-widest text-prime font-bold">{t('product.expressShipping')}</p>
                </div>
                <div className="flex flex-col items-center text-center border-x border-gray-50 px-4">
                  <ShieldCheck size={20} className="text-gold mb-3" />
                  <p className="text-[10px] uppercase tracking-widest text-prime font-bold">{t('product.securePayment')}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RefreshCw size={20} className="text-gold mb-3" />
                  <p className="text-[10px] uppercase tracking-widest text-prime font-bold">{t('product.easyExchange')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mt-40">
            <h2 className="text-3xl font-playfair text-center mb-16">{t('product.youMayAlsoLike')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {recommendations.map((rec) => (
                <Link to={`/product/${rec._id}`} key={rec._id} className="group">
                  <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                    <img 
                      src={getImageUrl(rec.images?.[0])} 
                      alt={rec.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-prime mb-1">{rec.name}</h3>
                  <p className="text-xs text-gray-400">{rec.price} MAD</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
