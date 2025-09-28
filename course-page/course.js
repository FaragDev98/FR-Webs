// ⚡ ملف JavaScript - تفاعل صفحة الكورس

const openButtons = document.querySelectorAll('.open-payment');
const paymentModal = document.getElementById('payment-modal');
const closeModalBtn = document.querySelector('.close-modal');
const methodLabels = document.querySelectorAll('.method');
const phoneInput = document.getElementById('phone-number');
const receiptInput = document.getElementById('receipt');
const submitBtn = document.getElementById('submit-payment');
const bannerSuccess = document.getElementById('banner-success');
const bannerFail = document.getElementById('banner-fail');
const confirmSuccessBtn = document.getElementById('confirm-success');
const retryBtn = document.getElementById('retry-payment');
const processingMsg = document.getElementById('processing-msg');

let selectedMethod = null;
let currentCourseId = null;

/* فتح المودال */
openButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    currentCourseId = e.target.closest('.course-card').dataset.course;
    paymentModal.style.display = 'flex';
    clearPaymentForm();
  });
});

/* إغلاق المودال */
closeModalBtn.addEventListener('click', () => paymentModal.style.display = 'none');

/* اختيار طريقة الدفع */
methodLabels.forEach(label => {
  label.addEventListener('click', () => {
    methodLabels.forEach(l => l.classList.remove('selected'));
    label.classList.add('selected');
    selectedMethod = label.querySelector('input').value;
  });
});

/* إرسال البيانات */
submitBtn.addEventListener('click', async e => {
  e.preventDefault();
  if (!selectedMethod || !phoneInput.value.trim()) {
    showFail("⚠️ من فضلك اختر وسيلة الدفع وأدخل رقم الهاتف.");
    return;
  }

  processingMsg.classList.remove('hidden');
  submitBtn.disabled = true;

  await new Promise(r => setTimeout(r, 3000)); // محاكاة تحقق

  processingMsg.classList.add('hidden');
  submitBtn.disabled = false;

  showSuccess();
  document.getElementById(`courseContent-${currentCourseId}`).classList.remove('hidden');
});

/* لافتات */
function showSuccess() {
  bannerFail.classList.add('hidden');
  bannerSuccess.classList.remove('hidden');
}
function showFail(msg) {
  bannerSuccess.classList.add('hidden');
  bannerFail.classList.remove('hidden');
  bannerFail.querySelector('p').textContent = msg;
}
function clearPaymentForm() {
  methodLabels.forEach(l => l.classList.remove('selected'));
  selectedMethod = null;
  phoneInput.value = '';
  receiptInput.value = '';
  bannerSuccess.classList.add('hidden');
  bannerFail.classList.add('hidden');
  processingMsg.classList.add('hidden');
}

/* تأكيد النجاح */
confirmSuccessBtn.addEventListener('click', () => paymentModal.style.display = 'none');
retryBtn.addEventListener('click', clearPaymentForm);
