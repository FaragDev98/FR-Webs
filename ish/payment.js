let coursePrice = 0;

function openPayment(price){
  if(price === 0){
    unlockCourse();
    return;
  }
  coursePrice = price;
  document.getElementById('paymentModal').style.display = 'flex';
}

function closePayment(){
  document.getElementById('paymentModal').style.display = 'none';
}

function unlockCourse(){
  document.getElementById('courseContent').classList.remove('locked');
}

function toggleText(id){
  document.getElementById(id).classList.toggle('show');
}

// معالجة الدفع
document.getElementById('payConfirmBtn').addEventListener('click', () => {
  const numberField = document.getElementById('payNumber');
  const fileField = document.getElementById('payProof');
  const status = document.getElementById('payStatus');

  if(numberField.value.trim() === "" || fileField.files.length === 0){
    status.style.color = 'red';
    status.innerHTML = '⚠️ الرجاء ملء جميع الحقول وإرفاق إثبات الدفع';
    shakeElement(status);
    if(numberField.value.trim() === "") numberField.classList.add('input-error');
    if(fileField.files.length === 0) fileField.classList.add('input-error');
    return;
  }

  // إزالة أي أخطاء سابقة
  numberField.classList.remove('input-error');
  fileField.classList.remove('input-error');

  // إرسال البيانات عبر WhatsApp
  const message = `تم إرسال بيانات الدفع:\nرقم التحويل / البريد: ${numberField.value}\nالتحقق جاري من FR`;
  const waLink = `https://wa.me/201066047545?text=${encodeURIComponent(message)}`;
  window.open(waLink, '_blank');

  status.style.color = 'green';
  status.innerHTML = '✅ تم إرسال البيانات بنجاح، جاري التحقق من FR';
});

// اهتزاز النصوص عند الخطأ
function shakeElement(el){
  el.classList.add('shake');
  setTimeout(()=> el.classList.remove('shake'), 600);
}
