# ELLEN'S PROJECT v3.0 MOBILE

Mobile-first fitness OS with Supabase sync.

## v3.0 changes
- Mobile UI centred and width-safe on iPhone and Galaxy
- Safe-area support for notches and home indicators
- Responsive meal, workout, settings and calendar cards
- Larger touch targets and mobile-friendly dialogs
- Existing food search, calorie totals, nutrition targets and cloud sync retained

# ELLEN'S PROJECT

**Smile. Train. Become the Machine.**

A mobile-first, local-first workout, nutrition, water, sleep and progress tracker.

## Run locally

Use a small local server (PWA features do not work reliably from `file://`):

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Enable Supabase sync

1. Create a Supabase project.
2. Run `supabase.sql` in the SQL editor.
3. In Authentication settings, configure email sign-in as desired.
4. Copy the project URL and public/publishable key into `config.js`.
5. Deploy the folder to an HTTPS host such as Netlify, Vercel, GitHub Pages, or Cloudflare Pages.

Never put a service-role key in `config.js`.

## YouTube exercise guides

Each custom exercise accepts a YouTube URL or video ID. The app embeds it with the privacy-enhanced `youtube-nocookie.com` player. Default exercises open a YouTube search so you can choose the guide you trust.

## Included

- Responsive dashboard and bottom navigation
- Daily score and 0/25/50/75/100% mood system
- 100% completion modal with confetti and slogan
- Workout set/rep/weight tracking
- Exercise guide modal and YouTube links
- Nutrition, water, sleep and memo logs
- Calendar heatmap and daily summaries
- Body measurements and weekly score chart
- JSON export/import
- PWA manifest and service worker
- Optional Supabase email login and device sync
