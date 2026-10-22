# Penny Pantry

Penny Pantry searches top grocery stores for the best deal on the products you buy, and lets you compare prices side by side.

This repo currently contains the landing page — a static site with no build step.

## Structure

```
public/
  index.html   # landing page
  styles.css   # styles (light + dark mode)
  script.js    # price-comparison demo, waitlist form, theme picker
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

> The prices in the demo comparison are sample data for illustration only.

See [ROADMAP.md](ROADMAP.md) for the phased plan.
