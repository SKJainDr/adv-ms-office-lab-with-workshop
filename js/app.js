/* =========================================================================
   MS OFFICE LAB QUEST — App Engine
   Invertis University Bareilly | Advanced MS Office Lab
   ========================================================================= */

/* ---------- Safe storage wrapper (works even if localStorage is blocked) ---------- */
const Store = (() => {
  let memory = {};
  let ok = true;
  try {
    const t = "__mso_test__";
    localStorage.setItem(t, "1");
    localStorage.removeItem(t);
  } catch (e) { ok = false; }
  return {
    get(key, fallback) {
      try {
        if (ok) {
          const v = localStorage.getItem(key);
          return v ? JSON.parse(v) : fallback;
        }
      } catch (e) {}
      return memory[key] !== undefined ? memory[key] : fallback;
    },
    set(key, value) {
      memory[key] = value;
      try { if (ok) localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
    }
  };
})();

/* ---------- State ---------- */
const State = {
  theme: Store.get("mso_theme", "light"),
  points: Store.get("mso_points", 0),
  completed: Store.get("mso_completed", {}),     // { subId: true }
  attempts: Store.get("mso_attempts", {}),        // { subId: count }
  locked: Store.get("mso_locked", {}),            // { subId: true } — both attempts used, wrong
  certNumbers: Store.get("mso_certnumbers", {}),  // { sectionId: "MSO/26/07" }
  profile: Store.get("mso_profile", null),        // { name, father, sid, cls }
  certSeq: Store.get("mso_certseq", 0),
  familyFilter: "all",
  currentSectionId: null
};

function persist() {
  Store.set("mso_points", State.points);
  Store.set("mso_completed", State.completed);
  Store.set("mso_attempts", State.attempts);
  Store.set("mso_locked", State.locked);
  Store.set("mso_certnumbers", State.certNumbers);
  Store.set("mso_profile", State.profile);
  Store.set("mso_certseq", State.certSeq);
  updateHeaderStats();
}

/* ---------- Theme ---------- */
function applyTheme() {
  document.documentElement.setAttribute("data-theme", State.theme);
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = State.theme === "dark" ? "☀️" : "🌙";
}
function toggleTheme() {
  State.theme = State.theme === "dark" ? "light" : "dark";
  Store.set("mso_theme", State.theme);
  applyTheme();
}

/* ---------- Helpers ---------- */
function sectionProgress(section) {
  const done = section.subs.filter(s => State.completed[s.id]).length;
  return { done, total: section.subs.length, pct: Math.round((done / section.subs.length) * 100) };
}
function totalProgress() {
  let done = 0, total = 0;
  SECTIONS.forEach(s => { done += sectionProgress(s).done; total += s.subs.length; });
  return { done, total };
}
function sectionsCompletedCount() {
  return SECTIONS.filter(s => sectionProgress(s).pct === 100).length;
}

/* ---------- Rendering: Home ---------- */
function renderHome() {
  State.currentSectionId = null;
  const root = document.getElementById("view-root");
  const tp = totalProgress();
  const doneSections = sectionsCompletedCount();

  const families = [
    { key: "all", label: "All Sections" },
    { key: "word", label: "MS Word" },
    { key: "excel", label: "MS Excel" },
    { key: "ppt", label: "MS PowerPoint" },
    { key: "netmail", label: "Internet & Email" },
    { key: "access", label: "MS Access" }
  ];

  const visibleSections = SECTIONS.filter(s => State.familyFilter === "all" || s.app === State.familyFilter);

  root.innerHTML = `
    <div class="hero">
      <h2>Master MS&nbsp;Office — one section at a time.</h2>
      <p>Play through 20 lab sections covering Word, Excel, PowerPoint, Internet &amp; Email and MS Access from your VOI001 syllabus — including five advanced Challenge sections with realistic simulated software tasks. Answer tasks correctly, earn points, and unlock a printable certificate for every section you finish at 100%.</p>
      <div class="hero-progress">
        <div class="hp-item"><div class="num">${State.points}</div><div class="lbl">Points earned</div></div>
        <div class="hp-item"><div class="num">${tp.done}/${tp.total}</div><div class="lbl">Tasks completed</div></div>
        <div class="hp-item"><div class="num">${doneSections}/${SECTIONS.length}</div><div class="lbl">Certificates unlocked</div></div>
      </div>
      <div style="display:flex;gap:16px;flex-wrap:wrap;">
        <a class="hero-guide-link" href="guide/index.html" target="_blank" rel="noopener">📖 Read the Full User Guide &amp; Lab Manual &rarr;</a>
        <a class="hero-guide-link" href="guide/chapters/workshop-tasks/index.html" target="_blank" rel="noopener">🛠️ Advanced Workshop — 60 Hands-On Tasks &rarr;</a>
        <a class="hero-guide-link" href="workshop-booklet.html" target="_blank" rel="noopener">📝 Open the Workshop Booklet &rarr;</a>
      </div>
    </div>

    <div class="family-filter">
      ${families.map(f => `
        <button class="chip ${State.familyFilter === f.key ? "active" : ""}" data-fam="${f.key}">
          <span class="sw" style="background:${f.key === "all" ? "var(--ink-soft)" : `var(--${f.key})`}"></span>${f.label}
        </button>`).join("")}
    </div>

    <div class="grid">
      ${visibleSections.map(cartHTML).join("")}
    </div>

    <div class="site-footer">
      <div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:8px;">
        <img src="assets/brand-orb.jpg" alt="Invertis University mark" style="height:22px;width:22px;border-radius:50%;object-fit:cover;">
        <img src="assets/university-logo.png" alt="Invertis University logo" style="height:22px;width:auto;" onerror="this.style.display='none'">
      </div>
      Advanced MS Office Lab &middot; Invertis University Bareilly &middot; Built for VOI001 — Introduction of MS-Office<br/>
      Complete every subsection of a section at 100% to unlock its printable certificate, countersigned by Dr. S. K. Jain, Lab Professor.<br/>
      Prepared &amp; maintained by <strong>Dr. S. K. Jain</strong>, Associate Professor in Physics, Department of Applied Sciences and Humanities, Invertis University, Bareilly, India &middot;
      <a href="mailto:sanjeev.j@invertis.org">sanjeev.j@invertis.org</a> &middot; &copy; 2026 Author. Site maintained by Dr. S. K. Jain.
      <div style="margin-top:10px;">
        <img src="https://visitor-badge.laobi.icu/badge?page_id=drskjain-mso-office-lab" alt="Visitor count for this page" style="height:20px;vertical-align:middle;border-radius:4px;opacity:.9;">
      </div>
    </div>
  `;

  document.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => { State.familyFilter = btn.dataset.fam; renderHome(); });
  });
  document.querySelectorAll("[data-open-section]").forEach(el => {
    el.addEventListener("click", () => openSection(el.dataset.openSection));
  });
}

