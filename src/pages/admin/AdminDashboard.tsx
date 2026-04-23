import { Link } from 'react-router-dom';
import { Package, Activity, Info, ChevronRight, Settings } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col">
      <div className="mb-10">
        <p className="text-primary font-bold uppercase tracking-wider text-sm mb-2">Tổng quan</p>
        <h1 className="text-3xl font-bold text-on-surface">Bảng Điều Khiển Hệ Thống</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
           <div className="w-12 h-12 bg-primary-container text-primary rounded-xl flex items-center justify-center mb-6">
             <Package size={24} />
           </div>
           <div>
             <p className="text-sm font-bold text-slate-400 uppercase mb-1">Quản lý cơ sở dữ liệu</p>
             <h3 className="text-xl font-bold mb-4 text-on-surface">Kho Sản Phẩm</h3>
             <Link to="/admin/products" className="text-primary font-bold text-sm bg-primary/5 px-4 py-2 rounded-lg inline-flex items-center hover:bg-primary/10 transition-colors">
                Truy cập dữ liệu <ChevronRight size={16} />
             </Link>
           </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
           <div className="w-12 h-12 bg-secondary-container text-secondary rounded-xl flex items-center justify-center mb-6">
             <Activity size={24} />
           </div>
           <div>
             <p className="text-sm font-bold text-slate-400 uppercase mb-1">Nội dung động</p>
             <h3 className="text-xl font-bold mb-4 text-on-surface">Tin tức & Dự án</h3>
             <button className="text-secondary font-bold text-sm bg-secondary/5 px-4 py-2 rounded-lg inline-flex items-center hover:bg-secondary/10 transition-colors cursor-not-allowed opacity-60">
                Đang phát triển...
             </button>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
           <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mb-6">
             <Settings size={24} />
           </div>
           <div>
             <p className="text-sm font-bold text-slate-400 uppercase mb-1">Cấu hình hệ thống</p>
             <h3 className="text-xl font-bold mb-4 text-on-surface">Cài Đặt Web</h3>
             <span className="text-slate-500 font-bold text-sm bg-slate-100 px-4 py-2 rounded-lg inline-block opacity-70">Khoá bảo vệ</span>
           </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white p-8 rounded-2xl border border-outline-variant shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Activity size={20} className="text-primary"/> Hoạt động gần đây</h2>
            <div className="space-y-6 text-sm font-medium">
               <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-500 before:rounded-full">
                 <p className="text-on-surface">Thêm sản phẩm mới (Bộ biến tần INVT X1)</p>
                 <span className="text-slate-400 text-xs">Vừa xong</span>
               </div>
               <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                 <p className="text-on-surface">Xóa bản ghi "Industrial Pump V2"</p>
                 <span className="text-slate-400 text-xs">2 giờ trước</span>
               </div>
               <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-slate-300 before:rounded-full">
                 <p className="text-on-surface">Đăng nhập từ Admin (Tài khoản Google)</p>
                 <span className="text-slate-400 text-xs">5 giờ trước</span>
               </div>
            </div>
         </div>
         <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-2xl text-white flex flex-col items-center justify-center text-center shadow-lg">
            <Info size={40} className="mb-4 text-white/50" />
            <h3 className="text-xl font-bold mb-2">Kết cấu bền vững</h3>
            <p className="text-white/80 max-w-sm">
              "Mọi thay đổi trên terminal này sẽ được phản chiếu đồng thời lên cơ sở dữ liệu Firebase toàn cầu với độ trễ cực thấp."
            </p>
         </div>
      </div>
    </div>
  );
}
