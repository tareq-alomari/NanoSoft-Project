import { useState, useEffect } from 'react';
import { api } from '../services/api';

function TestAPI() {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setTestResult('جاري اختبار الاتصال...');
    
    try {
      // اختبار الاتصال الأساسي مع CORS
      const response = await fetch(import.meta.env.VITE_API_BASE_URL, {
        mode: 'cors',
        headers: {
          'Origin': 'http://localhost:5173'
        }
      });
      if (response.ok) {
        setTestResult(`الاتصال ناجح! حالة: ${response.status}`);
      } else {
        setTestResult(`الاتصال فشل! حالة: ${response.status}`);
      }
    } catch (error) {
      setTestResult(`خطأ في الاتصال: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testAuth = async () => {
    setLoading(true);
    setTestResult('جاري اختبار المصادقة...');
    
    try {
      const response = await api.getAds();
      if (response.ok) {
        setTestResult(`المصادقة ناجحة! حالة: ${response.status}`);
      } else {
        setTestResult(`المصادقة فشلت! حالة: ${response.status}`);
      }
    } catch (error) {
      setTestResult(`خطأ في المصادقة: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testEndpoints = async () => {
    setLoading(true);
    setTestResult('جاري اكتشاف الـ endpoints...');
    
    try {
      // قائمة الـ endpoints المحتملة
      const endpoints = [
        '/api/login',
        '/api/register',
        '/api/ads',
        '/api/categories',
        '/auth/login',
        '/auth/register',
        '/user/login',
        '/user/register',
        '/v1/login',
        '/v1/register',
        '/login',
        '/register',
        '/ads',
        '/categories'
      ];
      
      let foundEndpoints = [];
      
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Origin': 'http://localhost:5173',
              'Authorization': `Basic ${btoa(`${import.meta.env.VITE_API_USERNAME}:${import.meta.env.VITE_API_PASSWORD}`)}`
            }
          });
          
          if (response.status !== 404 && response.status !== 405) {
            foundEndpoints.push(`${endpoint} (${response.status})`);
          }
        } catch (err) {
          // تجاهل الأخطاء
        }
      }
      
      if (foundEndpoints.length > 0) {
        setTestResult(`تم العثور على الـ endpoints التالية:\n${foundEndpoints.join('\n')}`);
      } else {
        setTestResult('لم يتم العثور على أي endpoints معروفة');
      }
    } catch (error) {
      setTestResult(`خطأ في اكتشاف الـ endpoints: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const showDiscoveredEndpoints = () => {
    const endpoints = api.getEndpoints();
    setTestResult(`الـ endpoints الحقيقية:\n\n• تسجيل الدخول:\n  ${endpoints.login}\n\n• التسجيل/استعادة:\n  ${endpoints.register}\n\n• الإعلانات:\n  ${endpoints.ads}\n\n• الأقسام/العلامات:\n  ${endpoints.categories}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">اختبار الاتصال بالـ API</h2>
      
      <div className="mb-4">
        <p className="text-gray-600 mb-2">الـ URL الأساسي:</p>
        <code className="bg-gray-100 p-2 rounded block">{import.meta.env.VITE_API_BASE_URL}</code>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600 mb-2">اسم المستخدم:</p>
        <code className="bg-gray-100 p-2 rounded block">{import.meta.env.VITE_API_USERNAME}</code>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-blue-600 font-medium">الوضع الحقيقي مفعل</span>
        </div>
        <p className="text-gray-600 text-sm mt-1">يتم الاتصال بالـ backend الحقيقي</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <button
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          اختبار الاتصال
        </button>
        
        <button
          onClick={testAuth}
          disabled={loading}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          اختبار المصادقة
        </button>
        
        <button
          onClick={testEndpoints}
          disabled={loading}
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          اكتشاف الـ Endpoints
        </button>
        
        <button
          onClick={showDiscoveredEndpoints}
          disabled={loading}
          className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition disabled:opacity-50"
        >
          عرض المكتشف
        </button>
      </div>
      
      {testResult && (
        <div className={`p-3 rounded ${
          testResult.includes('ناجح') ? 'bg-green-100 text-green-700' : 
          testResult.includes('فشل') || testResult.includes('خطأ') ? 'bg-red-100 text-red-700' : 
          'bg-blue-100 text-blue-700'
        }`}>
          {testResult}
        </div>
      )}
      
      {loading && (
        <div className="text-center mt-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}

export default TestAPI;