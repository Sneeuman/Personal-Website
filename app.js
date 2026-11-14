/* =====================================================================
   ALMERO BADENHORST | PORTFOLIO DESKTOP  (app.js)

   WHAT THIS FILE DOES
   The whole website is a pretend desktop operating system. There is no
   framework and no build step: index.html holds the empty "skeleton"
   (wallpaper, icon area, panel, popups) and THIS file fills it with life.

   HOW IT IS ORGANISED (top to bottom, each part has a banner comment)
     1. CONFIG ........ all your text/data. Edit this to change content.
     2. HELPERS ....... tiny utilities used everywhere ($, el, esc, store)
     3. ICONS/THEMES .. inline SVG icons and the colour themes
     4. APP CONTENT ... functions that return the HTML for each window
     5. LIVE WALLPAPER  canvas animations (aurora and rain)
     6. APP REGISTRY .. the list of "programs" the desktop can open
     7. WINDOW MANAGER  open / focus / minimise / drag / resize windows
     8. DESKTOP, LAUNCHER, CLOCK, BOOT SCREEN

   THE BIG IDEA (read this first if you are new)
   Every window is built the same way:
        APPS[id].render()  ->  returns an HTML string  ->  openApp() puts it
        inside a draggable <section class="win"> and adds a taskbar button.
   Adding a new "program" = write one function that returns HTML and add one
   line to APPS. Nothing else needs to change.

   TERMS USED IN THE COMMENTS
   DOM ....... the live page the browser builds from the HTML
   state ..... data the code remembers (e.g. which windows are open)
   callback .. a function handed to another function to be run later
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
      tag: "Android · Group project", name: "Amplify",
      points: ["Secure community and messaging Android app: feed, search, profiles and an admin portal.", "End-to-end encrypted direct and group chats with real-time sync and an AI assistant.", "Identity verification workflow, backed by Supabase."],
      stack: ["Java", "Android", "Supabase", "XML"], repo: "https://github.com/AtiyyahBata/Amplify",
    },
    {
      tag: "Android · Group project", name: "AI Career Companion",
      points: ["Community app linking software engineering students with articles, Q&A and courses.", "Helped design the database, user verification and architecture."],
      stack: ["Android Studio", "Java", "Firebase"], repo: "",
    },
    {
      tag: "Web app · Open source", name: "QR Studio (QR Code Creator)",
      points: ["A free QR code website anyone can use: 11 content types, custom patterns, gradients, logos and frames.", "Reads every code back with a decoder to check it scans, plus bulk ZIP export.", "Private by design: runs fully in the browser, works offline."],
      stack: ["JavaScript", "SVG", "Canvas", "HTML", "CSS", "PWA"],
      repo: "https://github.com/Sneeuman/QR-Code-Creator",
      live: "https://sneeuman.github.io/QR-Code-Creator/",
    },
    {
      tag: "Networking", name: "Network Configuration",
      points: ["Designed and configured a network in Cisco Packet Tracer.", "Routers, switches and DHCP."],
      stack: ["Cisco Packet Tracer", "DHCP"], repo: "",
    },
  ],
};
/* HOW TO ADD A PROJECT: copy one object in `projects` above and fill in:
     tag    small label above the title        name   the title
     points bullet points (keep them short)    stack  tech chips at the bottom
     repo   (optional) GitHub link  -> shows a "View on GitHub" button
     live   (optional) website link -> shows an "Open website" button
   Leave `repo` / `live` out (or "") and the matching button simply isn't drawn. */

/* ===================== HELPERS ===================== */
/* Shortcuts so the rest of the file stays readable.
   $("#id")        = document.querySelector("#id")  (find ONE element)
   $("x", parent)  = search only inside `parent` */
const $ = (s, r = document) => r.querySelector(s);
/* el("div", {className:"box"}, "<b>hi</b>") builds a new element in one line.
   Object.assign copies the attrs (className, title, ...) onto the element. */
const el = (tag, attrs = {}, html = "") => { const e = document.createElement(tag); Object.assign(e, attrs); if (html) e.innerHTML = html; return e; };
/* SECURITY: whenever text is put into a template string that becomes innerHTML,
   it passes through esc() first. It swaps < > & " for harmless codes, so
   text like "<script>" is shown as text and can never run as code. */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
