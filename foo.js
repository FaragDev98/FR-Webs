// إعداد Firebase
const firebaseConfig = {
  apiKey: "API_KEY_HERE",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// --- تسجيل الدخول ---
const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        alert('تم تسجيل الدخول بنجاح ✅');
        window.location.href = 'AB/index.html';
      })
      .catch(error => alert(error.message));
  });

  // Google Sign-In
  document.querySelector('.google-login').addEventListener('click', ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(()=> window.location.href='AB/index.html')
      .catch(err=> alert(err.message));
  });
}

// --- إنشاء حساب جديد ---
const signupForm = document.getElementById('signupForm');
if(signupForm){
  signupForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const birthDate = document.getElementById('birthDate').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value.trim();

    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential=>{
        const user = userCredential.user;

        // إرسال رمز التفعيل عبر Twilio API
        // --- ضع هنا كود Twilio مع مفتاحك ---
        fetch('/send-otp', {
          method: 'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({phone: phone})
        })
        .then(()=> alert('تم إرسال رمز التفعيل للواتساب ✅'))
        .catch(err=> alert('خطأ في إرسال الرمز: '+err));

      })
      .catch(error=> alert(error.message));
  });

  document.getElementById('goLogin').addEventListener('click', ()=>{
    window.location.href='index.html';
  });
}
