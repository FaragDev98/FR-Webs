// ⚡ ملف JavaScript - تفاعل صفحة الكورس
// تعليق: هذا الملف يدير فتح المودال، اختيار طريقة الدفع، ارسال البيانات (محاكاة تحقق)، فتح المحتوى بعد النجاح.
// ملاحظة مهمة جداً: التحقق الحقيقي يجب أن يتم على السيرفر (server-side) عبر API أو webhook.

/* ===== عناصر الصفحة ===== */
const openButtons = document.querySelectorAll('.open-payment');
const paymentModal = document.getElementById('payment-modal');
const closeModalBtn = document.querySelector('.close-modal');
const methodsContainer = document.getElementById('methods');
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
let unlockTimer = null; // مؤقت 10 دقائق لرسالة الواتساب

/* ===== فتح المودال عند الضغط على زر "فتح الكورس" ===== */
openButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // نحدد أي كورس تم الضغط عليه
    const card = e.target.closest('.course-card');
    currentCourseId = card.dataset.course; // مثلاً "python"
    // فتح المودال
    paymentModal.classList.remove('hidden');
    paymentModal.style.display = 'flex';
    // إعادة تعيين الحقول
    clearPaymentForm();
  });
});

/* ===== إغلاق المودال ===== */
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
  if (e.target === paymentModal) closeModal();
});
function closeModal() {
  paymentModal.classList.add('hidden');
  paymentModal.style.display = 'none';
}

/* ===== اختيار طريقة الدفع - إظهار select بصري وتخزين الاختيار ===== */
methodLabels.forEach(label => {
  label.addEventListener('click', () => {
    methodLabels.forEach(l => l.classList.remove('selected'));
    label.classList.add('selected');
    selectedMethod = label.querySelector('input')?.value;
  });
});

/* ===== دالة إعادة تهيئة فورم الدفع ===== */
function clearPaymentForm() {
  // إلغاء الاختيار
  methodLabels.forEach(l => l.classList.remove('selected'));
  selectedMethod = null;
  phoneInput.value = '';
  receiptInput.value = '';
  // إخفاء لافتات ورسائل
  bannerSuccess?.classList.add('hidden');
  bannerFail?.classList.add('hidden');
  processingMsg?.classList.add('hidden');
  // وقف مؤقت فتح (لو شغال)
  if (unlockTimer) { clearTimeout(unlockTimer); unlockTimer = null; }
}

/* ===== عند الضغط على ارسال البيانات ===== */
submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  // تحقق بسيط على البيانات
  const phone = phoneInput.value.trim();
  const receipt = receiptInput.files[0];

  if (!selectedMethod || !phone) {
    // عرض لافتة فشل خفيفة
    showFailBanner("من فضلك اختر طريقة الدفع واكتب رقم الهاتف الذي دفعت منه.");
    return;
  }

  // إظهار رسالة المعالجة
  processingMsg.classList.remove('hidden');

  // تعطيل الزر مؤقتًا
  submitBtn.disabled = true;
  submitBtn.textContent = 'جارٍ التحقق...';

  // ===== هنا: يجب أن تبعت البيانات لسيرفرك لكي يتحقق فعليًا من الدفع =====
  // نحن سنقوم بـ "محاكاة" تحقق هنا لمدة 4 ثواني.
  // في تطبيق حقيقي: نفعل fetch('/api/verify-payment', {method:'POST', body: formData}) ثم ننتظر الرد.
  await fakeNetworkDelay(4000);

  // محاكاة نتيجة التحقق (لديمو). في التطبيق الحقيقي تعتمد على رد السيرفر.
  const verified = Math.random() > 0.15; // 85% نجاح محاكاة، 15% فشل محاكاة

  processingMsg.classList.add('hidden');
  submitBtn.disabled = false;
  submitBtn.textContent = '✔ إرسال البيانات';

  if (verified) {
    // عرض لافتة النجاح
    showSuccessBanner();

    // فتح محتوى الكورس الذي ضغط عليه
    if (currentCourseId) {
      const el = document.getElementById('courseContent-' + currentCourseId);
      if (el) {
        // إظهار المحتوى
        el.classList.remove('hidden');
        // إغلاق المودال بعد تأكيد المستخدم أو تلقائيًا بعد 2 ثانية
        // هنا نترك المستخدم يضغط "تأكيد"
      }
    }

    // بدء مؤقت 10 دقائق: لو خلال 10 دقائق لم يقم المشرف بتأكيد الفتح (في حالة التحقق اليدوي),
    // يظهر رابط واتساب للمستخدم للتواصل.
    unlockTimer = setTimeout(() => {
      // عرض رسالة داخل المودال لو مازال مفتوحًا، أو إرسال إشعار (هنا سنعرض تنبيه بسيط)
      alert("إذا لم يتم فتح الكورس خلال 10 دقائق تواصل عبر WhatsApp للدعم.");
      // يمكننا أيضاً فتح الرابط مباشرة:
      window.open('https://wa.me/201066047545?text=مرحبًا، لم يتم فتح الكورس بعد الدفع', '_blank');
    }, 10 * 60 * 1000); // 10 دقائق

  } else {
    // عرض لافتة فشل
    showFailBanner("التحقق فشل. ممكن أن تكون بيانات الدفع خاطئة أو لم يتم استلام المبلغ.");
  }
});

