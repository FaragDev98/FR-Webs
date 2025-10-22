// إيقاف تشغيل الفيديوهات عند تشغيل آخر
document.querySelectorAll('.lesson-video').forEach(video => {
  video.addEventListener('play', () => {
    document.querySelectorAll('.lesson-video').forEach(v => {
      if (v !== video) v.pause();
    });
  });
});

// تأثير عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lesson-card').forEach((card, i) => {
    card.style.opacity = 0;
    setTimeout(() => {
      card.style.transition = "opacity 1s ease, transform 1s ease";
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, i * 200);
  });
});
