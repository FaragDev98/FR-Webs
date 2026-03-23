/* ============================================================
   FOOTER.JS - HEADER + FOLDER MENU + BOTTOM NAV
============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* =======================
     1) إدراج الهيدر
  ======================= */
  if (!document.querySelector("header.header")) {
    const headerHTML = `
      <header class="header">
        <div class="header-inner">
          <a class="brand" href="../AB/index.html">
            <div class="logo">
              <img src="/icons/ai-icon.png" alt="AI Icon">
            </div>
            <span class="brand-title">FR Webs</span>
          </a>
          <div class="header-actions">
            <!-- زر المجلد -->
            <button id="menuToggle" class="btn-icon" aria-label="القائمة">🗂</button>
          </div>
        </div>
      </header>
    `;
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }

  /* =======================
     2) إدراج قائمة المجلد
  ======================= */
  if (!document.getElementById("folderMenu")) {
    const folderMenuHTML = `
      <nav id="folderMenu" class="folder-menu">
        <a href="/FR/index.html">
          <i class="fa-solid fa-briefcase"></i> خدمات
        </a>
        <a href="/dev-english/index.html">
          <i class="fa-solid fa-language"></i> الإنجليزية
        </a>
        <a href="/ish/index.html">
          <i class="fa-solid fa-graduation-cap"></i> كورسات
        </a>
      </nav>
    `;
    document.body.insertAdjacentHTML("afterbegin", folderMenuHTML);
  }

  /* =======================
     3) إدراج البوتوم ناف
  ======================= */
  if (!document.querySelector(".bottom-nav")) {
    const bottomNavHTML = `
      <nav class="bottom-nav mobile-only" aria-label="تنقل أسفل الصفحة">
        <a href="AB/index.html"><i class="fa-solid fa-house"></i><span>الرئيسية</span></a>
        <a href="wab/aldirs.html"><i class="fa-solid fa-book"></i><span>الدروس</span></a>
        <button id="themeToggle" class="btn-icon" aria-label="تبديل الوضع">🌙</button>
        <a href="/code/index.html"><i class="fa-solid fa-flask"></i><span>المختبر</span></a>
        <a href="/contac/contact.html"><i class="fa-solid fa-phone"></i><span>تواصل</span></a>
      </nav>
    `;
    document.body.insertAdjacentHTML("beforeend", bottomNavHTML);
  }

  /* =======================
     4) Event listeners
  ======================= */
  const menuToggle = document.getElementById("menuToggle");
  const folderMenu = document.getElementById("folderMenu");
  const themeToggle = document.getElementById("themeToggle");

  // فتح / قفل المجلد
  if (menuToggle && folderMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      folderMenu.classList.toggle("open");
    });

    // غلق القائمة عند الضغط خارجها
    document.addEventListener("click", (e) => {
      if (!folderMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        folderMenu.classList.remove("open");
      }
    });
  }

  // تبديل الوضع الليلي
  const savedTheme = localStorage.getItem("fr_theme");
  if (savedTheme === "dark") document.body.classList.add("dark");

  if (themeToggle) {
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("fr_theme", document.body.classList.contains("dark") ? "dark" : "light");
      themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });
  }

  /* =======================
     5) مراقب عناصر الأنيميشن
  ======================= */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in-view");
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".animate").forEach(el => observer.observe(el));

});
