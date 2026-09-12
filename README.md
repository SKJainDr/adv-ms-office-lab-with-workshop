# Advanced MS Office Lab 🎮
### Invertis University, Bareilly — Advanced MS Office Lab (Course VOI001)

An interactive, game-style learning app that teaches and tests **MS Word, MS Excel & MS PowerPoint** — built directly from the VOI001 *Introduction of MS-Office* syllabus. Students play through 14 sections (100 tasks total), earn points, and unlock a printable, signable certificate for every section they finish with a perfect score.

No build tools, no installs, no server required — it's a plain static site (HTML/CSS/JS) that runs entirely in the browser.

---

## ✨ Features

- **10 major sections, 7 subsections each** covering every unit of the syllabus (Word basics/formatting/objects/mail-merge, Excel basics/formulas/data-tools, PowerPoint basics/media/animation).
- **Four question styles**: multiple choice, true/false, "click the correct ribbon tab/button", and "type the correct formula/shortcut".
- **Points & progress rings** — first-try correct answers earn 10 points, retries earn 5; each section shows a live completion ring.
- **Dark / light mode** toggle (🌙 / ☀️ button, top-right).
- **Printable Certificate of Achievement**, unlocked once a student completes *every* subsection in a section at 100%. Each certificate carries:
  - A unique registration number (format `MSO/26/01`, `MSO/26/02`, …)
  - Invertis University's logo + the app's circular brand mark as a decorative seal
  - Institute name, lab name ("Advanced MS Office Lab"), and the specific section/skill qualified
  - Student name, father's name, student ID, class/semester, and date of issue
  - A signature line reserved for **Dr. S. K. Jain, Lab Professor**
  - An ornate double-border, corner flourishes, and a subtle watermark seal
- Progress is saved on-device automatically (falls back gracefully if browser storage is unavailable — nothing ever crashes).

---

## 🚀 How to publish this on GitHub Pages (free hosting)

1. **Create a new repository** on GitHub (e.g. `mso-office-lab-quest`) — public or private, either works with Pages on a paid/edu plan; public repos get Pages for free.
2. **Upload these files**, keeping the folder structure exactly as-is:
   ```
   index.html
   css/style.css
   js/data.js
   js/app.js
   assets/university-logo.png
   assets/brand-orb.jpg
   README.md
   ```
   Easiest way: on the repo page, click **Add file → Upload files**, drag the whole folder in, and commit.
3. Go to the repo's **Settings → Pages**.
4. Under "Build and deployment", set **Source: Deploy from a branch**, branch: `main`, folder: `/ (root)`. Click **Save**.
5. Wait about a minute, then GitHub will show your live URL, typically:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```
6. Share that link with students — it works on any laptop or phone browser, no installation needed.

### Running it locally (optional, for testing before publishing)
Just double-click `index.html` to open it in a browser — or, for the most reliable experience (some browsers restrict local file access), serve it with any simple local server, e.g.:
```bash
cd mso-office-lab-quest
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## 🖨️ How students get their certificate signed

1. Complete all 7 subsections of a section with correct answers (retries are allowed — no penalty except fewer points).
2. Once the section hits 100%, a **"Generate Certificate"** banner appears.
3. The student fills in their name, father's name, student ID, and class/semester (only needs to be entered once — it's remembered for later certificates too).
4. Click **Print Certificate** → use the browser's print dialog → **Save as PDF** or print directly.
5. Bring the printed certificate to **Dr. S. K. Jain, Lab Professor**, for countersignature.

---

## 🛠️ Customizing or extending

- All quiz content lives in **`js/data.js`** — each section is a plain JavaScript object with a `subs` array. Add/edit sections or questions there; no other file needs to change.
- Colors, fonts and spacing are defined once at the top of **`css/style.css`** as CSS variables (`:root` for light mode, `html[data-theme="dark"]` for dark mode) — tweak the palette there.
- Certificate registration numbers are generated automatically and increment per device (`MSO/26/01`, `MSO/26/02`, …). If you deploy this for many students on a shared computer, each new *section* certificate generated gets the next number in sequence.

---

## 📚 Syllabus coverage reference

| # | Section | Office App | Syllabus Unit |
|---|---------|-----------|----------------|
| 1 | Word Foundations | Word | Unit I |
| 2 | Fonts, Paragraphs & Styles | Word | Unit I |
| 3 | Lists, Graphics & Tables | Word | Unit I |
| 4 | Headers, Mail Merge & Proofing | Word | Unit I |
| 5 | Excel Foundations | Excel | Unit II |
| 6 | Formulas & Functions | Excel | Unit II |
| 7 | Sorting, Charts & PivotTables | Excel | Unit III |
| 8 | PowerPoint Foundations | PowerPoint | Unit IV |
| 9 | Objects, Media & SmartArt | PowerPoint | Unit IV |
| 10 | Animation, Transitions & Delivery | PowerPoint | Unit IV |

---

Built for **VOI001: Introduction of MS-Office**, B.Sc. (Vocational), Invertis University, Bareilly.
