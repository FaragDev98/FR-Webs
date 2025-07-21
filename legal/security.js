// منع كليك يمين على الصفحة
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// منع اختصارات النسخ والطباعة (Ctrl + C, Ctrl + S, Ctrl + U, Ctrl + P)
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey) {
    const forbiddenKeys = ['c', 's', 'u', 'p'];
    if (forbiddenKeys.includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
  }
});
