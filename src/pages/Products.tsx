import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Layers } from 'lucide-react';
import { useLangStore } from '../store/langStore';

interface Product {
  id: string;
  name: string;
  nameEn?: string;
  category: string;
  categoryEn?: string;
  code: string;
  imageUrl: string;
  isNew: boolean;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { lang } = useLangStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const t = {
    tag: lang === 'en' ? 'Product Catalog' : 'Danh mục Sản phẩm',
    title: lang === 'en' ? 'Devices & Solutions' : 'Thiết Bị & Giải Pháp',
    catTitle: lang === 'en' ? 'Categories' : 'Danh mục',
    all: lang === 'en' ? 'All Products' : 'Tất cả',
    empty: lang === 'en' ? 'No products found in this category.' : 'Không tìm thấy sản phẩm nào trong danh mục này.',
    new: lang === 'en' ? 'NEW LAUNCH' : 'Mới ra mắt'
  };

  const categoryOptions = [
    { id: 'all', vi: 'Tất cả', en: 'All Products' },
    { id: 'Biến tần INVT', vi: 'Biến tần INVT', en: 'INVT Inverters' },
    { id: 'Bộ điều khiển PLC', vi: 'Bộ điều khiển PLC', en: 'PLC Controllers' },
    { id: 'Hệ thống Servo', vi: 'Hệ thống Servo', en: 'Servo Systems' },
    { id: 'Cảm biến công nghiệp', vi: 'Cảm biến công nghiệp', en: 'Industrial Sensors' }
  ];
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    // Fall back to matching string if it exists in DB (legacy or new)
    : products.filter(p => p.category === selectedCategory || p.categoryEn === selectedCategory);

  return (
    <div className="flex flex-col p-8 md:p-12 min-h-screen">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <p className="text-secondary font-bold uppercase tracking-wider text-sm mb-2">{t.tag}</p>
        <h1 className="text-4xl md:text-5xl font-bold text-on-surface">{t.title}</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-surface-variant rounded-xl p-6 border border-outline-variant shadow-sm sticky top-28">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-on-surface">
              <Layers size={20} className="text-primary"/> {t.catTitle}
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              {categoryOptions.map(cat => (
                <li 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`cursor-pointer px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === cat.id 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-on-surface-variant hover:bg-white hover:text-primary'
                  }`}
                >
                  {lang === 'en' ? cat.en : cat.vi}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-slate-200 h-72 rounded-2xl"></div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-surface-variant rounded-2xl border border-outline-variant">
              <p className="text-on-surface-variant font-medium text-lg">{t.empty}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-white rounded-2xl shadow-sm border border-outline-variant overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col h-full">
                  <div className="relative h-48 bg-slate-50 p-6 flex justify-center items-center">
                    <img src={product.imageUrl} alt={lang === 'en' && product.nameEn ? product.nameEn : product.name} className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
                        {t.new}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1 border-t border-outline-variant">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-xs font-semibold text-primary">{lang === 'en' && product.categoryEn ? product.categoryEn : product.category}</span>
                    </div>
                    <h4 className="font-bold text-lg text-on-surface mb-2 leading-tight">{lang === 'en' && product.nameEn ? product.nameEn : product.name}</h4>
                    <p className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded w-max mt-auto">{product.code}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

