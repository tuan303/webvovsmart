import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLangStore } from '../store/langStore';

export default function Solutions() {
  const { lang } = useLangStore();

  const t = {
    tag: lang === 'en' ? 'System Analysis' : 'Hệ Thống Phân Tích',
    title: lang === 'en' ? 'Comprehensive Automation Solutions' : 'Giải Pháp Tự Động Hoá Toàn Diện',
    sub: lang === 'en' ? 'Enhance operational efficiency and optimize costs with smart solutions tailored for modern industries.' : 'Nâng cao hiệu suất vận hành và tối ưu hóa chi phí bằng các giải pháp thông minh được thiết kế riêng cho nền công nghiệp hiện đại.',
    header: lang === 'en' ? 'Simplifying Complexity' : 'Đơn giản hoá sự phức tạp',
    headerDesc: lang === 'en' ? 'We integrate Edge Computing, SCADA, and IoT into existing workflows to build a non-disruptive smart factory.' : 'Chúng tôi tích hợp Edge Computing, SCADA, và IoT vào các quy trình hiện tại để xây dựng nhà máy thông minh hoạt động không gián đoạn.',
    list: lang === 'en' ? [
       'Real-time Data Collection', 
       'Machine Learning Predictive Maintenance', 
       'Power Optimization', 
       'Secure Remote Monitoring'
    ] : [
       'Thu thập dữ liệu theo thời gian thực', 
       'Phân tích máy học dự đoán tình trạng máy', 
       'Tối ưu hóa tiêu thụ điện năng', 
       'Giám sát từ xa an toàn tuyệt đối'
    ],
    pdf: lang === 'en' ? 'Download Technical Document (PDF)' : 'Tải xuống tài liệu kỹ thuật (PDF)',
    procTag: lang === 'en' ? 'Deployment Process' : 'Quy Trình Triển Khai',
    procTitle: lang === 'en' ? 'Standard 4-Step Project Delivery' : 'Triển khai dự án tiêu chuẩn 4 bước',
    procs: lang === 'en' ? [
       { step: '01', title: 'Survey & Assessment', desc: 'Expert engineers analyze the current system state.' },
       { step: '02', title: 'System Design', desc: 'Develop electrical drawings and device logic.' },
       { step: '03', title: 'Deployment & Handover', desc: 'Professional installation and testing.' },
       { step: '04', title: 'Maintenance & Upgrades', desc: '24/7 technical support.' }
    ] : [
       { step: '01', title: 'Khảo sát & Đánh giá', desc: 'Kỹ sư chuyên môn phân tích hiện trạng hệ thống.' },
       { step: '02', title: 'Thiết kế hệ thống', desc: 'Xây dựng logic bản vẽ điện & giải pháp thiết bị.' },
       { step: '03', title: 'Triển khai & Chuyển giao', desc: 'Lắp đặt chuyên nghiệp, chạy thử nghiệm.' },
       { step: '04', title: 'Bảo trì & Nâng cấp', desc: 'Hỗ trợ kỹ thuật 24/7, duy trì hoạt động.' }
    ]
  };

  return (
    <div className="flex flex-col py-8 overflow-hidden relative min-h-screen">
      {/* Header */}
      <div className="px-8 md:px-12 mb-12">
        <p className="text-secondary font-bold uppercase tracking-wider text-sm mb-2">{t.tag}</p>
        <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-4">{t.title}</h1>
        <p className="text-on-surface-variant max-w-2xl text-lg">
          {t.sub}
        </p>
      </div>

      <div className="px-8 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative rounded-2xl overflow-hidden h-[500px] shadow-lg">
           <img src="https://images.unsplash.com/photo-1580983546554-cd30d31c4cc8?auto=format&fit=crop&q=80&w=1000" alt="Process diagram" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="flex flex-col justify-center">
           <h2 className="text-3xl font-bold mb-6 text-on-surface">{t.header}</h2>
           <p className="text-on-surface-variant mb-8 text-lg leading-relaxed">
             {t.headerDesc}
           </p>
           <ul className="space-y-4 mb-10">
             {t.list.map((item, idx) => (
               <li key={idx} className="flex items-center gap-3">
                 <CheckCircle2 className="text-primary shrink-0" size={24} />
                 <span className="font-medium text-on-surface">{item}</span>
               </li>
             ))}
           </ul>
           <div>
             <button className="bg-primary text-white font-bold rounded-lg px-8 py-3.5 hover:bg-secondary transition-colors shadow-md flex items-center gap-2 w-max">
                {t.pdf} <ArrowRight size={18} />
             </button>
           </div>
        </div>
      </div>

      {/* Process */}
      <div className="bg-surface-variant py-20 px-8 md:px-12 mb-8 mx-8 rounded-3xl">
        <div className="text-center mb-16">
          <p className="text-secondary font-bold uppercase tracking-wider text-sm mb-2">{t.procTag}</p>
          <h2 className="text-3xl font-bold text-on-surface">{t.procTitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {t.procs.map(proc => (
            <div key={proc.step} className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="text-5xl font-black text-slate-100 absolute -right-4 -top-4 group-hover:text-primary-container transition-colors select-none">{proc.step}</div>
               <div className="relative z-10 w-12 h-12 rounded-full bg-primary-container text-primary font-bold flex items-center justify-center mb-6">
                 {proc.step}
               </div>
               <h3 className="text-xl font-bold mb-3 text-on-surface relative z-10">{proc.title}</h3>
               <p className="text-on-surface-variant font-medium relative z-10 leading-relaxed">{proc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

