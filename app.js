/* =====================================================================
   ALMERO BADENHORST | PORTFOLIO DESKTOP
   Everything you will want to edit lives in the CONFIG block below.
   ===================================================================== */
const CONFIG = {
  name: "Almero Badenhorst",
  title: "Software Developer",
  tagline: "BSc IT (Software Engineering) · Eduvos · Year 3",
  location: "Bloemfontein, South Africa",
  timezone: "Africa/Johannesburg",
  photo: "assets/photo.jpg",              // drop your photo here (square works best)
  email: "almerobadenhorst800@gmail.com", // set to "" to hide the email tile
  github: "https://github.com/Sneeuman",
  linkedin: "https://www.linkedin.com/in/almero-badenhorst-b879a4302/",
  cvFiles: [
    { label: "Short Resume", file: "assets/Almero_Badenhorst_Resume.pdf" },
    { label: "Full CV",      file: "assets/Almero_Badenhorst_CV_Full.pdf" },
  ],
  bio: [
    "I'm a third-year Information Technology (Software Engineering) student at Eduvos and a full-stack developer who loves building things that actually work. I've shipped an e-commerce platform, a concurrent backend registration engine and a group Android app, and I keep a Linux install close at hand.",
    "I work well alone or in a team, learn new tools quickly, and I'm comfortable talking directly to clients, thanks to freelance repair work and years of teaching others.",
  ],
  skills: {
    "Languages":   ["JavaScript", "HTML", "CSS", "Python", "SQL", "C# (learning)"],
    "Web & Backend": ["PHP", "MySQL", "Local-storage persistence", "Firebase"],
    "Mobile":      ["Android Studio", "Java"],
    "Networking & Security": ["Cisco Packet Tracer", "DHCP", "Kali Linux", "Virtual Machines"],
    "Tools & OS":  ["Git / GitHub", "VS Code", "Linux (Ubuntu)", "Windows", "AI-assisted workflows"],
  },
  stats: [
    { n: "8",    l: "Distinctions" },
    { n: "89%",  l: "Best module mark" },
    { n: "3rd",  l: "Year, final year" },
    { n: "4+",   l: "Major projects" },
  ],
  marks: [
    ["2024", "Procedural Programming", "84%"],
    ["2024", "Computer Skills (Microsoft)", "75%"],
    ["2025", "Programming in Python (elective)", "74%"],
    ["2025", "Database Systems", "74%"],
    ["2025", "Software and Security Engineering", "77%"],
    ["2026", "Web Development and e-Commerce", "78%"],
    ["2026", "Object Oriented Systems Analysis and Design", "78%"],
    ["2026", "Research Design and Methodology", "89%"],
  ],
  projects: [
    {
      tag: "Full-stack · E-commerce", name: "TradeShield / CashCrusader",
      points: ["A working consumer-to-consumer marketplace built from scratch.", "Product listings, buying and shipment tracking.", "Design diagrams and a responsive prototype."],
      stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"], repo: "",
    },
    {
      tag: "Backend · Python", name: "Registration Processing Engine",
      points: ["Student registration and course-selection backend.", "Sequential and concurrent processing with ThreadPoolExecutor.", "Thread-safe seat allocation, no deadlocks or data loss."],
      stack: ["Python", "Concurrency", "Threading"], repo: "",
    },
    {
      tag: "Android · Group project", name: "AI Career Companion",
      points: ["Community app linking software engineering students with articles, Q&A and courses.", "Helped design the database, user verification and architecture."],
      stack: ["Android Studio", "Java", "Firebase"], repo: "",
    },
    {
      tag: "Game · In development", name: "Blind Scribe",
      points: ["Co-developing a game in C# with a friend.", "Game-design direction plus selected components."],
      stack: ["C#", "Game design", "GitHub"], repo: "",
    },
    {
      tag: "Networking", name: "Network Configuration",
      points: ["Designed and configured a network in Cisco Packet Tracer.", "Routers, switches and DHCP."],
      stack: ["Cisco Packet Tracer", "DHCP"], repo: "",
    },
  ],
};
// To link a project to its repo, paste the URL in `repo` above, e.g. repo: "https://github.com/Sneeuman/blind-scribe"

/* ===================== HELPERS ===================== */
const $ = (s, r = document) => r.querySelector(s);
const el = (tag, attrs = {}, html = "") => { const e = document.createElement(tag); Object.assign(e, attrs); if (html) e.innerHTML = html; return e; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};
const mobile = () => matchMedia("(max-width: 720px)").matches;

