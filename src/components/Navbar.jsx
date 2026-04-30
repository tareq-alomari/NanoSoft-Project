import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LogOut, User, LayoutDashboard, Package, LayoutGrid } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
              <LayoutDashboard size={24} />
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight">نانو سوفت</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                isActive('/') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <LayoutDashboard size={18} />
              الرئيسية
            </Link>
            <Link 
              to="/categories" 
              className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                isActive('/categories') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <LayoutGrid size={18} />
              الأقسام
            </Link>
            <Link 
              to="/profile" 
              className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                isActive('/profile') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <User size={18} />
              الملف الشخصي
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-2.5 rounded-2xl transition-all flex items-center gap-2 group"
              title="تسجيل خروج"
            >
              <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline font-bold">خروج</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
