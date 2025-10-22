// تأثير الظهور عند السحب
const lessons = document.querySelectorAll('.lesson');
window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.9;
  lessons.forEach(l => {
    const top = l.getBoundingClientRect().top;
    if (top < trigger) l.classList.add('show');
  });
});

// عند تشغيل فيديو يتوقف الباقي تلقائيًا
const videos = document.querySelectorAll('video');
videos.forEach(v => {
  v.addEventListener('play', () => {
    videos.forEach(other => {
      if (other !== v) other.pause();
    });
  });
});
