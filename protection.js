// منع كليك يمين
window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// منع اختصارات النسخ والتفاصيل البرمجية
window.addEventListener("keydown", function (e) {
  if (
    (e.ctrlKey && ["c", "u", "s", "p", "a"].includes(e.key.toLowerCase())) ||
    (e.key === "F12") || // منع أدوات المطور
    (e.ctrlKey && e.shiftKey && ["i", "j"].includes(e.key.toLowerCase()))
  ) {
    e.preventDefault();
    alert("🚫 هذا الإجراء غير مسموح.");
  }
});

// منع تحديد النصوص مع السماح بالأرقام والروابط فقط
document.addEventListener("selectstart", function (e) {
  const selection = window.getSelection().toString();
  const isAllowed = /^[0-9:/.\s\-]+$/.test(selection); // فقط أرقام وروابط

  if (!isAllowed) {
    e.preventDefault();
    window.getSelection().removeAllRanges();
  }
});

// منع أخذ سكرين شوت بزر PrintScreen
window.addEventListener("keyup", function (e) {
  if (e.key === "PrintScreen") {
    navigator.clipboard.writeText("🚫 لا يمكنك تصوير هذه الصفحة");
    alert("📸 تم حظر لقطة الشاشة!");
  }
});
