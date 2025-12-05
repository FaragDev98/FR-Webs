document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById('menuToggle');
  const localMobileNav = document.getElementById('localMobileNav');
  const sidebarMenu = document.getElementById('sidebarMenu');
  const closeSidebar = document.getElementById('closeSidebar');
  const themeToggle = document.getElementById('themeToggle');

  // ===== قائمة الجوال toggle =====
  menuToggle?.addEventListener('click', () => {
    localMobileNav?.classList.toggle('mobile-hidden');
    sidebarMenu?.classList.remove('open');
  });

  // ===== السايدبار dblclick =====
  menuToggle?.addEventListener('dblclick', () => {
    sidebarMenu?.classList.toggle('open');
    if(sidebarMenu?.classList.contains('open')) localMobileNav?.classList.add('mobile-hidden');
  });

  // ===== إغلاق السايدبار =====
  closeSidebar?.addEventListener('click', () => sidebarMenu?.classList.remove('open'));

  // ===== تبديل الوضع الليلي =====
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
        <a href="ish/index.html"><i class="fa-solid fa-language"></i> تعلم </a>
        <a href="dev-english/index.html"><i class="fa-solid fa-newspaper"></i> الانجليزي</a>
        <a href="lessons-page/index.html"><i class="fa-solid fa-graduation-cap"></i> الكورسات</a>
      </nav>
    `;
    // أدخل القائمة بعد الهيدر مباشرة (أو في بداية الـ body إذا الهيدر لم يتغير)
    const headerEl = document.querySelector('header.header');
    if (headerEl) headerEl.insertAdjacentHTML('afterend', localNavHTML);
    else document.body.insertAdjacentHTML('afterbegin', localNavHTML);
  }
  // ===== Scroll animation observer =====
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { 
      if(e.isIntersecting) e.target.classList.add('in-view'); 
    });
  }, { threshold:0.15 });
  document.querySelectorAll('.animate').forEach(el => observer.observe(el));
});

// ===== Web Speech API speaking utility =====
(function () {
  const speakButtons = document.querySelectorAll('.speak-btn');

  // تحميل الأصوات
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
    window.speechSynthesis.cancel(); // إيقاف أي نطق حالي
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
