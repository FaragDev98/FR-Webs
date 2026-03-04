let currentService = '';
let currentPrice = 0;
let selectedMethod = '';
let paymentConfirmed = false;

const modal = document.getElementById('paymentModal');
const serviceTitle = document.getElementById('serviceTitle');
const status = document.getElementById('payStatus');
const confirmBtn = document.getElementById('confirmBtn');

// أرقام الدفع
const paymentNumbers = {
  "فودافون كاش":"01066047545",
  "أورنج كاش":"01285895096",
  "وي كاش":"01558516081",
  "PayPal":"Farajbdallh891@gmail.com"
};

// فتح صندوق الدفع عند الضغط على زر الاشتراك
document.querySelectorAll('.buy-btn').forEach(btn=>{
  btn.addEventListener('click', function(){
    currentService = this.dataset.service;
    currentPrice = this.dataset.price;

    // البريد يظهر جزئي
    const email = paymentNumbers["PayPal"];
    const shortEmail = email.replace(/(.{5}).+(@.+)/,"$1…$2");

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

  // تحقق من نوع الملف: يجب أن يكون صورة PNG أو JPEG (لقطة شاشة)
  if(!file.type.match('image/png') && !file.type.match('image/jpeg')){
    status.style.color='red';
    status.innerHTML='❌ يجب أن تكون الصورة لقطة شاشة PNG أو JPEG';
    return;
  }


  // إرسال الطلب عبر واتساب
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
  status.innerHTML='✅ تم إرسال الطلب بنجاح، يمكنك الآن فتح الكورس';
  paymentConfirmed = true;
});

// زر فتح الكورس
document.querySelectorAll('.open-course').forEach(btn=>{
  btn.addEventListener('click', function(){
    if(paymentConfirmed){
      window.location.href = this.dataset.link;
    } else {
      alert("❌ يجب إتمام الدفع أولًا!");
      modal.classList.add('active');
    }
  });
});

function closePayment(){
  modal.classList.remove('active');
  status.innerHTML='';
}
