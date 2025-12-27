// footer.js
document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
    1) إدراج الهيدر (header) في أعلى الصفحة إذا مش موجود
    — الهيدر يحتوي زر واحد #menuToggle فقط (يفتح القائمة المحلية)
  ============================================================ */
  if (!document.querySelector('header.header')) {
    const headerHTML = `
      <header class="header">
        <div class="header-inner">
          <a class="brand" href="index.html">
            <div class="logo">
              <img src="/icons/ai-icon.png" alt="AI Icon">
            </div>
            <span class="brand-title">FR Webs</span>
          </a>

          <!-- زر المجلد (يفتح القائمة المحلية single click، ويفتح السايدبار dblclick) -->
          <div class="header-actions">
            <button id="menuToggle" class="btn-icon mobile-only" aria-label="قائمة">🗂</button>
          </div>
        </div>
      </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  /* ============================================================
    2) إدراج قائمة الجوال المحلية (localMobileNav) منفصلة عن الهيدر
       — تضمن أنها خارج عنصر header (نضعها بعد الهيدر مباشرة)
  ============================================================ */
  if (!document.getElementById('localMobileNav')) {
    const localNavHTML = `
      <nav id="localMobileNav" class="nav mobile-nav mobile-hidden" aria-label="قائمة الجوال">
      <a href="/FR/index.html"><i class="fa-solid fa-newspaper"></i> خدمات </a>
        <a href="/dev-english/index.html"><i class="fa-solid fa-language"></i> الانجليزيه  </a>
        <a href="/ish/index.html"><i class="fa-solid fa-graduation-cap"></i> الكورسات</a>
      </nav>
    `;
    // أدخل القائمة بعد الهيدر مباشرة (أو في بداية الـ body إذا الهيدر لم يتغير)
    const headerEl = document.querySelector('header.header');
    if (headerEl) headerEl.insertAdjacentHTML('afterend', localNavHTML);
    else document.body.insertAdjacentHTML('afterbegin', localNavHTML);
  }

  /* ============================================================
    3) إدراج البوتوم ناف (bottom-nav) في أسفل الصفحة إذا مش موجود
  ============================================================ */
  if (!document.querySelector('.bottom-nav')) {
    const bottomNavHTML = `
      <nav class="bottom-nav mobile-only" aria-label="تنقل أسفل الصفحة">
        <a href="/index.html"><i class="fa-solid fa-house"></i><span>الرئيسية</span></a>
        <a href="/ish/index.html"><i class="fa-solid fa-book"></i><span>الدروس</span></a>
        <button id="themeToggle" class="btn-icon" aria-label="تبديل الوضع">🌙</button>
        <a href="/code/index.html"><i class="fa-solid fa-flask"></i><span>المختبر</span></a>
        <a href="/contac/contact.html"><i class="fa-solid fa-phone"></i><span>تواصل</span></a>
      </nav>
    `;
    document.body.insertAdjacentHTML('beforeend', bottomNavHTML);
  }

 
  /* ============================================================
    5) Event listeners: توصيل الأزرار بالعناصر الصحيحة (بدون أخطاء IDs مكررة)
  ============================================================ */
  const menuToggle = document.getElementById('menuToggle');           // الزر الوحيد في الهيدر
  const localMobileNav = document.getElementById('localMobileNav');   // القائمة المحلية المنفصلة
  const sidebarMenu = document.getElementById('sidebarMenu');         // السايدبار
  const closeSidebar = document.getElementById('closeSidebar');       // زر إغلاق السايدبار
  const themeToggle = document.getElementById('themeToggle');         // زر تبديل الثيم في البوتوم ناف

  // 5.1 — فتح/قفل القائمة المحلية بالضغط مرة واحدة على أيقونة المجلد
  if (menuToggle && localMobileNav) {
    menuToggle.addEventListener('click', () => {
      localMobileNav.classList.toggle('mobile-hidden');
      // تأكد أن السايدبار مقفول لو كانت مفتوحة
      sidebarMenu?.classList.remove('open');
    });
  }

  // 5.2 — فتح/قفل السايدبار بالضغط المزدوج (dblclick) على نفس الزر
  if (menuToggle && sidebarMenu) {
    menuToggle.addEventListener('dblclick', () => {
      sidebarMenu.classList.toggle('open');
      // إخفاء local nav لو السايدبار فتح
      if (sidebarMenu.classList.contains('open')) localMobileNav?.classList.add('mobile-hidden');
    });
  }

  // 5.3 — زر إغلاق السايدبار
  if (closeSidebar && sidebarMenu) {
    closeSidebar.addEventListener('click', () => sidebarMenu.classList.remove('open'));
  }

  // 5.4 — زر تبديل الثيم (مع تخزين في localStorage)
  const savedTheme = localStorage.getItem('fr_theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');

  if (themeToggle) {
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('fr_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
      themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });
  }

  /* ============================================================
    6) Simple scroll animation observer — يراقب العناصر التي تحمل كلاس .animate
  ============================================================ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

});
// ====== contact.js ======
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // أخذ القيم
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (name && email && subject && message) {
      // هنا يمكن استدعاء API خارجي أو EmailJS لإرسال الرسالة
      // حالياً نعرض رسالة نجاح وهمية
      formMessage.style.color = "#00ff99";
      formMessage.textContent = "تم إرسال رسالتك بنجاح، شكرًا لتواصلك معنا!";
      form.reset();
    } else {
      formMessage.style.color = "#ff6b6b";
      formMessage.textContent = "يرجى ملء جميع الحقول قبل الإرسال.";
    }
  });
});
