import React, { useState, useEffect } from 'react';
import { updatePassword } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Save, Lock, User } from 'lucide-react';

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  
  // Profile state
  const [profile, setProfile] = useState({
    displayName: '',
    phone: '',
  });

  // Password state
  const [pass, setPass] = useState({
    newPass: '',
    confirmPass: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const u = auth.currentUser;
      if (u) {
        const d = await getDoc(doc(db, 'users', u.uid));
        if (d.exists()) {
          setProfile({ displayName: d.data().displayName || '', phone: d.data().phone || '' });
        }
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });
    try {
      const u = auth.currentUser;
      if (u) {
        await updateDoc(doc(db, 'users', u.uid), profile);
        setMsg({ text: 'Cập nhật thông tin thành công!', type: 'success' });
      }
    } catch (err: any) {
      setMsg({ text: 'Lỗi cập nhật: ' + err.message, type: 'error' });
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pass.newPass !== pass.confirmPass) {
      setMsg({ text: 'Mật khẩu xác nhận không khớp!', type: 'error' });
      return;
    }
    setLoading(true);
    setMsg({ text: '', type: '' });
    try {
      const u = auth.currentUser;
      if (u) {
        await updatePassword(u, pass.newPass);
        setMsg({ text: 'Đổi mật khẩu thành công!', type: 'success' });
        setPass({ newPass: '', confirmPass: '' });
      }
    } catch (err: any) {
       // Typically requires recent login
      setMsg({ text: 'Lỗi: Có thể bạn cần đăng xuất và đăng nhập lại để đổi pass.', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col pb-20">
      <div className="mb-10">
        <p className="text-primary font-bold uppercase tracking-wider text-sm mb-2">Cấu hình cá nhân</p>
        <h1 className="text-3xl font-bold text-on-surface">Tài khoản & Bảo mật</h1>
      </div>

      {msg.text && (
        <div className={`p-4 rounded-xl mb-8 font-medium ${msg.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
           {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4"><User className="text-primary"/> Cập nhật thông tin</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Họ & Tên hiển thị</label>
                 <input 
                   type="text" 
                   value={profile.displayName} 
                   onChange={e => setProfile({...profile, displayName: e.target.value})} 
                   className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-primary text-sm font-medium"
                 />
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Số điện thoại</label>
                 <input 
                   type="tel" 
                   value={profile.phone} 
                   onChange={e => setProfile({...profile, phone: e.target.value})} 
                   className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-primary text-sm font-medium"
                 />
              </div>
              <button disabled={loading} type="submit" className="bg-primary text-white font-bold px-6 py-2.5 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2">
                 <Save size={18} /> Lưu Thay Đổi
              </button>
            </form>
         </div>

         <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4"><Lock className="text-primary"/> Đổi mật khẩu</h2>
            <form onSubmit={handleUpdatePassword} className="space-y-5">
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Mật khẩu mới</label>
                 <input 
                   type="password" 
                   value={pass.newPass} 
                   onChange={e => setPass({...pass, newPass: e.target.value})} 
                   required
                   className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-primary text-sm font-medium"
                 />
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-700 mb-2">Xác nhận mật khẩu</label>
                 <input 
                   type="password" 
                   value={pass.confirmPass} 
                   onChange={e => setPass({...pass, confirmPass: e.target.value})} 
                   required
                   className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-primary text-sm font-medium"
                 />
              </div>
              <button disabled={loading} type="submit" className="bg-slate-800 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-black transition-colors flex items-center gap-2">
                 <Save size={18} /> Lưu Mật Khẩu
              </button>
            </form>
         </div>
      </div>
    </div>
  );
}