/* localStorage remembers things between visits (theme, wallpaper).
   Browsers can block it (private mode, strict settings) and then it THROWS an
   error, so every read/write is wrapped in try/catch. If it fails the site
   still works, it just forgets your choice. */
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};
/* True on phone-width screens. A function (not a constant) so it is re-checked
   every time, because the user can rotate the phone or resize the window. */
const mobile = () => matchMedia("(max-width: 720px)").matches;

/* ===================== ICONS ===================== */
/* The GitHub logo as an SVG "path" (a list of drawing commands: M = move,
   C = curve, L = line, z = close). It is drawn on a 16x16 grid. */
const GH_PATH = "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z";
/* chip() makes the coloured rounded-square app icons.
   It nests one <svg> inside another: the outer 48x48 draws the coloured tile,
   the inner 28x28 (placed at x=10,y=10) draws the white line-icon on top.
   Because SVG scales without blurring, the icons stay sharp at any size. */
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
/* HOW THEMING WORKS
   style.css defines every colour as a CSS variable (--accent, --win-bg, ...)
   once per theme, e.g.  :root[data-theme="daylight"] { --accent: #1d7fd6; }
   setTheme() only flips the data-theme attribute on <html>. The browser then
   re-colours the whole page instantly: no JavaScript touches individual colours. */
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
/* Used by the taskbar button and the Terminal: moves to the next theme and
   wraps back to the first one (the % does the wrap-around). */
const cycleTheme = () => {
  const cur = THEMES.findIndex(t => t.id === document.documentElement.dataset.theme);
  setTheme(THEMES[(cur + 1) % THEMES.length].id);
};

/* ===================== APP CONTENT ===================== */
/* Shows your photo if assets/photo.jpg exists. The initials sit BEHIND it.
   If the image file is missing, onerror removes the broken <img>, so the
   initials show instead: no broken-image icon, no extra code needed. */
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

/* Builds one card per project by looping over CONFIG.projects with .map(),
   then .join("") glues the pieces into one HTML string. The `cond ? html : ""`
   pattern is how optional parts (the buttons) are included or skipped. */
