
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
