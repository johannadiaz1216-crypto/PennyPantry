// Theme picker: system (follow the OS), light, dark or pink. Saved per browser.
const themeToggle = document.getElementById("theme-toggle");
const themeMenu = document.getElementById("theme-menu");
const themeIcon = document.getElementById("theme-toggle-icon");
const themeOptions = themeMenu.querySelectorAll("[data-theme-option]");

function currentTheme() {
  return document.documentElement.dataset.theme || "system";
}

function applyTheme(theme) {
  if (theme === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("pp-theme", theme);
  } catch {}
  syncThemeUI();
}

function syncThemeUI() {
  const theme = currentTheme();
  themeIcon.setAttribute("href", `#icon-${theme}`);
  themeToggle.setAttribute("aria-label", `Change theme (current: ${theme})`);
  themeOptions.forEach((opt) => opt.setAttribute("aria-checked", String(opt.dataset.themeOption === theme)));
}

function setMenuOpen(open) {
  themeMenu.hidden = !open;
  themeToggle.setAttribute("aria-expanded", String(open));
  if (open) themeMenu.querySelector('[aria-checked="true"]').focus();
}

themeToggle.addEventListener("click", () => setMenuOpen(themeMenu.hidden));
themeMenu.addEventListener("click", (e) => {
  const opt = e.target.closest("[data-theme-option]");
  if (!opt) return;
  applyTheme(opt.dataset.themeOption);
  setMenuOpen(false);
  themeToggle.focus();
});
themeMenu.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
  e.preventDefault();
  const items = [...themeOptions];
  const i = items.indexOf(document.activeElement);
  items[(i + (e.key === "ArrowDown" ? 1 : items.length - 1)) % items.length].focus();
});
document.addEventListener("click", (e) => {
  if (!themeMenu.hidden && !e.target.closest(".theme-picker")) setMenuOpen(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !themeMenu.hidden) {
    setMenuOpen(false);
    themeToggle.focus();
  }
});
syncThemeUI();
