// ⚡ ملف JavaScript - تفاعل صفحة الكورس

// فتح نافذة الدفع
document.querySelectorAll(".open-payment").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("payment-modal").style.display = "flex";
  });
});

// إغلاق النافذة
document.querySelector(".close-modal").addEventListener("click", () => {
  document.getElementById("payment-modal").style.display = "none";
});

// معالجة إرسال بيانات الدفع
document.getElementById("submit-payment").addEventListener("click", function () {
  const phone = document.getElementById("phone-number").value;
  const transaction = document.getElementById("transaction-id").value;
  const receipt = document.getElementById("receipt").files[0];

  if (!phone || !transaction) {
    alert("⚠️ من فضلك اكتب رقم الهاتف ورقم العملية قبل المتابعة.");
    return;
  }

  let message = `✅ تم استلام بيانات الدفع:\n📱 الهاتف: ${phone}\n🔢 العملية: ${transaction}`;
  
  if (receipt) {
    message += `\n📎 تم رفع الإيصال: ${receipt.name}`;
  }

  alert(message);
});
