document.addEventListener("DOMContentLoaded", () => {

  // بيانات المستخدم
  const user = {
    name: "فراج عبدالله",
    email: "frwebs@gmail.com"
  };

  document.getElementById("username").textContent = user.name;
  document.getElementById("email").textContent = user.email;

  // تحميل البوستات
  let posts = JSON.parse(localStorage.getItem("fr_posts")) || [];
  const container = document.getElementById("postsContainer");

  function renderPosts() {
    container.innerHTML = "";
    posts.forEach((post, index) => {
      const div = document.createElement("div");
      div.className = "post";

      div.innerHTML = `
        <h4>${user.name}</h4>
        <p>${post.text}</p>
        ${post.image ? `<img src="${post.image}">` : ""}

        <div class="comments">
          ${(post.comments || []).map(c => `<p>💬 ${c}</p>`).join("")}
        </div>

        <div class="comment-box">
          <input placeholder="اكتب تعليق..." id="c${index}">
          <button onclick="addComment(${index})">تعليق</button>
        </div>
      `;

      container.appendChild(div);
    });
  }

  renderPosts();

  // نشر بوست
  document.getElementById("publishBtn").addEventListener("click", () => {
    const text = document.getElementById("postText").value;
    const file = document.getElementById("postImage").files[0];

    if (!text && !file) return alert("اكتب حاجة أو صورة");

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        savePost(text, e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      savePost(text, null);
    }
  });

  function savePost(text, image) {
    posts.unshift({ text, image, comments: [] });
    localStorage.setItem("fr_posts", JSON.stringify(posts));
    document.getElementById("postText").value = "";
    renderPosts();
  }

  // تعليق
  window.addComment = function(index) {
    const input = document.getElementById("c" + index);
    const comment = input.value;
    if (!comment) return;

    posts[index].comments.push(comment);
    localStorage.setItem("fr_posts", JSON.stringify(posts));
    renderPosts();
  };

  // تسجيل خروج
  document.getElementById("logoutBtn").addEventListener("click", () => {
    alert("تم تسجيل الخروج");
    window.location.href = "../index.html";
  });

});
