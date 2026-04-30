import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { User, Mail, Phone, Trash2, Loader2, AlertTriangle, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('me');
        if (response.data && !response.data.error) {
          setUser(response.data);
        } else {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      const response = await api.delete('deleteaccount?confirm=1');
      if (response.status === 200 || response.data.status) {
        alert('تم حذف الحساب بنجاح');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        alert(response.data.error?.message || 'حدث خطأ أثناء الحذف');
      }
    } catch (err) {
      alert('خطأ في الاتصال بالسيرفر');
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          {/* Header */}
          <div className="bg-slate-900 p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                <User size={48} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">{user?.name || '-'}</h1>
              <p className="text-slate-400">{user?.email || '-'}</p>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-1 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <User size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">الاسم الكامل</span>
                </div>
                <p className="text-lg font-bold text-slate-800">{user?.name || '-'}</p>
              </div>

              <div className="space-y-1 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Mail size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">البريد الإلكتروني</span>
                </div>
                <p className="text-lg font-bold text-slate-800">{user?.email || '-'}</p>
              </div>

              <div className="space-y-1 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Phone size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">رقم الجوال</span>
                </div>
                <p className="text-lg font-bold text-slate-800 ltr inline-block">{user?.mobile || '-'}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 justify-center pt-8 border-t border-slate-100">
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 px-8 py-3 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-colors"
              >
                <Trash2 size={20} />
                حذف الحساب
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
              >
                <LogOut size={20} />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">هل أنت متأكد؟</h3>
            <p className="text-slate-500 mb-8">حذف الحساب قرار نهائي ولا يمكن التراجع عنه.</p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {deleteLoading ? <Loader2 className="animate-spin" size={20} /> : 'نعم، احذف الحساب'}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
