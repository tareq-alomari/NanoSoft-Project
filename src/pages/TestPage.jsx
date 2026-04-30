import { useState } from 'react';
import TestAPI from '../components/TestAPI';

function TestPage() {
  const [showTest, setShowTest] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* شريط التنقل */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">
            اختبار الاتصال - NanoSoft
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
      </nav>

      {/* المحتوى الرئيسي */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">معلومات الاتصال بالـ API</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">تفاصيل الاتصال:</h3>
                <ul className="space-y-2">
                  <li>
                    <span className="font-medium">الـ URL الأساسي:</span>
                    <code className="block bg-gray-100 p-2 rounded mt-1">
                      {import.meta.env.VITE_API_BASE_URL}
                    </code>
                  </li>
                  <li>
                    <span className="font-medium">اسم المستخدم:</span>
                    <code className="block bg-gray-100 p-2 rounded mt-1">
                      {import.meta.env.VITE_API_USERNAME}
                    </code>
                  </li>
                  <li>
                    <span className="font-medium">كلمة المرور:</span>
                    <code className="block bg-gray-100 p-2 rounded mt-1">
                      {import.meta.env.VITE_API_PASSWORD}
                    </code>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">الـ Endpoints المتوقعة:</h3>
                <ul className="space-y-2">
                  <li>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      POST https://demodelivery.now-ye.com/backend/backend/auth/signin
                    </code>
                    <span className="text-gray-600 text-sm mr-2">- تسجيل الدخول</span>
                  </li>
                  <li>
                    <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      POST https://demodelivery.now-ye.com/backend/backend/auth/restore
                    </code>
                    <span className="text-gray-600 text-sm mr-2">- استعادة/تسجيل حساب</span>
                  </li>
                  <li>
                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      GET https://demodelivery.now-ye.com/backend/tss/advert/madverts
                    </code>
                    <span className="text-gray-600 text-sm mr-2">- جلب الإعلانات</span>
                  </li>
                  <li>
                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      GET https://demodelivery.now-ye.com/backend/nano/tags/types
                    </code>
                    <span className="text-gray-600 text-sm mr-2">- جلب الأقسام/العلامات</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {showTest && <TestAPI />}
        </div>
      </main>
    </div>
  );
}

export default TestPage;