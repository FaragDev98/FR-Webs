document.addEventListener("DOMContentLoaded", () => {

  /* ================= VIDEO CONTROL ================= */
  const videos = document.querySelectorAll('.service-video');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;

      // يشتغل مرة واحدة فقط
      if (entry.isIntersecting && !video.dataset.played) {
        video.currentTime = 0;
        video.muted = true;

        video.play().catch(() => {});

        video.dataset.played = "true";

        video.onended = () => {
          video.pause();
        };
      }

      // يقف لما يخرج من الشاشة
      if (!entry.isIntersecting) {
        video.pause();
      }
    });
  }, {
    threshold: 0.4 // أسرع في التشغيل
  });

  videos.forEach(video => {
    // تأكد إنه فيديو مش صورة
    if (video.tagName === "VIDEO") {
      observer.observe(video);
    }
  });


  /* ================= PAYMENT SYSTEM ================= */

  let currentService = '';
  let currentPrice = 0;
  let selectedMethod = '';
  let paymentConfirmed = false;

  const modal = document.getElementById('paymentModal');
  const serviceTitle = document.getElementById('serviceTitle');
  const status = document.getElementById('payStatus');
  const confirmBtn = document.getElementById('confirmBtn');

  const paymentNumbers = {
    "فودافون كاش":"01066047545",
    "أورنج كاش":"01285895096",
    "وي كاش":"01558516081",
    "PayPal":"Farajbdallh"
  };

  // فتح الدفع
  document.querySelectorAll('.buy-btn').forEach(btn=>{
    btn.addEventListener('click', function(){
      currentService = this.dataset.service;
      currentPrice = this.dataset.price;

      const email = paymentNumbers["PayPal"];
      const shortEmail = email;

      serviceTitle.innerHTML =
        `الخدمة: <strong>${currentService}</strong><br>
         السعر: <strong>${currentPrice} جنيه</strong><br>
         البريد: <strong>${shortEmail}</strong>`;

      modal.classList.add('active');
      paymentConfirmed = false;
    });
  });

  // اختيار طريقة الدفع
  document.querySelectorAll('.pay-item').forEach(item=>{
    item.addEventListener('click', function(){
      document.querySelectorAll('.pay-item').forEach(i=>i.classList.remove('selected'));
      this.classList.add('selected');

      selectedMethod = this.dataset.method;

      if(paymentNumbers[selectedMethod]){
        document.getElementById('payNumber').value = paymentNumbers[selectedMethod];
      }
    });
  });

  // تأكيد الدفع
  confirmBtn.addEventListener('click', function(){

    const number = document.getElementById('payNumber').value.trim();
    const fileInput = document.getElementById('payProof');
    const file = fileInput.files[0];

    if(!selectedMethod || !number || !file){
      status.style.color='red';
      status.innerHTML='من فضلك اختر طريقة الدفع واملأ البيانات وارفق إثبات الشاشة';
      return;
    }

    if(!file.type.match('image/png') && !file.type.match('image/jpeg')){
      status.style.color='red';
      status.innerHTML='❌ لازم الصورة تكون PNG أو JPG';
      return;
    }

    const msg = `طلب جديد
الخدمة: ${currentService}
السعر: ${currentPrice} جنيه
طريقة الدفع: ${selectedMethod}
رقم التحويل: ${number}`;

    window.open(
      `https://wa.me/201066047545?text=${encodeURIComponent(msg)}`,
      '_blank'
    );

    status.style.color='green';
    status.innerHTML='✅ تم إرسال الطلب بنجاح';
    paymentConfirmed = true;
  });

  // فتح الكورس
  document.querySelectorAll('.open-course').forEach(btn=>{
    btn.addEventListener('click', function(){
      if(paymentConfirmed){
        window.location.href = this.dataset.link;
      } else {
        alert("❌ لازم تدفع الأول!");
        modal.classList.add('active');
      }
    });
  });

});
