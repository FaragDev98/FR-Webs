/* ========== تحميل الهيدر ========== */
fetch("/ui-system/header.html")
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML("afterbegin", html);
  });

/* ========== تحميل الفوتر ========== */
fetch("/ui-system/footer.html")
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);
  });

/* ========== إضافة Bottom Navigation (مدمج من كودك) ========== */
document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".bottom-nav")) {
    const bottomNavHTML = `
      <nav class="bottom-nav mobile-only" aria-label="تنقل أسفل الصفحة">
        <a href="index.html"><i class="fa-solid fa-house"></i><span>الرئيسية</span></a>
        <a href="lessons/lessons.html"><i class="fa-solid fa-book"></i><span>الدروس</span></a>
        <button id="themeToggle" class="btn-icon" aria-label="تبديل الوضع">🌙</button>
        <a href="code/index.html"><i class="fa-solid fa-flask"></i><span>المختبر</span></a>
        <a href="contac/contact.html"><i class="fa-solid fa-phone"></i><span>تواصل</span></a>
      </nav>
    `;
    document.body.insertAdjacentHTML("beforeend", bottomNavHTML);
  }
});
