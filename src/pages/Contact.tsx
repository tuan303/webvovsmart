import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useLangStore } from '../store/langStore';

export default function Contact() {
  const { lang } = useLangStore();

  const t = {
    tag: lang === 'en' ? 'Help & Support' : 'Trợ giúp & Hỗ trợ',
    title: lang === 'en' ? 'Connect With Us' : 'Kết nối với chúng tôi',
    sub: lang === 'en' 
      ? 'VOVSMART is always ready to listen and advise on the most optimal system for your business.'
      : 'VOVSMART luôn sẵn sàng lắng nghe và tư vấn hệ thống tối ưu nhất cho doanh nghiệp bạn.',
    hq: lang === 'en' ? 'Headquarters' : 'Trụ Sở Chính',
    addr: lang === 'en' ? '123 Dien Bien Phu,\nWard 15, Binh Thanh District,\nHo Chi Minh City' : '123 Điện Biên Phủ,\nPhường 15, Quận Bình Thạnh,\nTP. Hồ Chí Minh',
    hotline: lang === 'en' ? 'Hotline' : 'Tổng Đài Gọi Nhanh',
    sales: lang === 'en' ? 'Sales: ' : 'Kinh doanh: ',
    tech: lang === 'en' ? 'Tech Support: ' : 'Kỹ thuật: ',
    email: lang === 'en' ? 'Support Email' : 'Email Hỗ Trợ',
    formTitle: lang === 'en' ? 'Consultancy Request' : 'Yêu Cầu Tự Vấn',
    name: lang === 'en' ? 'Full Name *' : 'Họ & Tên *',
    phoneVal: lang === 'en' ? 'Phone Number *' : 'Số Điện Thoại *',
    emailVal: lang === 'en' ? 'Email Address' : 'Địa Chỉ Email',
    subject: lang === 'en' ? 'Support Topic *' : 'Nội Dung Cần Hỗ Trợ *',
    ops: lang === 'en' ? [
       'Inverter & PLC Solutions',
       'Smart Home & BMS Quotes',
       'System Maintenance & Repair',
       'Agency Partnership / Other'
    ] : [
       'Tư vấn giải pháp biến tần, PLC',
       'Báo giá dự án Smart Home, BMS',
       'Bảo trì, sửa chữa hệ thống',
       'Hợp tác đại lý / Khác'
    ],
    details: lang === 'en' ? 'Request Details' : 'Chi Tiết Yêu Cầu',
    send: lang === 'en' ? 'Send Request' : 'Gửi Yêu Cầu',
    placeName: lang === 'en' ? 'e.g., John Doe' : 'VD: Nguyễn Văn A',
    placeDetail: lang === 'en' ? 'Describe your needs...' : 'Mô tả cụ thể nhu cầu của bạn...'
  };

  return (
    <div className="flex flex-col py-8 overflow-hidden relative min-h-screen">
      {/* Header */}
      <div className="px-8 md:px-12 mb-12 text-center md:text-left">
        <p className="text-secondary font-bold uppercase tracking-wider text-sm mb-2">{t.tag}</p>
        <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-4">{t.title}</h1>
        <p className="text-on-surface-variant max-w-2xl text-lg">
          {t.sub}
        </p>
      </div>

      <div className="px-8 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
         <div className="bg-white rounded-2xl p-8 flex border border-outline-variant shadow-sm hover:shadow-md transition-shadow gap-4">
            <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center text-primary shrink-0">
               <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-bold text-on-surface mb-2">{t.hq}</h3>
              <p className="text-on-surface-variant font-medium leading-relaxed hover:text-primary transition-colors cursor-pointer whitespace-pre-line">
                {t.addr}
              </p>
            </div>
         </div>
         
         <div className="bg-white rounded-2xl p-8 flex border border-outline-variant shadow-sm hover:shadow-md transition-shadow gap-4">
            <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center text-primary shrink-0">
               <Phone size={24} />
            </div>
            <div>
              <h3 className="font-bold text-on-surface mb-2">{t.hotline}</h3>
              <div className="text-on-surface-variant font-medium leading-relaxed flex flex-col gap-1">
                <p>{t.sales}<span className="font-bold text-on-surface cursor-pointer hover:text-primary transition-colors">0909 123 456</span></p>
                <p>{t.tech}<span className="font-bold text-on-surface cursor-pointer hover:text-primary transition-colors">1900 6789</span></p>
              </div>
            </div>
         </div>

         <div className="bg-white rounded-2xl p-8 flex border border-outline-variant shadow-sm hover:shadow-md transition-shadow gap-4">
            <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center text-primary shrink-0">
               <Mail size={24} />
            </div>
            <div>
              <h3 className="font-bold text-on-surface mb-2">{t.email}</h3>
              <div className="text-on-surface-variant font-medium leading-relaxed flex flex-col gap-1">
                <a href="mailto:info@vovsmart.com" className="hover:text-primary transition-colors">info@vovsmart.com</a>
                <a href="mailto:support@vovsmart.com" className="hover:text-primary transition-colors">support@vovsmart.com</a>
              </div>
            </div>
         </div>
      </div>

      <div className="mx-8 md:mx-12 flex flex-col lg:flex-row gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-outline-variant p-8 lg:p-10 lg:w-1/2 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary"></div>
           <h2 className="text-2xl font-bold mb-8 text-on-surface">{t.formTitle}</h2>
           <form className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex flex-col">
                 <label className="text-sm font-bold text-on-surface mb-2">{t.name}</label>
                 <input type="text" className="bg-surface-variant border border-outline-variant rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium" placeholder={t.placeName} required />
               </div>
               <div className="flex flex-col">
                 <label className="text-sm font-bold text-on-surface mb-2">{t.phoneVal}</label>
                 <input type="tel" className="bg-surface-variant border border-outline-variant rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium" placeholder="09..." required />
               </div>
             </div>
             <div className="flex flex-col">
                <label className="text-sm font-bold text-on-surface mb-2">{t.emailVal}</label>
                <input type="email" className="bg-surface-variant border border-outline-variant rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium" placeholder="name@company.com" />
             </div>
             <div className="flex flex-col">
                <label className="text-sm font-bold text-on-surface mb-2">{t.subject}</label>
                <select className="bg-surface-variant border border-outline-variant rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium cursor-pointer">
                   {t.ops.map((o, i) => <option key={i}>{o}</option>)}
                </select>
             </div>
             <div className="flex flex-col">
                <label className="text-sm font-bold text-on-surface mb-2">{t.details}</label>
                <textarea rows={4} className="bg-surface-variant border border-outline-variant rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium resize-none" placeholder={t.placeDetail}></textarea>
             </div>
             <button type="submit" className="w-full bg-primary text-white rounded-lg py-3.5 font-bold hover:bg-secondary transition-colors shadow-md flex items-center justify-center gap-2">
                {t.send} <Send size={18} />
             </button>
           </form>
        </div>

        {/* Map */}
        <div className="lg:w-1/2 bg-slate-100 rounded-2xl overflow-hidden shadow-lg border border-outline-variant relative min-h-[500px]">
           <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.262507204987!2d106.69766931533446!3d10.791196992311494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528cb615e4f2b%3A0xc6bf8de86bd4482a!2sLandmark%2081!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s" 
              className="w-full h-full border-0 absolute inset-0" 
              allowFullScreen={true} 
              loading="lazy"
              title="Office Map">
           </iframe>
        </div>
      </div>
    </div>
  );
}

