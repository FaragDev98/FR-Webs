document.addEventListener("DOMContentLoaded", () => {

let copyTime = 0;
let selectedMethod='';
let currentService='';
let currentPrice='';

// ================= VIDEO SMART =================
const videos = document.querySelectorAll('.service-video');

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    const video = entry.target;

    if(video.tagName !== "VIDEO") return;

    if(entry.isIntersecting){
      // تشغيل مرة واحدة فقط
      if(!video.dataset.played){
        video.currentTime = 0;
        video.muted = true;
        video.play().catch(()=>{});
        video.dataset.played = "true";
      }
    }else{
      video.pause();
    }
  });
},{threshold:0.6});

videos.forEach(v=>{
  if(v.tagName==="VIDEO"){
    observer.observe(v);

    // 🔥 تشغيل بالصوت عند الضغط
    v.addEventListener("click",()=>{
      v.muted = false;
      v.play().catch(()=>{});
    });
  }
});


// ================= PAYMENT =================
const modal=document.getElementById('paymentModal');
const status=document.getElementById('payStatus');
const serviceTitle=document.getElementById('serviceTitle');

const normalBox=document.getElementById('normalPayment');
const paypalBox=document.getElementById('paypalPayment');

const numbers={
 "فودافون كاش":"01066047545",
 "أورنج كاش":"01285895096",
 "وي كاش":"01558516081",
 "PayPal":"Farajbdallh"
};

// ================= فتح المودال =================
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


// ================= اختيار الدفع =================
document.querySelectorAll('.pay-item').forEach(item=>{
 item.addEventListener("click",()=>{

  document.querySelectorAll('.pay-item').forEach(i=>i.classList.remove('selected'));
  item.classList.add('selected');

  selectedMethod=item.dataset.method;

  // 🔥 تغيير الواجهة
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


// ================= نسخ الرقم =================
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

 // 🔥 لو PayPal
 if(selectedMethod === "PayPal"){
   status.innerHTML="⏳ جاري تحويلك للدفع...";
   
   setTimeout(()=>{
     window.open("https://www.paypal.com",'_blank');
   },1500);

   return;
 }

 const userNumber=document.getElementById('userNumber').value.trim();
 const file=document.getElementById('payProof').files[0];

 if(!selectedMethod || !userNumber || !file){
  status.style.color="red";
  status.innerHTML="❌ كمل البيانات كلها";
  return;
 }

 // 🔥 تحقق نوع الصورة (سكرين شوت)
 if(!file.type.includes("image")){
  status.innerHTML="❌ لازم صورة Screenshot";
  return;
 }

 // 🔥 تحقق الحجم (سكرين شوت غالبًا صغير)
 if(file.size > 2 * 1024 * 1024){
  status.innerHTML="❌ الصورة كبيرة مش Screenshot";
  return;
 }

 // 🔥 تحقق الوقت
 if(Date.now() - copyTime > 5*60*1000){
  status.innerHTML="❌ لازم تدفع خلال 5 دقايق";
  return;
 }

 status.style.color="orange";
 status.innerHTML="⏳ جاري التحقق...";

 setTimeout(()=>{

   status.style.color="green";
   status.innerHTML="✅ تم التأكد وفتح واتساب";

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
