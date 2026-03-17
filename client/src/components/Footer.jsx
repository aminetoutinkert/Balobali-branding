import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-prime text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start">
            <img src="/logo.png" alt="Balobali" className="h-8 w-auto mb-6 brightness-0 invert" />
            <p className="text-gray-400 text-sm text-center md:text-left leading-relaxed max-w-sm font-light">
              {t('hero.subtext')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-playfair text-lg text-gold mb-6 uppercase tracking-widest">{t('shop.title')}</h4>
            <nav className="flex flex-col space-y-4 items-center md:items-start text-sm text-gray-400">
              <Link to="/" className="hover:text-gold transition-colors">{t('nav.home')}</Link>
              <Link to="/shop" className="hover:text-gold transition-colors">{t('nav.shop')}</Link>
              <Link to="/cart" className="hover:text-gold transition-colors">{t('nav.cart')}</Link>
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-playfair text-lg text-gold mb-6 uppercase tracking-widest">{t('footer.connect')}</h4>
            <div className="flex gap-6 mb-8">
              <a href="#" className="p-2 border border-white/10 rounded-full hover:border-gold hover:text-gold transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 border border-white/10 rounded-full hover:border-gold hover:text-gold transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 border border-white/10 rounded-full hover:border-gold hover:text-gold transition-all">
                <Twitter size={20} />
              </a>
            </div>
            <p className="text-xs text-gray-500 font-light tracking-widest">info@balobali.com</p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Balobali. {t('footer.rights')}
          </p>
          <div className="mt-4 sm:mt-0 flex gap-4 text-[10px] text-gray-600 uppercase tracking-[0.2em] justify-center sm:justify-start">
            <a href="#" className="hover:text-gold underline underline-offset-4">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-gold underline underline-offset-4">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
