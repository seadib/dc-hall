# 🏫 Dhaka College International Hall Management System

A 100% dynamic, modern, responsive web application and management system built for the students of the 11th Grade of **Dhaka College International Hall**.

This platform combines a premium, glassmorphic client-side interface with a secure, serverless Git-based database powered by **Decap CMS** (formerly Netlify CMS) to offer zero-maintenance, zero-code content management.

---

## ✨ Core Features

### 👥 Student Directory & Search
- Full list of hall residents with lazy-loaded profiles and dynamic content rendering.
- Real-time search by name, room number, section, or roll.
- Advanced filtering panel supporting search constraints by Group (Science, Arts, Commerce) and Blood Group.
- Custom interactive modal card for each student containing complete academic and contact details.

### 🛏️ Roommate & Allocation View
- Dynamic rooms viewer displaying room lists, custom descriptions, and room-specific photo galleries.
- Instant calculation and linking of roommates sharing the same room.

### 📝 Academic Results Portal
- Instant portal to view and download semester term results.
- Dynamic linkages to term-specific result PDFs (CT-1, CT-2, Half Yearly, CT-3, and Yearly Exams).

### ⚙️ Low-Credit Admin CMS (Decap CMS)
- Secure administrative portal accessible directly at `/admin/` via Netlify Identity.
- **Accordion-style management interface** with collapsed cards for fast, intuitive edits.
- **Optimized for Low Build Credits**: Powered by single-file list collections (`data/students.json` and `data/rooms.json`), allowing you to make dozens of edits, additions, or deletions across students and rooms, saving them in **one single commit and deploy** to save Netlify build minutes.
- Direct management over global settings, homepage sliders, rotating phrases, notice PDFs, custom logos, developer profiles, hall supervisors, and gallery cards.

### 🌐 Multilingual Engine
- Full real-time toggling between English (EN) and Bangla (BN) languages across the entire site without page reloads.

### ⚡ Premium UI/UX & Resiliency
- Built using glassmorphic styling, responsive flex/grid layouts, Outfit/Inter typography, and smooth AOS scroll animations.
- **Fail-Safe Fallbacks**: Auto-detection of broken or missing image files with instant inline white SVG vector icon replacements for contact links (Phone, WhatsApp, Email, Facebook, Messenger).

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla), Modern JavaScript (ES6+ async/await)
- **CMS Database & Admin**: Sanity Headless CMS (Sanity Content Lake & Sanity Studio v3)
- **Asset & Media Delivery**: Sanity Global CDN (`apicdn.sanity.io` & `cdn.sanity.io`)
- **Hosting**: GitHub Pages (`https://seadib.github.io/dc-hall/`)
- **Automation Pipeliners**:
  - Python migration & normalizer (`scripts/migrate_to_sanity.py`)
  - Real-time client-side GROQ query processor (`js/sanity-client.js`)

---

## 🚀 Getting Started

### Local Development
To run the project locally and view changes in your browser:
1. Double-click `index.html` or run a local server (e.g., Live Server in VS Code, or `python -m http.server 5500`).
2. The website will automatically fetch live content from Sanity CDN.

### Deploying to GitHub Pages
1. Commit and push your changes to `https://github.com/seadib/dc-hall` on the `main` branch.
2. In your GitHub repository, go to **Settings** -> **Pages**:
   - Source: **Deploy from a branch**
   - Branch: `main` / `root`
   - Click **Save**.
3. Your site will be live at `https://seadib.github.io/dc-hall/`!

---

## 🔍 SEO & Favicon Optimization Guidelines

To ensure the website is fully indexable and ranked highly under keywords like `dhaka college international hall wbsite`, `dc hall website`, `adib dchall`, `international hall info`, and `hostel`, we have integrated a dedicated SEO and favicon system:

### 1. Favicon Search Result Requirements
Google and other search engines require specific formats for favicons to show up in search results:
- **Multiple Sizes**: Declared in all HTML headers for multiple square resolutions (192x192, 96x96, 48x48, 32x32, 16x16) along with Apple touch icons (180x180). This complies with Google's guidelines that favicons must be a multiple of 48px square.
- **Source Image**: The official building image is located at `images/logo.png`. Overwriting this file automatically updates the favicon and logo everywhere.

### 2. Search Keywords & Metadata
- **Meta Tags**: All HTML templates (`index.html`, `embed.html`, etc.) contain specific description and keyword tags targeting: `dhaka college international hall wbsite`, `dc hall website`, `adib dchall`, `international hall info`, `hostel`.
- **JSON-LD Schema**: Embedded structured JSON-LD organization markup in `index.html` to help Google index alternative search synonyms.

### 3. Automated SEO Script
If you add new HTML pages to the project and want to apply these meta and favicon settings instantly, run:
```bash
python scripts/seo-update.py
```

### 4. Indexing & Discovery
- **`robots.txt`**: Located in the root directory to allow crawlers to index the site and point to the sitemap.
- **`sitemap.xml`**: Maps and indexes all HTML pages so Google can discover them immediately.

