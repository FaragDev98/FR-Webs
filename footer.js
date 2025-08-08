document.addEventListener("DOMContentLoaded", function () {
  const footer = document.createElement("footer");
  footer.style.textAlign = "center";
  footer.style.padding = "15px 0";
  footer.style.background = "#7b1fa2";
  footer.style.color = "white";
  footer.style.fontSize = "0.95rem";
  footer.innerHTML = `
    جميع الحقوق محفوظة © 2025 FaragDev98<br>
    <a href="terms.html" style="color: #fff; text-decoration: underline;">الشروط والأحكام</a> |
    <a href="privacy-policy.html" style="color: #fff; text-decoration: underline;">سياسة الخصوصية</a> |
    <a href="protection.html" style="color: #fff; text-decoration: underline;">صفحة الحماية</a>
  `;
  document.body.appendChild(footer);
});
function playSoundsLoop() {
    const bell = document.getElementById('train-bell');
    const train = document.getElementById('train-passing');

    if (!bell || !train) {
        console.error("❌ لم يتم العثور على عناصر الصوت.");
        return;
    }

    bell.currentTime = 0;
    bell.play().then(() => {
        bell.onended = () => {
            train.currentTime = 0;
            train.play();
        };
        train.onended = () => {
            // بعد انتهاء القطر، إعادة التشغيل
            setTimeout(playSoundsLoop, 1000);
        };
    }).catch(err => {
        console.warn("⚠️ يجب الضغط على الصفحة للسماح بتشغيل الصوت.");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    playSoundsLoop(); // محاولة التشغيل التلقائي
    // إذا كان التشغيل التلقائي ممنوع، شغله بعد أول تفاعل
    document.addEventListener('click', playSoundsLoop, { once: true });
    document.addEventListener('touchstart', playSoundsLoop, { once: true });
});
