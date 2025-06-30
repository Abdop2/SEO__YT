ثابت اسم ذاكرة التخزين المؤقت = 'seo-yt-cache-v2'؛
الأصول الثابتة = [
  './',
  './index.html',
  './favicon.ico',
  './apple-touch-icon.png',
  './manifest.json',
  './style.css',
  './main.js'
];

// تثبيت ذاكرة التخزين المؤقت
self.addEventListener('install', حدث غير متزامن => {
  ثابت ذاكرة التخزين المؤقت = انتظار ذاكرة التخزين المؤقت.open(اسم ذاكرة التخزين المؤقت)؛
  انتظر cache.addAll(staticAssets)؛
  العودة self.skipWaiting();
});

// تفعيل ذاكرة التخزين المؤقت
self.addEventListener('تنشيط', الحدث => {
  self.clients.claim();
});

// جلب الطلبات
self.addEventListener('جلب'، حدث غير متزامن => {
  ثابت req = event.request؛
  ثابت url = عنوان URL جديد(req.url)؛

  // جلب الاستجابات الجديدة وتخزينها دائمًا للمحتوى الديناميكي (مثل واجهة برمجة تطبيقات YouTube)
  إذا (url.origin !== location.origin) {
    إرجاع event.respondWith(fetch(req).catch(() => caches.match('./offline.html')));
  }

  // الخدمة من ذاكرة التخزين المؤقت أولاً، ثم الجلب من الشبكة
  الحدث.respondWith(cacheFirst(req));
});

دالة غير متزامنة cacheFirst(req) {
  ثابت مخبأ = انتظار مخبأ.مطابقة (req)؛
  إرجاع المخزن المؤقت || fetch(req);
}
