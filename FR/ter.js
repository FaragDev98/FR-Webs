document.addEventListener("DOMContentLoaded", () => {

  const videos = document.querySelectorAll('.service-video');

  // أول ضغطة من المستخدم لتفعيل الصوت لكل الفيديوهات
  let soundEnabled = false;
  document.addEventListener('click', () => {
    soundEnabled = true;
  }, { once: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;

      // لما يدخل الكارت و الفيديو ما اشتغلش قبل كده
      if (entry.isIntersecting && !video.dataset.played) {
        video.currentTime = 0;

        // ابدأ الفيديو بصمت لو الصوت مش مفعل لسه
        video.muted = !soundEnabled;

        video.play().catch(() => {});
        video.dataset.played = "true";

        // لما يخلص يقف وميرجعش
        video.onended = () => {
          video.pause();
        };

        // لو المستخدم ضغط بعد ما الفيديو بدأ، شغل الصوت
        if (!soundEnabled) {
          const enableSound = () => {
            video.muted = false;
            document.removeEventListener('click', enableSound);
          };
          document.addEventListener('click', enableSound);
        }
      }

      // لما يخرج من الشاشة
      if (!entry.isIntersecting) {
        video.pause();
      }

    });
  }, {
    threshold: 0.6
  });

  videos.forEach(video => {
    observer.observe(video);
  });

});
let currentService='', currentPrice=0;

function openPayment(service, price){
  currentService=service;
  currentPrice=price;
  document.getElementById('serviceTitle').innerHTML=
    `الخدمة: <strong>${service}</strong><br>السعر: <strong>${price} جنيه</strong>`;
  document.getElementById('paymentModal').style.display='flex';
}

function closePayment(){
  document.getElementById('paymentModal').style.display='none';
}

function confirmPayment(){
  const num=document.getElementById('payNumber');
  const file=document.getElementById('payProof');
  const status=document.getElementById('payStatus');

  if(num.value.trim()==='' || file.files.length===0){
    status.style.color='red';
    status.innerHTML='⚠️ من فضلك املأ البيانات وارفق إثبات الدفع';
    num.classList.add('input-error');
    file.classList.add('input-error');
    return;
  }

  const msg=`طلب خدمة FR Webs
الخدمة: ${currentService}
السعر: ${currentPrice} جنيه
رقم التحويل: ${num.value}
جاري التحقق`;

  window.open(`https://wa.me/201066047545?text=${encodeURIComponent(msg)}`,'_blank');

  status.style.color='green';
  status.innerHTML='✅ تم إرسال البيانات، جاري التحقق من FR';
}
