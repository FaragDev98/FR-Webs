let currentService = '';
let currentPrice = 0;
let selectedMethod = '';

const modal = document.getElementById('paymentModal');
const serviceTitle = document.getElementById('serviceTitle');
const status = document.getElementById('payStatus');
const confirmBtn = document.getElementById('confirmBtn');

// فتح الدفع
document.querySelectorAll('.buy-btn').forEach(btn=>{
  btn.addEventListener('click', function(){
    currentService = this.dataset.service;
    currentPrice = this.dataset.price;

    serviceTitle.innerHTML =
      `الخدمة: <strong>${currentService}</strong><br>
       السعر: <strong>${currentPrice} جنيه</strong>`;

    modal.classList.add('active');
  });
});

// اختيار طريقة الدفع
document.querySelectorAll('.pay-item').forEach(item=>{
  item.addEventListener('click', function(){
    document.querySelectorAll('.pay-item')
      .forEach(i=>i.classList.remove('selected'));

    this.classList.add('selected');
    selectedMethod = this.dataset.method;
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
  status.innerHTML='تم إرسال الطلب ✔️';
});

// قفل
function closePayment(){
  modal.classList.remove('active');
  status.innerHTML='';
}
