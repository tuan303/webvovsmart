import React, { useState } from 'react';
import { loginWithEmail } from '../services/firebase';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Map username to email explicitly for the initial requirement
      const emailDomain = username.includes('@') ? '' : '@webvovsmart.com';
      await loginWithEmail(username + emailDomain, password);
    } catch (err: any) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-outline-variant">
        <div className="text-center mb-8">
           <h1 className="text-3xl font-bold text-on-surface mb-2">Đăng Nhập Quản Trị</h1>
           <p className="text-on-surface-variant font-medium">
             Truy cập hệ thống VOVSMART Automation
           </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
           <div className="space-y-2">
             <label className="text-sm font-bold text-on-surface">Tài khoản</label>
             <input 
               type="text" 
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               className="w-full bg-surface-variant border border-outline-variant rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all"
               placeholder="adminvovsmart"
               required 
             />
           </div>
           <div className="space-y-2">
             <label className="text-sm font-bold text-on-surface">Mật khẩu</label>
             <input 
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full bg-surface-variant border border-outline-variant rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all"
               placeholder="••••••••"
               required 
             />
           </div>
           <button 
             type="submit"
             disabled={loading}
             className="w-full bg-primary hover:bg-secondary text-white py-3.5 rounded-xl font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2 shadow-sm"
           >
             {loading ? 'Đang xác thực...' : 'Đăng Nhập Hệ Thống'}
           </button>
        </form>
      </div>
    </div>
  );
}
