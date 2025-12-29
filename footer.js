// footer.js
document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
    1) إدراج الهيدر (header) في أعلى الصفحة إذا مش موجود
    — الهيدر يحتوي زر واحد #menuToggle فقط (يفتح المجلد/القائمة)
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

       /* ============================================================
   FOOTER.JS - HEADER + FOLDER MENU
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================
     1) إدراج الهيدر
  ======================= */
  if (!document.querySelector(".header")) {
    const headerHTML = `
      <header class="header">
        <div class="header-inner">

          <a href="/" class="brand">
            <div class="logo">
              <img src="/logo.png" alt="FR Webs">
            </div>
            <span class="brand-title">FR Webs</span>
          </a>

          <div class="header-actions">
            <!-- زر المجلد -->
            <button id="menuToggle" class="btn-icon" aria-label="القائمة">
              🗂
            </button>
          </div>

        </div>
      </header>
    `;
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }

  /* =======================
     2) إدراج Folder Menu
  ======================= */
  if (!document.getElementById("folderMenu")) {
    const folderMenuHTML = `
      <nav id="folderMenu" class="folder-menu">

        <a href="/FR/index.html">
          <i class="fa-solid fa-briefcase"></i>
          خدمات
        </a>

        <a href="/dev-english/index.html">
          <i class="fa-solid fa-language"></i>
          الإنجليزية
        </a>

        <a href="/ish/index.html">
          <i class="fa-solid fa-graduation-cap"></i>
          كورسات
        </a>

      </nav>
    `;
    document.body.insertAdjacentHTML("afterbegin", folderMenuHTML);
  }

  /* =======================
     3) فتح / قفل المجلد
  ======================= */
  const toggleBtn = document.getElementById("menuToggle");
  const folderMenu = document.getElementById("folderMenu");

  if (toggleBtn && folderMenu) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      folderMenu.classList.toggle("open");
    });

    // غلق القائمة عند الضغط خارجها
    document.addEventListener("click", (e) => {
      if (!folderMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        folderMenu.classList.remove("open");
      }
    });
  }

});
  /* ============================================================
    3) إدراج البوتوم ناف (bottom-nav)
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
    4) Event listeners للأزرار
  ============================================================ */
  const menuToggle = document.getElementById('menuToggle');       // زر المجلد
  const folderMenu = document.getElementById('folderMenu');       // قائمة المجلد
  const sidebarMenu = document.getElementById('sidebarMenu');     // السايدبار
  const closeSidebar = document.getElementById('closeSidebar');   // زر إغلاق السايدبار
  const themeToggle = document.getElementById('themeToggle');     // زر تبديل الثيم

  // 4.1 — فتح/قفل قائمة المجلد
  if (menuToggle && folderMenu) {
    menuToggle.addEventListener('click', () => {
      folderMenu.classList.toggle('open');
      sidebarMenu?.classList.remove('open');
    });
  }

  // 4.2 — فتح/قفل السايدبار بالضغط المزدوج
  if (menuToggle && sidebarMenu) {
    menuToggle.addEventListener('dblclick', () => {
      sidebarMenu.classList.toggle('open');
      if (sidebarMenu.classList.contains('open')) folderMenu?.classList.remove('open');
    });
  }

  // 4.3 — زر إغلاق السايدبار
  if (closeSidebar && sidebarMenu) {
    closeSidebar.addEventListener('click', () => sidebarMenu.classList.remove('open'));
  }

  // 4.4 — تبديل الوضع الليلي مع تخزين في localStorage
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
    5) مراقب عناصر الأنيميشن
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

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (name && email && subject && message) {
      formMessage.style.color = "#00ff99";
      formMessage.textContent = "تم إرسال رسالتك بنجاح، شكرًا لتواصلك معنا!";
      form.reset();
    } else {
      formMessage.style.color = "#ff6b6b";
      formMessage.textContent = "يرجى ملء جميع الحقول قبل الإرسال.";
    }
  });
});
