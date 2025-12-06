document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const header = document.querySelector(".header");
  const sidebar = document.querySelector(".sidebar");
  const localMobileNav = document.getElementById('localMobileNav');
  const sidebarMenu = document.getElementById('sidebarMenu');
  const closeSidebar = document.getElementById('closeSidebar');
  const themeToggle = document.getElementById('themeToggle');

  /* ============================================================
      1) إدراج الهيدر إذا غير موجود (نفس التصميم)
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

          <div class="header-actions">
            <button id="menuToggle" class="btn-icon mobile-only" aria-label="قائمة">🗂</button>
          </div>
        </div>
      </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  /* ============================================================
      2) إدراج قائمة الجوال المحلية
  ============================================================ */
  if (!document.getElementById('localMobileNav')) {
    const localNavHTML = `
      <nav id="localMobileNav" class="nav mobile-nav mobile-hidden" aria-label="قائمة الجوال">
        <a href="ish/index.html"><i class="fa-solid fa-language"></i> تعلم </a>
        <a href="dev-english/index.html"><i class="fa-solid fa-newspaper"></i> الانجليزي</a>
        <a href="lessons-page/index.html"><i class="fa-solid fa-graduation-cap"></i> الكورسات</a>
      </nav>
    `;
    const headerEl = document.querySelector('header.header');
    if (headerEl) headerEl.insertAdjacentHTML('afterend', localNavHTML);
    else document.body.insertAdjacentHTML('afterbegin', localNavHTML);
  }

  /* ============================================================
      3) جعل الهيدر يظهر ويثبت عند الضغط على زر المجلد
  ============================================================ */

  const headerElement = document.querySelector(".header");
  let headerOpen = false;

  menuToggle?.addEventListener("click", () => {
    headerOpen = !headerOpen;

    if (headerOpen) {
      headerElement.classList.add("header-fixed-show");
    } else {
      headerElement.classList.remove("header-fixed-show");
    }
  });

  /* ============================================================
      4) إغلاق السايدبار
  ============================================================ */
  if (closeSidebar) {
    closeSidebar.addEventListener('click', () =>
      sidebarMenu?.classList.remove('open')
    );
  }

  /* ============================================================
      5) الوضع الليلي
  ============================================================ */
  const savedTheme = localStorage.getItem('fr_theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');

  if (themeToggle) {
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem(
        'fr_theme',
        document.body.classList.contains('dark') ? 'dark' : 'light'
      );
      themeToggle.textContent = document.body.classList.contains('dark')
        ? '☀️'
        : '🌙';
    });
  }

  /* ============================================================
      6) حركة ظهور العناصر عند التمرير
  ============================================================ */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in-view");
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".animate").forEach((el) => observer.observe(el));

  /* ============================================================
      7) Web Speech API - نطق النصوص
  ============================================================ */
  (function () {
    const speakButtons = document.querySelectorAll(".speak-btn");
    let voices = [];

    function loadVoices() {
      voices = window.speechSynthesis.getVoices();
      if (!voices.length) setTimeout(loadVoices, 200);
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    function findVoiceByLang(langPrefix) {
      if (!voices.length) return null;
      const match = voices.find(
        (v) => v.lang && v.lang.toLowerCase().startsWith(langPrefix)
      );
      if (match) return match;
      if (langPrefix === "en")
        return voices.find((v) => v.lang.toLowerCase().includes("en")) || voices[0];
      if (langPrefix === "ar")
        return voices.find((v) => v.lang.toLowerCase().includes("ar")) || voices[0];
      return voices[0];
    }

    function speakText(text, lang) {
      if (!("speechSynthesis" in window)) {
        alert("متصفحك لا يدعم النطق الصوتي. جرب Chrome أو Edge.");
        return;
      }
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const prefix = lang === "ar" ? "ar" : "en";
      const voice = findVoiceByLang(prefix);
      if (voice) utter.voice = voice;
      utter.lang = lang === "ar" ? "ar-EG" : "en-US";
      utter.rate = 0.95;
      utter.pitch = 1;
      window.speechSynthesis.speak(utter);
    }

    speakButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const text = this.dataset.text;
        const lang = this.dataset.lang || "en";
        if (!text) return;
        speakText(text, lang);

        btn.style.transform = "scale(0.92)";
        setTimeout(() => (btn.style.transform = "scale(1)"), 120);
      });

      btn.addEventListener("keydown", function (e) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          btn.click();
        }
      });
    });
  })();
});
