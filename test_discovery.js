// اكتشاف مسارات الـ API
const API_BASE_URL = 'https://demodelivery.now-ye.com';
const API_USERNAME = 'DemoNano';
const API_PASSWORD = 'DemoNano';

console.log('🔍 اكتشاف هيكل الـ API...');
console.log(`الـ URL الأساسي: ${API_BASE_URL}`);

async function discoverStructure() {
  console.log('\n📂 اكتشاف المسارات...');
  
  // قائمة المسارات المحتملة
  const paths = [
    '/backend',
    '/backend/backend',
    '/backend/api',
    '/backend/v1',
    '/api',
    '/api/v1',
    '/v1',
    '/admin',
    '/dashboard',
    '/app',
    '/web',
    '/service',
    '/services'
  ];
  
  for (const path of paths) {
    const url = `${API_BASE_URL}${path}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:5173'
        }
      });
      
      console.log(`${path} - ${response.status} (${response.headers.get('content-type')?.substring(0, 30)}...)`);
      
      // إذا كان الرد HTML، قد يكون هناك رابط إلى API
      if (response.status === 200 && response.headers.get('content-type')?.includes('html')) {
        try {
          const text = await response.text();
          // البحث عن كلمات مفتاحية
          if (text.includes('api') || text.includes('API') || text.includes('endpoint') || text.includes('swagger')) {
            console.log(`   🔍 وجدت إشارة إلى API في ${path}`);
          }
        } catch (e) {
          // تجاهل
        }
      }
    } catch (error) {
      console.log(`${path} - خطأ: ${error.message}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
  }
}

async function testCommonAPIPatterns() {
  console.log('\n🔄 اختبار أنماط الـ API الشائعة...');
  
  const basePaths = [
    '/backend/backend',
    '/backend',
    '/api',
    '/v1'
  ];
  
  const endpoints = [
    '',
    '/auth',
    '/auth/login',
    '/auth/register',
    '/user',
    '/user/login',
    '/user/register',
    '/ads',
    '/advertisements',
    '/categories',
    '/sections',
    '/products',
    '/items'
  ];
  
  for (const basePath of basePaths) {
    console.log(`\n📁 اختبار قاعدة: ${basePath}`);
    
    for (const endpoint of endpoints) {
      const url = `${API_BASE_URL}${basePath}${endpoint}`;
      
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Origin': 'http://localhost:5173',
            'Authorization': `Basic ${Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64')}`
          }
        });
        
        if (response.status !== 404 && response.status !== 405) {
          console.log(`   ✅ ${endpoint || '/'} - ${response.status}`);
          
          if (response.status === 200) {
            try {
              const data = await response.json();
              console.log(`      📊 نوع البيانات: ${Array.isArray(data) ? 'مصفوفة' : 'كائن'}`);
              if (Array.isArray(data)) {
                console.log(`      🔢 عدد العناصر: ${data.length}`);
                if (data.length > 0) {
                  console.log(`      📝 العنصر الأول: ${JSON.stringify(data[0]).substring(0, 50)}...`);
                }
              }
            } catch (e) {
              // ليس JSON
            }
          }
        }
      } catch (error) {
        // تجاهل الأخطاء
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

async function runDiscovery() {
  await discoverStructure();
  await testCommonAPIPatterns();
  
  console.log('\n🎯 انتهى الاكتشاف!');
  console.log('\n💡 اقتراحات:');
  console.log('1. تحقق من توثيق الـ API الخاص بالشركة');
  console.log('2. اسأل المدرب عن الـ endpoints الصحيحة');
  console.log('3. تحقق من وجود ملف swagger أو openapi في المسارات');
  console.log('4. جرب المسار /backend/backend/ مباشرة');
}

runDiscovery().catch(console.error);