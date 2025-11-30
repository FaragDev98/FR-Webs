
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


// 🟣 فتح نافذة الدفع
openButtons.forEach(btn => {
  btn.addEventListener("click", e => {
    selectedCourse = e.target.closest(".course-card").dataset.course;
    modal.classList.remove("hidden");
  });
});

// 🔵 غلق النافذة
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  resetForm();
});

// 🟢 اختيار وسيلة الدفع
document.querySelectorAll('input[name="method"]').forEach(r => {
  r.addEventListener("change", e => {
    selectedMethod = e.target.value;
    submitBtn.disabled = !selectedMethod;
  });
});

// 🟠 إرسال الدفع
submitBtn.addEventListener("click", async () => {
  const phone = phoneInput.value.trim();
  const file = receiptInput.files[0];

  if (!selectedMethod || !phone || !file) {
    alert("⚠️ يرجى إدخال كل البيانات المطلوبة");
    return;
  }

  processingMsg.classList.remove("hidden");
  submitBtn.disabled = true;

  const reader = new FileReader();
  reader.onload = async function () {
    try {
      const base64 = reader.result;
      const paymentData = {
        course: selectedCourse,
        phone,
        method: selectedMethod,
        receipt: base64
      };

      const res = await fetch(`${API_BASE}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData)
      });

      processingMsg.classList.add("hidden");

      if (res.ok) {
        // ✅ تم الدفع بنجاح
        successBanner.classList.remove("hidden");

        // ⏳ بعد 3 ثواني يفتح صفحة الدروس
        setTimeout(() => {
          window.location.href = "lessons-page/index.html";
        }, 3000);

      } else {
        // ❌ فشل في الدفع
        failBanner.classList.remove("hidden");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      processingMsg.classList.add("hidden");
      failBanner.classList.remove("hidden");
    }
  };

  reader.readAsDataURL(file);
});

// 🔁 إعادة المحاولة
document.getElementById("retry-payment").addEventListener("click", resetForm);

// ✅ تأكيد النجاح (زرار)
document.getElementById("confirm-success").addEventListener("click", () => {
  modal.classList.add("hidden");
  resetForm();
  window.location.href = "lessons-page/index.html";
});

// 🧹 إعادة تعيين النموذج
function resetForm() {
  phoneInput.value = "";
  receiptInput.value = "";
  document.querySelectorAll('input[name="method"]').forEach(r => (r.checked = false));
  selectedMethod = null;
  submitBtn.disabled = true;
  successBanner.classList.add("hidden");
  failBanner.classList.add("hidden");
  processingMsg.classList.add("hidden");
}
const API_BASE = "https://html-backend-production.up.railway.app";
