# Penny Pantry

Penny Pantry searches top grocery stores for the best deal on the products you buy, and lets you compare prices side by side.

This repo currently contains the landing page — a static site with no build step.

## Structure

```
public/
  index.html   # landing page
  login.html   # log in page ("Continue with Google")
  styles.css   # styles (system, light, dark and pink themes)
  script.js    # landing page: price-comparison demo + waitlist form
  theme.js     # theme picker (shared by all pages)
  auth.js      # Supabase Google sign-in + signed-in name/photo in the header
netlify.toml   # Netlify config (publishes the public/ folder)
```

## Run locally

Open `public/index.html` in a browser, or serve the folder:

```bash
npx serve public
```

## Deploy to Netlify

1. In Netlify, choose **Add new site → Import an existing project** and pick this GitHub repo.
2. Branch: `main`. Build command: leave empty. Publish directory: `public` (already set in `netlify.toml`).
3. Deploy.

The waitlist form uses [Netlify Forms](https://docs.netlify.com/forms/setup/), so sign-ups appear under **Forms** in your Netlify dashboard automatically.

## Google sign-in (Supabase)

Sign-in uses Supabase Auth (project `bfrjsojsgxaadijkfmsk`) with the browser-safe publishable key in `public/auth.js`. For it to work:

1. **Google Cloud Console → Credentials → OAuth client (Web application):** add
   `https://bfrjsojsgxaadijkfmsk.supabase.co/auth/v1/callback` under *Authorized redirect URIs*.
2. **Supabase → Authentication → Sign In / Providers → Google:** enable it and paste the Google client ID and secret.
3. **Supabase → Authentication → URL Configuration:** set *Site URL* to `https://pennypantry.netlify.app` and add
   `https://pennypantry.netlify.app/` to *Redirect URLs* (add any custom domain later too).

After login, the header shows the user's name and photo from Google (`user_metadata.full_name` / `avatar_url`).

> The prices in the demo comparison are sample data for illustration only.

See [ROADMAP.md](ROADMAP.md) for the phased plan.
