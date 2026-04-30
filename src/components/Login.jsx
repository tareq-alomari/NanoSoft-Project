import { useState } from 'react';
import { api } from '../services/api';

function Login({ onLogin, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await api.login(username, password);
      
      if (response.ok) {
        const data = await response.json();
        onLogin(data);
      } else {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">تسجيل الدخول</h3>
        <p className="text-gray-600">أدخل بياناتك للوصول إلى حسابك</p>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <i className="fas fa-exclamation-circle text-red-500 mr-2"></i>
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">اسم المستخدم</label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fas fa-user text-gray-400"></i>
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field pr-10"
              placeholder="أدخل اسم المستخدم"
              required
            />
          </div>
        </div>
        
        <div className="mb-8">
          <label className="block text-gray-700 mb-2 font-medium">كلمة المرور</label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fas fa-lock text-gray-400"></i>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pr-10"
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              جاري التحقق...
            </>
          ) : (
            <>
              <i className="fas fa-sign-in-alt mr-2"></i>
              تسجيل الدخول
            </>
          )}
        </button>
      </form>
      
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-gray-600 mb-2">ليس لديك حساب؟</p>
        <button
          onClick={onSwitchToRegister}
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <i className="fas fa-user-plus mr-2"></i>
          إنشاء حساب جديد
        </button>
      </div>
    </div>
  );
}

export default Login;