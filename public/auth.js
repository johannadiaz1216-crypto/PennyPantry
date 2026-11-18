// Supabase auth: Google sign-in, plus the signed-in user's name and photo in the header.
// The publishable key is meant for browser code; access is enforced by Supabase on the server.
const SUPABASE_URL = "https://bfrjsojsgxaadijkfmsk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_eiBb8kRVlq246maXiXE_LQ_-ejSBzfF";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { flowType: "pkce", detectSessionInUrl: true, persistSession: true },
});

// Google puts the profile in user_metadata as full_name/name and avatar_url/picture.
function profileOf(user) {
  const meta = user.user_metadata || {};
  return {
    name: meta.full_name || meta.name || user.email || "Penny Pantry shopper",
    avatar: meta.avatar_url || meta.picture || "",
    email: user.email || "",
  };
}

// Fills an .avatar element with the photo, falling back to the first initial.
function renderAvatar(el, { name, avatar }) {
  el.replaceChildren();
  const initial = () => {
    el.replaceChildren();
    el.textContent = name.trim().charAt(0).toUpperCase();
  };
  if (!avatar) return initial();
  const img = document.createElement("img");
  img.src = avatar;
  img.alt = "";
  img.referrerPolicy = "no-referrer"; // Google profile photos can refuse requests that carry a referrer.
  img.addEventListener("error", initial, { once: true });
  el.append(img);
}

const loginLink = document.getElementById("login-link");
const signedInEl = document.getElementById("account-signed-in");
const accountToggle = document.getElementById("account-toggle");
const accountMenu = document.getElementById("account-menu");

function setAccountMenuOpen(open) {
  accountMenu.hidden = !open;
  accountToggle.setAttribute("aria-expanded", String(open));
}

function renderHeader(user) {
  document.documentElement.classList.toggle("signed-in", Boolean(user));
  loginLink.hidden = Boolean(user);
  signedInEl.hidden = !user;
  if (!user) return setAccountMenuOpen(false);
  const profile = profileOf(user);
  renderAvatar(document.getElementById("account-avatar"), profile);
  document.getElementById("account-name").textContent = profile.name.split(" ")[0];
  document.getElementById("account-menu-name").textContent = profile.name;
  document.getElementById("account-menu-email").textContent = profile.email;
  accountToggle.setAttribute("aria-label", `Account: ${profile.name}`);
}

// Login page only.
function renderLoginPage(user) {
  const signedOut = document.getElementById("login-signed-out");
  if (!signedOut) return;
  const signedIn = document.getElementById("login-signed-in");
  signedOut.hidden = Boolean(user);
  signedIn.hidden = !user;
  if (user) {
    const profile = profileOf(user);
    renderAvatar(document.getElementById("login-avatar"), profile);
    document.getElementById("login-name").textContent = profile.name;
  }
}

function renderAuth(user) {
  renderHeader(user);
  renderLoginPage(user);
}

accountToggle.addEventListener("click", () => setAccountMenuOpen(accountMenu.hidden));
document.addEventListener("click", (e) => {
  if (!accountMenu.hidden && !e.target.closest(".account")) setAccountMenuOpen(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !accountMenu.hidden) {
    setAccountMenuOpen(false);
    accountToggle.focus();
  }
});

document.getElementById("sign-out").addEventListener("click", async () => {
  await sb.auth.signOut();
  setAccountMenuOpen(false);
});

const googleButton = document.getElementById("google-login");
if (googleButton) {
  const status = document.getElementById("login-status");
  googleButton.addEventListener("click", async () => {
    googleButton.disabled = true;
    status.textContent = "Opening Google…";
    // Return to the home page after Google; this URL must be in Supabase's allowed redirect URLs.
    const { error } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/` },
    });
    if (error) {
      googleButton.disabled = false;
      status.textContent = "Couldn't start Google sign-in. Please try again.";
    }
  });
}

sb.auth.onAuthStateChange((_event, session) => renderAuth(session ? session.user : null));
