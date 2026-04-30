const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_USERNAME = import.meta.env.VITE_API_USERNAME;
const API_PASSWORD = import.meta.env.VITE_API_PASSWORD;

// الـ endpoints الحقيقية التي وجدتها (كاملة)
const REAL_ENDPOINTS = {
  login: 'https://demodelivery.now-ye.com/backend/backend/auth/signin',
  register: 'https://demodelivery.now-ye.com/backend/backend/auth/restore',
  ads: 'https://demodelivery.now-ye.com/backend/tss/advert/madverts',
  categories: 'https://demodelivery.now-ye.com/backend/nano/tags/types'
};

// إنشاء Authorization header
const authHeader = {
  'Authorization': `Basic ${btoa(`${API_USERNAME}:${API_PASSWORD}`)}`
};

// إضافة headers لـ CORS
const corsHeaders = {
  'Origin': 'http://localhost:5173',
  'Access-Control-Request-Method': 'POST',
  'Access-Control-Request-Headers': 'content-type'
};

// بيانات تجريبية
const mockData = {
  ads: [
    {
      id: 1,
      title: "عرض خاص على التوصيل",
      description: "احصل على توصيل مجاني للطلبات فوق 50 ريال",
      image: "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Ad+1",
      is_active: true,
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      title: "خصم 20% على المطاعم",
      description: "استمتع بخصم 20% على جميع المطاعم المشاركة",
      image: "https://via.placeholder.com/400x300/10B981/FFFFFF?text=Ad+2",
      is_active: true,
      created_at: "2024-01-20T14:45:00Z"
    }
  ],
  categories: [
    {
      id: 1,
      name: "مطاعم",
      image: "https://via.placeholder.com/300x200/EF4444/FFFFFF?text=مطاعم"
    },
    {
      id: 2,
      name: "مقاهي",
      image: "https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=مقاهي"
    },
    {
      id: 3,
      name: "سوبرماركت",
      image: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=سوبرماركت"
    }
  ]
};

// وظيفة محاكاة الاستجابة
const mockResponse = (data, status = 200, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: status >= 200 && status < 300,
        status,
        json: async () => data,
        text: async () => JSON.stringify(data)
      });
    }, delay);
  });
};

export const api = {
  // تسجيل الدخول
  async login(username, password) {
    const response = await fetch(`${REAL_ENDPOINTS.login}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders
      },
      body: JSON.stringify({ 
        login: username, 
        password: password 
      }),
      mode: 'cors',
      credentials: 'include' // لإرسال cookies
    });
    return response;
  },

  // التسجيل (قد يكون restore هو للتسجيل)
  async register(username, password) {
    const response = await fetch(`${REAL_ENDPOINTS.register}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders
      },
      body: JSON.stringify({ 
        email: username, // قد يكون email بدلاً من username
        password: password 
      }),
      mode: 'cors',
      credentials: 'include'
    });
    return response;
  },

  // جلب الإعلانات
  async getAds() {
    const response = await fetch(`${REAL_ENDPOINTS.ads}`, {
      headers: {
        ...authHeader,
        ...corsHeaders
      },
      mode: 'cors',
      credentials: 'include'
    });
    return response;
  },

  // جلب الأقسام/العلامات
  async getCategories() {
    const response = await fetch(`${REAL_ENDPOINTS.categories}`, {
      headers: {
        ...authHeader,
        ...corsHeaders
      },
      mode: 'cors',
      credentials: 'include'
    });
    return response;
  },

  // حذف الحساب
  async deleteAccount(userId, token) {
    const response = await fetch(`https://demodelivery.now-ye.com/backend/backend/users/update/${userId}`, {
      method: 'POST', // قد يكون POST وليس DELETE
      headers: {
        ...authHeader,
        'Authorization': `Bearer ${token}`,
        ...corsHeaders
      },
      mode: 'cors',
      credentials: 'include'
    });
    return response;
  },

  // الحصول على الـ endpoints
  getEndpoints() {
    return REAL_ENDPOINTS;
  }
};