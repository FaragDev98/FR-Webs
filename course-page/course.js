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

// 🔒 طرق الدفع الصحيحة فقط
const validMethods = {
  "vodafone": "01066047545",
  "orange": "01285895096",
  "we": "01558516081",
  "paypal": "Farajbdallh891@gmail.com"
};

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

/* اختيار وسيلة الدفع */
methodLabels.forEach(label => {
  label.addEventListener('click', () => {
    methodLabels.forEach(l => l.classList.remove('selected'));
    label.classList.add('selected');
    selectedMethod = label.querySelector('input').value;
    checkFormValidity();
  });
});

/* التحقق من المدخلات وتفعيل زر الإرسال */
function checkFormValidity() {
  if (
    selectedMethod &&
    /^\d{10,11}$/.test(phoneInput.value.trim()) &&
    receiptInput.files.length > 0
  ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

/* متابعة التغييرات على الحقول */
phoneInput.addEventListener("input", checkFormValidity);
receiptInput.addEventListener("change", checkFormValidity);

/* إرسال البيانات */
submitBtn.addEventListener('click', async e => {
  e.preventDefault();

  // إخفاء أي رسائل قديمة
  bannerSuccess.classList.add("hidden");
  bannerFail.classList.add("hidden");

  // تحقق أن الطريقة المختارة من طرقك أنت فقط
  if (!validMethods[selectedMethod]) {
    showFail("❌ وسيلة الدفع غير صحيحة.");
    return;
  }

  processingMsg.classList.remove('hidden');
  submitBtn.disabled = true;

  // محاكاة التحقق (3 ثواني)
  await new Promise(r => setTimeout(r, 3000));

  processingMsg.classList.add('hidden');
  submitBtn.disabled = false;

  // ✅ كل شيء صحيح
  showSuccess();
  // 🔒 فتح الكورس بعد الدفع (تخزين في localStorage)
  localStorage.setItem(`courseUnlocked-${currentCourseId}`, "true");
});

/* فتح الكورس */
function openCourse(courseId) {
  document.getElementById(`courseContent-${courseId}`).classList.remove("hidden");
  paymentModal.style.display = "none";
}

/* تحقق عند تحميل الصفحة */
window.addEventListener("load", () => {
  document.querySelectorAll('.course-card').forEach(card => {
    const courseId = card.dataset.course;
    if (localStorage.getItem(`courseUnlocked-${courseId}`) === "true") {
      openCourse(courseId);
    }
  });
});

/* لافتات */
function showSuccess() {
  bannerFail.classList.add("hidden");
  bannerSuccess.classList.remove("hidden");
}
function showFail(msg) {
  bannerSuccess.classList.add("hidden");
  bannerFail.classList.remove("hidden");
  bannerFail.querySelector("p").textContent = msg;
}
function clearPaymentForm() {
  methodLabels.forEach(l => l.classList.remove("selected"));
  selectedMethod = null;
  phoneInput.value = "";
  receiptInput.value = "";
  bannerSuccess.classList.add("hidden");
  bannerFail.classList.add("hidden");
  processingMsg.classList.add("hidden");
  submitBtn.disabled = true; // زر الإرسال يبدأ معطل
}

/* تأكيد النجاح */
confirmSuccessBtn.addEventListener("click", () => {
  openCourse(currentCourseId);
});
retryBtn.addEventListener("click", clearPaymentForm);