/* ===================== ICONS ===================== */
const GH_PATH = "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z";
const chip = (bg, inner, vb = "0 0 24 24") =>
  `<svg viewBox="0 0 48 48"><rect x="2" y="2" width="44" height="44" rx="12" fill="${bg}"/><svg x="10" y="10" width="28" height="28" viewBox="${vb}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg></svg>`;
const ICON = {
  about:    chip("#3daee9", `<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>`),
  cv:       chip("#2a7de1", `<path d="M6 2h8l5 5v15H6z"/><path d="M14 2v5h5M9 12h7M9 16h7"/>`),
  projects: chip("#5b6cf0", `<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`),
  connections: chip("#1fa2c9", `<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 11l7.6-4M8.2 13l7.6 4"/>`),
  terminal: chip("#1c2a40", `<path d="M5 7l5 5-5 5M12 18h7"/>`),
  settings: chip("#5f7a99", `<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>`),
  github:   `<svg viewBox="0 0 48 48"><rect x="2" y="2" width="44" height="44" rx="12" fill="#161b22"/><svg x="9" y="9" width="30" height="30" viewBox="0 0 16 16"><path fill="#fff" d="${GH_PATH}"/></svg></svg>`,
  linkedin: `<svg viewBox="0 0 48 48"><rect x="2" y="2" width="44" height="44" rx="12" fill="#0a66c2"/><g fill="#fff"><rect x="12" y="19" width="5" height="16" rx="1"/><circle cx="14.5" cy="14" r="3"/><path d="M21 19h4.8v2.3c.9-1.6 2.7-2.7 5-2.7 4.4 0 5.2 2.9 5.2 6.6V35h-5v-8.3c0-2-.1-3.4-2.1-3.4s-2.9 1.4-2.9 3.4V35h-5z"/></g></svg>`,
  mail:     chip("#e0734a", `<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/>`),
};
const UI = {
  close: `<svg viewBox="0 0 14 14"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  max:   `<svg viewBox="0 0 14 14"><rect x="2.5" y="2.5" width="9" height="9" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
  min:   `<svg viewBox="0 0 14 14"><path d="M3 10h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  home:  `<svg viewBox="0 0 24 24"><path d="M3 11 12 3l9 8v10h-6v-6H9v6H3z" fill="currentColor"/></svg>`,
  link:  `<svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
};

/* ===================== THEMES ===================== */
const THEMES = [
  { id: "midnight", name: "Midnight Blue", note: "Dark, Plasma-style", a: "#0b1a2f", b: "#1b4c82", bar: "#3daee9" },
  { id: "daylight", name: "Daylight",      note: "Light and airy",     a: "#cfe6fb", b: "#5d9fe0", bar: "#1d7fd6" },
  { id: "deepsea",  name: "Deep Sea",      note: "Darker, high contrast", a: "#04101f", b: "#0d4a8f", bar: "#5aa0ff" },
];
function setTheme(id) {
  if (!THEMES.some(t => t.id === id)) id = "midnight";
  document.documentElement.dataset.theme = id;
  store.set("theme", id);
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = THEMES.find(t => t.id === id).a;
  document.querySelectorAll(".theme-opt").forEach(b => b.classList.toggle("on", b.dataset.id === id));
}
const cycleTheme = () => {
  const cur = THEMES.findIndex(t => t.id === document.documentElement.dataset.theme);
  setTheme(THEMES[(cur + 1) % THEMES.length].id);
};

/* ===================== APP CONTENT ===================== */
const photoBlock = () => `
  <div class="photo" role="img" aria-label="Photo of ${esc(CONFIG.name)}">
    ${CONFIG.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
    <img src="${esc(CONFIG.photo)}" alt="" onerror="this.remove()">
  </div>`;

