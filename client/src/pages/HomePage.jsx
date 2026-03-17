import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { productApi } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const { t } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    '/hero.png',
    '/hero_1.jpg',
    '/hero_2.jpg',
    '/hero_3.jpg',
    '/hero4.png',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const fetchRecommendations = async () => {
// ... rest of the fetch logic
      try {
        const data = await productApi.getRecommendations();
        setFeaturedProducts(data);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Animated Background Slider */}
        <div className="absolute inset-0 bg-[#A17C5F]">
          {/* Branded Backdrop (Visible during transitions) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
            <img src="/logo.png" alt="Balobali" className="w-72 md:w-96 object-contain" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center"
            >
              <img
                src={heroSlides[currentSlide]}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Luxury Collection"
              />
              <div className="absolute inset-0 bg-black/30" />

              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl text-white text-center md:text-left mx-auto md:mx-0">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="luxury-tagline text-xl md:text-3xl mb-4 font-light italic text-gold/90 drop-shadow-sm"
                  >
                    Moroccan Silk Brand
                  </motion.h2>
                  
                  <motion.h1 
                    initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-3xl md:text-7xl font-bold font-playfair leading-tight mb-6 bg-gradient-to-r from-white via-white/80 to-white bg-clip-text text-transparent drop-shadow-lg"
                  >
                    {t('hero.tagline')}
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-base md:text-xl text-white/70 mb-10 max-w-lg leading-relaxed font-light mx-auto md:mx-0"
                  >
                    {t('hero.subtext')}
                  </motion.p>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Link 
                        to="/shop" 
                        className="btn-gold group inline-flex items-center justify-center relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center">
                          {t('hero.cta')}
                          <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <motion.div 
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 1.5, 
                            ease: "linear",
                            repeatDelay: 2
                          }}
                        />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </section>

      {/* Featured Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-playfair text-prime mb-4">{t('shop.new')} {t('shop.arrivals')}</h2>
            <div className="w-12 h-0.5 bg-gold" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {loading ? (
              // Skeleton screens would go here
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-sm" />
              ))
            ) : (
              featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>

          <div className="mt-20 flex justify-center">
            <Link 
              to="/shop" 
              className="group flex items-center space-x-2 text-prime font-bold tracking-[0.2em] uppercase text-sm hover:text-gold transition-colors"
            >
              <span>{t('hero.cta')}</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Ethos Strips */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-6 block font-inter">{t('philosophy.title')}</span>
            <h3 className="text-3xl font-playfair mb-8 leading-tight italic">
              "{t('philosophy.quote')}"
            </h3>
            <p className="text-gray-500 font-light leading-relaxed">
              {t('philosophy.text')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
