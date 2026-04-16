# Kashyap Ajudiya — Portfolio Website

A modern, recruiter-focused personal portfolio website built with **React**, **Tailwind CSS**, and **Framer Motion**.

🔗 **Live Site:** _Coming soon (deploy to Vercel/Netlify)_

---

## ✨ Features

- **Hero Section** — Animated terminal window, gradient typography, and CTA buttons
- **About** — Bio with key engineering impact stats
- **Skills** — Grouped skill badges (Backend, Cloud, Languages, Databases, Tools, Concepts)
- **Projects** — Problem / Solution / Impact cards with tech stack badges
- **Experience** — Vertical timeline with achievement-focused bullet points
- **Education & Achievements** — Degree info + certifications
- **Contact** — Direct links to Email, Phone, GitHub, LinkedIn
- **Dark / Light Mode** — Toggle with `localStorage` persistence
- **Smooth animations** — Scroll-reveal via Framer Motion
- **Responsive** — Mobile-first design

---

## 🛠 Tech Stack

| Layer       | Technology                     |
|-------------|-------------------------------|
| Framework   | React 18 + Vite                |
| Styling     | Tailwind CSS v3                |
| Animations  | Framer Motion                  |
| Icons       | React Icons                    |
| Fonts       | Inter + JetBrains Mono (Google Fonts) |

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
├── App.jsx                  # Root component
├── main.jsx                 # Entry point
├── index.css                # Tailwind directives + global utilities
├── context/
│   └── ThemeContext.jsx      # Dark/light mode context
├── data/
│   └── resumeData.js        # All content — easy to update
└── components/
    ├── Navbar.jsx            # Sticky nav with active section highlight
    ├── Hero.jsx              # Animated terminal + CTAs
    ├── About.jsx             # Bio + stats
    ├── Skills.jsx            # Grouped skill cards
    ├── Projects.jsx          # Project cards with P/S/I layout
    ├── Experience.jsx        # Timeline
    ├── Education.jsx         # Education + achievements
    ├── Contact.jsx           # Contact links
    ├── Footer.jsx
    └── SectionTitle.jsx      # Reusable animated section header
```

---

## ⚙️ Customization

All content lives in **`src/data/resumeData.js`** — update your name, links, projects, skills, and experience there without touching any component.

To enable the **Download Resume** button, place your PDF at:
```
public/resume.pdf
```

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