function cartHTML(section) {
  const prog = sectionProgress(section);
  const r = 20, circ = 2 * Math.PI * r;
  const offset = circ - (prog.pct / 100) * circ;
  const complete = prog.pct === 100;
  return `
    <div class="cart" style="--fam-color:var(--${section.app})" data-open-section="${section.id}">
      <div class="cart-head">
        <div>
          <div class="cart-tag">${APP_META[section.app].label}</div>
        </div>
        <div class="cart-glyph">${APP_META[section.app].glyph}</div>
      </div>
      <div>
        <h3>${section.title}</h3>
        <p class="tagline">${section.tagline}</p>
      </div>
      <div class="cart-foot">
        <div class="ring" style="--fam-color:var(--${section.app})">
          <svg viewBox="0 0 50 50">
            <circle class="track" cx="25" cy="25" r="${r}"></circle>
            <circle class="fill" cx="25" cy="25" r="${r}" stroke-dasharray="${circ}" stroke-dashoffset="${offset}"></circle>
          </svg>
          <div class="pct">${prog.pct}%</div>
        </div>
        ${complete
          ? `<span class="badge-done">🏅 Certificate ready</span>`
          : `<button class="cart-cta" style="background:var(--${section.app})">${prog.done ? "Continue" : "Start"} (${prog.done}/${prog.total})</button>`}
      </div>
    </div>
  `;
}

