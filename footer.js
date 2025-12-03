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

          <!-- زر الرجوع -->
          <button id="goBackBtn" class="btn-icon mobile-only" aria-label="رجوع">⬅️</button>

          <a class="brand" href="index.html">
            <div class="logo">
              <img src="icons/ai-icon.png" alt="AI Icon">
            </div>
            <span class="brand-title">FR Webs</span>
          </a>

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
    2) إدراج قائمة الجوال المحلية (localMobileNav) منفصلة عن الهيدر
       — تضمن أنها خارج عنصر header (نضعها بعد الهيدر مباشرة)
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
    3) إدراج البوتوم ناف (bottom-nav) في أسفل الصفحة إذا مش موجود
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
    4) Sidebar الإعدادات
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
    5) Event listeners
  ============================================================ */
  const menuToggle = document.getElementById('menuToggle');
  const localMobileNav = document.getElementById('localMobileNav');
  const sidebarMenu = document.getElementById('sidebarMenu');
  const closeSidebar = document.getElementById('closeSidebar');
  const themeToggle = document.getElementById('themeToggle');

  if (menuToggle && localMobileNav) {
    menuToggle.addEventListener('click', () => {
      localMobileNav.classList.toggle('mobile-hidden');
      sidebarMenu?.classList.remove('open');
    });
  }

  if (menuToggle && sidebarMenu) {
    menuToggle.addEventListener('dblclick', () => {
      sidebarMenu.classList.toggle('open');
      if (sidebarMenu.classList.contains('open')) localMobileNav?.classList.add('mobile-hidden');
    });
  }

  if (closeSidebar && sidebarMenu) {
    closeSidebar.addEventListener('click', () => sidebarMenu.classList.remove('open'));
  }

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
    6) scroll animation observer
  ============================================================ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

  /* ============================================================
    7) زر الرجوع — يعمل على كل الصفحات
  ============================================================ */
  const goBackBtn = document.getElementById('goBackBtn');
  if (goBackBtn) {
    goBackBtn.addEventListener('click', () => {
      if (history.length > 1) {
        history.back();
      } else {
        window.location.href = "index.html";
      }
    });
  }

});
