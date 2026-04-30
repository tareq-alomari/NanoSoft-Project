import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { LayoutGrid, Loader2, AlertCircle } from 'lucide-react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('tags/categories');
        if (response.data && response.data.data) {
          setCategories(response.data.data);
        } else {
          setError('فشل في تحميل البيانات');
        }
      } catch (err) {
        setError('⚠️ مشكلة في الاتصال بالسيرفر');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-100">
              <LayoutGrid size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">الأقسام</h1>
              <p className="text-slate-500 text-sm">استعرض جميع التصنيفات المتاحة</p>
            </div>
          </div>
          <span className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold border border-indigo-100">
            {categories.length} قسم
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
            <p className="text-slate-500 animate-pulse">جاري تحميل الأقسام...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-8 rounded-3xl text-center border border-red-100 max-w-md mx-auto">
            <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p className="font-bold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="group bg-white p-4 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-50 p-2 border border-slate-50">
                  {cat.image?.medium ? (
                    <img 
                      src={cat.image.medium} 
                      alt={cat.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                      <LayoutGrid size={32} />
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                  {cat.main_sub === 'main' ? 'قسم رئيسي' : 'قسم فرعي'}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoriesPage;
