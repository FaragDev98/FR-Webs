function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("تم النسخ: " + text);
  });
}