function aboutApp() {
  const skills = Object.entries(CONFIG.skills).map(([k, v]) =>
    `<div class="card"><h4>${esc(k)}</h4><div class="chips">${v.map(s => `<span class="chip2">${esc(s)}</span>`).join("")}</div></div>`).join("");
  return `<div class="pad">
    <div class="about-hero">
      ${photoBlock()}
      <div style="flex:1;min-width:220px">
        <h2 class="app-h">${esc(CONFIG.name)}</h2>
        <p class="sub" style="margin:0">${esc(CONFIG.title)} · ${esc(CONFIG.location)}</p>
        <div class="badges"><span class="badge">${esc(CONFIG.tagline)}</span><span class="badge">Class Representative</span><span class="badge">Open to opportunities</span></div>
      </div>
    </div>
    <div class="sec"><h3>About</h3>${CONFIG.bio.map(p => `<p>${esc(p)}</p>`).join("")}</div>
    <div class="sec"><div class="stats">${CONFIG.stats.map(s => `<div class="stat"><b>${esc(s.n)}</b><span>${esc(s.l)}</span></div>`).join("")}</div></div>
    <div class="sec"><h3>Skills</h3><div class="skillgrid">${skills}</div></div>
    <div class="sec"><h3>Education · Eduvos (2023 to present)</h3>
      <table class="marks"><tr><th>Year</th><th>Module (distinction)</th><th>Mark</th></tr>
      ${CONFIG.marks.map(m => `<tr><td>${m[0]}</td><td>${esc(m[1])}</td><td>${m[2]}</td></tr>`).join("")}</table>
    </div>
  </div>`;
}

