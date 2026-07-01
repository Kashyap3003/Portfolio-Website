# Kashyap Ajudiya — Portfolio Website

A modern, recruiter-focused personal portfolio built with **React**, **Tailwind CSS**, and **Framer Motion** — featuring a custom **"Midnight Observability"** design system with 3D interactions, a generative canvas background, and a fully theme-aware token system.

🔗 **Live Site:** _Coming soon (deploy to Vercel/Netlify)_

---

## ✨ Features

### Sections
- **Hero** — Masked line-reveal typography, animated gradient name, pointer parallax, a generative event-stream canvas, a rotating 3D wireframe cube, and a live "telemetry" stats strip with count-up numbers
- **About** — Bio with Core Expertise cards
- **Skills** — Grouped skill badges (Backend, Cloud, Languages, Databases, Tools, Concepts)
- **Projects** — Problem / Solution / Impact cards with tech-stack badges
- **Experience** — Vertical timeline with achievement-focused bullets
- **Education & Achievements** — Degree info + certifications
- **Contact** — Direct links to Email, Phone, GitHub, LinkedIn

### Interaction & motion
- **Custom cursor** — Snappy dot + lagging ring that grows over interactive elements (pointer devices only)
- **Scroll progress bar** — Gradient signal bar pinned to the top
- **Side-rail navigator** — Fixed vertical section nav with active-section tracking (desktop)
- **Magnetic elements** — Buttons/icons drift toward the cursor and spring back
- **3D tilt cards** — Cursor-driven `rotateX/Y` with a moving glare highlight
- **Spotlight glow cards** — Radial highlight that follows the cursor across a panel
- **Animated counters** — Numbers count up when scrolled into view
- **Marquee ticker** — Seamless infinite scroller that pauses on hover
- **Scroll-reveal** — Standardized `Reveal` wrapper across all sections

### Design system & theming
- **"Midnight Observability" tokens** — Semantic CSS variables (`--ground`, `--surface`, `--accent`, `--spark`, `--hairline`, …) wired into Tailwind for fully theme-aware colors
- **Dark / Light mode** — Toggle with `localStorage` persistence
- **Atmospheric backgrounds** — Layered mesh gradient, grid, and SVG noise
- **Animated gradient (signal) text**, glass panels, and custom scrollbar
- **Accessibility** — Respects `prefers-reduced-motion`, visible focus rings, `aria` labels, and pointer/touch capability detection
- **Responsive** — Mobile-first design

---

## 🛠 Tech Stack

| Layer       | Technology                                          |
|-------------|-----------------------------------------------------|
| Framework   | React 18 + Vite                                     |
| Styling     | Tailwind CSS v3 + CSS custom-property design tokens  |
| Animations  | Framer Motion + Canvas 2D + CSS 3D transforms        |
| Icons       | React Icons                                         |
| Fonts       | Bricolage Grotesque + Inter + JetBrains Mono (Google Fonts) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/Kashyap3003/Portfolio-Website.git
cd Portfolio-Website

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build       # outputs to /dist
npm run preview     # preview the production build locally
```

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Root — mounts background layers + all sections
├── main.jsx                 # Entry point
├── index.css                # Design tokens, component utilities, keyframes
├── context/
│   └── ThemeContext.jsx     # Dark/light mode context
├── data/
│   └── resumeData.js        # All content — easy to update
├── lib/
│   └── spotlight.js         # Cursor-tracking spotlight helper for glow cards
└── components/
    ├── Navbar.jsx           # Sticky nav with active section highlight
    ├── Hero.jsx             # Line-reveal hero + telemetry stats
    ├── About.jsx            # Bio + Core Expertise
    ├── Skills.jsx           # Grouped skill cards
    ├── Projects.jsx         # Project cards with P/S/I layout
    ├── Experience.jsx       # Timeline
    ├── Education.jsx        # Education + achievements
    ├── Contact.jsx          # Contact links
    ├── Footer.jsx
    ├── SectionTitle.jsx     # Reusable animated section header
    │
    │   # Interaction / motion primitives
    ├── CursorGlow.jsx       # Custom dot + ring cursor
    ├── ScrollProgress.jsx   # Top scroll-progress bar
    ├── SideRail.jsx         # Fixed vertical section navigator
    ├── Magnetic.jsx         # Cursor-magnetic wrapper
    ├── Tilt3D.jsx           # Cursor-driven 3D tilt card
    ├── Reveal.jsx           # Scroll-reveal wrapper
    ├── Counter.jsx          # Count-up number
    ├── Marquee.jsx          # Infinite ticker
    ├── Cube3D.jsx           # Pure-CSS 3D wireframe cube
    └── EventStream.jsx      # Generative event-stream canvas
```

---

## ⚙️ Customization

All content lives in **`src/data/resumeData.js`** — update your name, links, projects, skills, and experience there without touching any component.

**Theme & colors:** the entire palette is driven by CSS variables in **`src/index.css`** (`:root` for light, `.dark` for dark). Change `--accent` / `--spark` to re-skin the whole site.

**Resume download:** the **Download Resume** button points to `resumeFile` in `resumeData.js`. Place your PDF in `public/` and update the path (default: `public/Kashyap_CV.pdf`).

---

## 📦 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com/new](https://vercel.com/new) for automatic deployments on every push.

### Netlify

```bash
npm run build
# Drag and drop the /dist folder at app.netlify.com/drop
```

---

## 📄 License

MIT © [Kashyap Ajudiya](https://github.com/Kashyap3003)
