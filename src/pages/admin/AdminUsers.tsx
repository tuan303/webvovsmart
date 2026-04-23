import { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Shield, UserPlus, Trash2, Edit2 } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  role: 'admin' | 'editor' | 'publisher';
  displayName?: string;
  phone?: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<UserData>>({ role: 'editor', email: '', displayName: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const snap = await getDocs(collection(db, 'users'));
      setUsers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserData)));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateRole = async (id: string, role: string) => {
    try {
      await updateDoc(doc(db, 'users', id), { role });
      fetchUsers();
    } catch (e) {
      console.error(e);
      alert('Không có quyền đổi role hoặc lỗi kết nối. Vui lòng cập nhật security rules trong Firebase console.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col pb-20">
      <div className="mb-10">
        <p className="text-primary font-bold uppercase tracking-wider text-sm mb-2">Hệ Thống</p>
        <h1 className="text-3xl font-bold text-on-surface">Quản Lý Phân Quyền</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-outline-variant overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-variant border-b border-outline-variant text-slate-500 font-bold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Tài Khoản Email</th>
                <th className="px-6 py-4">Tên Hiển Thị</th>
                <th className="px-6 py-4">Quyền Hạn</th>
                <th className="px-6 py-4 text-right">Lệnh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-medium">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-800 font-bold">{user.email}</td>
                  <td className="px-6 py-4">{user.displayName || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={user.role} 
                      onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1 rounded-full outline-none cursor-pointer border ${
                        user.role === 'admin' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      <option value="admin">Admin</option>
                      <option value="editor">Biên tập (Editor)</option>
                      <option value="publisher">Đăng bài (Publisher)</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <button className="text-slate-400 hover:text-primary transition-colors p-2"><Edit2 size={16} /></button>
                     <button className="text-slate-400 hover:text-red-500 transition-colors p-2"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                   <td colSpan={4} className="p-8 text-center text-slate-500">Xin lưu ý: Nếu danh sách rỗng, có thể Firebase rules chặn quyền read. Hãy vào Firebase Firestore để kiểm tra rules collection 'users'.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-yellow-50 text-yellow-800 p-6 rounded-2xl border border-yellow-200 text-sm">
         <h4 className="font-bold flex items-center gap-2 mb-2"><Shield size={18} /> Lưu ý về Authentication</h4>
         <p className="opacity-90">Theo thiết kế của Firebase, việc trực tiếp tạo mật khẩu mới cho người dùng khác yêu cầu Firebase Admin SDK (Chạy trên backend thực sự). Giao diện này ghi nhận bảng phân quyền trong Database Firestore. Để người dùng đăng nhập thành công vào trang quản trị, hãy tạo tài khoản cho họ ở tab Authentication trong Firebase Console, hoặc gọi hệ thống đăng ký từ Client.</p>
      </div>
    </div>
  );
}