function projectsApp() {
  return `<div class="pad"><h2 class="app-h">Projects</h2><p class="sub">Things I've built, from backend systems to full-stack apps.</p>
  <div class="proj-grid">${CONFIG.projects.map(p => `
    <article class="card proj">
      <span class="tag">${esc(p.tag)}</span><h4>${esc(p.name)}</h4>
      <ul>${p.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <div class="chips">${p.stack.map(s => `<span class="chip2">${esc(s)}</span>`).join("")}</div>
      ${p.repo ? `<a class="btn ghost" href="${esc(p.repo)}" target="_blank" rel="noopener">View on GitHub</a>` : ""}
    </article>`).join("")}
  </div></div>`;
}

function cvApp(root) {
  root.innerHTML = `<div class="cv">
    <div class="cv-bar">
      <div class="seg" role="tablist">${CONFIG.cvFiles.map((c, i) => `<button role="tab" data-i="${i}" class="${i ? "" : "on"}">${esc(c.label)}</button>`).join("")}</div>
      <span class="grow"></span>
      <a class="btn ghost" id="cv-open" target="_blank" rel="noopener">Open in tab</a>
      <a class="btn" id="cv-dl" download>Download PDF</a>
    </div>
    <iframe id="cv-frame" title="Curriculum vitae"></iframe>
  </div>`;
  const frame = $("#cv-frame", root), open = $("#cv-open", root), dl = $("#cv-dl", root);
  const show = i => {
    const f = CONFIG.cvFiles[i].file;
    frame.src = f + "#toolbar=0&navpanes=0&view=FitH";
    open.href = f; dl.href = f;
    root.querySelectorAll(".seg button").forEach(b => b.classList.toggle("on", +b.dataset.i === i));
  };
  root.querySelectorAll(".seg button").forEach(b => b.onclick = () => show(+b.dataset.i));
  show(0);
  // Phones usually can't embed PDFs, so offer open/download buttons instead
  if (matchMedia("(pointer: coarse)").matches || mobile()) {
    frame.replaceWith(el("div", { className: "cv-fallback" }, `<p>Tap <b>Open in tab</b> to read the CV in your browser, or <b>Download PDF</b> to save it.</p>`));
  }
}

function connectionsApp() {
  const tiles = [
    { k: "github", n: "GitHub", u: CONFIG.github, d: "github.com/Sneeuman" },
    { k: "linkedin", n: "LinkedIn", u: CONFIG.linkedin, d: "almero-badenhorst" },
    CONFIG.email && { k: "mail", n: "Email", u: "mailto:" + CONFIG.email, d: CONFIG.email },
  ].filter(Boolean);
  return `<div class="files">
    <nav class="side"><h5>Places</h5>
      <a class="on" href="#" onclick="return false">${UI.home}Connections</a>
      <a href="${esc(CONFIG.github)}" target="_blank" rel="noopener">${UI.link}GitHub</a>
      <a href="${esc(CONFIG.linkedin)}" target="_blank" rel="noopener">${UI.link}LinkedIn</a>
    </nav>
    <div class="fmain">
      <div class="crumb">Home › Connections</div>
      <div class="tiles">
        ${tiles.map(t => `<a class="tile" href="${esc(t.u)}" ${t.u.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>
          <div class="big">${ICON[t.k]}</div><b>${t.n}</b><small>${esc(t.d)}</small></a>`).join("")}
        <div class="tile soon"><div class="big">${chip("#5f7a99", `<path d="M12 5v14M5 12h14"/>`)}</div><b>More soon</b><small>Next platform</small></div>
      </div>
    </div></div>`;
}

function settingsApp() {
  return `<div class="pad"><h2 class="app-h">Appearance</h2><p class="sub">Pick a theme. Your choice is remembered on this device.</p>
    <div class="themes">${THEMES.map(t => `
      <button class="theme-opt" data-id="${t.id}">
        <div class="sw" style="background:linear-gradient(135deg,${t.a},${t.b})"><i style="background:${t.bar}"></i></div>
        <b>${t.name}</b><small>${t.note}</small></button>`).join("")}</div>
    <div class="sec"><h3>About this desktop</h3>
      <p>A hand-built, Plasma-inspired desktop in plain HTML, CSS and JavaScript. No frameworks, no build step. Drag windows by their title bars, resize from the edges, and try the Terminal.</p></div></div>`;
}

/* ----- Terminal ----- */
function terminalApp(root) {
  root.innerHTML = `<div class="term" id="term"><div id="tout"></div>
    <label class="row"><span class="pr">almero@portfolio</span><span class="dim">:~$</span><input id="tin" autocomplete="off" spellcheck="false" aria-label="Terminal input"></label></div>`;
  const out = $("#tout", root), input = $("#tin", root), term = $("#term", root);
  const print = (t, cls = "") => { out.append(el("div", { className: "ln " + cls }, t)); term.scrollTop = term.scrollHeight; };
  const hist = []; let hi = 0;
  const cmds = {
    help: () => print(`Commands:\n  <span class="ac">about</span>     who I am\n  <span class="ac">skills</span>    what I work with\n  <span class="ac">projects</span>  what I've built\n  <span class="ac">contact</span>   how to reach me\n  <span class="ac">neofetch</span>  system info\n  <span class="ac">theme</span>     cycle the theme\n  <span class="ac">open</span> &lt;app&gt;  open: cv, github, linkedin, projects\n  <span class="ac">clear</span>     clear the screen`),
    whoami: () => print("almero"),
    about: () => print(esc(CONFIG.bio[0])),
    skills: () => Object.entries(CONFIG.skills).forEach(([k, v]) => print(`<span class="ac">${esc(k)}</span>: ${esc(v.join(", "))}`)),
    projects: () => CONFIG.projects.forEach(p => print(`<span class="ac">${esc(p.name)}</span> <span class="dim">(${esc(p.stack.join(", "))})</span>`)),
    contact: () => print(`GitHub    ${esc(CONFIG.github)}\nLinkedIn  ${esc(CONFIG.linkedin)}${CONFIG.email ? "\nEmail     " + esc(CONFIG.email) : ""}`),
    theme: () => { cycleTheme(); print("Theme switched.", "dim"); },
    clear: () => { out.innerHTML = ""; },
    neofetch: () => print(`<span class="ac">almero</span>@<span class="ac">portfolio</span>\n-----------------\n<span class="ac">OS</span>      PortfolioOS (Plasma-style)\n<span class="ac">Host</span>    ${esc(CONFIG.location)}\n<span class="ac">Shell</span>   js-sh 1.0\n<span class="ac">Role</span>    ${esc(CONFIG.title)}\n<span class="ac">Study</span>   ${esc(CONFIG.tagline)}\n<span class="ac">Theme</span>   ${esc(document.documentElement.dataset.theme)}\n<span class="ac">Time</span>    ${esc(clockParts().time)} SAST`),
    open: arg => {
      const map = { cv: () => openApp("cv"), projects: () => openApp("projects"), about: () => openApp("about"), connections: () => openApp("connections"),
        github: () => window.open(CONFIG.github, "_blank", "noopener"), linkedin: () => window.open(CONFIG.linkedin, "_blank", "noopener") };
      if (map[arg]) { map[arg](); print(`Opening ${esc(arg)}…`, "dim"); } else print("usage: open cv | projects | about | github | linkedin");
    },
    sudo: () => print("Nice try. This portfolio is read-only.", "dim"),
    ls: () => print("about.txt  cv.pdf  projects/  connections/"),
  };
  print(`Welcome to <span class="ac">PortfolioOS</span>. Type <span class="ac">help</span> to get started.`);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const raw = input.value.trim(); input.value = "";
      print(`<span class="pr">almero@portfolio</span><span class="dim">:~$</span> ${esc(raw)}`);
      if (raw) { hist.push(raw); hi = hist.length; const [c, ...a] = raw.split(/\s+/); (cmds[c.toLowerCase()] || (() => print(`${esc(c)}: command not found. Try <span class="ac">help</span>.`)))(a.join(" ").toLowerCase()); }
    } else if (e.key === "ArrowUp") { if (hi > 0) input.value = hist[--hi]; e.preventDefault(); }
    else if (e.key === "ArrowDown") { input.value = hi < hist.length - 1 ? hist[++hi] : (hi = hist.length, ""); e.preventDefault(); }
  });
  term.addEventListener("click", () => { if (!getSelection().toString()) input.focus(); });
  setTimeout(() => { if (!mobile()) input.focus(); }, 50);
}

