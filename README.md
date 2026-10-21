# Shayan Muhammad — Personal Portfolio Website ⚡

> **Full-Stack AI Engineer | RAG Pipelines | Agentic Workflows | Computer Vision**  
> 🌐 **Live Website:** [https://portfolio-five-tau-otr0exu0jk.vercel.app](https://portfolio-five-tau-otr0exu0jk.vercel.app)

A high-performance, dark-themed developer portfolio crafted with vanilla HTML5, CSS3, and modern JavaScript. Designed with glassmorphism, interactive particle networks, smooth scroll reveals, dynamic typing, and responsive layout.

---

## 🚀 Quick Start & Build Commands

This project uses **[Bun](https://bun.sh)** for instant local serving and build verification:

```bash
# Start local development server (http://localhost:3000)
bun run dev

# Run build integrity & link verification check
bun run build

# Bump build patch version
bun run build:bump
```

---

## 📁 Project Structure

```text
portfolio/
├── index.html              # Main HTML structure with semantic sections
├── index.css               # Design system tokens, glassmorphism, animations
├── index.js                # Particle canvas, typing effect, scroll reveals, counters
├── package.json            # Bun build and dev scripts
├── vercel.json             # Vercel edge deployment & caching configuration
├── Shayan-Resume.pdf       # Direct CV download file
├── profile.jpg             # Profile picture placeholder (replace with your photo!)
├── BUILDS.md               # Continuous build ledger & session handoff queue
├── AGENTS.md               # AI agent operational contract & auto-mode rules
├── AGENT_REFLECTION.md     # Agent self-critique, root causes & improvements
├── build-manifest.json     # Auto-generated build hash & verification stamp
├── scripts/
│   ├── build.js            # Build validator & integrity checker
│   └── dev.js              # Native Bun static dev server
└── .agents/
    ├── mcp_config.json     # Model Context Protocol tools configuration
    └── rules/
        └── continuity.md   # Automatic session continuity rule
```

---

## 🌐 How to Deploy on Vercel

You can deploy this website to Vercel in less than 2 minutes using either of these two methods:

### Method 1: Deploy via GitHub (Recommended — Auto-Updates on Push)

1. **Create a new repository on GitHub:**
   - Go to [github.com/new](https://github.com/new).
   - Name it (e.g., `portfolio` or `shayan-portfolio`).
   - Leave it public or private, without initializing README.

2. **Push your code from this folder:**
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of portfolio website"
   git branch -M main
   git remote add origin https://github.com/ShayanMuhammad-CS/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

3. **Import into Vercel:**
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click **"Add New..."** → **"Project"**.
   - Select your `portfolio` repository from the list.
   - **Framework Preset**: Select **"Other"** (it will auto-detect static files).
   - Click **Deploy**.
   - Your site will be live instantly with a free `https://<project-name>.vercel.app` URL and automatic SSL certificate!

---

### Method 2: Deploy directly via Vercel CLI (1 Command)

1. Run the Vercel CLI tool in the terminal:
   ```bash
   npx vercel
   ```
2. Log in when prompted in the browser.
3. Accept the default prompts:
   - `Set up and deploy?` → **Y**
   - `Which scope?` → Select your personal account
   - `Link to existing project?` → **N**
   - `Project name?` → `portfolio` (or press Enter)
   - `In which directory is your code located?` → `./` (press Enter)
4. For production deployment:
   ```bash
   npx vercel --prod
   ```

---

## 🎨 Customization Checklist

- [ ] **Profile Photo**: Drop your real photo into this folder and name it `profile.jpg` (or overwrite the existing `profile.jpg`).
- [ ] **Contact Form**: If you want form submissions to land directly in your email inbox, sign up for free at [formspree.io](https://formspree.io), create a new form, and replace `YOUR_FORM_ID` in line 639 of `index.html` with your Formspree ID.
- [ ] **Custom Domain (Optional)**: In Vercel Project Settings → Domains, you can add your custom domain (e.g. `shayanmuhammad.com`).

---

## 🛠️ Tech Stack

- **HTML5**: Semantic tags, accessibility attributes, SEO meta tags, OpenGraph previews.
- **Vanilla CSS3**: CSS custom properties (design tokens), backdrop-filter blur glassmorphism, responsive grid & flexbox, GPU-accelerated keyframe animations.
- **Vanilla JavaScript (ES6+)**: HTML5 Canvas particle network with interactive mouse repulsion, multi-role typing animation, IntersectionObserver scroll triggers, animated stats counter.
- **Vercel**: Instant global CDN edge deployment, automatic HTTPS, zero configuration.
