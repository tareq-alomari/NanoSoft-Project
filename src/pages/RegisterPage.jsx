import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Mail, Phone, Lock, Loader2, ArrowRight } from 'lucide-react';
import api from '../utils/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      setError('⚠️ كلمة المرور غير متطابقة');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('auth/register', {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirm
      });

      if (response.data.status) {
        navigate('/login', { state: { message: '✅ تم إنشاء الحساب بنجاح، يمكنك الآن تسجيل الدخول' } });
      } else {
        // عرض الرسالة القادمة من السيرفر بشكل مفصل
        const serverMsg = response.data.message;
        const serverErrors = response.data.errors;
        let detailedError = serverMsg || 'فشل إنشاء الحساب';
        
        if (serverErrors) {
          detailedError += ': ' + Object.values(serverErrors).flat().join(', ');
        }
        setError(detailedError);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || '⚠️ مشكلة في الاتصال بالسيرفر';
      const serverErrors = err.response?.data?.errors;
      let detailedError = errorMsg;
      
      if (serverErrors) {
        detailedError += ': ' + Object.values(serverErrors).flat().join(', ');
      }
      setError(detailedError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-emerald-600 p-8 text-white text-center">
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <UserPlus size={32} />
          </div>
          <h1 className="text-2xl font-bold">إنشاء حساب جديد</h1>
          <p className="text-emerald-100 mt-2">انضم إلينا اليوم وابدأ رحلتك</p>
        </div>

        <form onSubmit={handleRegister} className="p-8 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 mr-1 uppercase">الاسم الكامل</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="مثال: أحمد محمد"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3 pr-10 transition-all"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <User size={18} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 mr-1 uppercase">رقم الجوال</label>
              <div className="relative">
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="05xxxxxxx"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3 pr-10 transition-all"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <Phone size={18} />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 mr-1 uppercase">البريد الإلكتروني</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3 pr-10 transition-all"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 mr-1 uppercase">كلمة المرور</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3 pr-10 transition-all"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 mr-1 uppercase">تأكيد كلمة المرور</label>
            <div className="relative">
              <input
                type="password"
                name="confirm"
                value={formData.confirm}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3 pr-10 transition-all"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 active:scale-95 disabled:opacity-70 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'إنشاء الحساب'}
          </button>

          <div className="text-center mt-6">
            <Link to="/login" className="text-sm text-slate-500 flex items-center justify-center gap-1 hover:text-emerald-600 transition-colors">
              <ArrowRight size={16} />
              لديك حساب بالفعل؟ تسجيل الدخول
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
