document.addEventListener("DOMContentLoaded",()=>{

  /* ========== القائمة المحلية ========== */
  const menuToggle = document.getElementById("menuToggle");
  const localMobileNav = document.getElementById("localMobileNav");
  const sidebar = document.getElementById("sidebarMenu");
  const closeSidebar = document.getElementById("closeSidebar");
  const themeToggle = document.getElementById("themeToggle");

  menuToggle?.addEventListener("click",()=>{
    localMobileNav.classList.toggle("mobile-hidden");
    sidebar.classList.remove("open");
  });

  menuToggle?.addEventListener("dblclick",()=>{
    sidebar.classList.toggle("open");
    localMobileNav.classList.add("mobile-hidden");
  });

  closeSidebar?.addEventListener("click",()=> sidebar.classList.remove("open"));

  /* ========== الثيم ========== */
  const savedTheme = localStorage.getItem("fr_theme");
  if(savedTheme==="dark") document.body.classList.add("dark");

  themeToggle.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    localStorage.setItem("fr_theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

});