/* ---------- Rendering: Section detail ---------- */
const GUIDE_LINKS = {
  "word-basics": { url: "guide/chapters/word/#sec-1-1", label: "1.1 Introduction to Word and Screen Layout" },
  "word-formatting": { url: "guide/chapters/word/#sec-1-5", label: "1.5 Formatting Text and Paragraphs" },
  "word-lists-objects": { url: "guide/chapters/word/#sec-1-7", label: "1.7 Bullets and Numbered Lists" },
  "word-advanced": { url: "guide/chapters/word/#sec-1-11", label: "1.11 Header and Footer" },
  "word-challenge": { url: "guide/chapters/word/#sec-1-12", label: "1.12 Mail Merge (full Word chapter)" },
  "excel-basics": { url: "guide/chapters/excel/#sec-2-1", label: "2.1 Introduction to the Excel Environment" },
  "excel-formulas": { url: "guide/chapters/excel/#sec-2-4", label: "2.4 Formulas and Functions" },
  "excel-data-tools": { url: "guide/chapters/excel/#sec-2-5", label: "2.5 Sorting and Filtering Data" },
  "excel-graphs": { url: "guide/chapters/excel/#sec-2-6", label: "2.6 Creating and Formatting Charts" },
  "excel-challenge": { url: "guide/chapters/excel/#sec-2-7", label: "2.7 Advanced List Management (full Excel chapter)" },
  "ppt-basics": { url: "guide/chapters/powerpoint/#sec-3-1", label: "3.1 Setting up the PowerPoint Environment" },
  "ppt-objects-media": { url: "guide/chapters/powerpoint/#sec-3-5", label: "3.5 Working with Objects" },
  "ppt-animation-delivery": { url: "guide/chapters/powerpoint/#sec-3-9", label: "3.9 Animation and Slide Transition" },
  "ppt-challenge": { url: "guide/chapters/powerpoint/#sec-3-6", label: "3.6 Hyperlinks and Action Buttons (full PPT chapter)" },
  "netmail-basics": { url: "guide/chapters/internet-email/#sec-4-2", label: "4.2 The World Wide Web (WWW) and How It Works" },
  "netmail-advanced": { url: "guide/chapters/internet-email/#sec-4-10", label: "4.10 Creating an Email Account" },
  "netmail-challenge": { url: "guide/chapters/internet-email/#sec-4-16", label: "4.16 Worked Walkthrough: Setting Up an Account and Sending an Email with Attachment" },
  "access-basics": { url: "guide/chapters/ms-access/#sec-5-4", label: "5.4 Creating a Table and Choosing Data Types" },
  "access-queries-forms": { url: "guide/chapters/ms-access/#sec-5-8", label: "5.8 Creating Basic Queries" },
  "access-challenge": { url: "guide/chapters/ms-access/#sec-5-14", label: "5.14 Worked Walkthrough: Building a Complete Student Database" }
};

function openSection(sectionId) {
  State.currentSectionId = sectionId;
  const section = SECTION_MAP[sectionId];
  const prog = sectionProgress(section);
  const root = document.getElementById("view-root");
  const guideLink = GUIDE_LINKS[sectionId];

  root.innerHTML = `
    <div class="section-header">
      <button class="back-btn" id="back-home">← All sections</button>
      <div class="glyph-lg" style="background:var(--${section.app})">${APP_META[section.app].glyph}</div>
      <div>
        <h2>${section.title}</h2>
        <p class="sub">${APP_META[section.app].label} &middot; ${section.tagline}</p>
      </div>
    </div>
    ${guideLink ? `<a class="guide-link" style="--fam-color:var(--${section.app})" href="${guideLink.url}" target="_blank" rel="noopener">📖 Read the related guide chapter — <span>${guideLink.label}</span></a>` : ""}
    <div class="section-progress-bar">
      <div style="width:${prog.pct}%; background:var(--${section.app})"></div>
    </div>
    <div class="sub-list">
      ${section.subs.map((sub, i) => subRowHTML(sub, i, section)).join("")}
    </div>
    ${prog.pct === 100 ? certBannerHTML(section) : ""}
  `;

  document.getElementById("back-home").addEventListener("click", renderHome);
  section.subs.forEach(sub => {
    const el = document.getElementById(`row-${sub.id}`);
    if (el) el.addEventListener("click", () => openQuiz(section, sub));
  });
  const certBtn = document.getElementById("open-cert-btn");
  if (certBtn) certBtn.addEventListener("click", () => openCertificateFlow(section));
}

