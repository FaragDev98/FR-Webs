document.addEventListener("DOMContentLoaded", ()=>{

  // بيانات وهمية (بدل Firebase مؤقتًا)
  const user = {
    name: "فراج عبدالله",
    email: "frwebs@gmail.com"
  };

  document.getElementById("username").textContent = user.name;
  document.getElementById("email").textContent = user.email;

  // تسجيل خروج
  document.getElementById("logoutBtn").addEventListener("click", ()=>{
    alert("تم تسجيل الخروج");
    window.location.href = "../index.html";
  });

  // رفع صورة
  const uploadBtn = document.getElementById("uploadBtn");
  const fileInput = document.getElementById("fileUpload");
  const gallery = document.getElementById("gallery");

  uploadBtn.addEventListener("click", ()=>{
    const file = fileInput.files[0];
    if(!file) return alert("اختار صورة");

    const reader = new FileReader();
    reader.onload = function(e){
      const img = document.createElement("img");
      img.src = e.target.result;
      gallery.appendChild(img);
    }
    reader.readAsDataURL(file);
  });

});
