const hexCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
const isCardLocked = [false, false, false, false, false];

const generateBtn = document.getElementById("generate-btn");
const themeToggleBtn = document.getElementById("theme-toggle-btn");

function createRandomHexCode() {
  let hexCode = "#";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * 16);
    hexCode += hexCharacters[randomIndex];
  }
  return hexCode;
}

function updatePaletteColors() {
  for (let i = 0; i < 5; i++) {
    if (isCardLocked[i] === false) {
      const newColor = createRandomHexCode();
      const displayBlock = document.getElementById("color-" + i);
      const textLabel = document.getElementById("hex-" + i);
      displayBlock.style.backgroundColor = newColor;
      textLabel.innerText = newColor;
    }
  }
}

function copyTextToClipboard(cardIndex) {
  const textLabel = document.getElementById("hex-" + cardIndex);
  const copyBtn = document.getElementById("copy-" + cardIndex);
  const originalHexText = textLabel.innerText;

  const secretInput = document.createElement("input");
  secretInput.value = originalHexText;
  document.body.appendChild(secretInput);
  secretInput.select();
  document.execCommand("copy");
  document.body.removeChild(secretInput);

  copyBtn.innerText = "✅ Copied!";
  setTimeout(function() {
    copyBtn.innerText = "📋 Copy";
  }, 1200);
}

function toggleCardLock(cardIndex) {
  const lockBtn = document.getElementById("lock-" + cardIndex);
  if (isCardLocked[cardIndex] === false) {
    isCardLocked[cardIndex] = true;
    lockBtn.innerText = "🔒 Locked";
  } else {
    isCardLocked[cardIndex] = false;
    lockBtn.innerText = "🔓 Lock";
  }
}

function initializeTheme() {
  const currentSavedTheme = localStorage.getItem("user-theme");
  if (currentSavedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggleBtn.innerText = "☀️ Light Mode";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggleBtn.innerText = "🌙 Dark Mode";
  }
}

generateBtn.addEventListener("click", updatePaletteColors);

themeToggleBtn.addEventListener("click", function() {
  const activeTheme = document.documentElement.getAttribute("data-theme");
  if (activeTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggleBtn.innerText = "🌙 Dark Mode";
    localStorage.setItem("user-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggleBtn.innerText = "☀️ Light Mode";
    localStorage.setItem("user-theme", "dark");
  }
});

for (let index = 0; index < 5; index++) {
  const currentCopyBtn = document.getElementById("copy-" + index);
  const currentLockBtn = document.getElementById("lock-" + index);

  currentCopyBtn.addEventListener("click", function() {
    copyTextToClipboard(index);
  });

  currentLockBtn.addEventListener("click", function() {
    toggleCardLock(index);
  });
}

initializeTheme();
updatePaletteColors();