function projectsApp() {
  return `<div class="pad"><h2 class="app-h">Projects</h2><p class="sub">Things I've built, from backend systems to full-stack apps.</p>
  <div class="proj-grid">${CONFIG.projects.map(p => `
    <article class="card proj">
      <span class="tag">${esc(p.tag)}</span><h4>${esc(p.name)}</h4>
      <ul>${p.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <div class="chips">${p.stack.map(s => `<span class="chip2">${esc(s)}</span>`).join("")}</div>
      ${p.live || p.repo ? `<div class="proj-links">
        ${p.live ? `<a class="btn" href="${esc(p.live)}" target="_blank" rel="noopener">Open website</a>` : ""}
        ${p.repo ? `<a class="btn ghost" href="${esc(p.repo)}" target="_blank" rel="noopener">View on GitHub</a>` : ""}
      </div>` : ""}
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
  /* show(i) switches between the short resume and the full CV.
     The "#toolbar=0&navpanes=0&view=FitH" part after the file name is a PDF
     "open parameter": it hides the PDF toolbar and side panel and fits the
     page to the window width. */
  const show = i => {
    const f = CONFIG.cvFiles[i].file;
    frame.src = f + "#toolbar=0&navpanes=0&view=FitH";
    open.href = f; dl.href = f;
    root.querySelectorAll(".seg button").forEach(b => b.classList.toggle("on", +b.dataset.i === i));
  };
  root.querySelectorAll(".seg button").forEach(b => b.onclick = () => show(+b.dataset.i));
  show(0);
  /* Most phone browsers can't display a PDF inside an <iframe> (you'd see a
     blank box). `(pointer: coarse)` means "touch screen". On those devices the
     frame is replaced with a message pointing at the two buttons above. */
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

/* ===================== LIVE WALLPAPERS (canvas) ===================== */
/* The live wallpapers are drawn on an HTML <canvas> (a pixel surface you paint
   on with JavaScript) and redrawn ~30-60 times per second.

   `(() => { ... })()` is an IIFE: a function that runs immediately. Variables
   declared inside (raf, ctx, stars...) stay PRIVATE, which acts like a small
   module. Only the object returned at the bottom, with set(), is exposed.

   Performance choices (all deliberate):
     - Aurora is soft anyway, so it is drawn at 50% size (35% on phones) and the
       browser scales it up: 4x fewer pixels to paint.
     - Aurora is capped to ~30 frames/second; rain uses ~60.
     - Animation stops completely when the tab is hidden.
     - If the user asked their OS for "reduced motion", only ONE still frame is
       drawn (accessibility, and it saves battery). */
const live = (() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf = 0, mode = null, cv = null, ctx = null, w = 0, h = 0, lastDraw = 0;
  let stars = [], drops = [];
  const rnd = (a, b) => a + Math.random() * (b - a);
  /* Each aurora ribbon is described by numbers:
       base  vertical position (0 = top, 1 = bottom)   amp  how high it waves
       f1,f2 how many waves across the screen          s1,s2 how fast it moves
       th    thickness of the ribbon                   c1,c2 colours [R,G,B]
       a     opacity */
  const BANDS = [
    { base: .30, amp: .07, f1: 1.6, f2: 3.1, s1: .16, s2: .11, th: .26, c1: [47, 91, 255],  c2: [20, 50, 190], a: .55 },
    { base: .40, amp: .09, f1: 1.2, f2: 2.6, s1: .12, s2: .17, th: .30, c1: [60, 110, 255], c2: [25, 60, 200], a: .45 },
    { base: .48, amp: .06, f1: 2.1, f2: 4.0, s1: .20, s2: .09, th: .22, c1: [95, 150, 255], c2: [40, 80, 220], a: .35 },
    { base: .26, amp: .05, f1: 2.8, f2: 1.7, s1: .09, s2: .14, th: .20, c1: [30, 70, 230],  c2: [15, 40, 160], a: .40 },
  ];
  /* Called at start and whenever the window is resized. Setting canvas.width /
     canvas.height also clears the canvas, so we re-create the stars and rain
     drops to match the new size. */
  function size() {
    if (!cv) return;
    const k = mode === "aurora" ? (mobile() ? 0.35 : 0.5) : 1;   // aurora is soft, so render it small and let the browser scale it
    w = cv.width = Math.max(2, Math.round(innerWidth * k)); h = cv.height = Math.max(2, Math.round(innerHeight * k));
    stars = Array.from({ length: Math.round(w * h / 5200) }, () => ({ x: Math.random() * w, y: Math.random() * h * .75, r: rnd(.4, 1.1), p: rnd(0, 6.28), s: rnd(.4, 1.4) }));
    const n = Math.round(Math.min(mobile() ? 110 : 260, innerWidth * innerHeight / 7000));
    drops = Array.from({ length: n }, () => newDrop(true));
  }
  function newDrop(anywhere) { return { x: rnd(-50, innerWidth + 50), y: anywhere ? rnd(0, innerHeight) : rnd(-120, -10), l: rnd(14, 38), v: rnd(620, 1000), a: rnd(.18, .6) }; }

  /* One frame of the aurora. `t` = seconds since the page loaded.
     1) paint the dark night-sky gradient   2) twinkle the stars with sin()
     3) draw each ribbon as a wavy filled shape.
     "lighter" blending ADDS colours where ribbons overlap, so the overlaps glow
     brighter, which is what makes it look like light and not flat paint. */
  function drawAurora(t) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#02061a"); g.addColorStop(.5, "#081d63"); g.addColorStop(1, "#0f2f96");
    ctx.globalCompositeOperation = "source-over"; ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    for (const s of stars) { ctx.globalAlpha = .35 + .35 * Math.sin(t * s.s + s.p); ctx.fillStyle = "#cfe0ff"; ctx.fillRect(s.x, s.y, s.r, s.r); }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = "lighter";
    for (const b of BANDS) {
      const top = [], step = Math.max(4, w / 160);
      for (let x = 0; x <= w + step; x += step) {
        const u = x / w * 6.283;
        /* The wave shape: two sine waves added together. Because "t" is inside
           the sin(), the wave slides sideways as time passes. Mixing two waves
           of different speed/length makes the movement look natural, not
           mechanical. (u converts x pixels into 0..2*PI so a wave fits the width.) */
        const y = h * b.base + Math.sin(u * b.f1 + t * b.s1 * 3) * h * b.amp + Math.sin(u * b.f2 - t * b.s2 * 3) * h * b.amp * .55;
        // The ribbon's thickness also breathes slowly (between 75% and 100%).
        const th = h * b.th * (.75 + .25 * Math.sin(u * 1.3 + t * .35));
        top.push([x, y, th]);
      }
      const g2 = ctx.createLinearGradient(0, h * (b.base - b.amp * 1.5), 0, h * (b.base + b.amp * 1.5 + b.th));
      g2.addColorStop(0, `rgba(${b.c1},0)`); g2.addColorStop(.28, `rgba(${b.c1},${b.a})`);
      g2.addColorStop(.65, `rgba(${b.c2},${b.a * .45})`); g2.addColorStop(1, `rgba(${b.c2},0)`);
      /* Build the ribbon outline: walk along the TOP edge left to right, then
         come back along the BOTTOM edge (top + thickness) right to left, and
         close the shape. The vertical gradient fades it out at both edges. */
      ctx.fillStyle = g2; ctx.beginPath(); ctx.moveTo(top[0][0], top[0][1]);
      for (const p of top) ctx.lineTo(p[0], p[1]);
      for (let i = top.length - 1; i >= 0; i--) ctx.lineTo(top[i][0], top[i][1] + top[i][2]);
      ctx.closePath(); ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
  }
  /* One frame of the rain. `dt` = seconds since the last frame, so drops fall at
     the same real-world speed on a 30Hz and a 144Hz screen (distance = speed x
     time). Each drop is a short slanted line; when it leaves the bottom it is
     recycled at the top (Object.assign reuses the object = no memory churn). */
  function drawRain(t, dt) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#030a1f"); g.addColorStop(.6, "#08205e"); g.addColorStop(1, "#0d2c8a");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    const glow = ctx.createRadialGradient(w * .5, h * 1.05, 0, w * .5, h * 1.05, h * .8);
    glow.addColorStop(0, "rgba(70,120,255,.28)"); glow.addColorStop(1, "rgba(70,120,255,0)");
    ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);
    ctx.lineWidth = 1.1; ctx.lineCap = "round";
    for (const d of drops) {
      ctx.strokeStyle = `rgba(150,190,255,${d.a})`;
      ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - d.l * .18, d.y - d.l); ctx.stroke();
      d.y += d.v * dt; d.x -= d.v * dt * .18;
      if (d.y - d.l > h) Object.assign(d, newDrop(false));
    }
  }
  /* The animation loop. requestAnimationFrame asks the browser to call us right
     before it paints the next screen frame, and it pauses automatically in
     background tabs. We re-schedule ourselves first, then skip drawing if less
     than minGap milliseconds have passed (the frame-rate cap). */
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const minGap = mode === "aurora" ? 33 : 16;           // aurora at ~30fps is plenty and saves battery
    if (now - lastDraw < minGap) return;
    const dt = Math.min(.05, (now - lastDraw) / 1000); lastDraw = now;
    mode === "aurora" ? drawAurora(now / 1000) : drawRain(now / 1000, dt);
  }
  function stop() { cancelAnimationFrame(raf); raf = 0; }
  function start() {
    stop(); if (!mode || document.hidden) return;
    if (reduced) { mode === "aurora" ? drawAurora(4) : drawRain(0, 0); return; }   // still frame for reduced-motion users
    lastDraw = 0; raf = requestAnimationFrame(frame);
  }
  // Stop the loop while the tab is hidden, restart when it becomes visible again.
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  addEventListener("resize", () => { if (mode) { size(); if (reduced) start(); } });
  return {
    /* Public method: switch to "aurora" or "rain". Any other id (a still
       wallpaper) just stops the animation. */
    set(id) {
      mode = (id === "aurora" || id === "rain") ? id : null;
      if (!mode) { stop(); return; }
      cv = document.querySelector(`#wallpaper canvas[data-wp="${id}"]`); ctx = cv.getContext("2d"); size(); start();
    },
  };
})();

