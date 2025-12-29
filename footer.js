// footer.js
document.addEventListener("DOMContentLoaded", () => {

  /* ============================================================
    1) إدراج الهيدر (Header) – ثابت وأمن لكل الصفحات
  ============================================================ */
  if (!document.querySelector('header.header')) {
    const headerHTML = `
      <header class="header">
        <div class="header-inner">
          <a class="brand" href="/index.html">
            <div class="logo">
              <img src="/icons/ai-icon.png" alt="AI Icon">
            </div>
            <span class="brand-title">FR Webs</span>
          </a>

          <div class="header-actions">
            <button id="menuToggle" class="btn-icon mobile-only" aria-label="القائمة">🗂</button>
          </div>
        </div>
      </header>
    `;
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }

  /* ============================================================
    2) إدراج قائمة الجوال (تحت الهيدر – لا تغطي الصفحة)
  ============================================================ */
  if (!document.getElementById("localMobileNav")) {
    const navHTML = `
      <nav id="localMobileNav" class="nav mobile-nav mobile-hidden" aria-label="قائمة الجوال">
        <a href="/FR/index.html"><i class="fa-solid fa-newspaper"></i> خدمات</a>
        <a href="/dev-english/index.html"><i class="fa-solid fa-language"></i> الإنجليزية</a>
        <a href="/ish/index.html"><i class="fa-solid fa-graduation-cap"></i> الكورسات</a>
      </nav>
    `;
    const header = document.querySelector("header.header");
    header.insertAdjacentHTML("afterend", navHTML);
  }

  /* ============================================================
    3) إدراج Bottom Navigation
  ============================================================ */
  if (!document.querySelector(".bottom-nav")) {
    const bottomHTML = `
      <nav class="bottom-nav mobile-only" aria-label="تنقل سفلي">
        <a href="/index.html"><i class="fa-solid fa-house"></i></a>
        <a href="/ish/index.html"><i class="fa-solid fa-book"></i></a>
        <button id="themeToggle" class="btn-icon" aria-label="الوضع الليلي">🌙</button>
        <a href="/code/index.html"><i class="fa-solid fa-flask"></i></a>
        <a href="/contac/contact.html"><i class="fa-solid fa-phone"></i></a>
      </nav>
    `;
    document.body.insertAdjacentHTML("beforeend", bottomHTML);
  }

  /* ============================================================
    4) المتغيرات
  ============================================================ */
  const menuToggle = document.getElementById("menuToggle");
  const localMobileNav = document.getElementById("localMobileNav");
  const themeToggle = document.getElementById("themeToggle");

  /* ============================================================
    5) زر المجلد — Toggle فتح / قفل
  ============================================================ */
  if (menuToggle && localMobileNav) {
    menuToggle.addEventListener("click", () => {
      const opened = !localMobileNav.classList.contains("mobile-hidden");
      localMobileNav.classList.toggle("mobile-hidden");
      menuToggle.textContent = opened ? "🗂" : "📂";
    });
  }

  /* ============================================================
    6) الوضع الليلي — عام لكل الصفحات + حفظ
  ============================================================ */
  const savedTheme = localStorage.getItem("fr_theme");
  if (savedTheme === "dark") document.body.classList.add("dark");

  if (themeToggle) {
    themeToggle.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const mode = document.body.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("fr_theme", mode);
      themeToggle.textContent = mode === "dark" ? "☀️" : "🌙";
    });
  }

  /* ============================================================
    7) Animation Observer (اختياري – آمن)
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
});


/* ============================================================
   contact.js (كما هو – بدون تعديل)
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  if (!form) return;

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
      formMessage.textContent = "يرجى ملء جميع الحقول.";
    }
  });
});
