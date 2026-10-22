// Sample prices for the landing-page demo. Replace with real data once the price service exists.
const PRODUCTS = {
  eggs: {
    label: "Large eggs, dozen",
    prices: { Walmart: 2.98, Kroger: 3.29, Target: 3.49, Costco: 2.89, Aldi: 2.95, Safeway: 4.29 },
  },
  milk: {
    label: "Whole milk, 1 gal",
    prices: { Walmart: 3.36, Kroger: 3.19, Target: 3.59, Costco: 3.29, Aldi: 3.25, Safeway: 4.49 },
  },
  bananas: {
    label: "Bananas, per lb",
    prices: { Walmart: 0.58, Kroger: 0.59, Target: 0.69, Costco: 0.63, Aldi: 0.62, Safeway: 0.79 },
  },
  coffee: {
    label: "Ground coffee, 12 oz",
    prices: { Walmart: 7.48, Kroger: 7.99, Target: 6.99, Costco: 6.49, Aldi: 6.79, Safeway: 8.99 },
  },
  bread: {
    label: "Sourdough loaf",
    prices: { Walmart: 3.98, Kroger: 4.29, Target: 3.99, Costco: 4.49, Aldi: 3.49, Safeway: 4.99 },
  },
};

const chipsEl = document.getElementById("product-chips");
const tableEl = document.getElementById("compare-table");
const money = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function render(key) {
  const { prices } = PRODUCTS[key];
  const rows = Object.entries(prices).sort((a, b) => a[1] - b[1]);
  const min = rows[0][1];
  const max = rows[rows.length - 1][1];

  tableEl.innerHTML = rows
    .map(([store, price]) => {
      const best = price === min;
      const width = Math.round((price / max) * 100);
      const extra = best ? "" : ` <small>(+${money(price - min)})</small>`;
      return `
        <div class="row${best ? " best" : ""}">
          <span class="row-store">${store}${best ? '<span class="badge">Best deal</span>' : ""}</span>
          <span class="row-price">${money(price)}${extra}</span>
          <div class="row-bar"><span style="width:${width}%"></span></div>
        </div>`;
    })
    .join("");

  chipsEl.querySelectorAll(".chip").forEach((chip) => {
    chip.setAttribute("aria-selected", String(chip.dataset.key === key));
  });
}

chipsEl.innerHTML = Object.entries(PRODUCTS)
  .map(([key, p]) => `<button type="button" class="chip" role="tab" data-key="${key}">${p.label}</button>`)
  .join("");
chipsEl.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (chip) render(chip.dataset.key);
});
render("eggs");

// Hero search: match the query to a demo product and jump to the comparison.
document.getElementById("hero-search").addEventListener("submit", (e) => {
  e.preventDefault();
  const q = document.getElementById("hero-query").value.trim().toLowerCase();
  const match = Object.keys(PRODUCTS).find(
    (key) => q && (key.includes(q) || q.includes(key) || PRODUCTS[key].label.toLowerCase().includes(q))
  );
  if (match) render(match);
  document.getElementById("compare").scrollIntoView({ behavior: "smooth" });
});

// Waitlist: submit to Netlify Forms without leaving the page.
const form = document.getElementById("waitlist-form");
const status = document.getElementById("form-status");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Joining…";
  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    });
    if (!res.ok) throw new Error(res.statusText);
    form.reset();
    status.textContent = "You're on the list! We'll be in touch.";
  } catch {
    status.textContent = "Something went wrong. Please try again.";
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

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
