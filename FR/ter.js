document.addEventListener("DOMContentLoaded", () => {

let copyTime = 0;

// ================= VIDEO =================
const videos = document.querySelectorAll('.service-video');

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    const video = entry.target;

    if(video.tagName !== "VIDEO") return;

    if(entry.isIntersecting && !video.dataset.played){
      video.currentTime = 0;
      video.muted = true;
      video.play();
      video.dataset.played = "true";
    }

    if(!entry.isIntersecting){
      video.pause();
    }
  });
},{threshold:0.6});

videos.forEach(v=>{
  if(v.tagName==="VIDEO"){
    observer.observe(v);

    v.addEventListener("click",()=>{
      v.muted = false;
      v.play();
    });
  }
});


// ================= PAYMENT =================
let selectedMethod='';
let currentService='';
let currentPrice='';

const modal=document.getElementById('paymentModal');
const status=document.getElementById('payStatus');

const numbers={
 "فودافون كاش":"01066047545",
 "أورنج كاش":"01285895096",
 "وي كاش":"01558516081",
 "PayPal":"Farajbdallh"
};

// فتح
document.querySelectorAll('.buy-btn').forEach(btn=>{
 btn.onclick=()=>{
  currentService=btn.dataset.service;
  currentPrice=btn.dataset.price;
  document.getElementById('serviceTitle').innerHTML=
  `${currentService} - ${currentPrice} جنيه`;
  modal.classList.add('active');
 };
});

// اختيار
document.querySelectorAll('.pay-item').forEach(item=>{
 item.onclick=()=>{
  document.querySelectorAll('.pay-item').forEach(i=>i.classList.remove('selected'));
  item.classList.add('selected');
  selectedMethod=item.dataset.method;
  document.getElementById('payNumber').value=numbers[selectedMethod];
 };
});

// نسخ
document.getElementById('copyBtn').onclick=()=>{
 const val=document.getElementById('payNumber').value;
 navigator.clipboard.writeText(val);
 copyTime=Date.now();
 alert("تم النسخ ✅");
};

// تأكيد
document.getElementById('confirmBtn').onclick=()=>{

 const userNumber=document.getElementById('userNumber').value.trim();
 const file=document.getElementById('payProof').files[0];

 if(!selectedMethod || !userNumber || !file){
  status.innerHTML="❌ كمل البيانات";
  return;
 }

 // تحقق screenshot
 if(file.size > 2 * 1024 * 1024){
  status.innerHTML="❌ الصورة لازم Screenshot";
  return;
 }

 // تحقق الوقت
 if(Date.now() - copyTime > 5*60*1000){
  status.innerHTML="❌ فات 5 دقايق";
  return;
 }

 status.innerHTML="⏳ جاري التحقق...";

 setTimeout(()=>{
   window.open(`https://wa.me/201066047545?text=تم الدفع ${currentService}`,'_blank');
 },2500);

};

});
