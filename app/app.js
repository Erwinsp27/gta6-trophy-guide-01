(function () {
  "use strict";
  var LS_PROGRESS = "neonvice-progress-v1";
  var LS_SPOILERS = "neonvice-spoilers-v1";
  var DEMO_IDS = [
    "just-like-paradise", "paradise-lost", "trust", "master-of-none",
    "stick-fiddler", "baited-my-tackle", "earn-cash-not-kudos", "top-fun",
    "whip-it-good", "in-the-beginning", "treat-yo-self", "one-last-thing",
    "cunning-stunts"
  ];

  var trophies = [];
  var earned = {};
  var spoilersHidden = true;
  var params = new URLSearchParams(window.location.search);
  var demoMode = params.get("demo") === "1";

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function loadSaved() {
    try {
      var raw = localStorage.getItem(LS_PROGRESS);
      if (raw) earned = JSON.parse(raw) || {};
    } catch (e) { earned = {}; }
    try {
      var sp = localStorage.getItem(LS_SPOILERS);
      if (sp !== null) spoilersHidden = sp === "1";
    } catch (e) {}
    if (demoMode && Object.keys(earned).length === 0) {
      DEMO_IDS.forEach(function (id) { earned[id] = true; });
    }
    if (params.get("spoilers") === "on") spoilersHidden = true;
    if (params.get("spoilers") === "off") spoilersHidden = false;
  }
  function save() {
    try { localStorage.setItem(LS_PROGRESS, JSON.stringify(earned)); } catch (e) {}
    try { localStorage.setItem(LS_SPOILERS, spoilersHidden ? "1" : "0"); } catch (e) {}
  }
  function isEarned(t) { return !!earned[t.id]; }
  function earnedCount() { return trophies.filter(isEarned).length; }

  function gradeLabel(g) { return g.charAt(0).toUpperCase() + g.slice(1); }

  function showView(name) {
    ["checklist", "roadmap", "sources"].forEach(function (v) {
      $("view-" + v).hidden = v !== name;
      $("nav-" + v).classList.toggle("active", v === name);
    });
    window.scrollTo(0, 0);
  }

  function updateProgress() {
    var total = trophies.length;
    var n = earnedCount();
    var pct = total ? Math.round((n / total) * 100) : 0;
    $("earned-count").textContent = n + " / " + total;
    $("pct-label").textContent = pct + "%";
    $("progress-fill").style.width = pct + "%";
    $("progress-bar").setAttribute("aria-valuenow", String(pct));
    var byGrade = {};
    trophies.forEach(function (t) {
      if (!byGrade[t.grade]) byGrade[t.grade] = [0, 0];
      byGrade[t.grade][1]++;
      if (isEarned(t)) byGrade[t.grade][0]++;
    });
    $("grade-counts").innerHTML = ["platinum", "gold", "silver", "bronze"].map(function (g) {
      var c = byGrade[g] || [0, 0];
      return "<span>" + gradeLabel(g) + " " + c[0] + "/" + c[1] + "</span>";
    }).join("");
    var toward = trophies.filter(function (t) { return t.grade !== "platinum" && isEarned(t); }).length;
    $("platinum-line").textContent = "Platinum progress: " + toward + " of 54 trophies toward Vice Got a Price!" + (n === total ? " — Platinum earned!" : "");
  }

  function filtered() {
    var q = $("filter-search").value.trim().toLowerCase();
    var grade = $("filter-grade").value;
    var kind = $("filter-kind").value;
    var earn = $("filter-earned").value;
    var miss = $("filter-missable").checked;
    return trophies.filter(function (t) {
      if (grade && t.grade !== grade) return false;
      if (kind && t.kind !== kind) return false;
      if (earn === "earned" && !isEarned(t)) return false;
      if (earn === "unearned" && isEarned(t)) return false;
      if (miss && !t.missable) return false;
      if (q && (t.name + " " + t.description + " " + t.guide).toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
  }

  function renderList() {
    var list = filtered();
    var ul = $("trophy-list");
    ul.innerHTML = "";
    $("result-count").textContent = "Showing " + list.length + " of " + trophies.length + " trophies";
    $("empty-state").hidden = list.length !== 0;
    list.forEach(function (t) {
      var li = document.createElement("li");
      li.className = "trophy" + (isEarned(t) ? " earned" : "");
      var storyHidden = t.story && spoilersHidden && !isEarned(t);
      var name = storyHidden ? "Hidden story trophy — earn it to reveal" : t.name;
      var desc = storyHidden ? "A story trophy. Turn spoilers off, or earn it in the game, to reveal its name and description." : t.description;
      var guideShort = storyHidden ? "" : t.guide;
      var box = document.createElement("input");
      box.type = "checkbox";
      box.checked = isEarned(t);
      box.setAttribute("aria-label", "Earned: " + t.name);
      box.addEventListener("click", function (ev) {
        ev.stopPropagation();
        if (earned[t.id]) delete earned[t.id]; else earned[t.id] = true;
        save(); updateProgress(); renderList();
      });
      var body = document.createElement("div");
      body.className = "trophy-body";
      body.innerHTML =
        '<span class="trophy-name">' + esc(name) + '</span>' +
        '<span class="grade grade-' + t.grade + '">' + gradeLabel(t.grade) + '</span>' +
        '<p class="trophy-desc">' + esc(desc) + '</p>' +
        (guideShort ? '<p class="trophy-guide">' + esc(guideShort) + '</p>' : "") +
        '<span class="tag">' + esc(t.kind) + '</span>' +
        (t.missable ? '<span class="tag warn">Missable</span>' : "") +
        (t.hidden ? '<span class="tag">Hidden</span>' : "") +
        (isEarned(t) ? '<span class="tag earned-tag">Earned ✓</span>' : "");
      body.addEventListener("click", function () { openDetail(t); });
      li.appendChild(box);
      li.appendChild(body);
      ul.appendChild(li);
    });
    updateProgress();
  }

  function openDetail(t) {
    var body = $("detail-body");
    var storyHidden = t.story && spoilersHidden && !isEarned(t);
    var facts = (t.facts || []).map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("");
    body.innerHTML =
      "<h2>" + esc(storyHidden ? "Hidden story trophy" : t.name) + "</h2>" +
      '<p><span class="grade grade-' + t.grade + '">' + gradeLabel(t.grade) + '</span> ' +
      '<span class="tag">' + esc(t.kind) + '</span>' +
      (t.missable ? '<span class="tag warn">Missable</span>' : "") +
      (isEarned(t) ? '<span class="tag earned-tag">Earned ✓</span>' : "") + "</p>" +
      (t.missable ? "<p class=\"missable-banner\">⚠ MISSABLE — in Chapter 1, after the mission Down to Earth, Lucia invites Jason to meditate on the balcony at his house in the morning. Do it before leaving Chapter 1.</p>" : "") +
      "<dl>" +
      "<dt>Official description</dt><dd>" + esc(storyHidden ? "Hidden until earned." : t.description) + "</dd>" +
      "<dt>Guide</dt><dd>" + esc(storyHidden ? "Turn spoilers off, or earn it in the game, to reveal the guide." : t.guide) + "</dd>" +
      "<dt>Source</dt><dd>" + esc(t.source) + "</dd>" +
      "<dt>Status</dt><dd>" + (isEarned(t) ? "Earned" : "Not yet earned") + "</dd>" +
      "</dl>" +
      (facts ? "<h3>Key facts</h3><ul>" + facts + "</ul>" : "") +
      (t.id === "chapter-two-drug-money" ? "<p class=\"footnote\">The name is printed exactly as the trophy trackers publish it, in censored form. This guide does not guess the uncensored spelling.</p>" : "") +
      (t.id === "maximum-withdrawal" ? "<p class=\"footnote\">Grade note: this guide follows PowerPyx (Silver). Push Square counts Maximum Withdrawal as Bronze.</p>" : "") +
      '<p><button type="button" id="detail-toggle">' + (isEarned(t) ? "Mark as not earned" : "Mark as earned") + "</button></p>";
    $("detail").hidden = false;
    $("detail-toggle").addEventListener("click", function () {
      if (earned[t.id]) delete earned[t.id]; else earned[t.id] = true;
      save(); updateProgress(); renderList(); openDetail(t);
    });
    $("detail").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function bind() {
    // Search re-renders on input only: re-rendering on its change event (which
    // fires when the field loses focus) would rebuild the list mid-click and
    // swallow the click that caused the blur.
    $("filter-search").addEventListener("input", renderList);
    ["filter-grade", "filter-kind", "filter-earned", "filter-missable"].forEach(function (id) {
      $(id).addEventListener("input", renderList);
      $(id).addEventListener("change", renderList);
    });
    $("spoiler-toggle").addEventListener("change", function () {
      spoilersHidden = $("spoiler-toggle").checked;
      save(); renderList();
    });
    $("nav-checklist").addEventListener("click", function () { showView("checklist"); });
    $("nav-roadmap").addEventListener("click", function () { showView("roadmap"); });
    $("nav-sources").addEventListener("click", function () { showView("sources"); });
    $("detail-close").addEventListener("click", function () { $("detail").hidden = true; });
    $("btn-export").addEventListener("click", function () {
      var data = { app: "Neon Vice", exported: new Date().toISOString(), earned: Object.keys(earned).filter(function (k) { return earned[k]; }) };
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "neon-vice-progress.json";
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      $("tool-status").textContent = "Exported " + data.earned.length + " earned trophies as neon-vice-progress.json.";
    });
    $("input-import").addEventListener("change", function (ev) {
      var file = ev.target.files && ev.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var data = JSON.parse(String(reader.result));
          var ids = Array.isArray(data) ? data : data.earned;
          if (!Array.isArray(ids)) throw new Error("bad file");
          var next = {};
          ids.forEach(function (id) { if (trophies.some(function (t) { return t.id === id; })) next[id] = true; });
          earned = next;
          save(); updateProgress(); renderList();
          $("tool-status").textContent = "Imported " + Object.keys(earned).length + " earned trophies.";
        } catch (e) {
          $("tool-status").textContent = "Import failed: that file is not a Neon Vice progress export.";
        }
      };
      reader.readAsText(file);
      ev.target.value = "";
    });
    $("btn-reset").addEventListener("click", function () {
      if (window.confirm("Reset all Neon Vice progress? This clears every ticked trophy.")) {
        earned = {};
        save(); updateProgress(); renderList();
        $("tool-status").textContent = "Progress reset.";
      }
    });
  }

  function applyParams() {
    if (params.get("grade")) {
      var g = params.get("grade");
      if (["platinum", "gold", "silver", "bronze"].indexOf(g) !== -1) {
        $("filter-grade").value = g;
        renderList();
      }
    }
    if (params.get("view") === "roadmap") showView("roadmap");
    if (params.get("view") === "sources") showView("sources");
    if (params.get("view") === "trophy" && params.get("id")) {
      var t = trophies.find(function (x) { return x.id === params.get("id"); });
      if (t) { showView("checklist"); openDetail(t); }
    }
  }

  fetch("data/trophies.json").then(function (r) { return r.json(); }).then(function (data) {
    trophies = data;
    loadSaved();
    $("spoiler-toggle").checked = spoilersHidden;
    bind();
    renderList();
    applyParams();
  }).catch(function () {
    $("trophy-list").innerHTML = "<li>Could not load the trophy data. Check that data/trophies.json is present.</li>";
  });
})();
