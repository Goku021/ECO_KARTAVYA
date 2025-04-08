document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("track-form");
  const successMsg = document.getElementById("success-msg");
  const confettiCanvas = document.getElementById("confetti");

  const ecoPointsDisplay = document.getElementById("ecoPoints");
  const badgeProgressBar = document.getElementById("badgeProgressBar");

  // All stats elements (ensure matching ID names!)
  const ecoStats = {
    water: document.getElementById("stat-water"),
    electricity: document.getElementById("stat-electricity"),
    bags: document.getElementById("stat-plastic"),
    rides: document.getElementById("stat-transport"),
    compost: document.getElementById("stat-compost"),
    plastic: document.getElementById("stat-plastic_items"),
    trees: document.getElementById("stat-trees"),
    walk: document.getElementById("stat-walk"),
    cycle: document.getElementById("stat-cycle"),
    ac_heater: document.getElementById("stat-ac_heater"),
    container: document.getElementById("stat-container"),
    natural_light: document.getElementById("stat-natural_light"),
    food_waste: document.getElementById("stat-food_waste"),
    reused: document.getElementById("stat-reused"),
    refilled_bottle: document.getElementById("stat-refilled_bottle"),
    donated_clothes: document.getElementById("stat-donated_clothes"),
    idle_devices: document.getElementById("stat-idle_devices"),
    custom_action: document.getElementById("stat-custom")
  };

  const statIcons = {
    water: "🚿", electricity: "💡", bags: "🛍️", rides: "🚌", compost: "🌱",
    plastic: "♻️", trees: "🌳", walk: "🚶", cycle: "🚴", ac_heater: "❄️",
    container: "📦", natural_light: "🌞", food_waste: "🍲", reused: "🔁",
    refilled_bottle: "🧴", donated_clothes: "👕", idle_devices: "🔌", custom_action: "✍️"
  };

  const statSuffix = {
    water: "liters", electricity: "kWh saved", bags: "avoided", rides: "rides skipped",
    compost: "kg composted", plastic: "items avoided", trees: "planted", walk: "km walked",
    cycle: "km cycled", ac_heater: "hours reduced", container: "used", natural_light: "hrs",
    food_waste: "meals saved", reused: "times reused", refilled_bottle: "times",
    donated_clothes: "items", idle_devices: "times", custom_action: ""
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let filledCount = 0;
    let summary = [];
    let points = 0;

    const inputs = form.querySelectorAll("input");

    inputs.forEach(input => {
      const name = input.name;
      const value = input.type === "number" ? parseFloat(input.value) : input.value.trim();

      if (value && !isNaN(value) && value > 0 || name === "custom_action" && value) {
        filledCount++;
        points += 10;

        // Update summary text
        summary.push(`${name.replace(/_/g, " ")}: ${value}`);

        // Update card UI if element exists
        if (ecoStats[name]) {
          ecoStats[name].innerHTML = `${statIcons[name] || "✔️"} ${value} ${statSuffix[name] || ""}`;
        }
      }
    });

    if (filledCount === 0) {
      successMsg.textContent = "⚠️ Please fill at least one value.";
      successMsg.style.color = "red";
      return;
    }

    successMsg.innerHTML = "✅ Tracked Successfully!<br>" + summary.join("<br>");
    successMsg.style.color = "#38a169";

    // Update EcoPoints
    ecoPointsDisplay.textContent = points;

    // Badge progress
    const progress = Math.min((points / 100) * 100, 100);
    badgeProgressBar.style.width = `${progress}%`;
    badgeProgressBar.textContent = `${Math.round(progress)}%`;

    // Fire confetti 🎉
    if (filledCount >= 5) launchConfetti();
  });

  function launchConfetti() {
    const jsConfetti = new JSConfetti({ canvas: confettiCanvas });
    jsConfetti.addConfetti();
  }

  // Back to top button (optional)
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Load JSConfetti (only once)
if (!window.JSConfetti) {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/js-confetti@latest";
  document.head.appendChild(script);
}
