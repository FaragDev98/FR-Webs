 ============================================================ */
  if (!document.getElementById('localMobileNav')) {
    const localNavHTML = `
      <nav id="localMobileNav" class="nav mobile-nav mobile-hidden" aria-label="قائمة الجوال">
        <a href="dev-english/index.html"><i class="fa-solid fa-language"></i> الإنجليزي</a>
        <a href="artic/index.html"><i class="fa-solid fa-newspaper"></i> المقالات</a>
        <a href="course-page/course.html"><i class="fa-solid fa-graduation-cap"></i> الكورسات</a>
      </nav>
    `;
    // أدخل القائمة بعد الهيدر مباشرة (أو في بداية الـ body إذا الهيدر لم يتغير)
    const headerEl = document.querySelector('header.header');
    if (headerEl) headerEl.insertAdjacentHTML('afterend', localNavHTML);
    else document.body.insertAdjacentHTML('afterbegin', localNavHTML);
 }