/* ===== أزرار لافتات النجاح/الفشل ===== */
if (confirmSuccessBtn) {
  confirmSuccessBtn.addEventListener('click', () => {
    // إغلاق المودال بعد تأكيد المستخدم
    closeModal();
    // يمكنك أيضاً تسجيل دخول لهذا الحدث (analytics) أو إرسال سجل للسيرفر
  });
}
if (retryBtn) {
  retryBtn.addEventListener('click', () => {
    clearPaymentForm();
  });
}

/* ===== دوال مساعدة للافات والـ UI ===== */
function showSuccessBanner() {
  if (bannerFail) bannerFail.classList.add('hidden');
  if (bannerSuccess) bannerSuccess.classList.remove('hidden');
}

function showFailBanner(msg) {
  if (bannerSuccess) bannerSuccess.classList.add('hidden');
  if (bannerFail) {
    bannerFail.classList.remove('hidden');
    bannerFail.querySelector('p').textContent = msg || bannerFail.querySelector('p').textContent;
  } else {
    alert(msg);
  }
}

/* دالة محاكاة انتظار الشبكة */
function fakeNetworkDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ===== حماية واجهة: منع نسخ النصوص و اختصارات (مجرّد حواشي، ليست حماية حقيقية) ===== */
document.addEventListener('contextmenu', e => e.preventDefault()); // منع زر الفأرة الأيمن
document.addEventListener('keydown', e => {
  // منع Ctrl/Cmd + C, Ctrl+S, Ctrl+P
  if ((e.ctrlKey || e.metaKey) && ['c','s','p','u'].includes(e.key.toLowerCase())) {
    e.preventDefault();
    alert('الإجراءات المحجوبة على هذه الصفحة للحماية.');
  }
  // منع PrintScreen (غير مضمون)
  if (e.key === 'PrintScreen') {
    alert('لقطة الشاشة قد تكون محظورة على الويب، استخدم ميزة التواصل بدلاً من ذلك.');
  }
});

/* ===== كشف تبديل التبويب: إذا غادر المستخدم الصفحة أثناء المعالجة، يتم إخفاء المحتوى لحماية بعض العناصر ===== */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // إخفاء الفيديوهات لحماية العرض (ليس حماية حقيقية من تصوير خارجي)
    document.querySelectorAll('video').forEach(v => v.pause());
  }
});

/* ===== ملاحظات أمان للمطور (باللغة العربية) =====
  1) هذا التحقق "محاكاة" فقط. للتأمين الحقيقي:
     - أنشئ خادماً (server) مع endpoint مثل POST /verify-payment.
     - بعد استلام بيانات العميل (طريقة الدفع، رقم المرسل، اسم الملف إيصال)،
       ارسل لهذه الـ endpoint أو لخدمة مزود الدفع (API) للتحقق من المعاملة فعلياً.
     - بعد التحقق على السيرفر، خزّن سجل الدفع في قاعدة بيانات (user_id, course_id, trans_id, status).
     - بعد تحقق السيرفر بنجاح: ارجع على العميل استجابة واسمح بفتح الكورس (أو عبر WebSocket أو عبر طلب تحقق دوري).
  2) لرفع الأمان: استخدم HTTPS دائماً، تحقق من الصلاحية (JWT/session)، واحفظ الفيديوهات خلف نظام مصادقة أو توكن مؤقت.
  3) منع السكرينشوت غير ممكن عبر الويب — فقط تطبيقات native على الموبايل يمكنها التحكم أكثر.
*/

/* ===== نهاية الملف ===== */
