document.addEventListener("DOMContentLoaded", ()=>{
  // Firebase
  const firebaseConfig = {
    apiKey: "API_KEY_HERE",
    authDomain: "PROJECT_ID.firebaseapp.com",
    projectId: "PROJECT_ID",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
  };
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const toggleForm = document.getElementById('toggleForm');
  const cardTitle = document.getElementById('card-title');

  // Toggle بين تسجيل الدخول وإنشاء الحساب
  toggleForm.addEventListener('click', ()=>{
    loginForm.classList.toggle('hidden');
    signupForm.classList.toggle('hidden');
    if(cardTitle.textContent.includes('تسجيل الدخول')){
      cardTitle.textContent = 'إنشاء حساب جديد';
      toggleForm.textContent = 'لديك حساب؟ تسجيل الدخول';
    } else {
      cardTitle.textContent = 'تسجيل الدخول';
      toggleForm.textContent = 'ليس لديك حساب؟ إنشاء حساب جديد';
    }
  });

  // تسجيل الدخول
  loginForm.addEventListener('submit', e=>{
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    auth.signInWithEmailAndPassword(email,password)
      .then(()=> alert('تم تسجيل الدخول ✅'))
      .catch(err=> alert(err.message));
  });

  // إنشاء حساب
  signupForm.addEventListener('submit', e=>{
    e.preventDefault();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    // Firebase create user
    auth.createUserWithEmailAndPassword(email,password)
      .then(userCredential=>{
        const user = userCredential.user;
        alert('تم إنشاء الحساب ✅\nسيتم إرسال رمز التفعيل للواتساب قريباً');
        // هنا تضيف Twilio API لإرسال OTP
      })
      .catch(err=> alert(err.message));
  });

  // تسجيل عبر جوجل
  document.querySelector('.google-login').addEventListener('click', ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(()=> alert('تم تسجيل الدخول عبر جوجل ✅'))
      .catch(err=> alert(err.message));
  });

  // تسجيل عبر فيسبوك
  document.querySelector('.facebook-login').addEventListener('click', ()=>{
    alert('تسجيل الدخول عبر فيسبوك غير مفعل الآن.');
  });
});
