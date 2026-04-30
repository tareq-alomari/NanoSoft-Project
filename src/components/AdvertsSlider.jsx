import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import api from '../utils/api';

const AdvertsSlider = () => {
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        // استخدام الرابط الصحيح من المشروع الأصلي
        const response = await api.get('advert/madverts?type=slide&is_has_any_images=1');
        if (response.data && response.data.data) {
          // فلترة وترتيب الإعلانات كما في المشروع الأصلي
          const activeAds = response.data.data
            .filter(ad => ad.is_active === 1 && ad.image)
            .sort((a, b) => a.sort_order - b.sort_order);
          
          setAdverts(activeAds);
        }
      } catch (err) {
        console.error('Error fetching adverts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdverts();
  }, []);

  useEffect(() => {
    if (adverts.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % adverts.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [adverts]);

  if (loading) {
    return (
      <div className="h-64 md:h-80 flex items-center justify-center bg-white rounded-3xl shadow-sm border border-slate-100">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  if (adverts.length === 0) return null;

  return (
    <div className="relative group overflow-hidden rounded-3xl shadow-xl h-64 md:h-80 bg-slate-900">
      {adverts.map((ad, index) => {
        const imageUrl = ad.image?.large || ad.image?.original || "";
        return (
          <div
            key={ad.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {ad.link ? (
              <a href={ad.link} target="_blank" rel="noopener noreferrer">
                <img src={imageUrl} alt={ad.name} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              <img src={imageUrl} alt={ad.name} className="w-full h-full object-cover opacity-80" />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10 text-white text-right pointer-events-none">
              <h3 className="text-xl md:text-3xl font-bold mb-2 drop-shadow-md">
                {ad.title || ad.name}
              </h3>
              {ad.sub_title && (
                <p className="text-white/80 text-sm md:text-lg max-w-2xl drop-shadow-md">
                  {ad.sub_title}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {adverts.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + adverts.length) % adverts.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % adverts.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all border border-white/10"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {adverts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/30 w-2 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdvertsSlider;