function subRowHTML(sub, i, section) {
  const done = !!State.completed[sub.id];
  const locked = !done && !!State.locked[sub.id];
  const typeLabel = { mcq: "Choose one", truefalse: "True / False", fill: "Type answer", click: "Click the tab", sim: "Simulate it" }[sub.type];
  const statusText = done ? "Completed" : (locked ? "Locked — both attempts used" : "Not started");
  return `
    <div class="sub-row ${done ? "done" : ""} ${locked ? "locked" : ""}" id="row-${sub.id}">
      <div class="sub-num">${String(i + 1).padStart(2, "0")}</div>
      <div class="sub-check">${done ? "✓" : (locked ? "🔒" : "")}</div>
      <div class="sub-info">
        <h4>${sub.title}</h4>
        <span>${statusText}</span>
      </div>
      <div class="sub-type-tag" style="color:var(--${section.app})">${typeLabel}</div>
      <button class="sub-go" style="${done ? `background:var(--${section.app})` : ""}">${done ? "Review" : (locked ? "Locked" : "Begin")}</button>
    </div>
  `;
}

function certBannerHTML(section) {
  const already = State.certNumbers[section.id];
  return `
    <div class="cert-banner" style="--fam-color:var(--${section.app})">
      <h4>🏆 100% Complete — Certificate Unlocked!</h4>
      <p>You've mastered every task in "${section.title}". Generate your certificate, then print it and bring it to Dr. S. K. Jain, Lab Professor, for signature.</p>
      <button id="open-cert-btn">${already ? "View / Print Certificate" : "Generate Certificate"}</button>
    </div>
  `;
}

/* ---------- Quiz Modal ---------- */
let activeQuiz = null;

function openQuiz(section, sub) {
  activeQuiz = { section, sub, resolved: false };
  const overlay = document.getElementById("modal-overlay");
  overlay.innerHTML = quizModalHTML(section, sub);
  overlay.classList.remove("hidden");
  wireQuizEvents(section, sub);
}

