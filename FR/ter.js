document.addEventListener("DOMContentLoaded", () => {

let copyTime = 0; // وقت نسخ رقم الدفع
let selectedMethod=''; // طريقة الدفع المختارة
let currentService=''; // اسم الخدمة
let currentPrice=''; // سعر الخدمة


// ================= الفيديو الذكي =================
const videos = document.querySelectorAll('.service-video');

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    const video = entry.target;

    // نتأكد إنه فيديو مش صورة
    if(video.tagName !== "VIDEO") return;

    if(entry.isIntersecting){
      // تشغيل الفيديو لما يدخل الشاشة
      video.currentTime = 0;
      video.muted = false; // 🔥 تشغيل بالصوت
      video.play().catch(()=>{});
    }else{
      // إيقاف لما يخرج
      video.pause();
    }
  });
},{threshold:0.6});

// ربط كل فيديو بالمراقب
videos.forEach(v=>{
  if(v.tagName==="VIDEO"){
    observer.observe(v);
  }
});


// ================= الدفع ================//

// متغيرات التحكم
let selectedMethod = null; // طريقة الدفع المختارة
let currentService = ""; // اسم الخدمة
let currentPrice = ""; // السعر

let copyTime = 0; // وقت النسخ
let timerInterval = null; // التايمر
let timeLeft = 0; // الوقت المتبقي


// ================= فتح نافذة الدفع =================
document.querySelectorAll('.buy-btn').forEach(btn=>{
 btn.addEventListener("click",()=>{
  
  // حفظ الخدمة والسعر
  currentService=btn.dataset.service;
  currentPrice=btn.dataset.price;

  // عرض البيانات
  serviceTitle.innerHTML =
  `${currentService} <br> السعر: ${currentPrice} جنيه`;

  // فتح النافذة
  modal.classList.add('active');

  // تصفير الحالة
  status.innerHTML='';
  copyTime=0;

 });
});


// ================= قفل نافذة الدفع =================
window.closePayment = function(){
  modal.classList.remove('active');
};


// ================= اختيار طريقة الدفع =================
document.querySelectorAll('.pay-item').forEach(item=>{
 item.addEventListener("click",()=>{

  // إزالة التحديد من الكل
  document.querySelectorAll('.pay-item').forEach(i=>i.classList.remove('selected'));
  
  // تحديد العنصر الحالي
  item.classList.add('selected');

  selectedMethod=item.dataset.method;

  // لو PayPal
  if(selectedMethod === "PayPal"){
    normalBox.style.display="none";
    paypalBox.style.display="block";
  }else{
    normalBox.style.display="block";
    paypalBox.style.display="none";

    // وضع رقم الدفع تلقائي
    document.getElementById('payNumber').value = numbers[selectedMethod];
  }

  // رسالة إرشادية
  status.style.color="blue";
  status.innerHTML="📌 اضغط على (نسخ الرقم) ثم ابعت الفلوس وارفع Screenshot";

 });
});


// ================= نسخ رقم الدفع =================
const copyBtn = document.getElementById('copyBtn');

if(copyBtn){
 copyBtn.addEventListener("click",()=>{
  
  const val=document.getElementById('payNumber').value;

  // لو مفيش رقم
  if(!val){
    alert("اختار طريقة الدفع الأول");
    return;
  }

  // نسخ الرقم
  navigator.clipboard.writeText(val);

  // بدء الوقت
  copyTime = Date.now();
  timeLeft = 300; // 5 دقايق

  status.style.color="blue";
  status.innerHTML="✅ تم نسخ الرقم<br>⏳ معاك 5 دقايق تبعت الفلوس وترفع Screenshot";

  // تشغيل التايمر
  clearInterval(timerInterval);
  timerInterval = setInterval(()=>{
    
    timeLeft--;

    if(timeLeft > 0){
      status.innerHTML=`⏳ باقي ${timeLeft} ثانية لإتمام الدفع`;
    }else{
      clearInterval(timerInterval);

      status.style.color="red";
      status.innerHTML="❌ الوقت خلص! لازم تضغط (نسخ الرقم) تاني";

      copyTime = 0; // إلغاء النسخة
    }

  },1000);

 });
}


// ================= تأكيد الدفع =================
document.getElementById('confirmBtn').addEventListener("click",()=>{

 // ===== لو PayPal =====
 if(selectedMethod === "PayPal"){
   status.innerHTML="⏳ جاري تحويلك...";
   
   setTimeout(()=>{
     window.open("https://www.paypal.com",'_blank');
   },1500);

   return;
 }

 const payNumber=document.getElementById('payNumber').value.trim();
 const userNumber=document.getElementById('userNumber').value.trim();
 const file=document.getElementById('payProof').files[0];


// ================= تحقق البيانات =================

 // لازم يضغط نسخ الأول
 if(!copyTime){
  status.style.color="red";
  status.innerHTML="❌ لازم تضغط على (نسخ الرقم) الأول";
  return;
 }

 // تحقق الوقت (5 دقايق)
 if(Date.now() - copyTime > 5*60*1000){
  status.style.color="red";
  status.innerHTML="❌ الوقت انتهى! انسخ الرقم تاني";
  return;
 }

 // تحقق البيانات الأساسية
 if(!selectedMethod || !userNumber || !file){
  status.style.color="red";
  status.innerHTML="❌ لازم:<br>1- تختار طريقة دفع<br>2- تكتب رقمك<br>3- ترفع Screenshot";
  return;
 }

 // التأكد إن الرقم صحيح (من أرقامك فقط)
 if(!Object.values(numbers).includes(payNumber)){
  status.style.color="red";
  status.innerHTML="❌ الرقم غير صحيح";
  return;
 }

 // التأكد إن الملف صورة
 if(!file.type.includes("image")){
  status.style.color="red";
  status.innerHTML="❌ لازم ترفع Screenshot صورة";
  return;
 }

 // التأكد من الحجم (أقل من 2MB)
 if(file.size > 2 * 1024 * 1024){
  status.style.color="red";
  status.innerHTML="❌ الصورة كبيرة أو غير مناسبة";
  return;
 }


// ================= جاري التحقق =================

 status.style.color="orange";
 status.innerHTML="⏳ جاري التحقق...";

 setTimeout(()=>{

   status.style.color="green";
   status.innerHTML="✅ تم بنجاح";

   // رسالة واتساب
   const msg = `طلب جديد
الخدمة: ${currentService}
السعر: ${currentPrice}
طريقة الدفع: ${selectedMethod}`;

   window.open(
     `https://wa.me/201066047545?text=${encodeURIComponent(msg)}`,
     '_blank'
   );

 },2000);

});
