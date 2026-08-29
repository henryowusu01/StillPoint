window.addEventListener("load", () => {
  const content = document.querySelector(".animate");
  if (content) {
    setTimeout(() => {
      content.style.transition = "opacity 2s ease, transform 2s ease";
      content.style.opacity = "1";
      content.style.transform = "translateY(0)";
    }, 300);
  }

  updateUserName();
  renderHistory();
  updateDateTime();
  setInterval(updateDateTime, 1000);
});

const menuBtn = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");
let isHidden = true;

if (sidebar) {
  sidebar.classList.add("hidden");
}

if (menuBtn) { //when pressed the menu button will compress the sidebar and expand the main content area, and vice versa
  menuBtn.textContent = "☰";
  menuBtn.addEventListener("click", () => {
    const content = document.querySelector(".animate");
    if (content) {
      setTimeout(() => {
        content.style.transition = "opacity 2s ease, transform 2s ease";
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
      }, 300);
    }

    if (sidebar) {
      isHidden = sidebar.classList.toggle("hidden");
    }
    if (main) {
      main.classList.toggle("full");
    }

    menuBtn.textContent = isHidden ? "☰" : "///"; //shows how btn will look when pressed
  });
}
 //JSON is used to store the check-in history in localStorage. 
 // //Each entry includes the date, time, score, emoji, message, and answers. 
 // //The history is displayed in reverse order (most recent first) on the History page.

function updateUserName() { // this would update the name but its not working
  const name = localStorage.getItem("userFullName");
  const welcomeName = document.getElementById("welcomeName");
  if (name && welcomeName) {
    welcomeName.textContent = `, ${name}`; //supose to show on dashboard
  }
}


function getSelectedAnswers() {
  const answers = [];
  for (let i = 1; i <= 10; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`); // "q${i}" is the name of the input group for question i
    if (!selected) {
      return null;
    }
    const labelText = selected.parentElement.textContent.trim();
    answers.push(labelText.replace(/^\d+\.?\s*/, "")); // Remove leading number and dot from the label text
  }
  return answers;
}

function saveCheckin(score, emoji, message, answers) {
  const now = new Date();
  const history = JSON.parse(localStorage.getItem("checkinHistory")) || [];
  history.push({
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    score,
    emoji,
    message,
    answers,
  });
  localStorage.setItem("checkinHistory", JSON.stringify(history));
}

function showResult(score, answers) {
  const result = document.getElementById("result");
  const emoji = document.getElementById("emoji");
  const message = document.getElementById("message");
  if (!result || !emoji || !message) return;

  let moodText = "";
  let messageText = "";

  if (score >= 32) {
    moodText = "😊";
    messageText = "You’re doing well today. Keep taking care of yourself.";
  } else if (score >= 22) {
    moodText = "😐";
    messageText = "You’re feeling okay, but there’s a bit of weight today.";
  } else if (score >= 12) {
    moodText = "😟";
    messageText = "Today feels heavy. Be gentle with yourself.";
  } else {
    moodText = "😔";
    messageText = "You’re not alone, please talk to a professional or someone you trust. I promise it gets better once you speak.";
  }

  result.classList.remove("hidden");
  emoji.textContent = moodText;
  message.textContent = messageText;
  saveCheckin(score, moodText, messageText, answers);
  renderHistory();
}

const checkinForm = document.getElementById("checkinForm");
if (checkinForm) {
  checkinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const answers = getSelectedAnswers();
    if (!answers) return;

    let score = 0;
    for (let i = 1; i <= 10; i++) {
      const answer = document.querySelector(`input[name="q${i}"]:checked`);
      score += Number(answer.value);
    }
    showResult(score, answers);
  });
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("checkinHistory")) || [];
  const historyContainer = document.getElementById("historyList");
  const totalCheckins = document.getElementById("totalCheckins");
  const latestMood = document.getElementById("latestMood");
  const averageScore = document.getElementById("averageScore");
  const lastCheckin = document.getElementById("lastCheckin");

  if (totalCheckins) {
    totalCheckins.textContent = history.length;
  }
  if (latestMood) {
    latestMood.textContent = history.length ? history[history.length - 1].emoji : "—";
  }
  if (averageScore) {
    averageScore.textContent = history.length ? Math.round(history.reduce((sum, item) => sum + item.score, 0) / history.length) : "0";
  }
  if (lastCheckin) {
    lastCheckin.textContent = history.length ? `${history[history.length - 1].date} ${history[history.length - 1].time}` : "Never";
  }

  if (!historyContainer) return;

  if (!history.length) {
    historyContainer.innerHTML = `
      <div class="history-item">
        <h3>No past checkups yet.</h3>
        <p>Complete a daily check-in to see your history here.</p>
      </div>
    `;
    return;
  }

  historyContainer.innerHTML = history
    .slice()
    .reverse()
    .map((entry) => {
      const answersList = entry.answers
        ? `<details><summary>View answers</summary><ul>${entry.answers.map((answer) => `<li>${answer}</li>`).join("")}</ul></details>`
        : "";

      return `
        <div class="history-item">
          <div class="history-header">
            <span>${entry.date} ${entry.time}</span>
            <span>${entry.emoji} | Score: ${entry.score}</span>
          </div>
          <p>${entry.message}</p>
          ${answersList}
        </div>
      `;
    })
    .join("");
}

const popup = document.getElementById("logoutPopup");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (popup) popup.classList.add("popup-show");
  });
}

if (noBtn) {
  noBtn.addEventListener("click", function () {
    if (popup) popup.classList.remove("popup-show");
  });
}

if (yesBtn) {
  yesBtn.addEventListener("click", function () {
    localStorage.removeItem("userFullName");
    window.location.href = "Home.html";
  });
}

const signupBtn = document.getElementById("signupBtn");
if (signupBtn) {
  signupBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const message = document.getElementById("formMessage");

    message.innerHTML = "";
    fullName.classList.remove("error", "success");
    email.classList.remove("error", "success");
    password.classList.remove("error", "success");
    confirmPassword.classList.remove("error", "success");

    let valid = true;

    if (!fullName.value.trim()) {
      fullName.classList.add("error");
      valid = false;
    } else {
      fullName.classList.add("success");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      email.classList.add("error");
      valid = false;
    } else {
      email.classList.add("success");
    }

    if (password.value.length < 8) {
      password.classList.add("error");
      valid = false;
    } else {
      password.classList.add("success");
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.classList.add("error");
      valid = false;
    } else {
      confirmPassword.classList.add("success");
    }

    if (valid) {
      message.className = "message-success";
      message.innerHTML = "Account created successfully!";
    } else {
      message.className = "message-error";
      message.innerHTML = "Please fix the highlighted fields.";
    }
  });
}

