/* =============================================================
   Valentine's Day Website — Script
   ============================================================= */

// ─── Placeholder images (swap these with your real photos!) ───
const happyImages = [
  "./resources/happy1.gif",
  "./resources/img-3.png",
  "./resources/happy3.gif",
  "./resources/img-4.png",
  "./resources/heart.jpeg",
  "./resources/img-1.png",
  "./resources/heart.gif",
  "./resources/img-2.png",
  "./resources/happy3.gif",
  "./resources/img-5.png",
  "./resources/heart.jpeg",
  "./resources/img-4.png",
  "./resources/happy1.gif",
  // "./resources/img-6.png",
  "./resources/img-7.png",
  "./resources/img-8.png"
];

const sadImages = [
  "./resources/sad.gif",
  "./resources/sad1.gif",
  "./resources/sadCat.gif",
];

const blackmail = [
  "Please say yes 🥺",
  "I'm begging you, my love…",
  "You're breaking my heart 💔",
  "HUHUHU please 😿",
  "I'll be so sad without you…",
  "Pretty please? 🙏",
  "My heart can't take this 😭",
  "Don't do this to me…",
  "I promise to love you forever 🥹",
  "You know you want to say yes 😏💕",
];

// ─── State ───
let noCount = 0;
let yesBtnSize = 1;
let noBtnSize = 1;
let imagesPreloaded = false;

// ─── DOM references ───
const $ = (id) => document.getElementById(id);

// ─── Image Preloader ───
// Preloads all unique images in the background so celebration screens load instantly
function preloadImages() {
  // Deduplicate
  const unique = [...new Set([...happyImages, ...sadImages])];
  let loaded = 0;
  const total = unique.length;

  return new Promise((resolve) => {
    if (total === 0) { resolve(); return; }
    unique.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded >= total) {
          imagesPreloaded = true;
          resolve();
        }
      };
      img.src = src;
    });
    // Safety timeout — don't block forever if an image fails
    setTimeout(() => { imagesPreloaded = true; resolve(); }, 12000);
  });
}

// ─── Floating Hearts Background ───
function createFloatingHearts() {
  const container = $("heartsBg");
  const hearts = ["💕", "💗", "💖", "💘", "❤️", "🩷", "🤍", "💓", "💞"];
  const count = 25;

  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.classList.add("heart");
    span.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    span.style.left = Math.random() * 100 + "%";
    span.style.fontSize = Math.random() * 18 + 14 + "px";
    span.style.setProperty("--dur", Math.random() * 6 + 6 + "s");
    span.style.setProperty("--spin", Math.random() > 0.5 ? "360deg" : "-360deg");
    span.style.animationDelay = Math.random() * 10 + "s";
    container.appendChild(span);
  }
}

// ─── Typewriter Effect ───
function typeWriter(text, elementId, speed = 50, callback) {
  const el = $(elementId);
  let i = 0;
  el.textContent = "";
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      setTimeout(callback, 400);
    }
  }
  type();
}

// ─── Screen Transitions ───
function switchScreen(hideId, showId) {
  const hide = $(hideId);
  const show = $(showId);
  hide.classList.remove("active");
  setTimeout(() => {
    show.classList.add("active");
  }, 300);
}

// ─── Sparkle on click ───
function sparkle(e) {
  const colors = ["#ffd700", "#ff69b4", "#ff1493", "#fff", "#e91e63"];
  for (let i = 0; i < 8; i++) {
    const s = document.createElement("div");
    s.classList.add("sparkle");
    s.style.left = e.clientX + (Math.random() - 0.5) * 50 + "px";
    s.style.top = e.clientY + (Math.random() - 0.5) * 50 + "px";
    s.style.background = colors[Math.floor(Math.random() * colors.length)];
    s.style.width = s.style.height = Math.random() * 6 + 3 + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }
}
document.addEventListener("click", sparkle);

// ─────────────────────────────────────────
//  SCREEN 1 → SCREEN 2  (Welcome → Question)
// ─────────────────────────────────────────
function showQuestion() {
  switchScreen("welcomeScreen", "questionScreen");
}

// ─────────────────────────────────────────
//  QUESTION LOGIC
// ─────────────────────────────────────────
function sayNo() {
  noCount++;

  // Shrink NO button, grow YES button
  noBtnSize = Math.max(0.35, noBtnSize - 0.12);
  yesBtnSize = Math.min(2.2, yesBtnSize + 0.15);

  const noBtn = $("noBtn");
  const yesBtn = $("yesBtn");
  const noBtn2 = $("noBtn2");

  noBtn.style.transform = `scale(${noBtnSize})`;
  yesBtn.style.transform = `scale(${yesBtnSize})`;
  if (noBtn2) noBtn2.style.transform = `scale(${noBtnSize})`;

  // Play sad music
  const sadMusic = $("sadMusic");
  const happyMusic = $("happyMusic");
  happyMusic.pause();
  sadMusic.play().catch(() => {});

  // Change main image to sad
  $("mainImg").src = sadImages[Math.floor(Math.random() * sadImages.length)];

  // Show sad modal
  const sadModal = $("sadModal");
  sadModal.classList.remove("show");
  setTimeout(() => {
    sadModal.classList.add("show");
    $("sadImg").src = sadImages[Math.floor(Math.random() * sadImages.length)];
    $("sadText").textContent =
      blackmail[Math.floor(Math.random() * blackmail.length)];
  }, 120);
}

