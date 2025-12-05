/* ============================================================
  FR Webs — سكربت الموقع الرئيسي
  يحتوي على:
  1) DOMContentLoaded لإدارة القوائم والثيم والسك롤
  2) Web Speech API للنطق الصوتي
  3) إدراج الهيدر، القوائم، السايدبار، والـ bottom nav
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
    0) المتغيرات العامة
  ============================================================ */
  const menuToggle = document.getElementById('menuToggle');
  const localMobileNav = document.getElementById('localMobileNav');
  const sidebarMenu = document.getElementById('sidebarMenu');
  const closeSidebar = document.getElementById('closeSidebar');
  const themeToggle = document.getElementById('themeToggle');

  /* ============================================================
    1) قائمة الجوال toggle + السايدبار dblclick
  ============================================================ */
  menuToggle?.addEventListener('click', () => {
    localMobileNav?.classList.toggle('mobile-hidden');
    sidebarMenu?.classList.remove('open');
  });

  menuToggle?.addEventListener('dblclick', () => {
    sidebarMenu?.classList.toggle('open');
    if(sidebarMenu?.classList.contains('open')) localMobileNav?.classList.add('mobile-hidden');
  });

  /* ============================================================
    2) إغلاق السايدبار
  ============================================================ */
  closeSidebar?.addEventListener('click', () => sidebarMenu?.classList.remove('open'));

  /* ============================================================
    3) تبديل الوضع الليلي
  ============================================================ */
  const savedTheme = localStorage.getItem('fr_theme');
  if(savedTheme === 'dark') document.body.classList.add('dark');

  if(themeToggle){
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('fr_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
      themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });
  }

  /* ============================================================
    4) Scroll animation observer
  ============================================================ */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { 
      if(e.isIntersecting) e.target.classList.add('in-view'); 
    });
  }, { threshold:0.15 });

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

}); // نهاية DOMContentLoaded

/* ============================================================
  5) 🔊 Web Speech API speaking utility
============================================================ */
(function () {
  const speakButtons = document.querySelectorAll('.speak-btn');

  let voices = [];
  function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (!voices.length) {
      setTimeout(() => { voices = window.speechSynthesis.getVoices(); }, 200);
    }
  }
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;

  function findVoiceByLang(langPrefix) {
    if (!voices || !voices.length) return null;
    const match = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(langPrefix));
    if (match) return match;
    if (langPrefix === 'en') return voices.find(v => v.lang.toLowerCase().includes('en')) || voices[0];
    if (langPrefix === 'ar') return voices.find(v => v.lang.toLowerCase().includes('ar')) || voices[0];
    return voices[0];
  }

  function speakText(text, lang) {
    if (!('speechSynthesis' in window)) {
      alert('متصفحك لا يدعم النطق الصوتي (Web Speech API). جرب Chrome أو Edge.');
      return;
    }
    window.speechSynthesis.cancel(); // stop any current speech
    const utter = new SpeechSynthesisUtterance(text);
    const prefix = lang === 'ar' ? 'ar' : 'en';
    const voice = findVoiceByLang(prefix);
    if (voice) utter.voice = voice;
    utter.lang = (lang === 'ar') ? 'ar-EG' : 'en-US';
    utter.rate = 0.95;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
  }

  // attach handlers
  speakButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const text = this.dataset.text;
      const lang = this.dataset.lang || 'en';
      if (!text) return;
      speakText(text, lang);

      // تأثير الزر عند الضغط
      btn.style.transform = "scale(0.92)";
      setTimeout(() => btn.style.transform = "scale(1)", 120);
    });

    // الوصولية - Space / Enter
    btn.addEventListener('keydown', function(e) {
      if(e.key === ' ' || e.key === 'Enter'){
        e.preventDefault();
        btn.click();
      }
    });
  });
})();

/* ============================================================
  6) إدراج عناصر الهيدر، القوائم، السايدبار، والـ bottom nav
============================================================ */
(function () {
  // 6.1 — إدراج الهيدر
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

  // 6.2 — إدراج قائمة الجوال
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

  // 6.3 — إدراج البوتوم ناف
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

  // 6.4 — Sidebar
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
})();
