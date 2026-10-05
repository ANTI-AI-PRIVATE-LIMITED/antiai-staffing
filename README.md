# ANTI.AI Staffing — Promotional Site

Standalone React + Vite marketing site for ANTI.AI's staffing service.

## Positioning
This is **not** the staffing portal/ATS. It is the public-facing promotional website designed to explain the service, showcase representative talent and convert visitors into discovery calls.

## Highlights
- Premium red / white / black editorial design
- Responsive desktop/tablet/mobile layouts
- React Router routes:
  - `/staffing`
  - `/how-it-works`
  - `/talent`
  - `/industries`
  - `/contact`
- Direct Calendly CTA wired to `https://calendly.com/tanishq-antiai/30min`
- Reusable sections and cards
- Local logo SVG and no required image-hosting dependency for the core visual system
- Accessible buttons, nav states and responsive mobile booking bar

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Customization points
- `src/data.js` — representative talent, industries and technology tags
- `src/App.jsx` — page/route content and reusable components
- `src/styles.css` — visual system, responsive breakpoints and page layouts
- `public/antiai-mark.svg` — local ANTI.AI staffing mark

## Notes
The sample talent profiles are deliberately labelled as representative in the site copy. Replace them with real candidate/talent data when the staffing platform backend is available.
