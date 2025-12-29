 window.addEventListener("load", () => {
  const content = document.querySelector(".animate");

  setTimeout(() => {
    content.style.transition = "opacity 1.2s ease, transform 1.2s ease";
    content.style.opacity = "1";
    content.style.transform = "translateY(0)";
  }, 300);
});
//_______________________________________________

// Check-in Form Logic  ( basic using emojis and messages as thats what was best fo this project scope)
document.getElementById("checkinForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let score = 0;

  // Mood select
  const mood = document.querySelector("select").value;
  if (mood === "Very calm") score += 25;
  else if (mood === "Calm") score += 20;
  else if (mood === "Neutral") score += 15;
  else if (mood === "Stressed") score += 10;
  else score += 5;

  // Anxiety range
  const anxiety = document.querySelectorAll("input[type='range']")[0].value;
  score += 10 - anxiety; // less anxiety = higher score

  // Energy range
  const energy = document.querySelectorAll("input[type='range']")[1].value;
  score += energy;

  // Sleep
  const sleep = document.querySelector("input[name='sleep']:checked").parentElement.textContent;
  if (sleep.includes("Yes")) score += 20;
  else if (sleep.includes("Somewhat")) score += 10;
  else score += 5;

  showResult(score);
});

function showResult(score) {
  const result = document.getElementById("result");
  const emoji = document.getElementById("emoji");
  const message = document.getElementById("message");

  result.classList.remove("hidden");

  if (score >= 70) {
    emoji.textContent = "😊";
    message.textContent = "You seem to be doing well today. Keep taking care of yourself.";
  } 
  else if (score >= 50) {
    emoji.textContent = "😐";
    message.textContent = "You're feeling okay, but there may be some weight on your mind.";
  } 
  else if (score >= 35) {
    emoji.textContent = "😟";
    message.textContent = "It looks like today has been a bit heavy. Be gentle with yourself.";
  } 
  else {
    emoji.textContent = "😔";
    message.textContent = "You're going through a tough time. You're not alone.";
  }
}