/* ===================== APP REGISTRY ===================== */
const APPS = {
  about:       { title: "About Me",    icon: ICON.about,       w: 760, h: 600, desc: "Who I am and what I do", render: r => r.innerHTML = aboutApp() },
  cv:          { title: "CV",          icon: ICON.cv,          w: 820, h: 640, desc: "Resume and full CV", init: cvApp },
  projects:    { title: "Projects",    icon: ICON.projects,    w: 780, h: 560, desc: "Selected work", render: r => r.innerHTML = projectsApp() },
  connections: { title: "Connections", icon: ICON.connections, w: 640, h: 420, desc: "GitHub, LinkedIn and email", render: r => r.innerHTML = connectionsApp() },
  terminal:    { title: "Terminal",    icon: ICON.terminal,    w: 640, h: 420, desc: "Poke around with commands", init: terminalApp },
  settings:    { title: "Appearance",  icon: ICON.settings,    w: 560, h: 440, desc: "Themes", render: r => { r.innerHTML = settingsApp(); r.querySelectorAll(".theme-opt").forEach(b => b.onclick = () => setTheme(b.dataset.id)); setTheme(document.documentElement.dataset.theme); } },
};
const DESKTOP_ORDER = ["about", "cv", "projects", "connections", "terminal", "settings"];
const LINKS = [
  { id: "github",   title: "GitHub",   icon: ICON.github,   url: CONFIG.github,   desc: "Code and repositories" },
  { id: "linkedin", title: "LinkedIn", icon: ICON.linkedin, url: CONFIG.linkedin, desc: "Professional profile" },
];

/* ===================== WINDOW MANAGER ===================== */
const wins = new Map(); let zTop = 10, cascade = 0;
const winLayer = $("#windows"), tasksEl = $("#tasks");

function openApp(id) {
  if (wins.has(id)) { const w = wins.get(id); if (w.min) restore(id); focusWin(id); return; }
  const app = APPS[id];
  const root = el("section", { className: "win" });
  root.setAttribute("role", "dialog"); root.setAttribute("aria-label", app.title);
  const vw = winLayer.clientWidth, vh = winLayer.clientHeight;
  const w = Math.min(app.w, vw - 24), h = Math.min(app.h, vh - 24);
  const off = (cascade++ % 6) * 28;
  root.style.width = w + "px"; root.style.height = h + "px";
  root.style.left = Math.max(8, Math.min((vw - w) / 2 + 40 + off - 90, vw - w - 8)) + "px";
  root.style.top = Math.max(8, Math.min((vh - h) / 2 + off - 60, vh - h - 8)) + "px";
  root.innerHTML = `
    <header class="titlebar"><span class="tt-ico">${app.icon}</span><span class="tt">${esc(app.title)}</span>
      <div class="wbtns">
        <button class="wbtn" data-a="min" aria-label="Minimize">${UI.min}</button>
        <button class="wbtn" data-a="max" aria-label="Maximize">${UI.max}</button>
        <button class="wbtn close" data-a="close" aria-label="Close">${UI.close}</button>
      </div></header>
    <div class="win-body"></div>
    <i class="rz e" data-d="e"></i><i class="rz s" data-d="s"></i><i class="rz se" data-d="se"></i>`;
  winLayer.append(root);
  const body = $(".win-body", root);
  if (app.render) app.render(body); else app.init(body);

  const task = el("button", { className: "task" }, `<span class="ti">${app.icon}</span><span class="tl">${esc(app.title)}</span>`);
  task.title = app.title;
  task.onclick = () => { const s = wins.get(id); if (s.min) { restore(id); focusWin(id); } else if (s.active) minimize(id); else focusWin(id); };
  tasksEl.append(task);

  const state = { id, root, task, min: false, active: false, max: false };
  wins.set(id, state);

  root.addEventListener("pointerdown", () => focusWin(id));
  root.querySelectorAll(".wbtn").forEach(b => b.onclick = e => {
    e.stopPropagation(); const a = b.dataset.a;
    a === "close" ? closeWin(id) : a === "min" ? minimize(id) : toggleMax(id);
  });
  const tb = $(".titlebar", root);
  tb.addEventListener("dblclick", e => { if (!e.target.closest(".wbtns")) toggleMax(id); });
  enableDrag(root, tb, state); enableResize(root);
  focusWin(id);
}
function focusWin(id) {
  wins.forEach((s, k) => { const on = k === id; s.active = on && !s.min; s.root.classList.toggle("inactive", !on); s.task.classList.toggle("active", s.active); });
  const s = wins.get(id); if (s) s.root.style.zIndex = ++zTop;
}
function minimize(id) { const s = wins.get(id); s.min = true; s.active = false; s.root.classList.add("minimized"); s.task.classList.remove("active"); s.task.classList.add("min"); }
function restore(id) { const s = wins.get(id); s.min = false; s.root.classList.remove("minimized"); s.task.classList.remove("min"); }
function toggleMax(id) { const s = wins.get(id); s.max = !s.max; s.root.classList.toggle("maximized", s.max); }
function closeWin(id) { const s = wins.get(id); s.root.remove(); s.task.remove(); wins.delete(id); const next = [...wins.values()].filter(w => !w.min).sort((a, b) => b.root.style.zIndex - a.root.style.zIndex)[0]; if (next) focusWin(next.id); }

