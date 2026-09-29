# 🚀 Sanity CMS Setup & Management Guide

## 📌 Project Overview
- **Project Name:** `dchall`
- **Project ID:** `w16kaeyg`
- **Dataset:** `production`
- **Hosting:** GitHub Pages (`https://seadib.github.io/dc-hall/`)
- **Repository:** `https://github.com/seadib/dc-hall`
- **Live Studio Admin Panel:** [https://dchall.sanity.studio/](https://dchall.sanity.studio/)
- **Sanity Manage Dashboard:** [https://www.sanity.io/manage/project/w16kaeyg](https://www.sanity.io/manage/project/w16kaeyg)

---

## ⚡ How Data Works
1. **Cloud Content Lake:** All student records, room allocations, photo gallery items, and site settings are stored securely in Sanity's Cloud Content Lake.
2. **Fast CDN Delivery:** The website queries data in real-time via Sanity's global cached CDN (`https://w16kaeyg.apicdn.sanity.io/`).
3. **Instant Live Updates:** When an admin edits or publishes a document in Sanity Studio, it becomes visible instantly on the website without any rebuild or git commit delay!
4. **Resilient Local Fallback:** If offline or if the API cannot be reached, the site automatically falls back to local JSON files in `data/`.

---

## 🛠️ Sanity Studio (Admin Panel)

The Sanity Studio schemas are configured inside the `studio/` folder:
- `studio/sanity.config.js`
- `studio/sanity.cli.js`
- `studio/schemaTypes/`:
  - `student.js`: Student profiles, rolls, rooms, phone numbers, and CT/Yearly exam PDF uploads.
  - `room.js`: Room numbers, seat capacity, descriptions, and photo gallery.
  - `siteSettings.js`: Site logos, hero banners, privacy passwords, and lock toggles.
  - `galleryItem.js`: Photo gallery cards, captions, and order.
  - `homePage.js`: Homepage banners, translations, and map links.
  - `hallInfo.js`: Hall history, super info, and alumni profiles.
  - `developerProfile.js`: Developer page info and contributors.

---

## 🌐 Deploying & Accessing Sanity Studio

### Option 1: Free Sanity Cloud Hosting (Recommended)
You can deploy your studio for free with one command:
```bash
cd studio
npm install
npm run deploy
```
Follow the prompt to choose a name (e.g. `dchall.sanity.studio`). Once deployed, anyone with your Google Account can log in and manage the site from phone or desktop!

### Option 2: Running Locally for Development
```bash
cd studio
npm install
npm run dev
```
Open [http://localhost:3333](http://localhost:3333) in your browser.

---

## 🔄 Re-migrating or Updating Local Data
If you ever want to re-upload local `data/site_db.json` into Sanity:
```bash
python scripts/migrate_to_sanity.py
```
To test querying Sanity CDN:
```bash
python scripts/test_sanity_query.py
```
