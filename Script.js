 window.addEventListener("load", () => {
  const content = document.querySelector(".animate");

  setTimeout(() => {
    content.style.transition = "opacity 2.2s ease, transform 2.2s ease";
    content.style.opacity = "1";
    content.style.transform = "translateY(0)";
  }, 300);
});
//_______________________________________________

// Check-in Form Logic  ( basic using emojis and messages as thats what was best fo this project scope)
// Show user's name
const name = localStorage.getItem("userFullName");
if (name) {
  document.getElementById("welcomeName").textContent = `, ${name}`;
}

// Handle check-in
document.getElementById("checkinForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let score = 0;

  for (let i = 1; i <= 10; i++) { // Assuming 10 questions
    const answer = document.querySelector(`input[name="q${i}"]:checked`);
    score += Number(answer.value);
  }

  showResult(score);
});

function showResult(score) { // Display result based on score from user input
  const result = document.getElementById("result");
  const emoji = document.getElementById("emoji");
  const message = document.getElementById("message");

  result.classList.remove("hidden");

  if (score >= 32) {
    emoji.textContent = "😊";
    message.textContent = "You’re doing well today. Keep taking care of yourself.";
      saveCheckin(score, "😊", message.textContent); 
  } 
  else if (score >= 22) {
    emoji.textContent = "😐";
    message.textContent = "You’re feeling okay, but there’s a bit of weight today.";
      saveCheckin(score, "😐", message.textContent);
  } 
  else if (score >= 12) {
    emoji.textContent = "😟";
    message.textContent = "Today feels heavy. Be gentle with yourself.";
    saveCheckin(score, "😟", message.textContent);
  } 
  else {
    emoji.textContent = "😔";
    message.textContent = "You’re having a tough time. You’re not alone.";
    saveCheckin(score, "😔", message.textContent);
  }
}

function saveCheckin(score, emoji, message) { // Save check-in data to localStorage
  const now = new Date();

  const checkin = {
    date: now.toLocaleDateString(), //
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
    score,
    emoji,
    message
  };

  const history = JSON.parse(localStorage.getItem("checkinHistory")) || []; 
  history.push(checkin);

  localStorage.setItem("checkinHistory", JSON.stringify(history)); //JSON.stringify is to convert object to string
}
