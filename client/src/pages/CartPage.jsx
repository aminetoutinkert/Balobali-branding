import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { Trash2, Plus, Minus, ArrowLeft, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import OrderFormModal from '../components/OrderFormModal';
import { useState } from 'react';

const CartPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  const handleWhatsAppCheckout = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = (clientInfo) => {
    const link = generateWhatsAppLink(cart, totalPrice, clientInfo);
    window.open(link, '_blank');
    setIsModalOpen(false);
  };

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-20 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="container px-4"
        >
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 mx-auto">
            <Trash2 size={40} className="text-gray-200" />
          </div>
          <h1 className="text-4xl font-playfair mb-6">{t('cart.empty')}</h1>
          <p className="text-gray-400 font-light mb-10 max-w-md mx-auto">
            {t('cart.emptySubtext')}
          </p>
          <Link to="/shop" className="btn-gold inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            <span>{t('hero.cta')}</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-gray-50/50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-playfair mb-12 text-center">{t('cart.title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div 
                layout
                key={item._id}
                className="bg-white p-6 flex items-center gap-6 border border-gray-100 shadow-sm"
              >
                <img 
                  src={item.images?.[0] || item.imagePath || 'https://via.placeholder.com/100x120'} 
                  alt={item.name} 
                  className="w-24 h-32 object-cover bg-gray-50"
                />
                <div className="flex-grow">
                  <h3 className="font-playfair text-xl mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">{item.category}</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{item.price * item.quantity} MAD</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.price} MAD / unité</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 border border-gray-100 shadow-sm sticky top-32">
              <h2 className="text-xl font-playfair mb-8 border-b border-gray-100 pb-4">{t('cart.summary')}</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t('cart.subtotal')}</span>
                  <span className="font-medium">{totalPrice} MAD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{t('cart.shipping')}</span>
                  <span className="text-green-600 font-medium">{t('cart.free')}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-8">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-playfair">{t('cart.total')}</span>
                  <span className="text-3xl font-bold text-gold">{totalPrice} MAD</span>
                </div>
              </div>

              <button 
                onClick={handleWhatsAppCheckout}
                className="w-full btn-gold flex items-center justify-center gap-3 mb-4"
              >
                <MessageSquare size={20} />
                <span>{t('cart.checkout')}</span>
              </button>
              
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest leading-relaxed">
                {t('cart.cod_notice')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <OrderFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default CartPage;