const WALLPAPERS = [
  { id: "aurora", name: "Aurora", live: true }, { id: "rain", name: "Rain", live: true },
  { id: "plasma", name: "Plasma" }, { id: "waves", name: "Waves" }, { id: "blueprint", name: "Blueprint" },
  { id: "horizon", name: "Horizon" }, { id: "bokeh", name: "Bokeh" },
];
/* Choosing a wallpaper only sets data-wp="..." on <html>; style.css shows the
   matching layer and hides the rest (look for "WALLPAPER LAYERS" in the CSS).
   Unknown or missing ids fall back to "aurora" so a stale saved value from an
   old version can never leave the desktop blank. */
function setWallpaper(id) {
  if (id === "custom" && !store.get("wp-custom")) id = "aurora";
  if (id !== "custom" && !WALLPAPERS.some(w => w.id === id)) id = "aurora";
  document.documentElement.dataset.wp = id;
  store.set("wp", id);
  live.set(id);
  if (id === "custom") $(".wp-custom").style.backgroundImage = `url("${store.get("wp-custom")}")`;
  document.querySelectorAll(".wp-opt").forEach(b => b.classList.toggle("on", b.dataset.id === id));
}
/* The user's own picture. Phones take 4000px photos, far too big to store, so:
   load it into an <img>, copy it onto a canvas scaled down to max 1920px,
   export it as a compressed JPEG data-URL (the picture written as text) and
   keep that in localStorage (limit is ~5MB, hence the shrinking). */
