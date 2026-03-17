import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Send, User, Phone, Mail, MapPin, Building } from 'lucide-react';

const OrderFormModal = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white overflow-hidden shadow-2xl z-10"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gold" />
            
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-prime">{t('modal.title')}</h2>
                  <p className="text-gray-500 text-[10px] mt-1 uppercase tracking-[0.2em] font-light">{t('modal.subtitle')}</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 block font-bold">
                      {t('modal.fullName')}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('modal.namePlaceholder')}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all font-light"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 block font-bold">
                        {t('modal.phone')}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t('modal.phonePlaceholder')}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all font-light"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 block font-bold">
                        {t('modal.email')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t('modal.emailPlaceholder')}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all font-light"
                        />
                      </div>
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 block font-bold">
                      {t('modal.city')}
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder={t('modal.cityPlaceholder')}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all font-light"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 block font-bold">
                      {t('modal.address')}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-300" size={16} />
                      <textarea
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        placeholder={t('modal.addressPlaceholder')}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all font-light resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full btn-gold py-4 flex items-center justify-center space-x-3 text-xs font-bold tracking-[0.2em]"
                  >
                    <Send size={16} />
                    <span>{t('modal.confirm')}</span>
                  </button>
                  <p className="text-[9px] text-gray-400 mt-4 text-center leading-relaxed tracking-wider font-light">
                    {t('modal.redirectNotice')}
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderFormModal;
