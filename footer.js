 <!-- Small script: menu + theme -->
  <script>
    // mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    menuToggle?.addEventListener('click', () => {
      mobileNav?.classList.toggle('mobile-hidden');
    });

    // theme toggle (persists in localStorage)
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('fr_theme');
    if (currentTheme === 'dark') document.body.classList.add('dark');

    themeToggle?.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('fr_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
      themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });

    // small animation on scroll (simple)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view');
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.card, .feature, .post').forEach(el => observer.observe(el));
document.addEventListener("DOMContentLoaded", function () {
  const footer = document.createElement("footer");
  footer.style.textAlign = "center";
  footer.style.padding = "15px 0";
  footer.style.background = "#7b1fa2";
  footer.style.color = "white";
  footer.style.fontSize = "0.95rem";
  footer.innerHTML = `
    جميع الحقوق محفوظة © 2025
  document.body.appendChild(footer);
});