function uploadWallpaper(file, done) {
  if (!file || !file.type.startsWith("image/")) return;
  const img = new Image(), url = URL.createObjectURL(file);
  img.onload = () => {
    const k = Math.min(1, 1920 / Math.max(img.width, img.height)), c = document.createElement("canvas");
    c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    URL.revokeObjectURL(url);
    store.set("wp-custom", c.toDataURL("image/jpeg", 0.82));
    done();
  };
  img.src = url;
}
/* Builds the thumbnail buttons in the Appearance window. For still wallpapers it
   CLONES the real SVG from the page so the thumbnail is always identical to the
   wallpaper. ids are removed from the clone because the page must never contain
   two elements with the same id. */
function wallpaperSection(root) {
  const grid = $(".wps", root);
  WALLPAPERS.forEach(w => {
    const b = el("button", { className: "wp-opt" }, `<div class="wp-thumb"></div><b>${w.name}</b>`);
    b.dataset.id = w.id;
    if (w.live) {
      $(".wp-thumb", b).append(el("div", { className: "live-" + w.id }), el("span", { className: "live-badge", textContent: "LIVE" }));
      $(".live-" + w.id, b).style.cssText = "position:absolute;inset:0";
    } else {
      const svg = document.querySelector(`#wallpaper svg[data-wp="${w.id}"]`).cloneNode(true);
      svg.removeAttribute("class"); svg.querySelectorAll("[id]").forEach(n => n.removeAttribute("id"));
      $(".wp-thumb", b).append(svg);
    }
    b.onclick = () => setWallpaper(w.id);
    grid.append(b);
  });
  const up = el("label", { className: "wp-opt upload" }, `<div class="wp-thumb"><div class="wp-custom-thumb">＋</div></div><b>Your own image</b><input type="file" accept="image/*" hidden>`);
  up.dataset.id = "custom";
  const thumb = $(".wp-custom-thumb", up);
  if (store.get("wp-custom")) { thumb.style.backgroundImage = `url("${store.get("wp-custom")}")`; thumb.textContent = ""; }
  $("input", up).onchange = e => uploadWallpaper(e.target.files[0], () => {
    thumb.style.backgroundImage = `url("${store.get("wp-custom")}")`; thumb.textContent = ""; setWallpaper("custom");
  });
  up.addEventListener("click", e => { if (e.target.tagName !== "INPUT" && store.get("wp-custom") && e.detail) { e.preventDefault(); setWallpaper("custom"); } });
  grid.append(up);
  setWallpaper(document.documentElement.dataset.wp);
}

function settingsApp() {
  return `<div class="pad"><h2 class="app-h">Appearance</h2><p class="sub">Pick a theme and a wallpaper. Your choices are remembered on this device.</p>
    <div class="themes">${THEMES.map(t => `
      <button class="theme-opt" data-id="${t.id}">
        <div class="sw" style="background:linear-gradient(135deg,${t.a},${t.b})"><i style="background:${t.bar}"></i></div>
        <b>${t.name}</b><small>${t.note}</small></button>`).join("")}</div>
    <div class="sec"><h3>Wallpaper</h3><div class="wps"></div><p class="wp-note">Live wallpapers pause when the tab is hidden. Tip: after choosing your own image, click its tile again to switch back to it later.</p></div>
    <div class="sec"><h3>About this desktop</h3>
      <p>A hand-built, Plasma-inspired desktop in plain HTML, CSS and JavaScript. No frameworks, no build step. Drag windows by their title bars, resize from the edges, and try the Terminal.</p></div></div>`;
}

