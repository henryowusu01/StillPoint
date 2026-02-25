  window.addEventListener("load", () => {
  const content = document.querySelector(".animate");

  setTimeout(() => {
    content.style.transition = "opacity 1.2s ease, transform 1.2s ease";
    content.style.opacity = "1";
    content.style.transform = "translateY(0)";
  }, 300);
});

//

const menuBtn = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");

sidebar.classList.add("hidden");
menuBtn.textContent = "☰";

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
  main.classList.toggle("full");

  // icon logic
  menuBtn.textContent = isHidden ? "☰" : "///";
});


updateDateTime();
setInterval(updateDateTime, 1000);