function quizModalHTML(section, sub) {
  const color = `var(--${section.app})`;
  let bodyHTML = "";
  const already = State.attempts[sub.id] || 0;
  const isLocked = !State.completed[sub.id] && !!State.locked[sub.id];
  const letters = ["A", "B", "C", "D"];

  if (isLocked) {
    // Both attempts used and still wrong — reveal the answer, no further input.
    const correctLabel = (sub.type === "mcq" || sub.type === "click" || sub.type === "sim")
      ? sub.options[sub.correct]
      : (sub.type === "truefalse" ? (sub.correct ? "True" : "False") : (sub.accepted ? sub.accepted[0] : ""));
    bodyHTML = `
      ${sub.type === "sim" ? `<div id="mock-canvas"><div class="mock-live-region">${sub.afterHTML || sub.setup}</div></div>` : ""}
      <div class="locked-box">
        <p><strong>🔒 Both attempts used.</strong> The correct answer was: <b>${correctLabel}</b></p>
        <p>${sub.explain || ""}</p>
        <p class="locked-note">To try this problem again, use the <b>↺ Reset</b> button in the header — that clears your entire score and lets you start fresh.</p>
      </div>`;
  } else if (sub.type === "mcq" || sub.type === "click") {
    bodyHTML = `
      <div class="opt-list">
        ${sub.options.map((opt, i) => `
          <button class="opt-btn ${sub.type === "click" ? "ribbon-style" : ""}" data-idx="${i}">
            <span class="letter">${letters[i]}</span>${opt}
          </button>`).join("")}
      </div>`;
  } else if (sub.type === "sim") {
    bodyHTML = `
      <div id="mock-canvas">${sub.setup}</div>
      <div class="opt-list">
        ${sub.options.map((opt, i) => `
          <button class="opt-btn ribbon-style" data-idx="${i}">
            <span class="letter">${letters[i]}</span>${opt}
          </button>`).join("")}
      </div>`;
  } else if (sub.type === "truefalse") {
    bodyHTML = `
      <div class="opt-list">
        <button class="opt-btn" data-bool="true"><span class="letter">T</span>True</button>
        <button class="opt-btn" data-bool="false"><span class="letter">F</span>False</button>
      </div>`;
  } else if (sub.type === "fill") {
    bodyHTML = `
      <div class="fill-row">
        <input type="text" id="fill-input" placeholder="Type your answer…" autocomplete="off" />
        <button id="fill-submit">Check</button>
      </div>
      <p class="hint">💡 ${sub.hint || ""}</p>`;
  }

  const attemptNote = isLocked ? "" :
    (already >= 1
      ? `<div class="attempt-note attempt-final">⚠️ Final attempt — correct now scores 5 pts, incorrect locks this problem.</div>`
      : `<div class="attempt-note">Attempt 1 of 2 &middot; first-try correct = 10 pts, second-try correct = 5 pts.</div>`);

  return `
    <div class="modal ${sub.type === "sim" ? "sim-modal" : ""}" style="--fam-color:${color}">
      <button class="modal-close" id="modal-close">✕</button>
      <div class="eyebrow" style="color:${color}">${APP_META[section.app].label} &middot; ${section.title}${sub.ribbon ? " &middot; " + sub.ribbon : ""}</div>
      <h3>${sub.title}</h3>
      <p class="q-prompt">${sub.prompt}</p>
      ${attemptNote}
      ${bodyHTML}
      <div class="feedback" id="quiz-feedback"></div>
      <div class="modal-actions" id="quiz-actions"></div>
    </div>
  `;
}

function wireQuizEvents(section, sub) {
  document.getElementById("modal-close").addEventListener("click", closeQuiz);
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target.id === "modal-overlay") closeQuiz();
  });

  const isLocked = !State.completed[sub.id] && !!State.locked[sub.id];
  if (isLocked) {
    return;
  }

  if (sub.type === "mcq" || sub.type === "click" || sub.type === "sim") {
    document.querySelectorAll(".opt-btn[data-idx]").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx, 10);
        gradeAnswer(section, sub, idx === sub.correct, btn);
      });
    });
  } else if (sub.type === "truefalse") {
    document.querySelectorAll(".opt-btn[data-bool]").forEach(btn => {
      btn.addEventListener("click", () => {
        const val = btn.dataset.bool === "true";
        gradeAnswer(section, sub, val === sub.correct, btn);
      });
    });
  } else if (sub.type === "fill") {
    const submit = () => {
      const input = document.getElementById("fill-input");
      const val = input.value.trim().toLowerCase().replace(/\s+/g, " ");
      const isCorrect = sub.accepted.some(a => val === a || val.replace(/\s/g, "") === a.replace(/\s/g, ""));
      gradeAnswer(section, sub, isCorrect, input);
    };
    document.getElementById("fill-submit").addEventListener("click", submit);
    document.getElementById("fill-input").addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
  }
}

