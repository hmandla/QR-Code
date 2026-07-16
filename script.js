const opened = new Set();

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  decorate(id);
}

function openGift(id) {
  opened.add(id);
  document.querySelector(`.dot[data-gift="${id}"]`)?.classList.add("done");
  if (opened.size === 4) document.getElementById("finalUnlock").classList.remove("hidden");
  showScreen(id);
  burst();
}

function showFinal() {
  showScreen("final");
  celebrateFinal();
}

function burst() {
  if (typeof confetti === "function") {
    confetti({ particleCount: 120, spread: 75, origin: { y: 0.65 } });
  }
}

function celebrateFinal() {
  if (typeof confetti !== "function") return;
  const end = Date.now() + 2200;
  const timer = setInterval(() => {
    confetti({ particleCount: 8, angle: 60, spread: 60, origin: { x: 0 } });
    confetti({ particleCount: 8, angle: 120, spread: 60, origin: { x: 1 } });
    if (Date.now() > end) clearInterval(timer);
  }, 150);
}

function revealReason(button, text) {
  button.textContent = text;
  button.disabled = true;
  burst();
}

function makeFloating(symbols, count = 12) {
  const layer = document.getElementById("effects");
  for (let i = 0; i < count; i++) {
    const item = document.createElement("span");
    item.className = "floating";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = `${Math.random() * 100}%`;
    item.style.fontSize = `${18 + Math.random() * 24}px`;
    item.style.animationDuration = `${5 + Math.random() * 6}s`;
    item.style.animationDelay = `${Math.random() * 2}s`;
    layer.appendChild(item);
    setTimeout(() => item.remove(), 12000);
  }
}

function decorate(id) {
  if (id === "bouquet") makeFloating(["🌹","🌸","💗","✨"], 22);
  else if (id === "letter") makeFloating(["💌","🌹","✨"], 14);
  else if (id === "dreamdate") makeFloating(["✨","⭐","🌙","💫"], 18);
  else if (id === "memoryjar") makeFloating(["✨","💛","🧸"], 14);
  else if (id === "final") makeFloating(["❤️","💖","✨","🧸"], 28);
  else makeFloating(["❤️","💕","✨"], 12);
}

setInterval(() => {
  const active = document.querySelector(".screen.active")?.id || "welcome";
  const symbols = active === "dreamdate" ? ["✨","⭐"] : ["❤️","✨"];
  makeFloating(symbols, 2);
}, 1800);

decorate("welcome");
