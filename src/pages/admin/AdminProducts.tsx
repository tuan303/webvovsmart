import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Plus, Trash2, Tag, Loader2, Languages } from 'lucide-react';

interface Product {
  id: string;
  name: string;      // Vietnamese Name
  nameEn: string;    // English Name
  category: string;
  code: string;
  imageUrl: string;
  isNew: boolean;
  inStock: boolean;
  createdAt: number;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', category: 'Biến tần INVT', code: '', imageUrl: '', isNew: false, inStock: true
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const autoTranslate = async (text: string) => {
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang: 'en' })
      });
      const data = await res.json();
      return data.translatedText || text;
    } catch (err) {
      console.error("Translation fail:", err);
      return text; // fallback
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTranslating(true);
    try {
      const nameEn = await autoTranslate(formData.name);
      const categoryEn = await autoTranslate(formData.category);

      const newProduct = {
        ...formData,
        nameEn,
        categoryEn,
        createdAt: Date.now(),
      };
      
      await addDoc(collection(db, 'products'), newProduct);
      setIsAdding(false);
      setFormData({ name: '', category: 'Biến tần INVT', code: '', imageUrl: '', isNew: false, inStock: true });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa dữ liệu sản phẩm này? Thao tác không thể hoàn tác.')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product", error);
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-full">
      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto flex flex-col pb-20">
      <div className="flex justify-between items-end mb-10">
        <div>
          <p className="text-primary font-bold uppercase tracking-wider text-sm mb-2">Trình quản lý cơ sở dữ liệu</p>
          <h1 className="text-3xl font-bold text-on-surface">Kho Sản Phẩm (Bilingual)</h1>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary hover:bg-secondary text-white font-bold rounded-lg px-5 py-2.5 transition-colors shadow-sm flex items-center gap-2"
        >
          {isAdding ? "Huỷ thao tác" : <><Plus size={18} /> Thêm Sản Phẩm</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant mb-10 relative overflow-hidden">
          {isTranslating && (
             <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-primary mb-4" size={32} />
                <p className="font-bold text-primary animate-pulse">Đang dịch tự động sang Tiếng Anh...</p>
             </div>
          )}
          
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-on-surface"><Tag className="text-primary" size={20}/> Form Thêm Sản Phẩm</h2>
          <p className="text-sm text-slate-500 mb-6 flex items-center gap-2"><Languages size={16}/> Nhập bằng Tiếng Việt, hệ thống sẽ tự động tạo bản Tiếng Anh.</p>
          
          <form onSubmit={handleAddProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-on-surface mb-2">Tên sản phẩm (Tiếng Việt) *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-surface-variant border border-outline-variant rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium" placeholder="VD: Biến tần mặt trời 5kW" />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-on-surface mb-2">Mã định danh (Code) *</label>
                <input required type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="bg-surface-variant border border-outline-variant rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium" placeholder="VD: GD100-XXX" />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-on-surface mb-2">Danh mục hệ thống *</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="bg-surface-variant border border-outline-variant rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium cursor-pointer">
                  <option>Biến tần INVT</option>
                  <option>Bộ điều khiển PLC</option>
                  <option>Hệ thống Servo</option>
                  <option>Cảm biến công nghiệp</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-on-surface mb-2">Đường dẫn URL ảnh thư viện *</label>
                <input required type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="bg-surface-variant border border-outline-variant rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium" placeholder="https://..." />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant mt-6">
              <button type="submit" disabled={isTranslating} className="bg-slate-800 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-black transition-colors shadow-sm disabled:opacity-50">
                Lưu vào CSDL
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-variant border-b border-outline-variant text-slate-500 font-bold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Hình Ảnh</th>
                <th className="px-6 py-4">Tên Sản Phẩm (VI / EN)</th>
                <th className="px-6 py-4">Mã Sản Phẩm</th>
                <th className="px-6 py-4 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-medium">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="w-16 h-16 bg-white border border-outline-variant rounded-lg p-1 flex justify-center items-center shadow-sm">
                      <img src={product.imageUrl} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-primary font-bold text-base mb-1">{product.name}</div>
                    <div className="text-slate-400 text-xs">{product.nameEn || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-mono">{product.code}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-lg transition-colors inline-block" title="Xoá dữ liệu">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    Chưa có dữ liệu trong bộ sưu tập.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

