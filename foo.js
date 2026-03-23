document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('loginForm');
  const createAccount = document.getElementById('createAccount');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if(username && password){
      alert('تم تسجيل الدخول بنجاح ✅');
      window.location.href = 'AB/index.html';
    } else {
      alert('من فضلك أدخل اسم المستخدم وكلمة المرور');
    }
  });

  // زر إنشاء حساب جديد (مثال)
  createAccount.addEventListener('click', () => {
    alert('سيتم تحويلك لصفحة إنشاء الحساب قريبًا.');
  });

  // تسجيل عبر جوجل وفيسبوك (رابط وهمي)
  document.querySelector('.google-login').addEventListener('click', () => {
    alert('تسجيل الدخول عبر جوجل غير مفعل الآن.');
  });

  document.querySelector('.facebook-login').addEventListener('click', () => {
    alert('تسجيل الدخول عبر فيسبوك غير مفعل الآن.');
  });
});
