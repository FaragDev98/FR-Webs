let currentService = '';
let currentPrice = 0;
let selectedMethod = '';
let paymentConfirmed = false; // ⚡ المتغير اللي يتحكم إذا المستخدم دفع

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

    serviceTitle.innerHTML =
      `الخدمة: <strong>${currentService}</strong><br>
       السعر: <strong>${currentPrice} جنيه</strong>`;

    modal.classList.add('active');
    paymentConfirmed = false; // إعادة الضبط عند فتح الصندوق
  });
});

// اختيار طريقة الدفع
document.querySelectorAll('.pay-item').forEach(item=>{
  item.addEventListener('click', function(){
    document.querySelectorAll('.pay-item')
      .forEach(i=>i.classList.remove('selected'));

    this.classList.add('selected');
    selectedMethod = this.dataset.method;

    // ملء رقم الدفع تلقائي حسب الطريقة
    if(paymentNumbers[selectedMethod]){
      document.getElementById('payNumber').value = paymentNumbers[selectedMethod];
    }
  });
});

// تأكيد الدفع
confirmBtn.addEventListener('click', function(){

  const number = document.getElementById('payNumber').value.trim();
  const file = document.getElementById('payProof').files.length;

  if(!selectedMethod || !number || !file){
    status.style.color='red';
    status.innerHTML='من فضلك اختر طريقة الدفع واملأ البيانات وارفق الإثبات';
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
  status.innerHTML='تم إرسال الطلب ✔️ يمكنك الآن فتح الكورس';

  paymentConfirmed = true; // ✅ الدفع تم تأكيده
});

// زر فتح الكورس (مثال)
// كل زر كورس عندك خلي له class="open-course" و data-link="الرابط"
document.querySelectorAll('.open-course').forEach(btn=>{
  btn.addEventListener('click', function(){
    if(paymentConfirmed){
      window.location.href = this.dataset.link;
    } else {
      alert("❌ يجب إتمام الدفع أولًا!");
      modal.classList.add('active'); // يفتح صندوق الدفع تلقائي
    }
  });
});

// قفل عند الضغط خارج الصندوق
function closePayment(){
  modal.classList.remove('active');
  status.innerHTML='';
}
