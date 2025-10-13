// course.js
const API_BASE = "https://html-backend-production.up.railway.app";

const modal = document.getElementById("payment-modal");
const closeModal = document.querySelector(".close-modal");
const openButtons = document.querySelectorAll(".open-payment");
const submitBtn = document.getElementById("submit-payment");
const phoneInput = document.getElementById("phone-number");
const receiptInput = document.getElementById("receipt");

const successBanner = document.getElementById("banner-success");
const failBanner = document.getElementById("banner-fail");
const processingMsg = document.getElementById("processing-msg");

let selectedCourse = null;
let selectedMethod = null;

// افتح المودال عند الضغط على زر "افتح الكورس"
openButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    selectedCourse = e.target.closest(".course-card").dataset.course;
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  });
});

// إغلاق المودال
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  resetForm();
});

// اختيار وسيلة الدفع
document.querySelectorAll('input[name="method"]').forEach((r) => {
  r.addEventListener("change", (e) => {
    selectedMethod = e.target.value;
    submitBtn.disabled = !selectedMethod;
  });
});

// إرسال بيانات الدفع للسيرفر
submitBtn.addEventListener("click", async () => {
  const phone = phoneInput.value.trim();
  const file = receiptInput.files[0];

  if (!selectedMethod || !phone || !file) {
    alert("الرجاء إدخال كل البيانات المطلوبة");
    return;
  }

  processingMsg.classList.remove("hidden");
  submitBtn.disabled = true;

  try {
    const reader = new FileReader();
    reader.onload = async function () {
      const base64 = reader.result;

      const paymentData = {
        name: "زائر الموقع",
        email: "none@fabrica.app",
        course: selectedCourse,
        phone,
        method: selectedMethod,
        receipt: base64,
      };

      const res = await fetch(`${API_BASE}/course`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const data = await res.json();

      processingMsg.classList.add("hidden");

      if (data.success) {
        successBanner.classList.remove("hidden");
      } else {
        failBanner.classList.remove("hidden");
      }
    };

    reader.readAsDataURL(file);
  } catch (err) {
    console.error("❌ Payment error:", err);
    processingMsg.classList.add("hidden");
    failBanner.classList.remove("hidden");
  }
});

// إعادة المحاولة
document.getElementById("retry-payment").addEventListener("click", resetForm);

// إغلاق رسالة النجاح
document.getElementById("confirm-success").addEventListener("click", () => {
  modal.style.display = "none";
  resetForm();
});

// دالة تنظيف
function resetForm() {
  document.querySelectorAll('input[name="method"]').forEach((r) => (r.checked = false));
  phoneInput.value = "";
  receiptInput.value = "";
  selectedMethod = null;
  submitBtn.disabled = true;
  processingMsg.classList.add("hidden");
  successBanner.classList.add("hidden");
  failBanner.classList.add("hidden");
}
