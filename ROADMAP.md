# Penny Pantry Roadmap

Five phases. Each one ends with a **quality check**: we don't start the next phase until every box in the check is ticked on the live Netlify site.

| Phase | Goal | Status |
|---|---|---|
| 0 | Themes: system, light, dark, pink | Done — awaiting quality check |
| 1 | Foundation + real prices from the first store | Not started |
| 2 | Real comparison across several stores | Not started |
| 3 | Accounts, shopping lists, cart optimizer | Not started |
| 4 | Price alerts + launch polish | Not started |

---

## Phase 0 — Themes

A theme button in the header (top right) with four choices: **System** (follows the phone or computer setting), **Light**, **Dark** and **Pink**. The choice is remembered on that browser.

### Quality check 0
- [ ] Each of the four themes switches the whole page, from top section to footer.
- [ ] Pick Pink, reload the page: it stays Pink, with no flash of another theme.
- [ ] Pick System, then switch your phone/computer between light and dark mode: the site follows.
- [ ] The theme menu works on a phone, and closes when you tap outside it.
- [ ] All text is easy to read in every theme (especially buttons and the "Best deal" rows).

---

## Phase 1 — Foundation + first real prices

Turn the landing page into a real app that shows live prices from **one** store.

- **Choose where prices come from (needs your decision first).** Most grocers don't let other sites copy their prices, and scraping usually breaks their terms of use. The legitimate options:
  - **Kroger Developer API** — free, official, gives product prices by store location. Best first store.
  - **Walmart affiliate API** — official, but requires applying for access.
  - **Paid grocery-data providers** — cover many stores at once, cost money per month.
  - Target, Costco, Aldi and Safeway have no public price API today; they'd need a data provider or a partnership.
- Move the site to a small app setup (Vite) so it can grow, still deployed by Netlify.
- Add a backend with **Netlify Functions** so API keys stay secret and never reach the browser.
- Add a database (**Supabase**) to store products and cached prices.
- Build a **search page**: type a product, enter a ZIP code, see real results from the first store.
- Keep the landing page as the home page; the "Compare prices" box leads to the real search.

### Quality check 1
- [ ] Searching "eggs" with your ZIP code shows real products and prices from the first store.
- [ ] Prices match what that store's own website shows for the same location (spot-check 5 items).
- [ ] A search with no results, or a bad ZIP code, shows a friendly message instead of breaking.
- [ ] No API keys are visible in the browser (we'll show you how to check).
- [ ] All four themes still work on the new pages.
- [ ] Search answers in under 2–3 seconds on your phone.

---

## Phase 2 — Real comparison across stores

- Add stores 2, 3 and beyond, using the sources chosen in Phase 1.
- **Product matching:** make sure "Great Value Large Eggs 12ct" and "Kroger Grade A Large Eggs 12ct" land in the same comparison row.
- **Unit prices** (per oz, per lb, per count) so a bigger pack doesn't look more expensive by mistake.
- Replace the sample comparison on the home page with the real one.
- Refresh prices on a schedule (for example, nightly) and show "Prices updated X hours ago".
- A product page with every store's price, cheapest first.

### Quality check 2
- [ ] 10 common items (milk, eggs, bread, bananas, coffee, etc.) each show at least 2 stores.
- [ ] Spot-check 10 prices against the stores' websites; they match or are clearly marked as out of date.
- [ ] Unit prices are correct on 5 hand-checked items.
- [ ] Mismatches (wrong product grouped together) are rare; list any you find.
- [ ] The "Sample prices" note is gone wherever prices are real.

---

## Phase 3 — Accounts, lists and cart optimizer

- Sign up / log in (email link, and optionally Google) with Supabase Auth.
- Saved **shopping lists**: add items, change quantities, reuse last week's list.
- **Cart optimizer**, two answers side by side:
  - *Cheapest overall* — each item from whichever store is cheapest (multiple trips).
  - *Cheapest single store* — the one store with the lowest total for the whole list.
- **Store-brand swaps:** "Switch to the store brand and save $X".
- Invite everyone from the waitlist.

### Quality check 3
- [ ] You can sign up, log out, log back in, and your lists are still there.
- [ ] Another person's account can't see your lists.
- [ ] For a 10-item list, both optimizer totals add up correctly (check by hand once).
- [ ] Swap suggestions only appear when they really are the same kind of item.
- [ ] Everything works on a phone.

---

## Phase 4 — Alerts and launch polish

- **Price-drop alerts:** watch an item, get an email when it goes on sale.
- Custom domain (e.g. pennypantry.com) connected in Netlify.
- Privacy policy and terms pages, plus a clear note about where prices come from.
- Search-engine basics (page titles, share previews for social media).
- Simple visitor analytics.
- Speed and accessibility review (keyboard use, screen readers, color contrast in all four themes).

### Quality check 4
- [ ] Watch an item, lower its price in a test, and receive the alert email.
- [ ] The custom domain loads with the padlock (HTTPS).
- [ ] Sharing the link in a text or social post shows the Penny Pantry preview.
- [ ] A Lighthouse audit scores 90+ for performance and accessibility.
- [ ] Privacy policy and terms are linked from the footer.
- [ ] Final walkthrough on phone and computer in all four themes.
