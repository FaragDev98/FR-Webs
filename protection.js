// منع كليك يمين
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// منع اختصارات النسخ والطباعة وحفظ الصفحة
document.addEventListener("keydown", function (e) {
  if (
    (e.ctrlKey && e.key === "u") ||  // Ctrl + U
    (e.ctrlKey && e.key === "s") ||  // Ctrl + S
    (e.ctrlKey && e.key === "p") ||  // Ctrl + P
    (e.ctrlKey && e.key === "c") ||  // Ctrl + C
    (e.ctrlKey && e.key === "a")     // Ctrl + A
  ) {
    e.preventDefault();
  }
});

// منع سحب النصوص وتحديدها
document.addEventListener("selectstart", function (e) {
  const selectedText = window.getSelection().toString();
  const onlyNumbersAndLinks = /^[0-9\s:\/.-]*$/;

  if (!onlyNumbersAndLinks.test(selectedText)) {
    e.preventDefault();
    window.getSelection().removeAllRanges();
  }
});

// منع سكرين شوت باستخدام بعض الأدوات (ليس مضمونًا 100%)
window.addEventListener("keyup", function (e) {
  if (e.key === "PrintScreen") {
    navigator.clipboard.writeText("📛 ممنوع أخذ لقطة شاشة في هذا الموقع.");
    alert("🚫 لقطة الشاشة ممنوعة!");
  }
});
