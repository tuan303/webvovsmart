import { Link } from 'react-router-dom';
import { ArrowRight, Settings, Home as HomeIcon, Zap } from 'lucide-react';
import { useLangStore } from '../store/langStore';

export default function Home() {
  const { lang } = useLangStore();

  const t = {
    heroTag: lang === 'en' ? 'Innovation & Automation' : 'Innovation & Automation',
    heroTitle: lang === 'en' ? 'Architecting the Future with' : 'Kiến tạo tương lai với',
    heroHighlight: lang === 'en' ? 'Smart Automation' : 'Tự động hoá thông minh',
    heroSub: lang === 'en' 
      ? 'Elevate business performance and optimize living spaces with our international standard ecosystem of automation, Smart Home, and Smart Building solutions.'
      : 'Nâng tầm hiệu suất doanh nghiệp và tối ưu không gian sống với hệ sinh thái sản phẩm tự động hóa, Smart Home và Smart Building chuẩn quốc tế.',
    explore: lang === 'en' ? 'Explore Products' : 'Khám phá sản phẩm',
    solTitle: lang === 'en' ? 'Solution Ecosystem' : 'Hệ Sinh Thái Giải Pháp',
    solSub: lang === 'en' ? 'Diverse and specialized, meeting the strictest industrial and residential standards.' : 'Đa dạng và chuyên sâu, đáp ứng tiêu chuẩn khắt khe nhất trong công nghiệp và dân dụng.',
    sol1Tag: lang === 'en' ? 'Industrial Automation' : 'Tự Động Hóa Công Nghiệp',
    sol1Title: lang === 'en' ? 'Factory Automation' : 'Factory Automation',
    sol1Desc: lang === 'en' ? 'PLC, Inverter, and SCADA solutions to optimize production lines and increase equipment lifespan.' : 'Giải pháp PLC, biến tần, SCADA giúp tối ưu hóa dây chuyền, tăng tính liên tục và tuổi thọ thiết bị.',
    sol2Tag: lang === 'en' ? 'Civil & Residential' : 'Toà nhà & Dân dụng',
    sol2Title: lang === 'en' ? 'Smart Home & Building' : 'Smart Home & Building',
    sol2Desc: lang === 'en' ? 'BMS ecosystems for energy saving, lighting control, HVAC, and comprehensive security.' : 'Hệ sinh thái BMS tiết kiệm năng lượng, kiểm soát ánh sáng, HVAC và an ninh toàn diện.',
    sol3Tag: lang === 'en' ? 'Clean Energy' : 'Năng Lượng Sạch',
    sol3Title: lang === 'en' ? 'Clean Energy Solutions' : 'Clean Energy Solutions',
    sol3Desc: lang === 'en' ? 'Advanced power management and storage from solar inverters to smart EV charging stations.' : 'Quản lý và lưu trữ điện năng tiên tiến từ solar inverter đến các trạm sạc EV thông minh.',
    appTitle: lang === 'en' ? 'Typical Applications' : 'Ứng dụng tiêu biểu',
    app1Name: lang === 'en' ? 'Water & Environment' : 'Xử lý nước & môi trường',
    app1Desc: lang === 'en' ? 'Modern PID pumping & treatment plants.' : 'Hệ thống bơm & trạm xử lý PID hiện đại.',
    app2Name: lang === 'en' ? 'Packaging Production' : 'Sản xuất bao bì',
    app2Desc: lang === 'en' ? 'Precise temperature control and die cutting.' : 'Kiểm soát nhiệt và cắt cắt khuôn chính xác.',
    app3Name: lang === 'en' ? 'Next-gen Compressors' : 'Máy nén thế hệ mới',
    app3Desc: lang === 'en' ? 'Inverters saving up to 40% energy.' : 'Biến tần tiết kiệm điện lên đến 40%.',
    app4Name: lang === 'en' ? 'Cranes & Hoisting' : 'Cầu trục nâng hạ',
    app4Desc: lang === 'en' ? 'Smooth speed control, anti-sway tech.' : 'Điều khiển tốc độ mượt mà, chống lắc.'
  };

  return (
    <div className="flex flex-col py-8 overflow-hidden relative min-h-screen">
      {/* Hero Header */}
      <div className="relative rounded-2xl overflow-hidden mx-8 bg-primary text-white mb-16 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent opacity-90"></div>
        </div>
        <div className="relative z-10 p-12 md:p-24 max-w-4xl">
          <p className="text-secondary-container font-bold uppercase tracking-wider text-sm mb-4">{t.heroTag}</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight font-headline mb-6">
            {t.heroTitle}<br />
            <span className="text-secondary-container text-transparent bg-clip-text bg-gradient-to-r from-secondary-container to-white">{t.heroHighlight}</span>
          </h1>
          <p className="text-lg text-primary-container max-w-2xl mb-10 leading-relaxed">
            {t.heroSub}
          </p>
          <div className="flex gap-4">
            <Link to="/products" className="bg-white text-primary font-bold rounded-lg px-8 py-3.5 hover:bg-surface-variant transition-colors shadow-lg flex items-center gap-2">
              {t.explore} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-on-surface mb-3">{t.solTitle}</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">{t.solSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Module 1 */}
          <Link to="/solutions" className="group relative bg-white rounded-2xl shadow-sm border border-outline-variant overflow-hidden flex flex-col h-[420px] hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex-1 relative overflow-hidden bg-slate-100">
               <img 
                 src="https://images.unsplash.com/photo-1565103437593-9c8cb5fbc746?auto=format&fit=crop&q=80&w=800" 
                 alt="Industrial Automation" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg text-primary">
                 <Settings size={24} />
               </div>
            </div>
            <div className="p-6 shrink-0">
              <h4 className="text-xs uppercase tracking-wider text-secondary font-bold mb-2">{t.sol1Tag}</h4>
              <p className="text-lg font-bold text-on-surface mb-2">{t.sol1Title}</p>
              <p className="text-sm text-on-surface-variant line-clamp-2">{t.sol1Desc}</p>
            </div>
          </Link>
          
          {/* Module 2 */}
          <Link to="/smart-building" className="group relative bg-white rounded-2xl shadow-sm border border-outline-variant overflow-hidden flex flex-col h-[420px] hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex-1 relative overflow-hidden bg-slate-100">
               <img 
                 src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800" 
                 alt="Smart Home" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg text-primary">
                 <HomeIcon size={24} />
               </div>
            </div>
            <div className="p-6 shrink-0">
              <h4 className="text-xs uppercase tracking-wider text-secondary font-bold mb-2">{t.sol2Tag}</h4>
              <p className="text-lg font-bold text-on-surface mb-2">{t.sol2Title}</p>
              <p className="text-sm text-on-surface-variant line-clamp-2">{t.sol2Desc}</p>
            </div>
          </Link>

          {/* Module 3 */}
          <Link to="/products" className="group relative bg-white rounded-2xl shadow-sm border border-outline-variant overflow-hidden flex flex-col h-[420px] hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex-1 relative overflow-hidden bg-slate-100">
               <img 
                 src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800" 
                 alt="Clean Energy" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg text-primary">
                 <Zap size={24} />
               </div>
            </div>
            <div className="p-6 shrink-0">
              <h4 className="text-xs uppercase tracking-wider text-secondary font-bold mb-2">{t.sol3Tag}</h4>
              <p className="text-lg font-bold text-on-surface mb-2">{t.sol3Title}</p>
              <p className="text-sm text-on-surface-variant line-clamp-2">{t.sol3Desc}</p>
            </div>
          </Link>

        </div>
      </div>

      <div className="mx-8 my-24 bg-surface-variant rounded-2xl p-8 md:p-12 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-on-surface">{t.appTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: t.app1Name, icon: '01', desc: t.app1Desc },
            { name: t.app2Name, icon: '02', desc: t.app2Desc },
            { name: t.app3Name, icon: '03', desc: t.app3Desc },
            { name: t.app4Name, icon: '04', desc: t.app4Desc }
          ].map(item => (
            <div key={item.name} className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant flex flex-col">
              <div className="w-10 h-10 rounded-full bg-primary-container text-primary font-bold flex items-center justify-center text-sm mb-4">
                {item.icon}
              </div>
              <h4 className="font-bold text-lg mb-2 text-on-surface">{item.name}</h4>
              <p className="text-sm text-on-surface-variant">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