function enableDrag(root, handle, state) {
  handle.addEventListener("pointerdown", e => {
    if (e.target.closest(".wbtns") || state.max || mobile()) return;
    const sx = e.clientX, sy = e.clientY, ox = root.offsetLeft, oy = root.offsetTop;
    handle.setPointerCapture(e.pointerId);
    const mv = ev => {
      const L = winLayer.clientWidth, T = winLayer.clientHeight;
      root.style.left = Math.min(Math.max(ox + ev.clientX - sx, -root.offsetWidth + 120), L - 80) + "px";
      root.style.top = Math.min(Math.max(oy + ev.clientY - sy, 0), T - 38) + "px";
    };
    const up = () => { handle.removeEventListener("pointermove", mv); handle.removeEventListener("pointerup", up); };
    handle.addEventListener("pointermove", mv); handle.addEventListener("pointerup", up);
  });
}
function enableResize(root) {
  root.querySelectorAll(".rz").forEach(h => h.addEventListener("pointerdown", e => {
    e.preventDefault(); e.stopPropagation(); h.setPointerCapture(e.pointerId);
    const d = h.dataset.d, sx = e.clientX, sy = e.clientY, w0 = root.offsetWidth, h0 = root.offsetHeight;
    const mv = ev => {
      if (d.includes("e")) root.style.width = Math.max(300, w0 + ev.clientX - sx) + "px";
      if (d.includes("s")) root.style.height = Math.max(200, h0 + ev.clientY - sy) + "px";
    };
    const up = () => { h.removeEventListener("pointermove", mv); h.removeEventListener("pointerup", up); };
    h.addEventListener("pointermove", mv); h.addEventListener("pointerup", up);
  }));
}

/* ===================== DESKTOP ICONS ===================== */
const iconsEl = $("#icons");
function addDesktopIcon(label, icon, action) {
  const b = el("button", { className: "dicon" }, `<span class="ico">${icon}</span><span>${esc(label)}</span>`);
  b.onclick = () => {
    iconsEl.querySelectorAll(".dicon").forEach(x => x.classList.remove("selected")); b.classList.add("selected");
    if (matchMedia("(pointer: coarse)").matches || mobile()) action();
  };
  b.ondblclick = action;
  b.onkeydown = e => { if (e.key === "Enter") action(); };
  iconsEl.append(b);
}
DESKTOP_ORDER.forEach(id => addDesktopIcon(APPS[id].title, APPS[id].icon, () => openApp(id)));
LINKS.forEach(l => addDesktopIcon(l.title, l.icon, () => window.open(l.url, "_blank", "noopener")));
$("#desktop").addEventListener("pointerdown", e => { if (e.target === $("#desktop") || e.target === iconsEl || e.target === winLayer) iconsEl.querySelectorAll(".dicon").forEach(x => x.classList.remove("selected")); });

