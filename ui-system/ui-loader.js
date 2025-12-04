/* ============================================================
1) إدراج الهيدر HEADER متوافق مع CSS الحالي
============================================================ */
if (!document.querySelector('header.header')) {
  const headerHTML = `
    <header class="header">
      <div class="header-inner">
        <a class="brand" href="index.html">
          <div class="logo">
            <img src="icons/ai-icon.png" alt="AI Icon">
          </div>
          <span class="brand-title">FR Webs</span>
        </a>

        <!-- زر القائمة -->
        <div class="header-actions">
          <button id="menuToggle" class="btn-icon mobile-only" aria-label="قائمة">🗂</button>
        </div>
      </div>
    </header>
  `;
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

/* ============================================================
2) إدراج قائمة الجوال المحلية (localMobileNav)
============================================================ */
if (!document.getElementById('localMobileNav')) {
  const localNavHTML = `
    <nav id="localMobileNav" class="nav mobile-nav mobile-hidden" aria-label="قائمة الجوال">
      <a href="dev-english/index.html"><i class="fa-solid fa-language"></i> الإنجليزي</a>
      <a href="artic/index.html"><i class="fa-solid fa-newspaper"></i> المقالات</a>
      <a href="lessons-page/index.html"><i class="fa-solid fa-graduation-cap"></i> الكورسات</a>
    </nav>
  `;
  document.body.insertAdjacentHTML('afterbegin', localNavHTML);
}

/* ============================================================
3) Sidebar الإعدادات
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
4) توصيل الأزرار بالأحداث
============================================================ */
const menuToggle = document.getElementById('menuToggle');
const localMobileNav = document.getElementById('localMobileNav');
const sidebarMenu = document.getElementById('sidebarMenu');
const closeSidebar = document.getElementById('closeSidebar');
const themeToggle = document.getElementById('themeToggle');

// فتح/غلق قائمة الجوال
if (menuToggle && localMobileNav) {
  menuToggle.addEventListener('click', () => {
    localMobileNav.classList.toggle('mobile-hidden');
    sidebarMenu?.classList.remove('open');
  });
}

// فتح/غلق السايدبار بالضغط المزدوج
if (menuToggle && sidebarMenu) {
  menuToggle.addEventListener('dblclick', () => {
    sidebarMenu.classList.toggle('open');
    if (sidebarMenu.classList.contains('open')) localMobileNav?.classList.add('mobile-hidden');
  });
}

// زر إغلاق السايدبار
if (closeSidebar && sidebarMenu) {
  closeSidebar.addEventListener('click', () => sidebarMenu.classList.remove('open'));
}

// تبديل الوضع الليلي
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
5) Scroll Animation Observer (للعناصر التي تحمل كلاس .animate)
============================================================ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in-view');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate').forEach(el => observer.observe(el));
