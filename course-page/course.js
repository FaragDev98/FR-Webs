const API_BASE = "html-backend-production.up.railway.app";
document.addEventListener("DOMContentLoaded", () => {
  // تعريف العناصر
  const openButtons = document.querySelectorAll(".open-payment");
  const paymentModal = document.getElementById("payment-modal");
  const closeModalBtn = document.querySelector(".close-modal");
  const submitBtn = document.getElementById("submit-payment");
  const methodLabels = document.querySelectorAll(".method");
  const phoneInput = document.getElementById("phone-number");
  const receiptInput = document.getElementById("receipt");
  const bannerSuccess = document.getElementById("banner-success");
  const bannerFail = document.getElementById("banner-fail");
  const confirmSuccessBtn = document.getElementById("confirm-success");
  const retryBtn = document.getElementById("retry-payment");
  const processingMsg = document.getElementById("processing-msg");

  // رابط السيرفر (Railway)
  const API_BASE = "https://html-backend-production.up.railway.app";

  let selectedMethod = null;
  let currentCourseId = null;
  let currentPaymentId = null;
  let pollInterval = null;

  // ✅ فتح نافذة الدفع
  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const courseCard = e.target.closest(".course-card");
      currentCourseId = courseCard.dataset.course;
      paymentModal.classList.remove("hidden");
      clearPaymentForm();
      setTimeout(() => phoneInput.focus(), 150);
    });
  });

  // ✅ إغلاق النافذة
  closeModalBtn.addEventListener("click", () => paymentModal.classList.add("hidden"));

  // ✅ اختيار وسيلة الدفع
  methodLabels.forEach((label) => {
    label.addEventListener("click", () => {
      methodLabels.forEach((l) => l.classList.remove("selected"));
      label.classList.add("selected");
      selectedMethod = label.querySelector("input")?.value;
      checkFormValidity();
    });
  });

  // ✅ التحقق من صحة البيانات
  function checkFormValidity() {
    const phoneOk = /^\d{10,11}$/.test(phoneInput.value.trim());
    const receiptOk = receiptInput.files.length > 0;
    submitBtn.disabled = !(selectedMethod && phoneOk && receiptOk);
  }

  phoneInput.addEventListener("input", checkFormValidity);
  receiptInput.addEventListener("change", checkFormValidity);

  // ✅ تحويل الإيصال لصيغة base64
  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  }

  // ✅ إرسال بيانات الدفع
  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!selectedMethod) return showFail("اختر وسيلة الدفع");
    if (!/^\d{10,11}$/.test(phoneInput.value.trim())) return showFail("ادخل رقم هاتف صحيح");
    if (receiptInput.files.length === 0) return showFail("أرفق إيصال الدفع");

    processingMsg.classList.remove("hidden");
    submitBtn.disabled = true;

    try {
      const receiptBase64 = await readFileAsBase64(receiptInput.files[0]);
      const payload = {
        name: "عميل جديد",
        email: "client@example.com",
        course: currentCourseId,
        phone: phoneInput.value.trim(),
        method: selectedMethod,
        receipt: receiptBase64,
      };

      const res = await fetch(`${API_BASE}/course`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      processingMsg.classList.add("hidden");

      if (!res.ok) {
        showFail(data.message || "فشل في إرسال الطلب");
        submitBtn.disabled = false;
        return;
      }

      currentPaymentId = data.id;
      showPending("✅ تم إرسال الطلب. جاري التحقق من الإدارة...");
      startPollingStatus(currentPaymentId);
    } catch (err) {
      console.error(err);
      showFail("خطأ أثناء الاتصال بالسيرفر.");
      processingMsg.classList.add("hidden");
      submitBtn.disabled = false;
    }
  });

  // ✅ التحقق من حالة الدفع
  async function startPollingStatus(paymentId) {
    if (pollInterval) clearInterval(pollInterval);

    const check = async () => {
      try {
        const res = await fetch(`${API_BASE}/payment/${paymentId}`);
        if (!res.ok) return;
        const json = await res.json();

        if (json.payment && json.payment.status === "confirmed" && json.payment.token) {
          localStorage.setItem(`fabrica_token_${json.payment.course}`, json.payment.token);
          showSuccess("✅ تم تأكيد الدفع. سيتم فتح الكورس بعد 5 ثوانٍ...");
          clearInterval(pollInterval);
          setTimeout(() => {
            openCourse(json.payment.course);
            paymentModal.classList.add("hidden");
          }, 5000);
        }
      } catch (e) {
        console.error("poll error", e);
      }
    };

    await check();
    pollInterval = setInterval(check, 5000);
  }

  // ✅ التحقق من التوكين عند تحميل الصفحة
  window.addEventListener("load", () => {
    document.querySelectorAll(".course-card").forEach(async (card) => {
      const courseId = card.dataset.course;
      const token = localStorage.getItem(`fabrica_token_${courseId}`);

      if (token) {
        try {
          const res = await fetch(`${API_BASE}/verify-token`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) openCourse(courseId);
          else localStorage.removeItem(`fabrica_token_${courseId}`);
        } catch (e) {
          console.error(e);
        }
      }
    });
  });

  // ✅ فتح الكورس بعد الدفع
  function openCourse(courseId) {
    document.getElementById(`courseContent-${courseId}`).classList.remove("hidden");
  }

  // ✅ رسائل الحالة
  function showSuccess(msg = "تم بنجاح") {
    bannerFail.classList.add("hidden");
    bannerSuccess.classList.remove("hidden");
    bannerSuccess.querySelector("p").textContent = msg;
  }

  function showPending(msg) {
    bannerFail.classList.add("hidden");
    bannerSuccess.classList.remove("hidden");
    bannerSuccess.querySelector("p").textContent = msg;
  }

  function showFail(msg) {
    bannerSuccess.classList.add("hidden");
    bannerFail.classList.remove("hidden");
    bannerFail.querySelector("p").textContent = msg;
  }

  // ✅ تنظيف النموذج
  function clearPaymentForm() {
    methodLabels.forEach((l) => l.classList.remove("selected"));
    selectedMethod = null;
    phoneInput.value = "";
    receiptInput.value = "";
    bannerSuccess.classList.add("hidden");
    bannerFail.classList.add("hidden");
    processingMsg.classList.add("hidden");
    submitBtn.disabled = true;
  }

  // ✅ أزرار إضافية
  confirmSuccessBtn?.addEventListener("click", () => {
    openCourse(currentCourseId);
    paymentModal.classList.add("hidden");
  });
  retryBtn?.addEventListener("click", clearPaymentForm);
});
