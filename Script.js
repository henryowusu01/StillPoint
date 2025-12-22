 window.addEventListener("load", () => {
  const content = document.querySelector(".animate");

  setTimeout(() => {
    content.style.transition = "opacity 1.2s ease, transform 1.2s ease";
    content.style.opacity = "1";
    content.style.transform = "translateY(0)";
  }, 300);
});
//_______________________________________________