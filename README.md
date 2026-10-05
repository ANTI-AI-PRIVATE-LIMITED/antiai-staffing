# ANTI.AI Staffing — Promotional React Site

A standalone React/Vite marketing site for ANTI.AI's staffing service.

## Positioning

The site is intentionally broader than tech recruitment. It presents ANTI.AI as a staffing partner across:

- Technology & AI
- Sales & Business Development
- HR & Talent
- Finance & Operations
- Marketing & Growth
- Customer & Support

## Routes

- `/staffing` — main promotional experience
- `/how-it-works` — staffing process
- `/talent` — representative talent wall with function filters
- `/industries` — industry positioning
- `/contact` — Calendly conversion page

## Key UI changes

- Reworked the homepage around "more than tech hiring".
- Added a role-family explorer with six business functions.
- Replaced the repetitive sample-talent grid with a mixed editorial talent wall.
- Added representative non-technical talent: HR, BDE / sales, finance, marketing, customer success and talent acquisition.
- Added business and productivity tools to show breadth beyond engineering stacks.
- Added working animated horizontal marquees for technologies and common tools.
- Updated the visual system to a minimal black / white / ANTI.AI-red palette for a cleaner premium direction.
- Introduced an editorial serif display font for the major headlines while keeping Manrope/mono for body and metadata.
- Added animated process cards with red signal lines, hover elevation and motion.
- Rebuilt the large red positioning section into a more structured editorial composition with function chips and subtle motion.
- Fixed the main-page scroll issue by removing the vertical `overflow:hidden` constraint from the shell and keeping only horizontal clipping.
- Expanded the footer into a full navigation / functions / CTA layout.
- Calendly CTAs use `https://calendly.com/tanishq-antiai/30min`.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```
