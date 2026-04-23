import { Outlet, Link, useLocation } from 'react-router-dom';
import { logout } from '../../services/firebase';
import { LayoutDashboard, Package, LogOut, Globe, ShieldCheck, Users, Settings } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden relative">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-outline-variant bg-white flex flex-col justify-between shadow-sm z-10 overflow-y-auto">
          <div>
            <div className="h-20 flex items-center px-6 border-b border-outline-variant">
              <Link to="/admin" className="text-xl font-bold text-primary flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">IS</div>
                <span className="text-on-surface">Admin Portal</span>
              </Link>
            </div>
            
            <div className="p-4 space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 ml-2 mt-2">Quản lý hệ thống</p>
              
              <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/admin' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-primary'}`}>
                <LayoutDashboard size={20} /> Dashboard
              </Link>
              
              <Link to="/admin/products" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/admin/products' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-primary'}`}>
                <Package size={20} /> Sản phẩm
              </Link>

              <Link to="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/admin/users' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-primary'}`}>
                <Users size={20} /> Tài khoản & Quyền
              </Link>

              <Link to="/admin/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === '/admin/settings' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-primary'}`}>
                <Settings size={20} /> Cấu hình Admin
              </Link>
            </div>
          </div>

          <div className="p-4 border-t border-outline-variant space-y-2 shrink-0">
            <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 hover:text-primary transition-colors">
              <Globe size={20} /> Quay lại Website
            </Link>
            <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors">
              <LogOut size={20} /> Đăng xuất
            </button>
          </div>
        </aside>

        {/* Main Viewport */}
        <main className="flex-1 overflow-y-auto bg-surface-variant p-8 md:p-10">
          <Outlet />
        </main>
      </div>

      {/* Bottom Status Bar */}
      <footer className="h-10 bg-white border-t border-outline-variant px-6 flex items-center justify-between text-xs font-medium text-slate-500 z-20 shrink-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-green-600">
            <ShieldCheck size={14} /> Server Trực tuyến
          </span>
          <span>Admin Build v2.0.0</span>
        </div>
        <div>
          <span>Bản quyền © 2026 VOVSMART</span>
        </div>
      </footer>
    </div>
  );
}
