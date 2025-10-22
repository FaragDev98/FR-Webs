// إيقاف الفيديوهات الأخرى عند تشغيل أحدها
const videos = document.querySelectorAll('.lesson-video');

videos.forEach(v => {
  v.addEventListener('play', () => {
    videos.forEach(other => {
      if (other !== v) other.pause();
    });
  });
});
