// تأثير الظهور عند السحب
const lessons = document.querySelectorAll('.lesson');
window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.9;
  lessons.forEach(l => {
    const top = l.getBoundingClientRect().top;
    if (top < trigger) l.classList.add('show');
  });
});

// عند تشغيل فيديو – إيقاف الباقي
const videos = document.querySelectorAll('video');
videos.forEach(video => {
  video.addEventListener('play', () => {
    videos.forEach(v => {
      if (v !== video) v.pause();
    });
  });
});

// زر الاختبار العملي
document.querySelector('.quiz-btn').addEventListener('click', () => {
  alert("🚀 الاختبار يبدأ الآن!\nأجب عن الأسئلة بناءً على ما تعلمته في الدروس السابقة.");
});
