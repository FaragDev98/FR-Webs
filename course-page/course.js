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

openButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    currentCourseId = e.target.closest('.course-card').dataset.course;
    paymentModal.style.display = 'flex';
    clearPaymentForm();
  });
});

closeModalBtn.addEventListener('click', () => paymentModal.style.display = 'none');

methodLabels.forEach(label => {
  label.addEventListener('click', () => {
    methodLabels.forEach(l => l.classList.remove('selected'));
    label.classList.add('selected');
    selectedMethod = label.querySelector('input').value;
    checkFormValidity();
  });
});

function checkFormValidity() {
  submitBtn.disabled = !(selectedMethod && /^\d{10,11}$/.test(phoneInput.value.trim()));
}

phoneInput.addEventListener("input", checkFormValidity);
receiptInput.addEventListener("change", checkFormValidity);

submitBtn.addEventListener('click', async e => {
  e.preventDefault();
  bannerSuccess.classList.add("hidden");
  bannerFail.classList.add("hidden");

  const name = "عميل جديد";
  const email = "client@example.com";
  const course = currentCourseId;
  const phone = phoneInput.value;

  processingMsg.classList.remove('hidden');
  submitBtn.disabled = true;

  try {
    const res = await fetch("https://fabrica-backend-production.up.railway.app/course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, course, phone, method: selectedMethod })
    });

    const data = await res.json();

    processingMsg.classList.add('hidden');
    submitBtn.disabled = false;

    if (res.ok) {
      showSuccess();
      localStorage.setItem(`courseUnlocked-${currentCourseId}`, "true");
    } else {
      showFail(data.message || "فشل إرسال البيانات.");
    }
  } catch (err) {
    showFail("حدث خطأ في الاتصال بالسيرفر.");
    processingMsg.classList.add('hidden');
  }
});

function openCourse(id) {
  document.getElementById(`courseContent-${id}`).classList.remove("hidden");
  paymentModal.style.display = "none";
}

window.addEventListener("load", () => {
  document.querySelectorAll('.course-card').forEach(card => {
    const id = card.dataset.course;
    if (localStorage.getItem(`courseUnlocked-${id}`) === "true") openCourse(id);
  });
});

function showSuccess() {
  bannerFail.classList.add("hidden");
  bannerSuccess.classList.remove("hidden");
}
function showFail(msg) {
  bannerSuccess.classList.add("hidden");
  bannerFail.classList.remove("hidden");
  bannerFail.querySelector("p")?.remove();
  const p = document.createElement("p");
  p.textContent = msg;
  bannerFail.appendChild(p);
}
function clearPaymentForm() {
  methodLabels.forEach(l => l.classList.remove("selected"));
  selectedMethod = null;
  phoneInput.value = "";
  receiptInput.value = "";
  bannerSuccess.classList.add("hidden");
  bannerFail.classList.add("hidden");
  processingMsg.classList.add("hidden");
  submitBtn.disabled = true;
}

confirmSuccessBtn.addEventListener("click", () => openCourse(currentCourseId));
retryBtn.addEventListener("click", clearPaymentForm);
