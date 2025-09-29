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

// عناصر
const paymentModal = document.getElementById("payment-modal");
const closeModalBtn = document.querySelector(".close-modal");
const methodLabels = document.querySelectorAll(".method");
const phoneInput = document.getElementById("phone-number");
const receiptInput = document.getElementById("receipt");
const submitBtn = document.getElementById("submit-payment");
const bannerSuccess = document.getElementById("banner-success");
const bannerFail = document.getElementById("banner-fail");
const confirmSuccessBtn = document.getElementById("confirm-success");
const retryBtn = document.getElementById("retry-payment");
const processingMsg = document.getElementById("processing-msg");

let selectedMethod = null;
let currentCourseId = "python101"; // خلي ID ثابت للكورس أو ديناميكي

// 🔹 دالة فتح الكورس
function openCourse() {
  localStorage.setItem(`courseUnlocked-${currentCourseId}`, "true"); // تخزين حالة الفتح
  document.getElementById(`courseContent-${currentCourseId}`).classList.remove("hidden");
  paymentModal.style.display = "none";
}

// 🔹 تحقق عند فتح الصفحة (لو الكورس مفتوح من قبل)
window.addEventListener("load", () => {
  if (localStorage.getItem(`courseUnlocked-${currentCourseId}`) === "true") {
    document.getElementById(`courseContent-${currentCourseId}`).classList.remove("hidden");
  }
});

// إغلاق المودال
closeModalBtn.addEventListener("click", () => paymentModal.style.display = "none");
// ⚡ جزء الدفع فقط

const paymentModal = document.getElementById("payment-modal");
const closeModalBtn = document.querySelector(".close-modal");
const methodLabels = document.querySelectorAll(".method");
const phoneInput = document.getElementById("phone-number");
const receiptInput = document.getElementById("receipt");
const submitBtn = document.getElementById("submit-payment");
const bannerSuccess = document.getElementById("banner-success");
const bannerFail = document.getElementById("banner-fail");
const confirmSuccessBtn = document.getElementById("confirm-success");
const retryBtn = document.getElementById("retry-payment");
const processingMsg = document.getElementById("processing-msg");

let selectedMethod = null;

// إغلاق المودال
closeModalBtn.addEventListener("click", () => paymentModal.style.display = "none");

// اختيار وسيلة الدفع
methodLabels.forEach(label => {
  label.addEventListener("click", () => {
    methodLabels.forEach(l => l.classList.remove("selected"));
    label.classList.add("selected");
    selectedMethod = label.querySelector("input").value;
  });
});

// إرسال البيانات
submitBtn.addEventListener("click", async e => {
  e.preventDefault();

  if (!selectedMethod || !phoneInput.value.trim()) {
    showFail("⚠️ من فضلك اختر وسيلة الدفع وأدخل رقم الهاتف.");
    return;
  }

  processingMsg.classList.remove("hidden");
  submitBtn.disabled = true;

  // محاكاة التحقق (3 ثواني)
  await new Promise(r => setTimeout(r, 3000));

  processingMsg.classList.add("hidden");
  submitBtn.disabled = false;

  // تحقق بسيط من رقم الهاتف
  if (phoneInput.value.length >= 10) {
    showSuccess();
  } else {
    showFail("❌ رقم الهاتف غير صحيح.");
  }
});

// لافتات
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
}

// تأكيد النجاح
confirmSuccessBtn.addEventListener("click", () => paymentModal.style.display = "none");
retryBtn.addEventListener("click", clearPaymentForm);
