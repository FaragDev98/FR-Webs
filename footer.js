// footer.js
document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
    1) إضافة الهيدر تلقائيًا لكل الصفحات (يُدرج في أعلى body)
  ============================================================ */
  const headerHTML = `
    <header class="header">
      <div class="header-inner">

        <a class="brand" href="index.html">
          <div class="logo">
            <img src="icons/ai-icon.png" alt="AI Icon">
          </div>
          <span class="brand-title">FR Webs</span>
        </a>

        <div class="header-actions">
          <button id="menuToggle" class="btn-icon mobile-only" aria-label="قائمة">🗃</button>
        </div>

      </div>

      <!-- قائمة الجوال (ستتحكم بها JS) -->
      <nav id="localMobileNav" class="nav mobile-nav mobile-hidden" aria-label="قائمة الجوال">
        <a href="dev-english/index.html"><i class="fa-solid fa-language"></i> الإنجليزي</a>
        <a href="artic/index.html"><i class="fa-solid fa-newspaper"></i> المقالات</a>
        <a href="course-page/course.html"><i class="fa-solid fa-graduation-cap"></i> الكورسات</a>
      </nav>
    </header>
  `;

  // أدخل الهيدر في أول الـ body فقط إذا مش موجود أصلاً
  if (!document.querySelector('header.header')) {
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }

  /* ============================================================
    2) إضافة البوتوم ناف (ثابت في أي صفحة) في نهاية الـ body
  ============================================================ */
  const bottomNavHTML = `
    <nav class="bottom-nav mobile-only" aria-label="تنقل أسفل الصفحة">
      <a href="index.html"><i class="fa-solid fa-house"></i><span>الرئيسية</span></a>
      <a href="lessons-page/index.html"><i class="fa-solid fa-book"></i><span>الدروس</span></a>
      <button id="themeToggle" class="btn-icon" aria-label="تبديل الوضع">🌙</button>
      <a href="code-lab.html"><i class="fa-solid fa-flask"></i><span>المختبر</span></a>
      <a href="contac/index.html"><i class="fa-solid fa-phone"></i><span>تواصل</span></a>
    </nav>
  `;

  if (!document.querySelector('.bottom-nav')) {
    document.body.insertAdjacentHTML("beforeend", bottomNavHTML);
  }

  /* ============================================================
    3) Sidebar (قائمة إعدادات جانبية) — مضافة ولكن مخفية
  ============================================================ */
  if (!document.getElementById('sidebarMenu')) {
    const sidebar = document.createElement("div");
    sidebar.id = "sidebarMenu";
    sidebar.className = "sidebar";
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
    4) Event Listeners — التأكد أن العناصر موجودة قبل الاستخدام
  ============================================================ */

  // قائمة الجوال (toggle)
  const menuToggle = document.getElementById("menuToggle");
  const localMobileNav = document.getElementById("localMobileNav");

  if (menuToggle && localMobileNav) {
    menuToggle.addEventListener("click", () => {
      localMobileNav.classList.toggle("mobile-hidden");
    });
  }

  // زر إغلاق السايدبار (لو فتحت السايدبار لاحقًا)
  const closeSidebar = document.getElementById("closeSidebar");
  const sidebarMenu = document.getElementById("sidebarMenu");

  if (closeSidebar && sidebarMenu) {
    closeSidebar.addEventListener("click", () => sidebarMenu.classList.remove("open"));
  }

  // فتح السايدبار عبر dblclick على زر القائمة (اختياري)
  if (menuToggle && sidebarMenu) {
    menuToggle.addEventListener("dblclick", () => {
      sidebarMenu.classList.toggle("open");
    });
  }

  // زر تبديل الوضع - سنتأكد أنه موجود بعد إدراج bottom nav
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("fr_theme");
  if (currentTheme === "dark") document.body.classList.add("dark");

  if (themeToggle) {
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("fr_theme", document.body.classList.contains("dark") ? "dark" : "light");
      themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });
  }

  /* ============================================================
    5) Scroll Animation - يراقب عناصر تحمل الكلاس .animate
  ============================================================ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("in-view");
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".animate").forEach(sec => observer.observe(sec));

});
