let chart;
const chartCtx = () => document.getElementById("symptomChart").getContext("2d");

function initChart() {
  chart = new Chart(chartCtx(), {
    type: 'bar',
    data: {
      labels: ['Bloating', 'Acne', 'Irregular Periods', 'Hair Loss'],
      datasets: [{
        label: 'Symptom Count',
        data: [0, 0, 0, 0],
        backgroundColor: ['#f9c2d1', '#f48fb1', '#ec407a', '#d81b60']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function saveSymptoms() {
  const checkboxes = document.querySelectorAll('input[name="symptom"]:checked');
  const symptoms = Array.from(checkboxes).map(cb => cb.value);
  const summary = document.getElementById('summary');

  if (symptoms.length === 0) {
    summary.innerHTML = "<p>Please select at least one symptom.</p>";
    return;
  }

  summary.innerHTML = `<p>You tracked: <strong>${symptoms.join(', ')}</strong></p>`;

  const symptomLabels = ['Bloating', 'Acne', 'Irregular Periods', 'Hair Loss'];
  const data = [0, 0, 0, 0];
  symptoms.forEach(symptom => {
    const index = symptomLabels.indexOf(symptom);
    if (index !== -1) data[index]++;
  });

  chart.data.datasets[0].data = data;
  chart.update();
  chart.resize();
}

function updateCycleTracker() {
  const cycleStart = new Date("2025-05-18");
  const today = new Date();
  const diffDays = Math.floor((today - cycleStart) / (1000 * 60 * 60 * 24)) % 28;
  const day = diffDays === 0 ? 1 : diffDays + 1;

  let phase = "";
  let next = "";
  if (day <= 5) {
    phase = "Menstrual Phase";
    next = `Follicular Phase (in ${6 - day} days)`;
  } else if (day <= 13) {
    phase = "Follicular Phase";
    next = `Ovulation (in ${14 - day} days)`;
  } else if (day === 14) {
    phase = "Ovulation";
    next = `Luteal Phase (in 1 day)`;
  } else {
    phase = "Luteal Phase";
    next = `Next cycle starts in ${28 - day} days`;
  }

  const infoHTML = `
    <p><strong>Current Phase:</strong> ${phase}</p>
    <p><strong>Cycle Day:</strong> Day ${day} of 28</p>
    <p><strong>Next Phase:</strong> ${next}</p>
  `;
  document.getElementById("cycle-info").innerHTML = infoHTML;
  document.getElementById("cycle-progress").style.width = `${(day / 28) * 100}%`;
}

function sendMessage() {
  const userInput = document.getElementById("userInput");
  const message = userInput.value.trim();
  if (!message) return;

  const chatbox = document.getElementById("chatbox");

  const userDiv = document.createElement("div");
  userDiv.className = "user";
  userDiv.textContent = message;
  chatbox.appendChild(userDiv);

  const botResponse = getBotReply(message);
  const botDiv = document.createElement("div");
  botDiv.className = "bot";
  botDiv.textContent = botResponse;
  chatbox.appendChild(botDiv);

  userInput.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotReply(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("hello") || msg.includes("hi")) {
    return "Hi! How can I assist you today?";
  } else if (msg.includes("symptom")) {
    return "Use the tracker above to log your current symptoms.";
  } else if (msg.includes("pcos")) {
    return "PCOS is manageable with healthy lifestyle and consistent tracking.";
  } else if (msg.includes("thanks")) {
    return "You're welcome! Take care.";
  } else {
    return "I'm here to help. Try asking about PCOS, symptoms, or health tips.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initChart();
  updateCycleTracker();
});