function gradeAnswer(section, sub, isCorrect, el) {
  if (activeQuiz.resolved) return;
  const fb = document.getElementById("quiz-feedback");
  const actions = document.getElementById("quiz-actions");
  State.attempts[sub.id] = (State.attempts[sub.id] || 0) + 1;
  const attemptNum = State.attempts[sub.id];

  if (isCorrect) {
    activeQuiz.resolved = true;
    if (el.classList) el.classList.add("correct");
    const earned = attemptNum === 1 ? 10 : 5;
    if (!State.completed[sub.id]) {
      State.points += earned;
      State.completed[sub.id] = true;
      delete State.locked[sub.id];
      persist();
      showPointsToast(`+${earned} points — Correct!`);
    }
    fb.className = "feedback show good";
    fb.innerHTML = `<strong>✅ Correct!</strong>${sub.explain}`;
    actions.innerHTML = `<button class="btn-primary" id="quiz-next">Continue</button>`;
    document.getElementById("quiz-next").addEventListener("click", () => {
      closeQuiz();
      openSection(section.id);
    });
    if (sub.type === "sim") {
      const canvas = document.querySelector("#mock-canvas .mock-live-region");
      if (canvas && sub.afterHTML) {
        canvas.classList.add("mock-fading");
        setTimeout(() => {
          canvas.innerHTML = sub.afterHTML;
          canvas.classList.remove("mock-fading");
        }, 220);
      }
    }
    if (sub.type === "mcq" || sub.type === "click" || sub.type === "truefalse" || sub.type === "sim") {
      document.querySelectorAll(".opt-btn").forEach(b => b.disabled = true);
    }
  } else if (attemptNum >= 2) {
    // Both attempts used — lock the problem until an explicit reset.
    activeQuiz.resolved = true;
    State.locked[sub.id] = true;
    persist();
    if (el.classList) el.classList.add("wrong");
    document.querySelectorAll(".opt-btn").forEach(b => b.disabled = true);
    const correctLabel = (sub.type === "mcq" || sub.type === "click" || sub.type === "sim")
      ? sub.options[sub.correct]
      : (sub.type === "truefalse" ? (sub.correct ? "True" : "False") : (sub.accepted ? sub.accepted[0] : ""));
    fb.className = "feedback show bad";
    fb.innerHTML = `<strong>🔒 Both attempts used.</strong> The correct answer was: <b>${correctLabel}</b>.<br>${sub.explain || ""}`;
    if (sub.type === "sim") {
      const canvas = document.querySelector("#mock-canvas .mock-live-region");
      if (canvas && sub.afterHTML) {
        canvas.classList.add("mock-fading");
        setTimeout(() => {
          canvas.innerHTML = sub.afterHTML;
          canvas.classList.remove("mock-fading");
        }, 220);
      }
    }
    actions.innerHTML = `<button class="btn-primary" id="quiz-close-locked">Close</button>`;
    fb.innerHTML += `<p class="locked-note">To try this problem again, use the <b>↺ Reset</b> button in the header — that clears your entire score and lets you start fresh.</p>`;
    document.getElementById("quiz-close-locked").addEventListener("click", closeQuiz);
  } else {
    if (el.classList) el.classList.add("wrong");
    if (el.disabled !== undefined) el.disabled = true;
    fb.className = "feedback show bad";
    fb.innerHTML = `<strong>❌ Not quite.</strong> One attempt left — think it through and try again.`;
  }
}

