// footer.js
document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
    1) إدراج الهيدر (header) الجديد في أعلى الصفحة
  ============================================================ */
  if (!document.querySelector('header.header')) {
    const headerHTML = `
      <header class="header">
        <div class="header-inner">

          <!-- زر الرجوع -->
          <button id="goBackBtn" class="btn-icon header-back" aria-label="رجوع" title="رجوع">⬅️</button>

          <!-- اللوجو + اسم الموقع -->
          <a class="brand" href="index.html">
            <div class="logo">
              <img src="icons/ai-icon.png" alt="AI Icon">
            </div>
            <span class="brand-title">FR Webs</span>
          </a>

          <!-- روابط مثل البوتوم ناف -->
          <nav class="header-nav" aria-label="تنقل الهيدر">
            <a href="index.html" class="nav-link"><i class="fa-solid fa-house"></i> الرئيسية</a>
            <a href="lessons/lessons.html" class="nav-link"><i class="fa-solid fa-book"></i> الدروس</a>
            <a href="code/index.html" class="nav-link"><i class="fa-solid fa-flask"></i> المختبر</a>
            <a href="contac/contact.html" class="nav-link"><i class="fa-solid fa-phone"></i> تواصل</a>
          </nav>

          <!-- زر المجلد -->
          <div class="header-actions">
            <button id="menuToggle" class="btn-icon mobile-only" aria-label="قائمة">🗂</button>
          </div>

        </div>
      </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  /* ============================================================
    2) localMobileNav — قائمة الجوال المحلية
  ============================================================ */
  if (!document.getElementById('localMobileNav')) {
    const localNavHTML = `
      <nav id="localMobileNav" class="nav mobile-nav mobile-hidden" aria-label="قائمة الجوال">
        <a href="dev-english/index.html"><i class="fa-solid fa-language"></i> الإنجليزي</a>
        <a href="artic/index.html"><i class="fa-solid fa-newspaper"></i> المقالات</a>
        <a href="lessons-page/index.html"><i class="fa-solid fa-graduation-cap"></i> الكورسات</a>
      </nav>
    `;
    const headerEl = document.querySelector('header.header');
    if (headerEl) headerEl.insertAdjacentHTML('afterend', localNavHTML);
    else document.body.insertAdjacentHTML('afterbegin', localNavHTML);
  }

  /* ============================================================
    3) bottom-nav — في أسفل الصفحة
  ============================================================ */
  if (!document.querySelector('.bottom-nav')) {
    const bottomNavHTML = `
      <nav class="bottom-nav mobile-only" aria-label="تنقل أسفل الصفحة">
        <a href="index.html"><i class="fa-solid fa-house"></i><span>الرئيسية</span></a>
        <a href="lessons/lessons.html"><i class="fa-solid fa-book"></i><span>الدروس</span></a>
        <button id="themeToggle" class="btn-icon" aria-label="تبديل الوضع">🌙</button>
        <a href="code/index.html"><i class="fa-solid fa-flask"></i><span>المختبر</span></a>
        <a href="contac/contact.html"><i class="fa-solid fa-phone"></i><span>تواصل</span></a>
      </nav>
    `;
    document.body.insertAdjacentHTML('beforeend', bottomNavHTML);
  }

  /* ============================================================
    4) Sidebar — قائمة الإعدادات
  ============================================================ */
  if (!document.getElementById('sidebarMenu')) {
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebarMenu';
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
      <div class="sidebar-header">
        <h3>الإعدادات</h3>
        <button id="closeSidebar" aria-label="إغلاق">✖</button>
      </div>
      <div class="sidebar-content">
        <a href="#"><i class="fa-solid fa-gear"></i> الإعدادات العامة</a>
        <a href="#"><i class="fa-solid fa-circle-half-stroke"></i> المظهر</a>
        <a href="#"><i class="fa-solid fa-font"></i> حجم الخط</a>
        <a href="#"><i class="fa-solid fa-globe"></i> اللغة</a>
        <a href="#"><i class="fa-solid fa-user"></i> حسابك</a>
        <a href="#"><i class="fa-solid fa-info-circle"></i> معلومات</a>
      </div>
    `;
    document.body.appendChild(sidebar);
  }

  /* ============================================================
    5) توصيل الأزرار
  ============================================================ */
  const menuToggle = document.getElementById('menuToggle');
  const localMobileNav = document.getElementById('localMobileNav');
  const sidebarMenu = document.getElementById('sidebarMenu');
  const closeSidebar = document.getElementById('closeSidebar');
  const themeToggle = document.getElementById('themeToggle');
  const goBackBtn = document.getElementById('goBackBtn');

  /* — زر الرجوع — */
  if (goBackBtn) {
    goBackBtn.addEventListener('click', () => window.history.back());
  }

  /* — فتح/قفل local nav — */
  if (menuToggle && localMobileNav) {
    menuToggle.addEventListener('click', () => {
      localMobileNav.classList.toggle('mobile-hidden');
      sidebarMenu?.classList.remove('open');
    });
  }

  /* — فتح السايدبار بالضغط المزدوج — */
  if (menuToggle && sidebarMenu) {
    menuToggle.addEventListener('dblclick', () => {
      sidebarMenu.classList.toggle('open');
      if (sidebarMenu.classList.contains('open'))
        localMobileNav?.classList.add('mobile-hidden');
    });
  }

  /* — زر إغلاق السايدبار — */
  if (closeSidebar && sidebarMenu) {
    closeSidebar.addEventListener('click', () => sidebarMenu.classList.remove('open'));
  }

  /* — زر الثيم — */
  const savedTheme = localStorage.getItem('fr_theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }

  if (themeToggle) {
    themeToggle.textContent = 
      document.body.classList.contains('dark') ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('fr_theme',
        document.body.classList.contains('dark') ? 'dark' : 'light'
      );
      themeToggle.textContent = 
        document.body.classList.contains('dark') ? '☀️' : '🌙';
    });
  }

  /* — إغلاق القوائم عند الضغط على روابط الهيدر — */
  document.querySelectorAll('.header-nav a.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      localMobileNav?.classList.add('mobile-hidden');
      sidebarMenu?.classList.remove('open');
    });
  });

  /* — نفس الشيء لروابط قائمة الجوال — */
  document.querySelectorAll('#localMobileNav a').forEach(a => {
    a.addEventListener('click', () => {
      localMobileNav?.classList.add('mobile-hidden');
    });
  });

  /* ============================================================
    6) مراقبة الأنيميشن
  ============================================================ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

});