/* ----- Terminal ----- */
/* A small fake terminal. Pattern: `cmds` is a lookup table of
   command-name -> function. Typing "skills" runs cmds.skills(). Unknown names
   fall through to a "command not found" message, like a real shell. */
function terminalApp(root) {
  root.innerHTML = `<div class="term" id="term"><div id="tout"></div>
    <label class="row"><span class="pr">almero@portfolio</span><span class="dim">:~$</span><input id="tin" autocomplete="off" spellcheck="false" aria-label="Terminal input"></label></div>`;
  const out = $("#tout", root), input = $("#tin", root), term = $("#term", root);
  const print = (t, cls = "") => { out.append(el("div", { className: "ln " + cls }, t)); term.scrollTop = term.scrollHeight; };
  // hist = commands typed so far, hi = position while browsing with the arrow keys.
  const hist = []; let hi = 0;
  const cmds = {
    help: () => print(`Commands:\n  <span class="ac">about</span>     who I am\n  <span class="ac">skills</span>    what I work with\n  <span class="ac">projects</span>  what I've built\n  <span class="ac">contact</span>   how to reach me\n  <span class="ac">neofetch</span>  system info\n  <span class="ac">theme</span>     cycle the theme\n  <span class="ac">wallpaper</span> cycle the wallpaper\n  <span class="ac">open</span> &lt;app&gt;  open: cv, github, linkedin, projects\n  <span class="ac">clear</span>     clear the screen`),
    whoami: () => print("almero"),
    about: () => print(esc(CONFIG.bio[0])),
    skills: () => Object.entries(CONFIG.skills).forEach(([k, v]) => print(`<span class="ac">${esc(k)}</span>: ${esc(v.join(", "))}`)),
    projects: () => CONFIG.projects.forEach(p => print(`<span class="ac">${esc(p.name)}</span> <span class="dim">(${esc(p.stack.join(", "))})</span>`)),
    contact: () => print(`GitHub    ${esc(CONFIG.github)}\nLinkedIn  ${esc(CONFIG.linkedin)}${CONFIG.email ? "\nEmail     " + esc(CONFIG.email) : ""}`),
    theme: () => { cycleTheme(); print("Theme switched.", "dim"); },
    wallpaper: () => { const ids = WALLPAPERS.map(w => w.id); setWallpaper(ids[(ids.indexOf(document.documentElement.dataset.wp) + 1) % ids.length]); print("Wallpaper switched.", "dim"); },
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
      /* Split "open cv" into the command ("open") and arguments ("cv").
         `[c, ...a]` is array destructuring: first word -> c, the rest -> a.
         `cmds[name] || fallback` picks the handler, then ( ... )(args) calls it. */
      if (raw) { hist.push(raw); hi = hist.length; const [c, ...a] = raw.split(/\s+/); (cmds[c.toLowerCase()] || (() => print(`${esc(c)}: command not found. Try <span class="ac">help</span>.`)))(a.join(" ").toLowerCase()); }
    } else if (e.key === "ArrowUp") { if (hi > 0) input.value = hist[--hi]; e.preventDefault(); }
    else if (e.key === "ArrowDown") { input.value = hi < hist.length - 1 ? hist[++hi] : (hi = hist.length, ""); e.preventDefault(); }
  });
  term.addEventListener("click", () => { if (!getSelection().toString()) input.focus(); });
  setTimeout(() => { if (!mobile()) input.focus(); }, 50);
}

/* ===================== APP REGISTRY ===================== */
/* The list of "programs". Each entry has:
     title, icon, w/h (default window size), desc (shown in the launcher) and
     EITHER render(root) -> simple pages: just put HTML into the window
     OR     init(root)   -> interactive pages (CV, Terminal) that need to attach
                            event listeners after the HTML exists. */
