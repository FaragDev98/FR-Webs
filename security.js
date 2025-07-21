// 🔐 حماية الموقع من النسخ والفحص

// منع كليك يمين
document.addEventListener("contextmenu", (e) => e.preventDefault());

// منع اختصارات النسخ والطباعة وعرض الكود
document.addEventListener("keydown", (e) => {
  // Ctrl + (C, S, U, P)
  if (e.ctrlKey && ["c", "s", "u", "p"].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }

  // F12 (أدوات المطور)
  if (e.key === "F12") {
    e.preventDefault();
  }

  // Ctrl + Shift + I / J / C
  if (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }
});

// منع سحب الصور والنصوص
document.addEventListener("dragstart", (e) => e.preventDefault());

// منع النقر بعجلة الماوس (middle click)
document.addEventListener("mousedown", (e) => {
  if (e.button === 1) e.preventDefault();
});
