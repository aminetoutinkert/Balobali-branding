import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { productApi } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const StorePage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await productApi.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const categories = useMemo(() => {
    if (!products.length) return ['All'];
    const cats = new Set(products.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return result;
  }, [products, activeCategory, sortBy]);

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-5xl font-playfair mb-6">{t('shop.title')}</h1>
          <div className="w-16 h-1 bg-gold" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-gray-100">
          {/* Categories Scroll (Mobile) & Pills (Desktop) */}
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar pb-4 md:pb-0 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-gold text-prime' 
                    : 'text-gray-400 hover:text-prime'
                }`}
              >
                {cat === 'All' ? t('shop.all') : t(`shop.categories_list.${cat}`, cat)}
              </button>
            ))}
          </div>

          {/* Sort & Settings */}
          <div className="flex items-center space-x-8 w-full md:w-auto justify-between md:justify-start">
            <div className="relative group">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent pl-2 pr-8 py-2 text-xs font-bold uppercase tracking-widest text-prime focus:outline-none cursor-pointer"
              >
                <option value="newest">{t('shop.sort_options.newest')}</option>
                <option value="price-low">{t('shop.sort_options.price-low')}</option>
                <option value="price-high">{t('shop.sort_options.price-high')}</option>
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown size={14} className="text-gray-400" />
              </div>
            </div>
            
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              {filteredAndSortedProducts.length} {t('shop.items')}
            </p>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-gray-50 animate-pulse" />
            ))}
          </div>
        ) : filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-40 text-center">
            <h3 className="text-2xl font-playfair text-gray-300">Aucun produit trouvé</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