const APPS = {
  about:       { title: "About Me",    icon: ICON.about,       w: 760, h: 600, desc: "Who I am and what I do", render: r => r.innerHTML = aboutApp() },
  cv:          { title: "CV",          icon: ICON.cv,          w: 820, h: 640, desc: "Resume and full CV", init: cvApp },
  projects:    { title: "Projects",    icon: ICON.projects,    w: 780, h: 560, desc: "Selected work", render: r => r.innerHTML = projectsApp() },
  connections: { title: "Connections", icon: ICON.connections, w: 640, h: 420, desc: "GitHub, LinkedIn and email", render: r => r.innerHTML = connectionsApp() },
  terminal:    { title: "Terminal",    icon: ICON.terminal,    w: 640, h: 420, desc: "Poke around with commands", init: terminalApp },
  settings:    { title: "Appearance",  icon: ICON.settings,    w: 620, h: 600, desc: "Themes and wallpapers", render: r => { r.innerHTML = settingsApp(); wallpaperSection(r); r.querySelectorAll(".theme-opt").forEach(b => b.onclick = () => setTheme(b.dataset.id)); setTheme(document.documentElement.dataset.theme); } },
};
const DESKTOP_ORDER = ["about", "cv", "projects", "connections", "terminal", "settings"];
const LINKS = [
  { id: "github",   title: "GitHub",   icon: ICON.github,   url: CONFIG.github,   desc: "Code and repositories" },
  { id: "linkedin", title: "LinkedIn", icon: ICON.linkedin, url: CONFIG.linkedin, desc: "Professional profile" },
];

/* ===================== WINDOW MANAGER ===================== */
/* `wins` remembers every open window: id -> { root (the element), task (its
   taskbar button), min, active, max }. A Map is like an object but is built
   for adding/removing keys and remembers insertion order.
   zTop is a counter: the most recently clicked window gets ++zTop as its CSS
   z-index, so it always sits on top of the others. */
const wins = new Map(); let zTop = 10, cascade = 0;
const winLayer = $("#windows"), tasksEl = $("#tasks");

/* Opening a window, step by step:
   1. Already open? Just restore/focus it (no duplicates) and stop.
   2. Create the <section>, size it (never bigger than the screen).
   3. Position it centred, shifted by `cascade` so new windows stack diagonally
      instead of hiding each other exactly.
   4. Fill in the title bar + body, call the app's render/init.
   5. Add its button to the taskbar and register it in `wins`.
   6. Wire up the buttons, dragging and resizing, then focus it. */
