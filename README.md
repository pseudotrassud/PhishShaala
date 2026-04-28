# 🎣 PhishShaala

> **PhishShaala** is an interactive cybersecurity awareness platform that teaches users how to identify phishing attacks — including email scams, SMS smishing, voice vishing, and social-media deception — through guided lessons and a live scenario-based challenge.

**Live Demo:** [Add your deployed link here]

> **Architecture:** The quiz answer key is stored exclusively in Vercel serverless backend functions (`/api`) and never sent to the client. The frontend fetches only the scenario content and submits answers to the API for validation.

---

## ✨ Features

- **Guided Learning Modules** — Multi-level content covering email phishing, smishing, vishing, and social-media attacks
- **Advanced Deep-Dive Lessons** — Detailed module-by-module breakdown with theory, real-world examples, and safety tips
- **Interactive Quiz / Challenge** — Scenario-based quiz where users decide if an email or SMS is *phishing* or *safe*, with instant feedback
- **Score & Badge System** — Results stored in `localStorage`; scorecard calculates percentage and awards a badge (Beginner → Elite Defender)
- **Progress Tracking** — Per-module progress bar on the learning pages tracks how many modules have been reviewed
- **Dark / Light Mode Toggle** — Site-wide theme switching persisted via `localStorage`; prevents flash of unstyled content (FOUC)
- **Animated Cyber-Canvas Background** — Interactive WebGL-style particle network on the home page that reacts to mouse movement
- **Hero Parallax & Scroll-Reveal Animations** — Smooth entry animations for cards and sections as they scroll into view
- **Accordion Content Panels** — Native `<details>`/`<summary>` accordions for compact learning content
- **Alpine.js Powered Quiz UI** — Reactive quiz state management (selection, score, progress, scenario switching) without build tools
- **Responsive Layout** — Mobile-friendly across all screen sizes using Tailwind CSS utility classes
- **Hash-Based Deep Linking** — Navigate directly to a specific module via URL hash (e.g. `advance-learning.html#smishing`)

---

## 📄 Pages Overview

| Page | Description |
|---|---|
| `index.html` | **Home** — Landing page with hero, feature highlights, statistics, and a call-to-action to start learning or take the challenge. Includes the animated particle canvas background. |
| `learning.html` | **Learning Center** — Introduction to phishing, with expandable accordion cards covering email phishing, smishing (SMS), and vishing (voice call) attack types, each with red-flag analysis and prevention tips. |
| `advance-learning.html` | **Advanced Learning** — In-depth module navigator with a sidebar. Each module (Email Phishing, Smishing, Vishing, Social Media, etc.) contains theory, a step-by-step attack walkthrough, a real-world example scenario, and a safety tips panel. Supports hash-based deep linking. |
| `challenge.html` | **Challenge Hub** — Interactive quiz presenting realistic email and SMS scenarios. Users click *Flag Suspicious* or *Mark Safe*, receive instant feedback, and accumulate a score. Powered by Alpine.js for zero-build reactivity. |
| `scorecard.html` | **Scorecard** — Displays the user's final quiz results: animated conic-gradient score ring, percentage, category breakdown (email vs. SMS), and a performance badge. Data is read from `localStorage`. |

---

## 🗂️ Project Structure

```
phishshaala/
│
├── index.html                  # Home / landing page
├── learning.html               # Beginner phishing learning modules
├── advance-learning.html       # Advanced module navigator with sidebar
├── challenge.html              # Interactive phishing quiz (Alpine.js)
├── scorecard.html              # Quiz results, score ring & badge
│
├── css/
│   ├── style.css               # Shared styles: light-mode header/nav overrides, delay utilities
│   ├── index.css               # Home page: tilt-card, particles, scroll-reveal
│   ├── learning.css            # Learning page: accordion, fade-up cards, zoom effect
│   ├── advance-learning.css    # Advanced page: sidebar nav-item, content-section, fadeIn
│   ├── challenge.css           # Challenge page: glass-panel, slideIn, email body
│   └── scorecard.css           # Scorecard page: score-circle, animate-score keyframe
│
└── js/
    ├── theme.js                # Dark/light mode toggle — FOUC prevention, localStorage
    ├── main.js                 # Shared JS placeholder
    ├── index.js                # Home: hero parallax, IntersectionObserver, cyber-canvas
    ├── learning.js             # Learning: hero parallax, fade-up observer, accordion handler
    ├── advance-learning.js     # Advanced: showSection(), markComplete(), hash routing
    ├── challenge.js            # Challenge: placeholder (logic lives in Alpine.js x-data)
    └── scorecard.js            # Scorecard: score animation, badge assignment, breakdown
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Structure and semantic markup for all 5 pages |
| **CSS3** | Animations, keyframes, custom scrollbars, light/dark mode overrides |
| **Vanilla JavaScript (ES6+)** | Theme switching, parallax, IntersectionObserver, canvas particle system, score logic |
| **[Tailwind CSS v3](https://tailwindcss.com/)** | Utility-first styling loaded via CDN, with custom theme tokens configured inline |
| **[Alpine.js v3](https://alpinejs.dev/)** | Reactive quiz state management in `challenge.html` (loaded via CDN) |
| **[Material Symbols](https://fonts.google.com/icons)** | Icon font from Google Fonts used across all pages |
| **Google Fonts** | Typography: custom font families loaded via CDN |
| **Web Canvas API** | Animated particle/node network background on the home page |
| **`localStorage`** | Persists theme preference and quiz scores across page navigations |
| **[Vercel Serverless Functions](https://vercel.com/docs/functions)** | Node.js API routes in `/api` — answer key hidden from client |

---

## 🚀 How to Run Locally

The quiz validation requires the Vercel serverless backend. Use the **Vercel CLI** for the full experience locally:

**1. Clone the repository**
```bash
git clone https://github.com/your-username/phishshaala.git
cd phishshaala
```

**2. Install Vercel CLI (once)**
```bash
npm install -g vercel
```

**3. Run locally with serverless functions**
```bash
vercel dev
# Opens at http://localhost:3000
# API routes: http://localhost:3000/api/questions
#             http://localhost:3000/api/submit
```

> **Alternative (static pages only, quiz API won't work):**
> ```bash
> python3 -m http.server 8080
> # Then open http://localhost:8080
> # Note: challenge.html will show a "Could not load" error without the API
> ```

## ☁️ Deploy to Vercel

```bash
# One-command deploy from project root
vercel --prod
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments on every push. No additional configuration needed — `vercel.json` is already set up.

---

## 🙏 Credits

| Role | Name / Resource |
|---|---|
| Developer | *[Add your name here]* |
| Team Members | *[Add team members here]* |
| Design Inspiration | *[Add references here]* |
| Icons | [Google Material Symbols](https://fonts.google.com/icons) |
| CSS Framework | [Tailwind CSS](https://tailwindcss.com/) |
| Reactivity Library | [Alpine.js](https://alpinejs.dev/) |

---

<p align="center">Made with ❤️ to help people stay safe online.</p>
