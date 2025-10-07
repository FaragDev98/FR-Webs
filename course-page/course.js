// course.js
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

const API_BASE = "https://fabrica-backend-production.up.railway.app"; // غيّر هذا إذا رابطك مختلف

let selectedMethod = null;
let currentCourseId = null;
let currentPaymentId = null;
let pollInterval = null;
document.querySelectorAll('.open-course').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('#paymentModal').style.display = 'flex';
  });
});
// فتح المودال
openButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    currentCourseId = e.target.closest('.course-card').dataset.course;
    paymentModal.classList.remove('hidden');
    clearPaymentForm();
    // focus first field
    setTimeout(()=> phoneInput.focus(), 120);
  });
});

// إغلاق
closeModalBtn.addEventListener('click', () => paymentModal.classList.add('hidden'));

// اختيار وسيلة الدفع
methodLabels.forEach(label => {
  label.addEventListener('click', () => {
    methodLabels.forEach(l => l.classList.remove('selected'));
    label.classList.add('selected');
    selectedMethod = label.querySelector('input')?.value;
    checkFormValidity();
  });
});

function checkFormValidity() {
  const phoneOk = /^\d{10,11}$/.test(phoneInput.value.trim());
  const receiptOk = receiptInput.files.length > 0;
  submitBtn.disabled = !(selectedMethod && phoneOk && receiptOk);
}

phoneInput.addEventListener('input', checkFormValidity);
receiptInput.addEventListener('change', checkFormValidity);

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

async function showTempMessage(type, text){
  if(type==='success') showSuccess(text);
  else showFail(text);
}

// إرسال الطلب
submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  bannerSuccess.classList.add('hidden');
  bannerFail.classList.add('hidden');

  if(!selectedMethod){ showFail("اختر وسيلة الدفع"); return; }
  if(!/^\d{10,11}$/.test(phoneInput.value.trim())){ showFail("ادخل رقم هاتف صحيح"); return; }
  if(receiptInput.files.length===0){ showFail("ارفق إيصال الدفع"); return; }

  processingMsg.classList.remove('hidden');
  submitBtn.disabled = true;

  try {
    const receiptBase64 = await readFileAsBase64(receiptInput.files[0]);
    const payload = {
      name: "عميل جديد",
      email: "client@example.com",
      course: currentCourseId,
      phone: phoneInput.value.trim(),
      method: selectedMethod,
      receipt: receiptBase64
    };

    const res = await fetch(`${API_BASE}/course`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    processingMsg.classList.add('hidden');

    if(!res.ok){
      showFail(data.message || "فشل في إرسال الطلب");
      submitBtn.disabled = false;
      return;
    }

    currentPaymentId = data.id;
    showPending("✅ تم إرسال الطلب. جاري التحقق من الإدارة...");
    startPollingStatus(currentPaymentId);
  } catch (err) {
    console.error(err);
    showFail("خطأ أثناء رفع الإيصال أو الاتصال بالسيرفر.");
    processingMsg.classList.add('hidden');
    submitBtn.disabled = false;
  }
});

// poll حالة الدفع
async function startPollingStatus(paymentId){
  if(pollInterval) clearInterval(pollInterval);

  const check = async () => {
    try {
      const res = await fetch(`${API_BASE}/payment/${paymentId}`);
      if(!res.ok) return;
      const json = await res.json();
      if(json.payment && json.payment.status === "confirmed" && json.payment.token){
        localStorage.setItem(`fabrica_token_${json.payment.course}`, json.payment.token);
        showSuccess("✅ تم تأكيد الدفع. سيفتح الكورس بعد 5 ثوانٍ.");
        clearInterval(pollInterval);
        setTimeout(() => {
          openCourse(json.payment.course);
          paymentModal.classList.add('hidden');
        }, 5000);
      }
    } catch (e) {
      console.error("poll error", e);
    }
  };

  await check();
  pollInterval = setInterval(check, 5000);
}

// تحقق عند التحميل من التوكنات
window.addEventListener('load', () => {
  document.querySelectorAll('.course-card').forEach(async card => {
    const courseId = card.dataset.course;
    const token = localStorage.getItem(`fabrica_token_${courseId}`);
    if(token){
      try {
        const res = await fetch(`${API_BASE}/verify-token`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if(res.ok) openCourse(courseId);
        else localStorage.removeItem(`fabrica_token_${courseId}`);
      } catch (e) {
        console.error(e);
      }
    }
  });
});

function openCourse(courseId){
  document.getElementById(`courseContent-${courseId}`).classList.remove('hidden');
}

function showSuccess(msg="تم"){
  bannerFail.classList.add('hidden');
  bannerSuccess.classList.remove('hidden');
  bannerSuccess.querySelector('p').textContent = msg;
}
function showPending(msg){
  bannerFail.classList.add('hidden');
  bannerSuccess.classList.remove('hidden');
  bannerSuccess.querySelector('p').textContent = msg;
}
function showFail(msg){
  bannerSuccess.classList.add('hidden');
  bannerFail.classList.remove('hidden');
  bannerFail.querySelector('p').textContent = msg;
}
function clearPaymentForm(){
  methodLabels.forEach(l=>l.classList.remove('selected'));
  selectedMethod = null;
  phoneInput.value = "";
  receiptInput.value = "";
  bannerSuccess.classList.add('hidden');
  bannerFail.classList.add('hidden');
  processingMsg.classList.add('hidden');
  submitBtn.disabled = true;
}

confirmSuccessBtn?.addEventListener('click', () => {
  openCourse(currentCourseId);
  paymentModal.classList.add('hidden');
});
retryBtn?.addEventListener('click', clearPaymentForm);