function sayYes() {
  // Close sad modal
  $("sadModal").classList.remove("show");

  // Stop sad, play happy
  $("sadMusic").pause();
  $("happyMusic").play().catch(() => {});

  // Reset main image
  $("mainImg").src = "./resources/happy3.gif";

  // Show happy modal
  const happyModal = $("happyModal");
  happyModal.classList.remove("show");
  setTimeout(() => {
    happyModal.classList.add("show");
  }, 150);

  // Update question title
  $("qTitle").textContent = "We're together forever! I love you, cutie 💕";
  $("btnRow").style.display = "none";
}

// ─────────────────────────────────────────
//  CELEBRATION SCREEN 1 — Scrolling Grid
// ─────────────────────────────────────────
function buildScrollGrid() {
  const grid = $("scrollGrid");
  grid.innerHTML = "";

  const rowConfigs = [
    { direction: "left", speed: "28s" },
    { direction: "right", speed: "35s" },
    { direction: "left", speed: "22s" },
    { direction: "right", speed: "40s" },
    { direction: "left", speed: "32s" },
  ];

  // Use fewer images per row — 8 per set is enough for seamless scrolling
  const imagesPerSet = 8;

  rowConfigs.forEach((cfg, rowIdx) => {
    const row = document.createElement("div");
    row.classList.add("scroll-row", cfg.direction);
    row.style.setProperty("--speed", cfg.speed);

    // Two identical sets for seamless infinite loop
    for (let set = 0; set < 2; set++) {
      for (let i = 0; i < imagesPerSet; i++) {
        const img = document.createElement("img");
        // Offset each row so they don't all show the same image at the same position
        const idx = (i + rowIdx * 3) % happyImages.length;
        img.src = happyImages[idx];
        img.alt = "us";
        img.decoding = "async";
        row.appendChild(img);
      }
    }
    grid.appendChild(row);
  });
}

function showLoading() {
  const loader = $("loadingOverlay");
  if (loader) loader.classList.add("show");
}

function hideLoading() {
  const loader = $("loadingOverlay");
  if (loader) loader.classList.remove("show");
}

async function goToCelebration() {
  $("happyModal").classList.remove("show");

  // Show loading if images aren't preloaded yet
  if (!imagesPreloaded) {
    showLoading();
    await preloadImages();
    hideLoading();
  }

  buildScrollGrid();
  switchScreen("questionScreen", "celebScreen1");
}

// ─────────────────────────────────────────
//  CELEBRATION SCREEN 2 — Photo Cascade
// ─────────────────────────────────────────
function buildCascade() {
  const container = $("cascadeContainer");
  container.innerHTML = "";

  const count = 16;
  const sizes = [120, 140, 160, 180];

  for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    img.classList.add("cascade-img");
    img.src = happyImages[i % happyImages.length];
    img.alt = "love";
    img.decoding = "async";

    const size = sizes[Math.floor(Math.random() * sizes.length)];
    img.style.width = size + "px";
    img.style.height = size + "px";

    // Random position & animation properties
    const leftPos = Math.random() * 85;
    img.style.left = leftPos + "%";
    img.style.setProperty("--start-x", (Math.random() - 0.5) * 60 + "px");
    img.style.setProperty("--drift-x", (Math.random() - 0.5) * 80 + "px");
    img.style.setProperty("--rot", (Math.random() - 0.5) * 30 + "deg");
    img.style.setProperty("--end-rot", (Math.random() - 0.5) * 25 + "deg");
    img.style.setProperty("--delay", Math.random() * 8 + "s");
    img.style.setProperty("--drift-dur", Math.random() * 8 + 10 + "s");

    container.appendChild(img);
  }
}

function goToCelebration2() {
  buildCascade();
  switchScreen("celebScreen1", "celebScreen2");
}

// ─────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  createFloatingHearts();

  // Start preloading all images in the background immediately
  preloadImages();

  // Typewriter on welcome screen
  setTimeout(() => {
    typeWriter(
      "Your husband has a very special question to ask you this Valentine's Day…",
      "typewriterText",
      45,
      () => {
        const btn = $("openHeartBtn");
        btn.style.opacity = "1";
        btn.style.pointerEvents = "all";
        btn.style.animation = "glow 2.5s ease infinite, fadeInUp 0.6s ease forwards";
      }
    );
  }, 800);
});

// Small fade-in-up helper for the button
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
