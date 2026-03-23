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


// ================= الدفع =================
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
  currentService=btn.dataset.service;
  currentPrice=btn.dataset.price;

  serviceTitle.innerHTML =
  `${currentService} <br> السعر: ${currentPrice} جنيه`;

  modal.classList.add('active');
  status.innerHTML='';
 });
});


// ================= قفل نافذة الدفع =================
window.closePayment = function(){
  modal.classList.remove('active');
};


// ================= اختيار طريقة الدفع =================
document.querySelectorAll('.pay-item').forEach(item=>{
 item.addEventListener("click",()=>{

  document.querySelectorAll('.pay-item').forEach(i=>i.classList.remove('selected'));
  item.classList.add('selected');

  selectedMethod=item.dataset.method;

  // لو PayPal
  if(selectedMethod === "PayPal"){
    normalBox.style.display="none";
    paypalBox.style.display="block";
  }else{
    normalBox.style.display="block";
    paypalBox.style.display="none";

    document.getElementById('payNumber').value = numbers[selectedMethod];
  }

 });
});


// ================= نسخ رقم الدفع =================
const copyBtn = document.getElementById('copyBtn');

if(copyBtn){
 copyBtn.addEventListener("click",()=>{
  const val=document.getElementById('payNumber').value;

  if(!val){
    alert("اختار طريقة الدفع الأول");
    return;
  }

  navigator.clipboard.writeText(val);
  copyTime=Date.now();

  copyBtn.innerText="✅ تم النسخ";
  setTimeout(()=>{
    copyBtn.innerText="📋 نسخ الرقم";
  },2000);
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

 // تحقق البيانات
 if(!selectedMethod || !userNumber || !file){
  status.style.color="red";
  status.innerHTML="❌ كمل البيانات";
  return;
 }

 // 🔥 منع إدخال رقم غير أرقامك
if(!Object.values(numbers).includes(payNumber)){
  status.innerHTML="❌ الرقم غير صحيح";
  return;
}

 // تحقق الصورة
 if(!file.type.includes("image")){
  status.innerHTML="❌ لازم Screenshot";
  return;
 }

 // تحقق الحجم
 if(file.size > 2 * 1024 * 1024){
  status.innerHTML="❌ الصورة مش Screenshot";
  return;
 }


 // جاري التحقق
 status.style.color="orange";
 status.innerHTML="⏳ جاري التحقق...";

 setTimeout(()=>{

   status.style.color="green";
   status.innerHTML="✅ تم بنجاح";

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
