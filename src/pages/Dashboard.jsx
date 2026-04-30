import React from 'react';
import Navbar from '../components/Navbar';
import AdvertsSlider from '../components/AdvertsSlider';
import { Sparkles, ArrowLeft } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <AdvertsSlider />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
              <Sparkles size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">مرحباً بك في نظامنا</h2>
            <p className="text-slate-500 mb-6">
              تم تحديث النظام إلى React و Tailwind لتوفير تجربة مستخدم أفضل وأسرع.
            </p>
            <button className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              اكتشف المزيد
              <ArrowLeft size={18} />
            </button>
          </div>
          
          {/* يمكنك إضافة المزيد من الكروت هنا */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
