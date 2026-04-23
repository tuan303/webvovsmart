import { Outlet, Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { useLangStore } from '../store/langStore';
import { Globe } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const { user } = useUserStore();
  const { lang, toggleLang } = useLangStore();

  const t = {
    products: lang === 'en' ? 'Products' : 'Sản Phẩm',
    solutions: lang === 'en' ? 'Solutions' : 'Giải Pháp',
    contact: lang === 'en' ? 'Contact' : 'Liên Hệ',
    consult: lang === 'en' ? 'Consult Now' : 'Tư Vấn Ngay',
    adminPanel: lang === 'en' ? 'Admin Panel' : 'Quản Trị',
    tagline: lang === 'en' 
      ? 'Pioneering smart automation and energy management solutions in Vietnam. Building trust through superior engineering.'
      : 'Tiên phong trong các giải pháp tự động hóa thông minh và quản lý năng lượng tại Việt Nam. Xây dựng niềm tin thông qua chất lượng kỹ thuật vượt trội.',
    solTitle: lang === 'en' ? 'Solutions' : 'Giải pháp',
    factory: lang === 'en' ? 'Factory Automation' : 'Tự động hoá nhà máy',
    building: lang === 'en' ? 'Smart Building' : 'Tòa nhà thông minh (Smart Building)',
    home: lang === 'en' ? 'Smart Home' : 'Nhà thông minh (Smart Home)',
    supportTitle: lang === 'en' ? 'Support & Info' : 'Hỗ trợ & Thông tin',
    contactUs: lang === 'en' ? 'Contact Us' : 'Liên hệ với chúng tôi',
    privacy: lang === 'en' ? 'Privacy Policy' : 'Chính sách bảo mật',
    rights: lang === 'en' ? '© 2026 VOVSMART Automation. Engineered Trust.' : '© 2026 VOVSMART Automation. Hệ thống tin cậy.'
  };

  const navLinks = [
    { name: t.products, path: '/products' },
    { name: t.solutions, path: '/solutions' },
    { name: t.contact, path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full h-20 border-b border-outline-variant px-8 flex items-center justify-between bg-white shadow-sm sticky top-0 z-50">
        <div className="flex gap-8 items-center text-sm font-medium text-on-surface-variant">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-primary transition-colors ${
                location.pathname === link.path ? 'text-primary font-bold' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Link to="/admin" className="text-secondary font-medium hover:text-primary transition-colors">
              {t.adminPanel}
            </Link>
          )}
        </div>

        <Link to="/" className="text-2xl font-bold text-primary font-headline absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            VS
          </div>
          VOVSMART
        </Link>

        <div className="flex gap-6 items-center">
          <button 
             onClick={toggleLang}
             className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-primary transition-colors bg-surface-variant px-3 py-1.5 rounded-md"
             title="Translate"
          >
             <Globe size={16} /> {lang.toUpperCase()}
          </button>
          <Link to="/contact" className="text-sm font-bold bg-primary text-white rounded-lg px-6 py-2.5 hover:bg-secondary transition-colors shadow-sm">
            {t.consult}
          </Link>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[1440px]">
        <Outlet />
      </main>

      <footer className="w-full border-t border-outline-variant mt-auto bg-white">
        <div className="max-w-[1440px] mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-on-surface-variant">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-primary font-headline mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center text-white text-xs">
                VS
              </div>
              VOVSMART
            </Link>
            <p className="max-w-sm leading-relaxed mb-6">
              {t.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-xs">{t.solTitle}</h4>
            <ul className="space-y-3 font-medium">
              <li><Link to="/solutions" className="hover:text-primary transition-colors">{t.factory}</Link></li>
              <li><Link to="/smart-building" className="hover:text-primary transition-colors">{t.building}</Link></li>
              <li><Link to="/smart-home" className="hover:text-primary transition-colors">{t.home}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-xs">{t.supportTitle}</h4>
            <ul className="space-y-3 font-medium">
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t.contactUs}</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t.privacy}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-outline-variant py-6 px-8 text-center text-xs font-medium text-slate-400">
          <p>{t.rights}</p>
        </div>
      </footer>
    </div>
  );
}
