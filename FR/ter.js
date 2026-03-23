document.addEventListener("DOMContentLoaded", () => {

// ================= متغيرات عامة =================

// لتخزين بيانات الدفع
let selectedMethod = null; // طريقة الدفع المختارة
let currentService = ""; // اسم الخدمة
let currentPrice = ""; // السعر

// للتحكم في النسخ والوقت
let copyTime = 0; // وقت نسخ الرقم
let timerInterval = null; // التايمر
let timeLeft = 0; // الوقت المتبقي


// ================= الفيديو الذكي =================

// جلب كل الفيديوهات
const videos = document.querySelectorAll('.service-video');

// إنشاء مراقب عند ظهور الفيديو في الشاشة
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    const video = entry.target;

    // نتأكد إنه فيديو
    if(video.tagName !== "VIDEO") return;

    if(entry.isIntersecting){
      // تشغيل الفيديو عند الظهور
      video.currentTime = 0;
      video.muted = false;
      video.play().catch(()=>{});
    }else{
      // إيقاف الفيديو عند الخروج
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


// ================= عناصر الدفع =================

const modal=document.getElementById('paymentModal'); // نافذة الدفع
const status=document.getElementById('payStatus'); // رسالة الحالة
const serviceTitle=document.getElementById('serviceTitle'); // عنوان الخدمة

const normalBox=document.getElementById('normalPayment'); // الدفع العادي
const paypalBox=document.getElementById('paypalPayment'); // PayPal

// أرقام الدفع
const numbers={
 "فودافون كاش":"01066047545",
 "أورنج كاش":"01285895096",
 "وي كاش":"01558516081",
 "PayPal":"Farajbdallh"
};


// ================= فتح نافذة الدفع =================

document.querySelectorAll('.buy-btn').forEach(btn=>{
 btn.addEventListener("click",()=>{
  
  // حفظ الخدمة والسعر
  currentService=btn.dataset.service;
  currentPrice=btn.dataset.price;

  // عرضهم للمستخدم
  serviceTitle.innerHTML =
  `${currentService} <br> السعر: ${currentPrice} جنيه`;

  // فتح النافذة
  modal.classList.add('active');

  // تصفير الحالة
  status.innerHTML='';
  copyTime=0;

 });
});


// ================= قفل النافذة =================

window.closePayment = function(){
  modal.classList.remove('active');
};


// ================= اختيار طريقة الدفع =================

document.querySelectorAll('.pay-item').forEach(item=>{
 item.addEventListener("click",()=>{

  // إزالة التحديد من كل العناصر
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

  // رسالة توضيح
  status.style.color="blue";
  status.innerHTML="📌 اضغط (نسخ الرقم) ثم ابعت الفلوس وارفع Screenshot خلال 5 دقايق";

 });
});


// ================= نسخ رقم الدفع =================

const copyBtn = document.getElementById('copyBtn');

if(copyBtn){
 copyBtn.addEventListener("click",()=>{
  
  const val=document.getElementById('payNumber').value;

  // لو لم يتم اختيار طريقة دفع
  if(!val){
    alert("اختار طريقة الدفع الأول");
    return;
  }

  // نسخ الرقم
  navigator.clipboard.writeText(val);

  // بدء الوقت
  copyTime = Date.now();
  timeLeft = 300; // 5 دقائق

  status.style.color="blue";
  status.innerHTML="✅ تم نسخ الرقم<br>⏳ معاك 5 دقايق تبعت الفلوس وترفع Screenshot";

  // تشغيل التايمر
  clearInterval(timerInterval);

  timerInterval = setInterval(()=>{
    
    timeLeft--;

    if(timeLeft > 0){
      status.innerHTML=`⏳ باقي ${timeLeft} ثانية لإتمام الدفع`;
    }else{
      // انتهاء الوقت
      clearInterval(timerInterval);

      status.style.color="red";
      status.innerHTML="❌ الوقت خلص! لازم تضغط (نسخ الرقم) تاني";

      copyTime = 0; // إلغاء النسخ القديم
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


// ================= التحقق =================

 // لازم يضغط نسخ الأول
 if(!copyTime){
  status.style.color="red";
  status.innerHTML="❌ لازم تضغط (نسخ الرقم) الأول";
  return;
 }

 // التحقق من الوقت
 if(Date.now() - copyTime > 5*60*1000){
  status.style.color="red";
  status.innerHTML="❌ الوقت انتهى! انسخ الرقم تاني";
  return;
 }

 // تحقق البيانات
 if(!selectedMethod || !userNumber || !file){
  status.style.color="red";
  status.innerHTML="❌ لازم:<br>1- تختار طريقة دفع<br>2- تكتب رقمك<br>3- ترفع Screenshot";
  return;
 }

 // التأكد من الرقم
 if(!Object.values(numbers).includes(payNumber)){
  status.style.color="red";
  status.innerHTML="❌ الرقم غير صحيح";
  return;
 }

 // التأكد إنه صورة
 if(!file.type.includes("image")){
  status.style.color="red";
  status.innerHTML="❌ لازم ترفع صورة Screenshot";
  return;
 }

 // التأكد من الحجم
 if(file.size > 2 * 1024 * 1024){
  status.style.color="red";
  status.innerHTML="❌ الصورة كبيرة أو غير مناسبة";
  return;
 }


// ================= نجاح =================

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

});
