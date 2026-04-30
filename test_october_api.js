// اكتشاف October CMS API
const API_BASE_URL = 'https://demodelivery.now-ye.com/backend/backend';
const API_USERNAME = 'DemoNano';
const API_PASSWORD = 'DemoNano';

console.log('🔍 اكتشاف October CMS API...');
console.log(`الـ URL: ${API_BASE_URL}`);

// October CMS عادةً ما يكون له هذه الـ endpoints
const octoberEndpoints = [
  // API RESTful
  '/api',
  '/api/v1',
  '/api/v2',
  
  // Plugins شائعة
  '/api/rainlab/user',
  '/api/rainlab/user/auth',
  '/api/rainlab/user/login',
  '/api/rainlab/user/register',
  
  // October CMS API
  '/api/october',
  '/api/october/auth',
  
  // AJAX endpoints
  '/ajax',
  '/ajax/auth',
  '/ajax/login',
  '/ajax/register',
  
  // Endpoints أخرى محتملة
  '/graphql',
  '/graphql/api',
  
  // Endpoints خاصة بالتطبيق
  '/api/ads',
  '/api/categories',
  '/api/products',
  '/api/items'
];

async function testOctoberEndpoints() {
  console.log('\n🔎 اختبار October CMS endpoints...');
  
  const authHeader = `Basic ${Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64')}`;
  
  for (const endpoint of octoberEndpoints) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:5173',
          'Authorization': authHeader,
          'Accept': 'application/json'
        }
      });
      
      console.log(`${endpoint}: ${response.status}`);
      
      if (response.status === 200) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('json')) {
          try {
            const data = await response.json();
            console.log(`   📊 JSON صالح`);
            if (data.error) {
              console.log(`   ❌ خطأ: ${data.error}`);
            } else if (data.success !== undefined) {
              console.log(`   ✅ نجاح: ${data.success}`);
            }
          } catch (e) {
            console.log(`   📝 ليس JSON`);
          }
        }
      } else if (response.status === 401 || response.status === 403) {
        console.log(`   🔒 يحتاج مصادقة`);
      } else if (response.status === 405) {
        console.log(`   ⚠️ Method غير مسموح`);
      }
    } catch (error) {
      console.log(`${endpoint}: خطأ - ${error.message}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
  }
}

async function testOctoberAuth() {
  console.log('\n🔐 اختبار مصادقة October CMS...');
  
  // محاولة الحصول على CSRF token أولاً
  try {
    const csrfResponse = await fetch(`${API_BASE_URL}/auth`, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:5173'
      }
    });
    
    const html = await csrfResponse.text();
    
    // البحث عن CSRF token في HTML
    const csrfMatch = html.match(/name="_token" value="([^"]+)"/) || 
                     html.match(/name="csrf-token" content="([^"]+)"/) ||
                     html.match(/meta.*csrf-token.*content="([^"]+)"/i);
    
    if (csrfMatch) {
      console.log(`✅ وجدت CSRF token`);
      const csrfToken = csrfMatch[1];
      
      // محاولة تسجيل الدخول باستخدام CSRF token
      const loginResponse = await fetch(`${API_BASE_URL}/auth`, {
        method: 'POST',
        headers: {
          'Origin': 'http://localhost:5173',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: new URLSearchParams({
          '_token': csrfToken,
          'login': API_USERNAME,
          'password': API_PASSWORD
        })
      });
      
      console.log(`📤 تسجيل الدخول: ${loginResponse.status}`);
      
      if (loginResponse.status === 200 || loginResponse.status === 302) {
        const cookies = loginResponse.headers.get('set-cookie');
        if (cookies) {
          console.log(`🍪 تم الحصول على cookies`);
        }
      }
    } else {
      console.log(`❌ لم أجد CSRF token`);
    }
  } catch (error) {
    console.log(`❌ خطأ في الحصول على CSRF: ${error.message}`);
  }
}

async function testDirectAPI() {
  console.log('\n🚀 اختبار API مباشر...');
  
  // محاولة الاتصال المباشر مع بيانات الاعتماد
  const credentials = {
    username: API_USERNAME,
    password: API_PASSWORD
  };
  
  // محاولة endpoints مختلفة
  const testUrls = [
    `${API_BASE_URL}/api/login`,
    `${API_BASE_URL}/api/auth`,
    `${API_BASE_URL}/api/v1/login`,
    `${API_BASE_URL}/api/v1/auth`
  ];
  
  for (const url of testUrls) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Origin': 'http://localhost:5173',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      console.log(`${url}: ${response.status}`);
      
      if (response.status === 200) {
        try {
          const data = await response.json();
          console.log(`   📊 استجابة: ${JSON.stringify(data).substring(0, 100)}...`);
        } catch (e) {
          console.log(`   📝 استجابة غير JSON`);
        }
      }
    } catch (error) {
      console.log(`${url}: خطأ - ${error.message}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
  }
}

async function runDiscovery() {
  await testOctoberEndpoints();
  await testOctoberAuth();
  await testDirectAPI();
  
  console.log('\n🎯 انتهى الاكتشاف!');
  console.log('\n💡 استنتاج:');
  console.log('1. الـ backend هو October CMS');
  console.log('2. يحتاج إلى CSRF token للمصادقة');
  console.log('3. قد لا يكون هناك REST API مباشر');
  console.log('4. قد تحتاج إلى استخدام الـ endpoints الخاصة بـ October CMS plugins');
}

runDiscovery().catch(console.error);