/* ============================================================
   Advanced MS Office Workshop Booklet — app logic
   All student input (text fields, textareas, pasted screenshots, quiz
   answers) is saved to this browser's localStorage only — nothing is
   uploaded anywhere. Works fully offline once the page has loaded.
   ============================================================ */
(function () {
  "use strict";

  const LS_KEY = "mso_workshop_booklet_v1";
  const APP_COLOR_VAR = { word: "--word", excel: "--excel", ppt: "--ppt", netmail: "--netmail", access: "--access" };

  function loadStore() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function saveStore(store) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(store));
      flashSaved();
    } catch (e) { /* storage full or unavailable — fail silently, student can still work in-session */ }
  }
  let STORE = loadStore();
  let saveTimer = null;
  function debouncedSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveStore(STORE), 400);
  }
  function flashSaved() {
    const el = document.getElementById("save-status-text");
    if (!el) return;
    el.textContent = "Saved just now (in this browser)";
    clearTimeout(flashSaved._t);
    flashSaved._t = setTimeout(() => { el.textContent = "All changes saved automatically in this browser"; }, 1800);
  }

  function esc(s) { return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* ---------------- Cover / student info ---------------- */
  function renderCover() {
    const fields = [
      { key: "studentName", label: "Student Name" },
      { key: "rollNo", label: "Roll / Enrolment No." },
      { key: "courseSection", label: "Course & Section" },
      { key: "session", label: "Academic Session", default: "2026\u201327" }
    ];
    STORE.cover = STORE.cover || {};
    return `
    <div class="booklet-cover">
      <h2>Advanced MS Office Workshop \u2014 Booklet</h2>
      <div class="sub">12 sections &middot; 60 tasks &middot; record your App/Tabs/Features, method, procedure, screenshots, results and viva answers for each section below. Everything you type or paste is saved automatically in this browser.</div>
      <div class="booklet-field-grid">
        ${fields.map(f => `
          <div>
            <label for="cover-${f.key}">${f.label}</label>
            <input type="text" id="cover-${f.key}" data-cover-key="${f.key}" value="${esc(STORE.cover[f.key] || f.default || "")}">
          </div>`).join("")}
      </div>
    </div>`;
  }

  /* ---------------- Nav ---------------- */
  function renderNav(sections, activeId) {
    return `<div class="booklet-nav">
      ${sections.map(s => `<button data-nav="${s.id}" class="${s.id === activeId ? "active" : ""}" style="--fam-color:var(${APP_COLOR_VAR[s.app]})">WS${s.num}</button>`).join("")}
    </div>`;
  }

  /* ---------------- Frames ---------------- */
  function frameHTML(sectionId, frameId, frame) {
    const hasImg = frame && frame.src;
    return `
    <div class="shot-frame" data-frame-id="${frameId}">
      <div class="shot-frame-head">
        <input type="text" class="shot-label-input" placeholder="Label this screenshot (e.g. Task 1.1 \u2014 Notice)"
          data-frame-label="${frameId}" value="${esc(frame && frame.label)}">
        <button class="shot-remove-btn" data-frame-remove="${frameId}" title="Remove this frame">\u2715</button>
      </div>
      <div class="shot-frame-body" data-frame-drop="${frameId}" tabindex="0"
           title="Click here, then press Ctrl+V to paste a screenshot \u2014 or use Upload Image below">
        <img class="shot-frame-img" data-frame-img="${frameId}" style="display:${hasImg ? "block" : "none"};opacity:${(frame && frame.opacity != null ? frame.opacity : 100) / 100}"
             src="${hasImg ? frame.src : ""}" alt="Pasted screenshot">
        <div class="shot-frame-placeholder" data-frame-placeholder="${frameId}" style="display:${hasImg ? "none" : "flex"}">
          <div>\u{1F4CB} Click here, then press <b>Ctrl+V</b> to paste a screenshot</div>
          <button type="button" class="shot-upload-btn" data-frame-upload="${frameId}">Upload Image Instead</button>
          <input type="file" accept="image/*" data-frame-file="${frameId}" style="display:none">
        </div>
      </div>
      <div class="shot-frame-controls">
        <label>Opacity <input type="range" min="10" max="100" value="${frame && frame.opacity != null ? frame.opacity : 100}" data-frame-opacity="${frameId}"></label>
        <button class="shot-clear-btn" data-frame-clear="${frameId}">Clear image</button>
      </div>
    </div>`;
  }

  function ensureFrames(sectionId) {
    STORE.frames = STORE.frames || {};
    if (!STORE.frames[sectionId] || STORE.frames[sectionId].length === 0) {
      STORE.frames[sectionId] = [{ id: "f1", label: "", src: null, opacity: 100 }];
    }
    return STORE.frames[sectionId];
  }

  function renderFrames(sectionId) {
    const frames = ensureFrames(sectionId);
    return `<div class="booklet-frames" data-frames-container="${sectionId}">
      ${frames.map(f => frameHTML(sectionId, f.id, f)).join("")}
      <button type="button" class="booklet-add-frame-btn" data-add-frame="${sectionId}">
        <span class="plus">+</span> Add Frame
      </button>
    </div>`;
  }

  function wireFrames(sectionId, panelEl) {
    const container = panelEl.querySelector(`[data-frames-container="${sectionId}"]`);

    function wireOneFrame(frameId) {
      const body = panelEl.querySelector(`[data-frame-drop="${frameId}"]`);
      const img = panelEl.querySelector(`[data-frame-img="${frameId}"]`);
      const placeholder = panelEl.querySelector(`[data-frame-placeholder="${frameId}"]`);
      const labelInput = panelEl.querySelector(`[data-frame-label="${frameId}"]`);
      const removeBtn = panelEl.querySelector(`[data-frame-remove="${frameId}"]`);
      const uploadBtn = panelEl.querySelector(`[data-frame-upload="${frameId}"]`);
      const fileInput = panelEl.querySelector(`[data-frame-file="${frameId}"]`);
      const opacityInput = panelEl.querySelector(`[data-frame-opacity="${frameId}"]`);
      const clearBtn = panelEl.querySelector(`[data-frame-clear="${frameId}"]`);

      function getFrameObj() {
        return ensureFrames(sectionId).find(f => f.id === frameId);
      }
      function setImage(dataUrl) {
        const f = getFrameObj();
        if (!f) return;
        f.src = dataUrl;
        img.src = dataUrl;
        img.style.display = "block";
        placeholder.style.display = "none";
        debouncedSave();
      }
      function handleFile(file) {
        if (!file || file.type.indexOf("image") === -1) return;
        const reader = new FileReader();
        reader.onload = (ev) => setImage(ev.target.result);
        reader.readAsDataURL(file);
      }

      body.addEventListener("paste", (e) => {
        const items = (e.clipboardData || window.clipboardData).items;
        if (!items) return;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            handleFile(items[i].getAsFile());
            e.preventDefault();
            break;
          }
        }
      });
      body.addEventListener("click", (e) => {
        if (e.target === uploadBtn) return;
        body.focus();
      });

      uploadBtn.addEventListener("click", (e) => { e.stopPropagation(); fileInput.click(); });
      fileInput.addEventListener("change", () => { if (fileInput.files[0]) handleFile(fileInput.files[0]); });

      labelInput.addEventListener("input", () => {
        const f = getFrameObj();
        if (f) { f.label = labelInput.value; debouncedSave(); }
      });

      opacityInput.addEventListener("input", () => {
        const f = getFrameObj();
        const v = opacityInput.value;
        img.style.opacity = v / 100;
        if (f) { f.opacity = Number(v); debouncedSave(); }
      });

      clearBtn.addEventListener("click", () => {
        const f = getFrameObj();
        if (f) { f.src = null; }
        img.src = ""; img.style.display = "none"; placeholder.style.display = "flex";
        debouncedSave();
      });

      removeBtn.addEventListener("click", () => {
        const frames = ensureFrames(sectionId);
        const idx = frames.findIndex(f => f.id === frameId);
        if (idx !== -1) frames.splice(idx, 1);
        if (frames.length === 0) frames.push({ id: "f" + Date.now(), label: "", src: null, opacity: 100 });
        debouncedSave();
        rerenderFrames();
      });
    }

    function rerenderFrames() {
      container.innerHTML = ensureFrames(sectionId).map(f => frameHTML(sectionId, f.id, f)).join("") +
        `<button type="button" class="booklet-add-frame-btn" data-add-frame="${sectionId}">
          <span class="plus">+</span> Add Frame
        </button>`;
      ensureFrames(sectionId).forEach(f => wireOneFrame(f.id));
      const addBtn = container.querySelector(`[data-add-frame="${sectionId}"]`);
      addBtn.addEventListener("click", () => {
        ensureFrames(sectionId).push({ id: "f" + Date.now(), label: "", src: null, opacity: 100 });
        debouncedSave();
        rerenderFrames();
      });
    }

    rerenderFrames();
  }

  /* ---------------- Result table ---------------- */
  function renderResult(section) {
    STORE.result = STORE.result || {};
    STORE.result[section.id] = STORE.result[section.id] || {};
    const rows = section.taskLabels.map((label, i) => {
      const key = "t" + i;
      const saved = STORE.result[section.id][key] || {};
      return `<tr>
        <td>${esc(label)}</td>
        <td style="width:140px;">
          <select data-result-status="${section.id}|${key}">
            <option value="" ${!saved.status ? "selected" : ""}>\u2014</option>
            <option value="Y" ${saved.status === "Y" ? "selected" : ""}>Yes</option>
            <option value="N" ${saved.status === "N" ? "selected" : ""}>No</option>
            <option value="P" ${saved.status === "P" ? "selected" : ""}>Partial</option>
          </select>
        </td>
        <td><input type="text" placeholder="Remarks (optional)" data-result-remarks="${section.id}|${key}" value="${esc(saved.remarks)}"></td>
      </tr>`;
    }).join("");
    return `<table class="booklet-result">
      <thead><tr><th>Task</th><th>Completed?</th><th>Remarks</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
  }

  function wireResult(section, panelEl) {
    panelEl.querySelectorAll(`[data-result-status^="${section.id}|"]`).forEach(sel => {
      sel.addEventListener("change", () => {
        const key = sel.getAttribute("data-result-status").split("|")[1];
        STORE.result[section.id][key] = STORE.result[section.id][key] || {};
        STORE.result[section.id][key].status = sel.value;
        debouncedSave();
      });
    });
    panelEl.querySelectorAll(`[data-result-remarks^="${section.id}|"]`).forEach(inp => {
      inp.addEventListener("input", () => {
        const key = inp.getAttribute("data-result-remarks").split("|")[1];
        STORE.result[section.id][key] = STORE.result[section.id][key] || {};
        STORE.result[section.id][key].remarks = inp.value;
        debouncedSave();
      });
    });
  }

  /* ---------------- Quiz ---------------- */
  function renderQuiz(section, quizData) {
    return `<div data-quiz="${section.id}">
      ${quizData.map((item, qi) => `
        <div class="booklet-quiz-item" data-quiz-item="${qi}">
          <div class="booklet-quiz-q">${qi + 1}. ${esc(item.q)}</div>
          <div class="booklet-quiz-opts">
            ${item.options.map((opt, oi) => `
              <label class="booklet-quiz-opt" data-quiz-opt="${qi}|${oi}">
                <input type="radio" name="quiz-${section.id}-${qi}" value="${oi}"> ${esc(opt)}
              </label>`).join("")}
          </div>
        </div>`).join("")}
      <button type="button" class="booklet-check-btn" data-quiz-check="${section.id}">Check My Answers</button>
      <div class="booklet-quiz-score" data-quiz-score="${section.id}"></div>
    </div>`;
  }

  function wireQuiz(section, quizData, panelEl) {
    const checkBtn = panelEl.querySelector(`[data-quiz-check="${section.id}"]`);
    const scoreEl = panelEl.querySelector(`[data-quiz-score="${section.id}"]`);
    checkBtn.addEventListener("click", () => {
      let correct = 0;
      quizData.forEach((item, qi) => {
        const opts = panelEl.querySelectorAll(`[data-quiz-opt^="${qi}|"]`);
        const checked = panelEl.querySelector(`input[name="quiz-${section.id}-${qi}"]:checked`);
        opts.forEach(optEl => optEl.classList.remove("correct", "incorrect"));
        if (checked) {
          const chosenIdx = Number(checked.value);
          const chosenLabel = panelEl.querySelector(`[data-quiz-opt="${qi}|${chosenIdx}"]`);
          if (chosenIdx === item.correct) {
            chosenLabel.classList.add("correct");
            correct++;
          } else {
            chosenLabel.classList.add("incorrect");
            const correctLabel = panelEl.querySelector(`[data-quiz-opt="${qi}|${item.correct}"]`);
            if (correctLabel) correctLabel.classList.add("correct");
          }
        } else {
          const correctLabel = panelEl.querySelector(`[data-quiz-opt="${qi}|${item.correct}"]`);
          if (correctLabel) correctLabel.classList.add("correct");
        }
      });
      scoreEl.textContent = `Score: ${correct} / ${quizData.length}`;
      STORE.quizScores = STORE.quizScores || {};
      STORE.quizScores[section.id] = { correct, total: quizData.length };
      debouncedSave();
    });
  }

  /* ---------------- Viva ---------------- */
  function renderViva(section, vivaData) {
    STORE.viva = STORE.viva || {};
    STORE.viva[section.id] = STORE.viva[section.id] || {};
    return vivaData.map((q, vi) => `
      <div class="booklet-viva-item">
        <div class="booklet-viva-q"><b>${vi + 1}.</b> ${esc(q)}</div>
        <textarea class="booklet-fill booklet-viva-ans" placeholder="Your answer..." data-viva="${section.id}|${vi}">${esc(STORE.viva[section.id][vi])}</textarea>
      </div>`).join("");
  }

  function wireViva(section, panelEl) {
    panelEl.querySelectorAll(`[data-viva^="${section.id}|"]`).forEach(ta => {
      ta.addEventListener("input", () => {
        const idx = ta.getAttribute("data-viva").split("|")[1];
        STORE.viva[section.id][idx] = ta.value;
        debouncedSave();
      });
    });
  }

  /* ---------------- Generic fill textareas (features / method / procedure) ---------------- */
  function wireFill(sectionId, key, panelEl) {
    STORE.fills = STORE.fills || {};
    STORE.fills[sectionId] = STORE.fills[sectionId] || {};
    const ta = panelEl.querySelector(`[data-fill="${sectionId}|${key}"]`);
    if (!ta) return;
    ta.value = STORE.fills[sectionId][key] || "";
    ta.addEventListener("input", () => {
      STORE.fills[sectionId][key] = ta.value;
      debouncedSave();
    });
  }

  /* ---------------- Section panel ---------------- */
  function renderSection(section, quizViva) {
    const colorVar = APP_COLOR_VAR[section.app];
    const procHeight = Math.max(320, section.taskCount * 6 * 28 + 40);
    return `
    <div class="booklet-section" data-section="${section.id}">
      <div class="booklet-section-title" style="color:var(${colorVar})">WS${section.num} \u2014 ${esc(section.title)}</div>
      <div class="booklet-section-sub">${esc(section.syllabusRef)}</div>
      <a class="booklet-guide-link" style="--fam-color:var(${colorVar})"
         href="../../mkdocs-source-msoffice-PLACEHOLDER" data-guide-link="${section.id}" target="_blank" rel="noopener">
         \u{1F4D6} Read the matching task guide (with pictures &amp; procedure hints) for WS${section.num} &rarr;
      </a>

      <div class="booklet-panel" style="--fam-color:var(${colorVar})">
        <h3>Aim</h3>
        <ol class="booklet-aims">
          ${section.aims.map(a => `<li>${esc(a)}</li>`).join("")}
        </ol>
      </div>

      <div class="booklet-panel" style="--fam-color:var(${colorVar})">
        <h3>App, Tabs &amp; Features Used</h3>
        <textarea class="booklet-fill" data-fill="${section.id}|features" placeholder="List the application, ribbon tabs and specific features/commands you actually used for the tasks in this section (e.g. Word \u2014 Home tab (Styles, Font Color); Insert tab (Pictures, Caption))."></textarea>
      </div>

      <div class="booklet-panel" style="--fam-color:var(${colorVar})">
        <h3>Method</h3>
        <textarea class="booklet-fill" data-fill="${section.id}|method" placeholder="Describe what you actually did and any observations \u2014 for Excel tasks, note any formulas you used here (e.g. =SUM(B2:D2), =VLOOKUP(...)). No tables needed \u2014 free text only."></textarea>
      </div>

      <div class="booklet-panel" style="--fam-color:var(${colorVar})">
        <h3>Procedure</h3>
        <div class="booklet-procedure-hint">Write out the steps you followed for all ${section.taskCount} tasks in this section, in your own words (roughly 6 steps per task as a guide \u2014 use the ruled space however you need).</div>
        <textarea class="booklet-procedure-area" style="height:${procHeight}px;" data-fill="${section.id}|procedure"></textarea>
      </div>

      <div class="booklet-panel" style="--fam-color:var(${colorVar})">
        <h3>Screenshots of Completed Tasks</h3>
        ${renderFrames(section.id)}
      </div>

      <div class="booklet-panel" style="--fam-color:var(${colorVar})">
        <h3>Result</h3>
        ${renderResult(section)}
      </div>

      <div class="booklet-panel" style="--fam-color:var(${colorVar})">
        <h3>Self-Check Quiz</h3>
        ${renderQuiz(section, quizViva.quiz)}
      </div>

      <div class="booklet-panel" style="--fam-color:var(${colorVar})">
        <h3>Viva-Voce Questions</h3>
        ${renderViva(section, quizViva.viva)}
      </div>
    </div>`;
  }

  /* ---------------- Boot ---------------- */
  function init() {
    const root = document.getElementById("booklet-root");
    if (!root || typeof BOOKLET_SECTIONS === "undefined") return;

    function sectionIdFromHash() {
      const m = /section-ws(\d+)/.exec(window.location.hash);
      if (!m) return null;
      const num = Number(m[1]);
      const found = BOOKLET_SECTIONS.find(s => s.num === num);
      return found ? found.id : null;
    }

    let activeId = sectionIdFromHash() || BOOKLET_SECTIONS[0].id;

    function render() {
      root.innerHTML =
        renderCover() +
        renderNav(BOOKLET_SECTIONS, activeId) +
        BOOKLET_SECTIONS.map(s => renderSection(s, BOOKLET_QUIZ_VIVA[s.id])).join("");

      // wire cover
      root.querySelectorAll("[data-cover-key]").forEach(inp => {
        inp.addEventListener("input", () => {
          STORE.cover[inp.getAttribute("data-cover-key")] = inp.value;
          debouncedSave();
        });
      });

      // wire nav
      root.querySelectorAll("[data-nav]").forEach(btn => {
        btn.addEventListener("click", () => {
          activeId = btn.getAttribute("data-nav");
          root.querySelectorAll(".booklet-section").forEach(s => s.classList.toggle("active", s.getAttribute("data-section") === activeId));
          root.querySelectorAll("[data-nav]").forEach(b => b.classList.toggle("active", b === btn));
          const num = BOOKLET_SECTIONS.find(s => s.id === activeId).num;
          history.replaceState(null, "", "#section-ws" + num);
          window.scrollTo({ top: root.offsetTop - 10, behavior: "smooth" });
        });
      });

      // per-section wiring
      BOOKLET_SECTIONS.forEach(section => {
        const panelEl = root.querySelector(`[data-section="${section.id}"]`);
        if (!panelEl) return;
        panelEl.classList.toggle("active", section.id === activeId);
        wireFill(section.id, "features", panelEl);
        wireFill(section.id, "method", panelEl);
        wireFill(section.id, "procedure", panelEl);
        wireFrames(section.id, panelEl);
        wireResult(section, panelEl);
        wireQuiz(section, BOOKLET_QUIZ_VIVA[section.id].quiz, panelEl);
        wireViva(section, panelEl);
        // fix guide link href now that we know the real relative path
        const guideLink = panelEl.querySelector(`[data-guide-link="${section.id}"]`);
        if (guideLink && window.BOOKLET_GUIDE_BASE) {
          guideLink.href = window.BOOKLET_GUIDE_BASE + "#sec-ws-" + section.num;
        }
      });
    }

    render();

    window.addEventListener("hashchange", () => {
      const target = sectionIdFromHash();
      if (target && target !== activeId) {
        activeId = target;
        root.querySelectorAll(".booklet-section").forEach(s => s.classList.toggle("active", s.getAttribute("data-section") === activeId));
        root.querySelectorAll("[data-nav]").forEach(b => b.classList.toggle("active", b.getAttribute("data-nav") === activeId));
        window.scrollTo({ top: root.offsetTop - 10, behavior: "smooth" });
      }
    });

    const resetBtn = document.getElementById("booklet-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("This will clear everything you've typed and pasted in this booklet, in this browser only. Continue?")) {
          localStorage.removeItem(LS_KEY);
          STORE = {};
          render();
        }
      });
    }
    const printBtn = document.getElementById("booklet-print-btn");
    if (printBtn) printBtn.addEventListener("click", () => window.print());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
