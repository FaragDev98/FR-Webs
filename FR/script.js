document.addEventListener("DOMContentLoaded", () => {

  console.log("FR Webs Services Page Loaded");

  /* ===== إنشاء قائمة الجوال ===== */
  if (!document.getElementById('localMobileNav')) {
    const localNavHTML = `
      <nav id="localMobileNav" class="nav mobile-nav mobile-hidden">
        <a href="dev-english/index.html">الإنجليزية</a>
        <a href="FR/index.html">خدمات</a>
        <a href="lessons-page/index.html">الكورسات</a>
      </nav>
    `;
    const headerEl = document.querySelector('header.header');
    if (headerEl) {
      headerEl.insertAdjacentHTML('afterend', localNavHTML);
    }
  }

  /* ===== زر المجلد يفتح ويقفل القائمة ===== */
  const menuToggle = document.getElementById("menuToggle");
  const localNav = document.getElementById("localMobileNav");

  if (menuToggle && localNav) {
    menuToggle.addEventListener("click", () => {
      localNav.classList.toggle("mobile-hidden");
    });
  }

});