/* ===================== LAUNCHER ===================== */
const launcher = $("#launcher"), lbtn = $("#launcher-btn"), lsearch = $("#launcher-search"), llist = $("#launcher-list");
const clockPop = $("#clock-pop"), clockBtn = $("#clock");
function buildLauncher(q = "") {
  const items = [
    ...DESKTOP_ORDER.map(id => ({ title: APPS[id].title, icon: APPS[id].icon, desc: APPS[id].desc, run: () => openApp(id) })),
    ...LINKS.map(l => ({ title: l.title, icon: l.icon, desc: l.desc, run: () => window.open(l.url, "_blank", "noopener") })),
  ].filter(i => (i.title + " " + i.desc).toLowerCase().includes(q.toLowerCase()));
  llist.innerHTML = "";
  if (!items.length) llist.innerHTML = `<p class="sub" style="padding:8px 10px">No matching apps.</p>`;
  items.forEach(i => {
    const b = el("button", { className: "lrow" }, `<span class="li">${i.icon}</span><span><b>${esc(i.title)}</b><small>${esc(i.desc)}</small></span>`);
    b.setAttribute("role", "menuitem");
    b.onclick = () => { i.run(); closePopups(); };
    llist.append(b);
  });
}
function closePopups() { launcher.hidden = true; clockPop.hidden = true; lbtn.setAttribute("aria-expanded", "false"); }
lbtn.onclick = e => { e.stopPropagation(); const show = launcher.hidden; closePopups(); if (show) { launcher.hidden = false; lbtn.setAttribute("aria-expanded", "true"); lsearch.value = ""; buildLauncher(); if (!mobile()) lsearch.focus(); } };
clockBtn.onclick = e => { e.stopPropagation(); const show = clockPop.hidden; closePopups(); if (show) { clockPop.hidden = false; renderCalendar(); } };
lsearch.oninput = () => buildLauncher(lsearch.value);
lsearch.onkeydown = e => { if (e.key === "Enter") { const f = llist.querySelector(".lrow"); if (f) f.click(); } };
document.addEventListener("pointerdown", e => { if (!e.target.closest(".popup, #launcher-btn, #clock")) closePopups(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closePopups(); });
$("#btn-restart").onclick = () => location.reload();
$("#btn-theme-cycle").onclick = cycleTheme;
$("#tray-theme").onclick = cycleTheme;

/* ===================== CLOCK (South African time) ===================== */
function clockParts(d = new Date()) {
  const f = (o) => new Intl.DateTimeFormat("en-ZA", { timeZone: CONFIG.timezone, ...o }).format(d);
  return {
    time: f({ hour: "2-digit", minute: "2-digit", hourCycle: "h23" }),
    secs: f({ hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }),
    date: f({ weekday: "short", day: "numeric", month: "short" }),
    long: f({ weekday: "long", day: "numeric", month: "long", year: "numeric" }),
  };
}
function tickClock() {
  const c = clockParts();
  $("#clock-time").textContent = c.time; $("#clock-date").textContent = c.date;
  clockBtn.title = c.long + " · SAST";
  if (!clockPop.hidden) { $("#cp-time").textContent = c.secs; $("#cp-date").textContent = c.long; }
}
function renderCalendar() {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: CONFIG.timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()).split("-").map(Number);
  const [Y, M, D] = parts, first = new Date(Date.UTC(Y, M - 1, 1)).getUTCDay(), days = new Date(Date.UTC(Y, M, 0)).getUTCDate();
  const cal = $("#cp-cal"); cal.innerHTML = ["S", "M", "T", "W", "T", "F", "S"].map(d => `<b>${d}</b>`).join("");
  for (let i = 0; i < first; i++) cal.append(el("i"));
  for (let d = 1; d <= days; d++) cal.append(el("i", { className: d === D ? "today" : "", textContent: d }));
  tickClock();
}
tickClock(); setInterval(tickClock, 1000);

/* ===================== BOOT ===================== */
setTheme(store.get("theme") || "midnight");
(function avatar() {
  const img = $("#lh-avatar"); img.onload = () => { img.hidden = false; $("#lh-fallback").hidden = true; }; img.src = CONFIG.photo;
})();
// Open the About window on first load so visitors see something immediately
openApp("about");
