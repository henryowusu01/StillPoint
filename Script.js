 window.addEventListener("load", () => {
  const content = document.querySelector(".animate");

  setTimeout(() => {
    content.style.transition = "opacity 1.2s ease, transform 1.2s ease";
    content.style.opacity = "1";
    content.style.transform = "translateY(0)";
  }, 300);
});
//_______________________________________________

function saveName() {
  const name = document.getElementById("fullName").value;

  // Save name
  localStorage.setItem("userFullName", name);

  // Redirect
  window.location.href = "main.html";

  return false; // 🔥 PREVENT form refresh
}