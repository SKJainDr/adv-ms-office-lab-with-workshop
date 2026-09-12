/* =========================================================================
   MS OFFICE LAB QUEST — Mockup scene builders
   Small composable functions that output the HTML for realistic-looking
   Word / Excel / PowerPoint window mockups, used by the Challenge & Graph
   sections in data.js. Kept framework-free so they can be embedded as
   plain strings inside SECTIONS.
   ========================================================================= */

const MOCK = (() => {

  function ribbon(tabs, activeTab, groups) {
    return `
      <div class="mock-ribbon">
        <div class="mock-tabs">${tabs.map(t => `<span class="${t === activeTab ? "active" : ""}">${t}</span>`).join("")}</div>
        <div class="mock-ribbon-groups">
          ${groups.map(g => `
            <div class="mock-group">
              <div class="mock-gbtns">${g.icons.map(ic => `<div class="mock-ico">${ic}</div>`).join("")}</div>
              <span class="mock-glabel">${g.label}</span>
            </div>`).join("")}
        </div>
      </div>`;
  }

  function windowShell(kind, filename, ribbonHTML, bodyHTML) {
    const cls = { word: "word-mock", excel: "excel-mock", ppt: "ppt-mock", netmail: "netmail-mock", access: "access-mock" }[kind];
    const appLabel = { word: "Word", excel: "Excel", ppt: "PowerPoint", netmail: "Mail / Browser", access: "Access" }[kind];
    return `
      <div class="office-mock ${cls}">
        <div class="mock-titlebar">
          <span class="mock-dot r"></span><span class="mock-dot y"></span><span class="mock-dot g"></span>
          <span class="mock-filename">${filename} — ${appLabel}</span>
          <span class="mock-savebadge">Saved to this PC</span>
        </div>
        ${ribbonHTML}
        <div class="mock-body"><div class="mock-live-region">${bodyHTML}</div></div>
      </div>`;
  }

  function wordDoc(filename, ribbonGroups, activeTab, pageInnerHTML) {
    const rb = ribbon(["File", "Home", "Insert", "Layout", "References", "Mailings", "Review", "View"], activeTab || "Home", ribbonGroups);
    return windowShell("word", filename, rb, `<div class="mock-page">${pageInnerHTML}</div>`);
  }

  function excelSheet(filename, ribbonGroups, activeTab, cellRef, formulaVal, sheetInnerHTML, extraHTML) {
    const rb = ribbon(["File", "Home", "Insert", "Page Layout", "Formulas", "Data", "Review", "View"], activeTab || "Home", ribbonGroups);
    const bar = `<div class="mock-formulabar"><span class="mock-namebox">${cellRef || "A1"}</span><span class="mock-fx">fx</span><span class="mock-formulaval">${formulaVal || ""}</span></div>`;
    return windowShell("excel", filename, rb, `${bar}<div class="mock-sheetwrap"><table class="mock-sheet">${sheetInnerHTML}</table></div>${extraHTML || ""}`);
  }

  function pptSlide(filename, ribbonGroups, activeTab, slideInnerHTML, extraHTML) {
    const rb = ribbon(["File", "Home", "Insert", "Design", "Transitions", "Animations", "Slide Show", "Review", "View"], activeTab || "Home", ribbonGroups);
    return windowShell("ppt", filename, rb, `<div class="mock-slidewrap"><div class="mock-slide">${slideInnerHTML}</div>${extraHTML || ""}</div>`);
  }

  function netmailWindow(filename, ribbonGroups, activeTab, bodyHTML, tabs) {
    const rb = ribbon(tabs || ["File", "Home", "Send / Receive", "Folder", "View"], activeTab || "Home", ribbonGroups);
    return windowShell("netmail", filename, rb, bodyHTML);
  }

  function browserWindow(url, bodyHTML) {
    return `
      <div class="office-mock netmail-mock">
        <div class="mock-titlebar">
          <span class="mock-dot r"></span><span class="mock-dot y"></span><span class="mock-dot g"></span>
          <span class="mock-filename">${url} — Browser</span>
        </div>
        <div class="mock-browser-bar"><span class="mock-browser-lock">&#128274;</span><span class="mock-browser-url">${url}</span></div>
        <div class="mock-body"><div class="mock-live-region">${bodyHTML}</div></div>
      </div>`;
  }

  function inboxList(items) {
    return `<div class="mock-inbox-list">${items.map(it => `
      <div class="mock-inbox-item${it.active ? " active" : ""}${it.unread ? " unread" : ""}">
        <span class="mi-from">${it.from}</span><span class="mi-subject">${it.subject}</span><span class="mi-time">${it.time}</span>
      </div>`).join("")}</div>`;
  }

  function accessWindow(filename, ribbonGroups, activeTab, bodyHTML, tabs) {
    const rb = ribbon(tabs || ["File", "Home", "Create", "External Data", "Database Tools"], activeTab || "Home", ribbonGroups);
    return windowShell("access", filename, rb, `<div class="mock-access-body">${bodyHTML}</div>`);
  }

  // ---- small table helpers for excel ----
  function sheetHead(cols) {
    return `<thead><tr><th></th>${cols.map(c => `<th>${c}</th>`).join("")}</tr></thead>`;
  }
  function sheetRow(rowLabel, cells, opts) {
    opts = opts || {};
    const cls = opts.rowIn ? " mock-rowin" : "";
    return `<tr class="${cls}"><th>${rowLabel}</th>${cells.map((c, i) => {
      const fillClass = (opts.fillIdx || []).includes(i) ? " mock-fill" : "";
      const activeClass = (opts.activeIdx || []).includes(i) ? " mock-active" : "";
      const lblClass = typeof c === "string" && isNaN(parseFloat(c)) ? " lbl" : "";
      const style = opts.fillColor ? ` style="--fillc:${opts.fillColor}"` : "";
      return `<td class="${fillClass}${activeClass}${lblClass}"${style}>${c}</td>`;
    }).join("")}</tr>`;
  }

  // ---- chart / trendline builders ----
  function barsChart(title, labels, values, maxVal) {
    maxVal = maxVal || Math.max(...values) * 1.15;
    const bars = values.map((v, i) => {
      const h = Math.round((v / maxVal) * 100);
      return `<div class="bar" style="height:${h}%; animation-delay:${i * 90}ms;"><span>${v}</span></div>`;
    }).join("");
    return `<div class="mock-chartbox"><div class="mock-chart-title">${title}</div><div class="mock-bars">${bars}</div></div>`;
  }

  function trendlineChart(title, points, w, h, showTrend) {
    if (showTrend === undefined) showTrend = true;
    w = w || 460; h = h || 110;
    const xs = points.map((_, i) => (i / (points.length - 1)) * (w - 20) + 10);
    const maxY = Math.max(...points), minY = Math.min(...points);
    const ys = points.map(p => h - 10 - ((p - minY) / (maxY - minY || 1)) * (h - 30));
    const path = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
    let trendPathSVG = "";
    if (showTrend) {
      const n = points.length;
      const sumX = xs.reduce((a, b) => a + b, 0), sumY = ys.reduce((a, b) => a + b, 0);
      const sumXY = xs.reduce((a, x, i) => a + x * ys[i], 0), sumXX = xs.reduce((a, x) => a + x * x, 0);
      const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX || 1);
      const intercept = (sumY - slope * sumX) / n;
      const trendPath = `M${xs[0].toFixed(1)},${(slope * xs[0] + intercept).toFixed(1)} L${xs[n - 1].toFixed(1)},${(slope * xs[n - 1] + intercept).toFixed(1)}`;
      trendPathSVG = `<path class="mock-trend-path" d="${trendPath}" style="animation-delay:.3s"></path>`;
    }
    const dots = xs.map((x, i) => `<circle class="mock-data-pt" cx="${x.toFixed(1)}" cy="${ys[i].toFixed(1)}" r="3" style="animation-delay:${i * 60}ms"></circle>`).join("");
    return `<div class="mock-chartbox"><div class="mock-chart-title">${title}</div>
      <svg class="mock-trend-svg" viewBox="0 0 ${w} ${h}">
        <path class="mock-trend-path" d="${path}" style="stroke:#9aa6b2; stroke-width:1.6; ${showTrend ? "" : "stroke-dasharray:none;stroke-dashoffset:0;animation:none;"}"></path>
        ${trendPathSVG}
        ${dots}
      </svg></div>`;
  }

  function callout(text) {
    return `<div class="mock-callout">✅ ${text}</div>`;
  }

  return { ribbon, wordDoc, excelSheet, pptSlide, netmailWindow, browserWindow, inboxList, accessWindow, sheetHead, sheetRow, barsChart, trendlineChart, callout };
})();
