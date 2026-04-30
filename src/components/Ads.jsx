import { useState, useEffect } from 'react';
import { api } from '../services/api';

function Ads() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await api.getAds();
      
      if (response.ok) {
        const data = await response.json();
        // عرض الإعلانات النشطة فقط
        const activeAds = data.filter(ad => ad.is_active);
        setAds(activeAds);
      } else {
        setError('فشل تحميل الإعلانات');
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2">جاري تحميل الإعلانات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        لا توجد إعلانات نشطة حالياً
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">الإعلانات النشطة</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map(ad => (
          <div key={ad.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {ad.image && (
              <img 
                src={ad.image} 
                alt={ad.title}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>
              <p className="text-gray-600 mb-4">{ad.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(ad.created_at).toLocaleDateString('ar-SA')}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  نشط
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ads;