<script>
const videos = document.querySelectorAll('.service-video');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target;

    // لو أول مرة يظهر في الشاشة
    if (entry.isIntersecting && !video._playedOnce) {
      video.currentTime = 0;
      video.play().catch(() => {});
      video._playedOnce = true;

      // نوقفه بعد ما يخلص (عشان ميتكرر)
      video.onended = () => {
        video.pause();
      };
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
  video._playedOnce = false;
  observer.observe(video);
});
</script>
  
  <script>
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
</script>
