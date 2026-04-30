// اختبار الاتصال بالـ API
const API_BASE_URL = 'https://demodelivery.now-ye.com/backend/backend';
const API_USERNAME = 'DemoNano';
const API_PASSWORD = 'DemoNano';

console.log('🔍 بدء اختبار الاتصال بالـ API...');
console.log(`الـ URL: ${API_BASE_URL}`);
console.log(`اسم المستخدم: ${API_USERNAME}`);

// اختبار الاتصال الأساسي
async function testConnection() {
  console.log('\n📡 اختبار الاتصال الأساسي...');
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:5173'
      }
    });
    console.log(`✅ حالة الاتصال: ${response.status}`);
    console.log(`📄 نوع المحتوى: ${response.headers.get('content-type')}`);
  } catch (error) {
    console.log(`❌ خطأ في الاتصال: ${error.message}`);
  }
}

// اختبار الـ endpoints المحتملة
async function testEndpoints() {
  console.log('\n🔎 اختبار الـ endpoints المحتملة...');
  
  const endpoints = [
    '/login',
    '/register',
    '/ads',
    '/categories',
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
    '/v1/ads',
    '/v1/categories'
  ];
  
  const authHeader = `Basic ${Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64')}`;
  
  for (const endpoint of endpoints) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      // اختبار GET أولاً
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:5173',
          'Authorization': authHeader
        }
      });
      
      if (response.status !== 404 && response.status !== 405) {
        console.log(`✅ ${endpoint} - ${response.status}`);
        
        // محاولة معرفة نوع الـ endpoint
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('json')) {
          try {
            const data = await response.json();
            console.log(`   📊 بيانات: ${JSON.stringify(data).substring(0, 100)}...`);
          } catch (e) {
            console.log(`   📝 استجابة غير JSON`);
          }
        }
      } else {
        console.log(`❌ ${endpoint} - ${response.status}`);
      }
    } catch (error) {
      console.log(`⚠️ ${endpoint} - خطأ: ${error.message}`);
    }
    
    // تأخير بسيط بين الطلبات
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

// اختبار POST للـ login
async function testLogin() {
  console.log('\n🔐 اختبار تسجيل الدخول...');
  
  const endpoints = [
    '/login',
    '/api/login',
    '/auth/login',
    '/user/login',
    '/v1/login'
  ];
  
  for (const endpoint of endpoints) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Origin': 'http://localhost:5173',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: API_USERNAME,
          password: API_PASSWORD
        })
      });
      
      console.log(`📤 ${endpoint} - ${response.status}`);
      
      if (response.status !== 404 && response.status !== 405) {
        try {
          const data = await response.json();
          console.log(`   📊 استجابة: ${JSON.stringify(data).substring(0, 100)}...`);
        } catch (e) {
          console.log(`   📝 استجابة غير JSON`);
        }
      }
    } catch (error) {
      console.log(`⚠️ ${endpoint} - خطأ: ${error.message}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

// تشغيل جميع الاختبارات
async function runAllTests() {
  await testConnection();
  await testEndpoints();
  await testLogin();
  
  console.log('\n🎯 انتهى الاختبار!');
}

runAllTests().catch(console.error);