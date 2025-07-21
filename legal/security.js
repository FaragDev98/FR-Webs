// منع كليك يمين
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// منع السحب
document.addEventListener("dragstart", function (e) {
  e.preventDefault();
});

// منع اختصارات النسخ والطباعة وعرض المصدر
document.addEventListener("keydown", function (e) {
  // مفاتيح Ctrl + (U, S, C, P)
  if (e.ctrlKey && ['u', 's', 'c', 'p'].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }

  // منع F12
  if (e.key === "F12") {
    e.preventDefault();
  }

  // منع Ctrl + Shift + I / J
  if (e.ctrlKey && e.shiftKey && ['i', 'j'].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }
});

// منع النقر بالزر الأوسط (عجلة الماوس)
document.addEventListener("mousedown", function (e) {
  if (e.button === 1) {
    e.preventDefault();
  }
});

// منع أدوات الفحص عبر الاختصار (Shift + right click)
document.addEventListener("mousedown", function (e) {
  if (e.button === 2 && e.shiftKey) {
    e.preventDefault();
  }
});
