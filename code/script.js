// تشغيل الكود
document.getElementById("runBtn").addEventListener("click", runCode);

function runCode() {
  let html = document.getElementById("htmlCode").value;
  let css = document.getElementById("cssCode").value;
  let js = document.getElementById("jsCode").value;

  let result = document.getElementById("resultFrame");

  result.srcdoc = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
    </html>
  `;
}

// تغيير لون الإطار حسب اللغة
document.getElementById("languageSelect").addEventListener("change", changeLanguage);

function changeLanguage() {
  const lang = document.getElementById("languageSelect").value;
  document.querySelectorAll("textarea").forEach(box => box.style.border = "2px solid transparent");
  if (lang === "html") document.getElementById("htmlCode").style.border = "2px solid red";
  if (lang === "css") document.getElementById("cssCode").style.border = "2px solid red";
  if (lang === "js") document.getElementById("jsCode").style.border = "2px solid red";
}