function openApp(id) {
  if (wins.has(id)) { const w = wins.get(id); if (w.min) restore(id); focusWin(id); return; }
  const app = APPS[id];
  const root = el("section", { className: "win" });
  root.setAttribute("role", "dialog"); root.setAttribute("aria-label", app.title);
  const vw = winLayer.clientWidth, vh = winLayer.clientHeight;
  const w = Math.min(app.w, vw - 24), h = Math.min(app.h, vh - 24);
  // cascade++ % 6 -> offsets 0,28,56,... then wraps after 6 windows so they never drift off screen.
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
  /* Taskbar button behaves like Windows/KDE: minimised -> restore; already the
     active window -> minimise; otherwise -> bring to front. */
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
/* Marks exactly ONE window as active: toggles the "inactive" (dimmed title bar)
   and "active" (taskbar highlight) classes on all windows, then raises the
   chosen one. toggle(name, condition) adds the class when condition is true. */
function focusWin(id) {
  wins.forEach((s, k) => { const on = k === id; s.active = on && !s.min; s.root.classList.toggle("inactive", !on); s.task.classList.toggle("active", s.active); });
  const s = wins.get(id); if (s) s.root.style.zIndex = ++zTop;
}
function minimize(id) { const s = wins.get(id); s.min = true; s.active = false; s.root.classList.add("minimized"); s.task.classList.remove("active"); s.task.classList.add("min"); }
function restore(id) { const s = wins.get(id); s.min = false; s.root.classList.remove("minimized"); s.task.classList.remove("min"); }
function toggleMax(id) { const s = wins.get(id); s.max = !s.max; s.root.classList.toggle("maximized", s.max); }
// After closing, hand focus to the next-highest visible window (sorted by z-index).
function closeWin(id) { const s = wins.get(id); s.root.remove(); s.task.remove(); wins.delete(id); const next = [...wins.values()].filter(w => !w.min).sort((a, b) => b.root.style.zIndex - a.root.style.zIndex)[0]; if (next) focusWin(next.id); }

/* DRAGGING with Pointer Events (one API for mouse, touch and pen).
   pointerdown   remember where the mouse started and where the window was.
   setPointerCapture  keeps sending move events to the title bar even if the
                 cursor outruns it (so the drag never "drops" the window).
   pointermove   new position = start position + how far the mouse has moved.
   Math.min/max "clamp" the result so you can't lose a window off-screen: at
   least 120px stays visible horizontally and the title bar stays reachable.
   Disabled when maximised or on phones (windows are full-screen there). */
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
/* RESIZING uses the same pointer-capture trick on three invisible handles (right
   edge "e", bottom edge "s", corner "se"; they're the <i class="rz"> elements).
   The "d" letters say which sizes the handle may change. Minimums (300x200)
   stop windows from being squashed into uselessness. */
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
/* Desktop icons follow real OS behaviour: click = select (highlight), double-click
   = open. On touch screens there is no double-click, so a single tap opens. */
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
/* The start-menu list. It is rebuilt on every keystroke in the search box:
   gather all apps + links, keep only those whose title/description contains the
   search text (case-insensitive), and draw them as buttons. */
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
/* Popups (launcher, calendar) close when you click anywhere outside them or press
   Escape. `closest(".popup, ...")` walks up from the clicked element to see if it
   was inside one: if not, close. The buttons that OPEN a popup stopPropagation()
   so the same click doesn't instantly close it again. */
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
/* WHY Intl.DateTimeFormat? The visitor could be anywhere in the world, but the
   clock must always show South African time. new Date().getHours() uses the
   VISITOR'S timezone; Intl lets us force timeZone: "Africa/Johannesburg" (set
   in CONFIG). hourCycle "h23" gives 24-hour time (00 to 23). */
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
/* Draws the month grid in the clock popup.
   - We first ask for today's date IN SOUTH AFRICA (the "en-CA" locale formats it
     as YYYY-MM-DD, which is easy to split into numbers).
   - Date.UTC(Y, M-1, 1).getUTCDay() = weekday of the 1st (0 = Sunday) -> how
     many empty cells to leave before day 1.
   - Date.UTC(Y, M, 0) = "day 0 of next month" = the LAST day of this month, a
     handy trick for finding how many days the month has. */
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
setWallpaper(store.get("wp") || "aurora");
(function avatar() {
  const img = $("#lh-avatar"); img.onload = () => { img.hidden = false; $("#lh-fallback").hidden = true; }; img.src = CONFIG.photo;
})();
/* The boot order matters: apply the saved theme and wallpaper FIRST so the
   desktop is already the right colour when the boot screen fades away. */
/* ===================== BOOT SCREEN ===================== */
/* The fake "Linux boot" intro (about 3 seconds).
   - Shown only once per visit: sessionStorage remembers it (it is wiped when the
     tab closes, unlike localStorage). Reduced-motion users skip it too.
   - The `finished` flag makes finish() safe to call many times (timer end,
     click and key press can all fire it) but it only runs once.
   - tick() prints one log line, moves the progress bar, then schedules itself
     again with setTimeout: a simple loop that doesn't freeze the page.
   - { once: true } makes the keydown listener remove itself after first use. */
function runBoot(onDone) {
  const boot = $("#boot"), fill = $("#boot-fill"), log = $("#boot-log");
  const seen = (() => { try { return sessionStorage.getItem("booted"); } catch { return null; } })();
  const quick = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let finished = false;
  const finish = () => {
    if (finished) return; finished = true;
    try { sessionStorage.setItem("booted", "1"); } catch {}
    fill.style.width = "100%"; boot.classList.add("done");
    setTimeout(() => boot.remove(), 600);
    onDone();
  };
  if (seen || quick) { boot.remove(); onDone(); return; }   // only shown once per visit
  const steps = [
    "Loading kernel modules", "Mounting /home/almero", "Starting network", "Loading Plasma-style desktop",
    "Reading CV", "Linking GitHub and LinkedIn", "Welcome",
  ];
  const total = 3000; let i = 0;
  const tick = () => {
    if (finished) return;
    if (i >= steps.length) return finish();
    log.insertAdjacentHTML("beforeend", `<div><b>[ OK ]</b> ${steps[i]}</div>`);
    log.scrollTop = log.scrollHeight;
    fill.style.width = Math.round(((i + 1) / steps.length) * 100) + "%";
    i++; setTimeout(tick, total / steps.length);
  };
  tick();
  boot.addEventListener("click", finish);
  addEventListener("keydown", finish, { once: true });
}
// Boot, then show the clean desktop. Visitors open About Me (or anything else) themselves.
runBoot(() => {});
