# THE DEFENDER — 3D Courtroom Strategy Simulator

A narrative courtroom strategy game built with React, Vite, Tailwind CSS, Framer Motion, React Three Fiber, and Three.js.

## Features

- Interactive 3D courtroom with reactive jury mood indicators
- Opening-statement, evidence, cross-examination, objection, and closing-argument phases
- Evidence discovery and linking mechanics
- Two playable cases with distinct facts, witnesses, and jury profiles
- Reputation, defense/prosecution score, jury opinion, and client-stress systems
- Animated live court transcript and verdict recap

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
├── App.jsx
├── index.css
├── main.jsx
└── components/
    └── Courtroom3D.jsx
```

## Deploy

The `dist` folder produced by `npm run build` is a static site. Upload that folder to any static web host, or connect the GitHub repository to a host such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages.
