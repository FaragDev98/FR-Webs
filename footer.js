document.addEventListener("DOMContentLoaded", function () {

  /* ======================= 1) FOOTER ثابت ======================= */
  const footer = document.createElement("footer");
  footer.className = "global-footer";
  footer.innerHTML = `
    <p>جميع الحقوق محفوظة © 2025 FR Webs</p>
  `;
  document.body.appendChild(footer);


  /* ======================= 2) MENU (Sidebar) ======================= */
  const sidebar = document.createElement("div");
  sidebar.id = "sidebarMenu";
  sidebar.className = "sidebar";
  sidebar.innerHTML = `
    <div class="sidebar-header">
      <h3>الإعدادات</h3>
      <button id="closeSidebar">✖</button>
    </div>

    <div class="sidebar-content">
      <a href="#"><i class="fa-solid fa-gear"></i> الإعدادات العامة</a>
      <a href="#"><i class="fa-solid fa-circle-half-stroke"></i> المظهر</a>
      <a href="#"><i class="fa-solid fa-font"></i> حجم الخط</a>
      <a href="#"><i class="fa-solid fa-globe"></i> اللغة</a>
      <a href="#"><i class="fa-solid fa-user"></i> حسابك</a>
      <a href="#"><i class="fa-solid fa-info-circle"></i> معلومات</a>
    </div>
  `;
  document.body.appendChild(sidebar);

  const menuBtn = document.getElementById("menuToggle");
  const closeSidebar = document.getElementById("closeSidebar");

  menuBtn?.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
  closeSidebar?.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });


  /* ======================= 3) MOBILE NAV ======================= */
  const mobileNav = document.getElementById("mobileNav");
  menuBtn?.addEventListener("dblclick", () => {
    mobileNav?.classList.toggle("mobile-hidden");
  });


  /* ======================= 4) THEME Toggle ======================= */
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("fr_theme");

  if (currentTheme === "dark") document.body.classList.add("dark");

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "fr_theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });


  /* ======================= 5) Scroll Animation ======================= */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("in-view");
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".card, .feature, .post").forEach(el => observer.observe(el));

});