function showPointsToast(msg) {
  const toast = document.getElementById("points-toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function closeQuiz() {
  document.getElementById("modal-overlay").classList.add("hidden");
  document.getElementById("modal-overlay").innerHTML = "";
  activeQuiz = null;
}

/* ---------- Certificate flow ---------- */
function openCertificateFlow(section) {
  const overlay = document.getElementById("modal-overlay");
  const p = State.profile || { name: "", father: "", sid: "", cls: "" };

  overlay.innerHTML = `
    <div class="modal cert-modal">
      <button class="modal-close" id="modal-close">✕</button>
      <div class="eyebrow" style="color:var(--${section.app})">Certificate of Achievement</div>
      <h3>${section.title}</h3>
      <p class="q-prompt">Enter the student details exactly as they should appear on the certificate.</p>
      <div class="profile-form">
        <div><label>Student Name</label><input id="cf-name" value="${escapeHTML(p.name)}" placeholder="e.g. Ananya Sharma" /></div>
        <div><label>Father's Name</label><input id="cf-father" value="${escapeHTML(p.father)}" placeholder="e.g. Rajesh Sharma" /></div>
        <div><label>Student ID</label><input id="cf-sid" value="${escapeHTML(p.sid)}" placeholder="e.g. IU2024BSC0142" /></div>
        <div><label>Class / Semester</label><input id="cf-cls" value="${escapeHTML(p.cls)}" placeholder="e.g. B.Sc. III Sem" /></div>
      </div>
      <div class="modal-actions">
        <button class="btn-ghost" id="modal-close-2">Cancel</button>
        <button class="btn-primary" id="cf-generate">Generate Certificate</button>
      </div>
    </div>
  `;
  overlay.classList.remove("hidden");
  document.getElementById("modal-close").addEventListener("click", closeQuiz);
  document.getElementById("modal-close-2").addEventListener("click", closeQuiz);
  document.getElementById("cf-generate").addEventListener("click", () => {
    const name = document.getElementById("cf-name").value.trim();
    const father = document.getElementById("cf-father").value.trim();
    const sid = document.getElementById("cf-sid").value.trim();
    const cls = document.getElementById("cf-cls").value.trim();
    if (!name || !father || !sid || !cls) {
      alert("Please fill in all four fields to generate the certificate.");
      return;
    }
    State.profile = { name, father, sid, cls };
    if (!State.certNumbers[section.id]) {
      State.certSeq += 1;
      State.certNumbers[section.id] = `MSO/26/${String(State.certSeq).padStart(2, "0")}`;
    }
    persist();
    renderCertificate(section);
  });
}

function renderCertificate(section) {
  const overlay = document.getElementById("modal-overlay");
  const p = State.profile;
  const regNo = State.certNumbers[section.id];
  const dateStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

  overlay.innerHTML = `
    <div class="modal cert-modal">
      <button class="modal-close" id="modal-close">✕</button>
      <div id="certificate-wrap">
        <div class="certificate">
          <div class="cwatermark"><img src="assets/brand-orb.jpg" alt=""/></div>
          <div class="border-frame"></div>
          <div class="corner tl"></div><div class="corner tr"></div>
          <div class="corner bl"></div><div class="corner br"></div>
          <div class="cert-inner">
            <div class="cert-top">
              <img class="uni-logo" src="assets/university-logo.png" alt="Invertis University Bareilly logo" />
              <div class="cert-orb"><img src="assets/brand-orb.jpg" alt=""/></div>
            </div>
            <div class="cert-inst">INVERTIS UNIVERSITY, BAREILLY</div>
            <div class="cert-lab">Advanced MS Office Lab</div>
            <div class="cert-title">Certificate of Achievement</div>
            <div class="cert-rule"></div>
            <p class="cert-body-txt">This certificate is proudly presented to</p>
            <div class="cert-name">${escapeHTML(p.name)}</div>
            <div class="cert-meta">
              <div><strong>${escapeHTML(p.father)}</strong>Father's Name</div>
              <div><strong>${escapeHTML(p.sid)}</strong>Student ID</div>
              <div><strong>${escapeHTML(p.cls)}</strong>Class / Semester</div>
            </div>
            <p class="cert-body-txt">for successfully completing all tasks with a perfect score in</p>
            <div class="cert-skill">${section.title} — ${APP_META[section.app].label}</div>
            <div class="cert-bottom">
              <div class="cert-regno">Certificate No.<br/>${regNo}</div>
              <div class="cert-sign">
                <div class="line"></div>
                Dr. S. K. Jain<br/>Lab Professor
              </div>
              <div class="cert-date">Date of Issue<br/>${dateStr}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="cert-actions">
        <button class="btn-ghost" id="cert-edit">Edit Details</button>
        <button class="btn-primary" id="cert-print">🖨️ Print Certificate</button>
      </div>
    </div>
  `;
  document.getElementById("modal-close").addEventListener("click", closeQuiz);
  document.getElementById("cert-edit").addEventListener("click", () => openCertificateFlow(section));
  document.getElementById("cert-print").addEventListener("click", () => window.print());
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- Reset progress ---------- */
function resetProgress() {
  if (!confirm("This will erase all points, completed tasks and certificates on this device. Continue?")) return;
  State.points = 0; State.completed = {}; State.attempts = {}; State.locked = {}; State.certNumbers = {}; State.certSeq = 0;
  persist();
  renderHome();
}

/* ---------- Init ---------- */
function updateHeaderStats() {
  const pts = document.getElementById("header-points");
  if (pts) pts.textContent = `${State.points} pts`;
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  document.getElementById("reset-btn").addEventListener("click", resetProgress);
  updateHeaderStats();
  renderHome();
});
