// اختبار مسار auth
const API_BASE_URL = 'https://demodelivery.now-ye.com/backend/backend';
const API_USERNAME = 'DemoNano';
const API_PASSWORD = 'DemoNano';

console.log('🔐 اختبار مسار auth...');
console.log(`الـ URL: ${API_BASE_URL}/auth`);

async function testAuthEndpoint() {
  console.log('\n1. اختبار GET على /auth');
  try {
    const response = await fetch(`${API_BASE_URL}/auth`, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:5173',
        'Authorization': `Basic ${Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64')}`
      }
    });
    
    console.log(`   حالة: ${response.status}`);
    console.log(`   نوع المحتوى: ${response.headers.get('content-type')}`);
    
    if (response.status === 200) {
      try {
        const data = await response.json();
        console.log(`   📊 البيانات: ${JSON.stringify(data, null, 2)}`);
      } catch (e) {
        const text = await response.text();
        console.log(`   📝 النص: ${text.substring(0, 200)}...`);
      }
    }
  } catch (error) {
    console.log(`   ❌ خطأ: ${error.message}`);
  }
}

async function testAuthSubEndpoints() {
  console.log('\n2. اختبار الـ endpoints الفرعية تحت /auth');
  
  const subEndpoints = [
    '/login',
    '/register',
    '/logout',
    '/user',
    '/profile',
    '/token',
    '/refresh',
    '/verify'
  ];
  
  for (const endpoint of subEndpoints) {
    const url = `${API_BASE_URL}/auth${endpoint}`;
    
    try {
      // اختبار GET أولاً
      const getResponse = await fetch(url, {
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:5173',
          'Authorization': `Basic ${Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64')}`
        }
      });
      
      console.log(`   GET ${endpoint}: ${getResponse.status}`);
      
      // إذا كان endpoint يتطلب POST (مثل login)
      if (endpoint === '/login' || endpoint === '/register') {
        const postResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Origin': 'http://localhost:5173',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64')}`
          },
          body: JSON.stringify({
            username: API_USERNAME,
            password: API_PASSWORD
          })
        });
        
        console.log(`   POST ${endpoint}: ${postResponse.status}`);
        
        if (postResponse.status === 200 || postResponse.status === 201) {
          try {
            const data = await postResponse.json();
            console.log(`      📊 استجابة: ${JSON.stringify(data).substring(0, 100)}...`);
          } catch (e) {
            const text = await postResponse.text();
            console.log(`      📝 نص: ${text.substring(0, 100)}...`);
          }
        }
      }
    } catch (error) {
      console.log(`   ⚠️ ${endpoint}: ${error.message}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
  }
}

async function testOtherEndpoints() {
  console.log('\n3. اختبار الـ endpoints الأخرى');
  
  const endpoints = [
    '/ads',
    '/categories',
    '/products',
    '/items',
    '/sections',
    '/advertisements',
    '/offers',
    '/promotions'
  ];
  
  for (const endpoint of endpoints) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:5173',
          'Authorization': `Basic ${Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64')}`
        }
      });
      
      console.log(`   ${endpoint}: ${response.status}`);
      
      if (response.status === 200) {
        try {
          const data = await response.json();
          console.log(`      📊 نوع: ${Array.isArray(data) ? 'مصفوفة' : 'كائن'}`);
          if (Array.isArray(data)) {
            console.log(`      🔢 عدد العناصر: ${data.length}`);
            if (data.length > 0) {
              console.log(`      📝 مثال: ${JSON.stringify(data[0]).substring(0, 80)}...`);
            }
          }
        } catch (e) {
          // ليس JSON
        }
      }
    } catch (error) {
      console.log(`   ⚠️ ${endpoint}: ${error.message}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
  }
}

async function runAllTests() {
  await testAuthEndpoint();
  await testAuthSubEndpoints();
  await testOtherEndpoints();
  
  console.log('\n🎯 انتهى الاختبار!');
}

runAllTests().catch(console.error);