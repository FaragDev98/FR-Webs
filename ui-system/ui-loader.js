document.addEventListener('DOMContentLoaded', () => {

  /* ======= 1) الهيدر ======= */
  if (!document.querySelector('header.fr-header')) {
    const headerHTML = `
      <header class="fr-header">
        <div class="header-inner">

          <!-- زر القائمة -->
          <button id="menuToggle" class="btn-icon mobile-only" aria-label="Menu">🗂</button>

          <!-- الشعار واسم الموقع -->
          <a class="brand" href="index.html">
            <div class="logo">
              <img src="ui-system/icons/ai-icon.png" alt="FR Logo">
            </div>
            <span class="brand-title">FR Webs</span>
          </a>

        </div>
      </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  /* ======= 2) البوتوم ناف ======= */
  if (!document.querySelector('.fr-bottom-nav')) {
    const bottomNavHTML = `
      <nav class="fr-bottom-nav mobile-only">
        <a href="index.html"><i class="fa-solid fa-house"></i><span>الرئيسية</span></a>
        <a href="#lessons"><i class="fa-solid fa-book"></i><span>الدروس</span></a>
        <button id="themeToggle" class="btn-icon" aria-label="Dark Mode">🌙</button>
        <a href="#lab"><i class="fa-solid fa-flask"></i><span>المختبر</span></a>
        <a href="#contact"><i class="fa-solid fa-phone"></i><span>تواصل</span></a>
      </nav>
    `;
    document.body.insertAdjacentHTML('beforeend', bottomNavHTML);
  }

  /* ======= 3) الوضع الليلي ======= */
  if (localStorage.getItem('fr_theme') === 'dark') {
    document.body.classList.add('dark');
  }

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('fr_theme', mode);
      themeToggle.textContent = mode === 'dark' ? '☀️' : '🌙';
    });
  }

});
