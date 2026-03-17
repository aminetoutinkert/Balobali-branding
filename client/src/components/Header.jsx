import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Menu, X, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { twMerge } from 'tailwind-merge';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.shop'), path: '/shop' },
  ];

  const languages = [
    { code: 'fr', name: 'FR' },
    { code: 'ar', name: 'AR' },
    { code: 'en', name: 'EN' },
  ];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-prime"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links - Left (Desktop) */}
        <nav className="hidden md:flex items-center gap-12 md:gap-16 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={twMerge(
                "text-[11px] font-bold uppercase transition-colors hover:text-gold",
                i18n.language !== 'ar' && "tracking-[0.3em]",
                location.pathname === link.path ? "text-gold" : "text-prime"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Logo - Center */}
        <div className="flex-none">
          <Link to="/" className="flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Balobali" 
              className="h-12 md:h-18 w-auto object-contain" 
              style={{ maxHeight: '72px' }}
            />
          </Link>
        </div>

        {/* Actions - Right */}
        <div className="flex-1 flex items-center justify-end gap-4 md:gap-8">
          {/* Language Selector */}
          <div className="hidden lg:flex items-center gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={twMerge(
                  "text-[10px] font-black tracking-widest px-2 py-1 transition-colors",
                  i18n.language === lang.code ? "text-gold" : "text-prime/30 hover:text-prime"
                )}
              >
                {lang.name}
              </button>
            ))}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 text-prime hover:text-gold transition-colors">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 bg-gold text-prime text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-lg font-medium tracking-widest uppercase text-prime"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-6">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={twMerge(
                    "text-sm font-bold",
                    i18n.language === lang.code ? "text-gold" : "text-prime/40"
                  )}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
