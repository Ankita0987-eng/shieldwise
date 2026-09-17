# ShieldWise

**Phishing, Scam & Fraud Detection Awareness Program** — a Community Engagement Project (CEP).

A single self-contained, static awareness platform teaching people to recognise and respond to
phishing, UPI/banking fraud, OTP/SIM-swap scams, job scams, investment scams, romance scams, and
AI voice-clone ("vishing") scams — through interactive tools rather than passive reading.

## Live features

- **Learn Hub** — 6 scam categories, each with how-it-works, red flags, do/don't lists, and a
  real-style case example, plus a Manipulation Tactics section (urgency, fear, authority, greed,
  curiosity, social pressure, trust, scarcity).
- **Detector** — four tools in one:
  - a weighted, rule-based **message scanner** (20 signals, LOW/MEDIUM/HIGH risk banding, scam-type
    identification, tailored recommended actions)
  - a **URL structure checker** (IP addresses, shorteners, punycode, brand mismatches, long/encoded
    URLs, non-standard ports)
  - a **vishing (voice-call) simulator** using the browser's built-in text-to-speech
  - a **guided red-flag checklist**
- **Scenarios** — "What Would You Do?" branching decisions with real consequences explained.
- **Quiz** — 10 questions, explained answers, best-score tracking.
- **Toolkit** — personal cyber-safety self-audit, a searchable red-flags library, a glossary, a
  shareable scam-alert graphic generator, and a Family Cyber-Safety Card generator.
- **Report & Emergency Guidance** — an ordered response plan, an interactive "what exactly
  happened?" picker covering 10 real situations, an evidence-preservation checklist, and real links
  to India's national cybercrime helpline (1930) and cybercrime.gov.in.
- **Survey + Analytics** — a real embedded Google Form, with live before/after confidence and
  knowledge-check analytics pulled from a published Google Sheet CSV (falls back to clearly-labeled
  sample data if the live connection isn't reachable, e.g. inside a sandboxed preview).
- **Progress Dashboard, badges, and a Certificate of Completion** — all stored locally in the
  visitor's own browser (`localStorage`), no account or backend required.

## Tech stack

Vanilla HTML/CSS/JS in one file (`index.html`), styled with the Tailwind CDN build, animated with
GSAP, charted with Chart.js, and parsing survey CSV data with PapaParse — all loaded from public
CDNs. **No backend, no build step, no paid APIs, no API keys.**

## Why no external threat-intelligence API

A real domain-reputation or message-classification API would need a backend to protect its key, or
would expose that key in frontend code — neither is acceptable for a static site like this. Every
detector result says so explicitly rather than faking a result: *"External reputation/threat-
intelligence check unavailable in this browser-only tool."*

## Running it locally

There is no build step. Open `index.html` directly in a browser, or serve the folder with any
static file server:

```bash
npx serve .
```

## Deploying

This is a zero-config static site — push to GitHub and import the repo into Vercel or Netlify, or
enable GitHub Pages on this repo. No environment variables are required (see `.env.example`).

## Configuring your own survey

To point this at your own Google Form and Sheet instead of the demo data:

1. Create your Google Form, then in **Send → Embed `<>`**, copy the `src` URL and replace the
   `<iframe src="...">` value in the Survey section of `index.html`.
2. Open the linked response Sheet → **File → Share → Publish to web** → choose the response tab →
   format **CSV** → Publish, and replace the `LIVE_CSV_URL` constant near the Analytics section.

## Privacy

Every detector runs entirely in the visitor's browser — nothing typed into them is sent anywhere.
Progress, badges, and checklist answers are stored only in the visitor's own `localStorage`. Survey
responses go directly to Google's infrastructure, not through this site.

## License / disclaimer

Educational awareness project for a Community Engagement Project submission. Not a substitute for
professional legal, financial, or security advice.
