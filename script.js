/* ===== SITE SETTINGS: edit these once, they update every page ===== */
const SITE = {
  phone: "+910000000000",        // used for all Call buttons (digits with country code)
  whatsapp: "910000000000",      // WhatsApp number, country code first, no + or spaces
  email: "",                     // optional
  formEndpoint: ""               // e.g. a Formspree URL "https://formspree.io/f/xxxx"; leave empty to send via WhatsApp
};
/* ===== Editable content ===== */
const SERVICES = [
  ["consult","Consultation","A private one-to-one session to assess your scalp, goals and budget."],
  ["custom","Customization","Base size, density, colour, curl and hairline made to your measurements."],
  ["fit","Fitting","Precise placement, blending and cutting so the edges disappear."],
  ["comb","Maintenance","Regular tightening, re-bonding and styling to keep the look fresh."],
  ["clean","Cleaning and servicing","Deep clean, conditioning and base repair to extend lifespan."],
  ["replace","Replacement","Swap in a new system when yours has reached the end of its life."]
];
const BA = [["Client A","images/ba1-before.jpg","images/ba1-after.jpg","50% 50%"],["Client B","images/ba2-before.jpg","images/ba2-after.jpg","50% 50%"],["Client C","images/ba3-before.jpg","images/ba3-after.jpg","50% 30%"]];
/* url: add an image path (e.g. "img/system1.jpg") to replace the gradient */
const GALLERY = [
  {c:"systems",t:"Mono-base system",cut:"images/patch1.png",h:300},
  {c:"styles",t:"Natural parting",photo:"images/ba3-after.jpg",pos:"50% 30%",h:340},
  {c:"fitting",t:"Before the fitting",photo:"images/ba3-before.jpg",pos:"50% 30%",h:300},
  {c:"studio",t:"Private fitting room",ill:"studio",h:240},
  {c:"systems",t:"Crown piece",cut:"images/patch4.png",h:280},
  {c:"styles",t:"Fresh textured crop",photo:"images/ba1-after.jpg",pos:"50% 50%",h:340},
  {c:"styles",t:"Ponytail wrap",cut:"images/patch3.png",h:300},
  {c:"fitting",t:"Starting point",photo:"images/ba1-before.jpg",pos:"50% 60%",h:260},
  {c:"systems",t:"Clip-in fringe pair",cut:"images/patch2.png",h:240},
  {c:"studio",t:"Consultation desk",ill:"consult",h:260}
];
const PRICES = [
  {img:"patch2",n:"Essential",p:"₹15,000",s:"starting from",f:["Ready-made human hair patch","Standard fitting","1 maintenance visit"]},
  {img:"patch1",n:"Custom",p:"₹30,000",s:"starting from",hot:1,f:["Made to your measurements","Colour and density match","Fitting and styling","3 maintenance visits"]},
  {img:"patch4",n:"Premium",p:"₹55,000",s:"starting from",f:["Full lace, hand-tied hairline","Priority fitting","6 maintenance visits","1 free servicing"]}
];
const FAQ = [
  ["Will a hair patch look natural?","Yes. We match colour, density, texture and hairline to your own hair, then blend and cut it on you."],
  ["How long does fitting take?","Most fittings take 1 to 2 hours, including cut and styling."],
  ["Is it comfortable to wear?","Modern breathable bases are light enough for all-day wear, including sleep and exercise."],
  ["How do I maintain it?","Wash gently with recommended products and book a servicing visit every 4 to 6 weeks."],
  ["How long does a patch last?","Typically 6 to 12 months for a human hair system, depending on care and lifestyle."],
  ["How much does it cost?","Sample prices start from the plans above. A free consultation gives you an exact quote."]
];

/* ===== Helpers ===== */
const $ = (s, r = document) => r.querySelector(s);
const el = (h) => { const t = document.createElement("template"); t.innerHTML = h.trim(); return t.content.firstChild; };
if ($("#yr")) $("#yr").textContent = new Date().getFullYear();

/* ===== Nav ===== */
const nav = $("#nav") || {classList:{toggle(){}}}, menu = $("#menu"), burger = $("#burger");
document.querySelectorAll(".caret").forEach(b => b.addEventListener("click", e => {
  e.stopPropagation(); const li = b.parentElement, o = !li.classList.contains("open");
  document.querySelectorAll(".dd.open").forEach(x => { x.classList.remove("open"); x.querySelector(".caret").setAttribute("aria-expanded", false); });
  li.classList.toggle("open", o); b.setAttribute("aria-expanded", o);
}));
document.addEventListener("click", () => document.querySelectorAll(".dd.open").forEach(x => { x.classList.remove("open"); x.querySelector(".caret").setAttribute("aria-expanded", false); }));
addEventListener("scroll", () => nav.classList.toggle("s", scrollY > 40), {passive:true});
burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
menu.addEventListener("click", e => { if (e.target.tagName === "A" && window.innerWidth > 900) { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

/* ===== Patch Atlas hero ===== */
/* ===== Image slots (drop a file with the exact name into /images and it appears automatically) =====
   HERO_BG        : background photo behind the viewer (optional)
   feat (per patch): photo for the sidebar "Featured patch" card; falls back to the patch cutout
   To add a new tab, copy one patch block below, give it a new id/img/feat and edit the text.            */
const HERO_BG = "images/hero-bg.jpg";
const PATCHES = [
  {id:"mono",feat:"images/featured-mono.jpg",name:"Mono-base system",latin:"Men's custom system",family:"Men's systems",img:"images/patch1.png",tags:["Mono lace base","Natural density","Custom fit"],
   desc:"A full, natural top with a breathable mono-lace centre and a polyurethane edge. Made to your head shape and blended into your own hair line at the fitting.",
   traits:[["i-ruler","Hair length","4–8 cm, cut on fitting"],["i-layers","Base","Mono lace + skin edge"],["i-strand","Hair","100% human hair"],["i-clock","Wear time","4–6 weeks per refit"]],
   place:"Everyday wear, gym, office and travel.",cap:"A full crown, fitted to look like yours.",
   close:"A fine mono-lace centre lets the scalp breathe while hand-tied hair keeps the parting natural.",lens:"50% 50%",
   ft:"Full on top. Natural at the edge.",fx:"Breathable base and a hairline that blends."},
  {id:"fringe",feat:"images/featured-fringe.jpg",name:"Clip-in fringe pair",latin:"Side bangs, clip-on",family:"Women's toppers",img:"images/patch2.png",tags:["Clip-in","Instant volume","No adhesive"],
   desc:"A matched pair of side-swept fringe pieces that clip on in seconds. They add frame and softness around the face and cover thinning at the temples.",
   traits:[["i-ruler","Length","Chin to cheekbone"],["i-layers","Fixing","Snap clips"],["i-strand","Hair","Human hair blend"],["i-clock","Wear time","Up to 10 hours"]],
   place:"Temples, front hairline and quick style changes.",cap:"Soft framing, in under a minute.",
   close:"Each piece is cut with a tapered tip so the ends melt into your own hair.",lens:"28% 30%",
   ft:"A softer frame, instantly.",fx:"Clip on in seconds, remove at night."},
  {id:"wrap",feat:"images/featured-wrap.jpg",name:"Ponytail wrap",latin:"Wrap-around extension",family:"Women's extensions",img:"images/patch3.png",tags:["Wrap-around","Long volume","Styleable"],
   desc:"A glossy, flexible hair wrap that turns a simple ponytail into a thick, long one. It twists around your own hair and holds without pulling.",
   traits:[["i-ruler","Length","30–45 cm"],["i-layers","Fixing","Velcro + comb"],["i-strand","Hair","Heat-safe fibre or human hair"],["i-clock","Wear time","All day"]],
   place:"Ponytails, buns, parties and weddings.",cap:"One twist, and the length is yours.",
   close:"Light tone variation on the ends gives a natural, sun-kissed finish.",lens:"72% 22%",
   ft:"Length in one twist.",fx:"Light, glossy and easy to style."},
  {id:"crown",feat:"images/featured-crown.jpg",name:"Crown piece",latin:"Volume top piece",family:"Crown toppers",img:"images/patch4.png",tags:["Crown volume","Smooth finish","Easy care"],
   desc:"A rounded top piece that restores fullness at the crown and parting. The hair sits flat and smooth, and the base blends with the surrounding hair.",
   traits:[["i-ruler","Size","12 × 14 cm base"],["i-layers","Base","Silk top"],["i-strand","Hair","100% human hair"],["i-clock","Wear time","3–5 weeks per refit"]],
   place:"Thinning at the crown or a widening part.",cap:"Fullness, exactly where you need it.",
   close:"Hair is set in a natural swirl so the crown looks grown, not placed.",lens:"45% 38%",
   ft:"Fullness where it counts.",fx:"A smooth crown with a natural swirl."}
];
(() => {
  if (!document.querySelector("#stage")) return;
  const $ = (s) => document.querySelector(s);
  const atlas = $("#home"), stage = $("#stage"), move = $("#move"), rig = $("#rig"), pivot = $("#pivot"), spin = $("#spin");
  const front = $("#front"), back = $("#back"), detail = $("#detail"), tabsEl = $("#tabs");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const HOME = {yaw: 0.35, pitch: 0.12};
  let idx = 0, yaw = HOME.yaw, pitch = HOME.pitch, vy = 0, vp = 0, queue = 0, zoom = 1, zt = 1, last = performance.now(), idleAt = performance.now(), busy = false, drag = null, homing = false;
  const ptrs = new Map(); let pinch = 0;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  PATCHES.forEach(p => { const i = new Image(); i.src = p.img; });

  tabsEl.innerHTML = PATCHES.map((p, i) => `<button class="tab" role="tab" aria-selected="${i === idx}" tabindex="${i === idx ? 0 : -1}" data-i="${i}"><img src="${p.img}" alt=""><b>${p.name}</b><i>${p.latin}</i></button>`).join("");
  tabsEl.addEventListener("click", e => { const t = e.target.closest(".tab"); if (t) select(+t.dataset.i); });
  tabsEl.addEventListener("keydown", e => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    select(clamp(idx + (e.key === "ArrowRight" ? 1 : -1), 0, PATCHES.length - 1));
    tabsEl.children[idx].focus();
  });

  function useImg(el, wanted, fallback) {
    el.src = fallback;
    if (!wanted) return;
    const t = new Image(); t.onload = () => { if (PATCHES[idx].feat === wanted || el.id !== "featImg") el.src = wanted; el.classList.add("photo"); };
    t.onerror = () => el.classList.remove("photo"); t.src = wanted;
  }
  if (HERO_BG) { const t = new Image(); t.onload = () => { atlas.style.setProperty("--bg-img", `url(${HERO_BG})`); atlas.classList.add("hasbg"); }; t.src = HERO_BG; }
  function renderDetail() {
    const p = PATCHES[idx];
    detail.innerHTML = `<p class="eyebrow">${p.family}</p><h1>${p.name}</h1>
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      <p class="desc">${p.desc}</p><h2>Key traits</h2>
      ${p.traits.map(t => `<div class="trait"><svg class="ic"><use href="#${t[0]}"/></svg><span>${t[1]}</span><div>${t[2]}</div></div>`).join("")}
      <h2 style="margin-top:12px">Best for</h2><div class="trait"><svg class="ic"><use href="#i-pin"/></svg><span>Where</span><div>${p.place}</div></div>
      <button class="lens" id="lens" aria-pressed="false" style="margin-top:16px"><span class="lz" style="background-image:url(${p.img});background-position:${p.lens}"></span><span><b>Close-up detail</b><small>${p.close}</small></span><svg class="ic sm"><use href="#i-chev"/></svg></button>
      <a class="btn" href="contact.html">Get a quote</a>`;
    [...detail.children].forEach((c, i) => c.style.setProperty("--i", i));
    $("#lens").onclick = () => { zt = zt > 2.2 ? 1 : 2.6; poke(); };
    $("#caption").textContent = p.cap;
    useImg($("#featImg"), p.feat, p.img); $("#featTitle").textContent = p.ft; $("#featText").textContent = p.fx;
  }
  function setImg() { const p = PATCHES[idx]; front.src = back.src = p.img; const m = `url(${p.img})`; $("#sheen").style.webkitMaskImage = m; $("#sheen").style.maskImage = m; front.alt = back.alt = p.name; }

  function select(n) {
    if (n === idx || busy) return;
    busy = true; poke();
    const dir = Math.sign(n - idx), dur = reduce ? 0 : 780;
    document.querySelectorAll(".tab").forEach((t, i) => { t.setAttribute("aria-selected", i === n); t.tabIndex = i === n ? 0 : -1; });
    $("#gshadow").classList.add("out");
    const slide = stage.clientWidth * 0.7;
    const out = rig.animate([{transform: "none"}, {transform: `translateX(${-dir * slide}px) scale(.2)`}], {duration: dur * .45, easing: "cubic-bezier(.5,0,.9,.4)", fill: "forwards"});
    detail.classList.add("leaving");
    const swap = () => {
      idx = n; yaw = HOME.yaw; pitch = HOME.pitch; vy = vp = 0; queue = 0; zt = zoom = 1;
      setImg(); detail.classList.remove("leaving"); renderDetail();
      const inn = rig.animate([{transform: `translateX(${dir * slide}px) scale(.25)`}, {transform: "none"}], {duration: dur * .8, easing: "cubic-bezier(.34,1.5,.64,1)"});
      out.cancel(); $("#gshadow").classList.remove("out");
      inn.onfinish = () => { busy = false; };
      if (!dur) busy = false;
    };
    dur ? out.onfinish = swap : swap();
  }

  /* sizing + focus framing */
  function fit() {
    const w = stage.clientWidth, h = stage.clientHeight;
    rig.style.setProperty("--sz", Math.min(w * 0.58, h * 0.62) + "px");
    let dx = 0, dy = 0, s = 1;
    if (atlas.classList.contains("focus")) {
      const a = atlas.getBoundingClientRect(), r = stage.getBoundingClientRect();
      dx = a.left + a.width / 2 - (r.left + r.width / 2);
      dy = a.top + a.height * 0.52 - (r.top + r.height / 2);
      s = 1.18;
    }
    move.style.transform = `translate(${dx}px,${dy}px) scale(${s})`;
  }
  new ResizeObserver(fit).observe(stage); addEventListener("resize", fit);

  /* interaction */
  function poke() { idleAt = performance.now(); $("#hint").classList.add("gone"); }
  stage.addEventListener("pointerdown", e => {
    if (e.target.closest("button")) return;
    stage.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, e); stage.classList.add("drag"); poke(); homing = false;
    if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); }
    drag = {x: e.clientX, y: e.clientY};
  });
  stage.addEventListener("pointermove", e => {
    if (!ptrs.has(e.pointerId)) return;
    ptrs.set(e.pointerId, e); poke();
    if (ptrs.size === 2) {
      const [a, b] = [...ptrs.values()], d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      if (pinch) zt = zoom = clamp(zoom * d / pinch, .55, 3.4); pinch = d; return;
    }
    const k = Math.PI / Math.max(260, rig.clientWidth * 1.6);
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag = {x: e.clientX, y: e.clientY};
    yaw += dx * k; pitch = clamp(pitch + dy * k, -1.25, 1.25); vy = dx * k * 60; vp = dy * k * 60;
  });
  const up = e => { ptrs.delete(e.pointerId); pinch = 0; if (!ptrs.size) stage.classList.remove("drag"); else drag = null; };
  stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);
  /* plain wheel scrolls the page; zoom only with Ctrl/Cmd + wheel or trackpad pinch */
  stage.addEventListener("wheel", e => { if (!e.ctrlKey && !e.metaKey) return; e.preventDefault(); poke(); zt = clamp(zt * Math.exp(-e.deltaY * 0.01), .55, 3.4); }, {passive: false});
  const step = d => select((idx + d + PATCHES.length) % PATCHES.length);
  $("#pPrev").onclick = () => step(-1); $("#pNext").onclick = () => step(1);
  const home = () => { homing = true; zt = 1; vy = vp = 0; queue = 0; poke(); };
  stage.addEventListener("dblclick", home);
  stage.addEventListener("keydown", e => {
    const s = 0.18; poke();
    if (e.key === "ArrowLeft") yaw -= s; else if (e.key === "ArrowRight") yaw += s;
    else if (e.key === "ArrowUp") pitch = clamp(pitch - s, -1.25, 1.25); else if (e.key === "ArrowDown") pitch = clamp(pitch + s, -1.25, 1.25);
    else if (e.key === "+" || e.key === "=") zt = clamp(zt * 1.2, .55, 3.4); else if (e.key === "-") zt = clamp(zt / 1.2, .55, 3.4);
    else if (e.key === "0") home(); else return;
    e.preventDefault();
  });
  $("#bIn").onclick = () => { poke(); zt = clamp(zt * 1.35, .55, 3.4); };
  $("#bOut").onclick = () => { poke(); zt = clamp(zt / 1.35, .55, 3.4); };
  $("#tL").onclick = () => { poke(); queue -= Math.PI / 2; };
  $("#tR").onclick = () => { poke(); queue += Math.PI / 2; };
  stage.querySelector(".pill span").onclick = () => { poke(); queue += Math.PI * 2; };
  const setFocus = on => { atlas.classList.toggle("focus", on); $("#bFocus").classList.toggle("on", on); $("#bFocus").setAttribute("aria-pressed", on); fit(); poke(); };
  $("#bFocus").onclick = () => setFocus(!atlas.classList.contains("focus"));
  addEventListener("keydown", e => { if (e.key === "Escape") setFocus(false); });
  $("#bLight").onclick = e => { const d = atlas.dataset.light !== "dusk"; atlas.dataset.light = d ? "dusk" : "day"; e.currentTarget.classList.toggle("on", d); e.currentTarget.setAttribute("aria-pressed", d); };

  /* frame loop */
  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    if (!drag || !ptrs.size) { yaw += vy * dt; pitch = clamp(pitch + vp * dt, -1.25, 1.25); const f = Math.exp(-dt * 4.5); vy *= f; vp *= f; }
    const step = queue * (1 - Math.exp(-dt * 4.2)); yaw += step; queue -= step;
    if (homing) {
      const tw = Math.round((yaw - HOME.yaw) / (Math.PI * 2)) * Math.PI * 2 + HOME.yaw, f = 1 - Math.exp(-dt * 6);
      yaw += (tw - yaw) * f; pitch += (HOME.pitch - pitch) * f;
      if (Math.abs(tw - yaw) < .002 && Math.abs(HOME.pitch - pitch) < .002) homing = false;
    }
    zoom += (zt - zoom) * (1 - Math.exp(-dt * 6));
    const t = now / 1000, idle = reduce ? 0 : clamp((now - idleAt - 1800) / 1500, 0, 1);
    spin.style.transform = `rotateX(${pitch}rad) rotateY(${yaw}rad)`;
    $("#sheen").style.backgroundPosition = `${50 + Math.sin(yaw) * 70 + Math.sin(pitch * 2 + t * .8) * 25}% 50%`;
    pivot.style.transform = `translateY(${reduce ? 0 : Math.sin(t * 1.3 + idx) * 4}px) scale(${zoom}) rotateY(${Math.sin(t * .55) * .16 * idle}rad) rotateX(${Math.sin(t * .9) * .03 * idle}rad)`;
    $("#bIn").classList.toggle("on", zoom >= 1.001); $("#bOut").classList.toggle("on", zoom < .999);
    const l = $("#lens"); if (l) l.setAttribute("aria-pressed", zt > 2.2);
    requestAnimationFrame(frame);
  }
  setImg(); renderDetail(); fit(); requestAnimationFrame(frame);
})();

/* ===== Render sections ===== */
if ($("#serviceGrid")) $("#serviceGrid").append(...SERVICES.map(([i,t,d]) => el(`<article class="card svc" id="${t.toLowerCase().split(" ")[0]}"><div class="pic" data-photo="images/service-${t.toLowerCase().split(" ")[0]}.jpg"><svg class="illsvg" viewBox="0 0 96 96" aria-hidden="true"><use href="#ill-${i}"/></svg></div><h3>${t}</h3><p>${d}</p></article>`)));

if ($("#baGrid")) $("#baGrid").append(...BA.map(([n, bi, ai, pos]) => {
  const w = el(`<div class="ba" aria-label="Before and after ${n}">
    <div class="pane before" style="background-image:url(${bi});background-position:${pos}"><span>Before</span></div><div class="pane after" style="background-image:url(${ai});background-position:${pos}"><span>After</span></div>
    <div class="bar"></div>
    <input type="range" min="0" max="100" value="50" aria-label="Compare before and after"></div>`);
  const r = w.querySelector("input"), a = w.querySelector(".after"), b = w.querySelector(".bar");
  r.oninput = () => { a.style.clipPath = `inset(0 0 0 ${r.value}%)`; b.style.left = r.value + "%"; };
  return w;
}));

const grid = $("#galleryGrid");
if (grid) GALLERY.forEach(g => {
  const warm = "radial-gradient(circle at 50% 40%,#f3e6c8,#c9a96e)", dark = "radial-gradient(circle at 30% 20%,#3a3630,#121212 70%)";
  const bg = g.cut ? `url(${g.cut}) center/68% no-repeat,${warm}` : g.photo ? `url(${g.photo}) ${g.pos}/cover no-repeat` : dark;
  const b = el(`<button class="tile" data-c="${g.c}" style="height:${g.h}px;background:${bg}">${g.ill ? `<svg class="illsvg" viewBox="0 0 96 96" aria-hidden="true"><use href="#ill-${g.ill}"/></svg>` : ""}<span>${g.t}</span></button>`);
  b.onclick = () => { const l = $("#lb"); $("#lbBody").style.background = bg; $("#lbBody").textContent = g.t; l.hidden = false; };
  grid.append(b);
});
if ($("#filters")) $("#filters").onclick = e => {
  const f = e.target.dataset.f; if (!f) return;
  document.querySelectorAll("#filters button").forEach(x => x.classList.toggle("on", x === e.target));
  document.querySelectorAll(".tile").forEach(t => t.classList.toggle("hide", f !== "all" && t.dataset.c !== f));
};
if ($("#lb")) $("#lb").onclick = e => { if (e.target.id !== "lbBody") $("#lb").hidden = true; };
addEventListener("keydown", e => { if (e.key === "Escape" && $("#lb")) $("#lb").hidden = true; });

if ($("#priceGrid")) $("#priceGrid").append(...PRICES.map(p => el(`<article class="card dk price ${p.hot ? "hot" : ""}">
  <div class="pic cut"><img src="images/${p.img}.png" alt="${p.n} plan"></div><h3>${p.n}</h3><div class="amt">${p.p} <small>${p.s}</small></div>
  <ul>${p.f.map(x => `<li>${x}</li>`).join("")}</ul>
  <a class="btn" href="contact.html?plan=${encodeURIComponent(p.n)}">Get a quote</a></article>`)));

if ($("#faqList")) $("#faqList").append(...FAQ.map(([q,a]) => {
  const d = el(`<details><summary>${q}</summary><div class="ans"><p>${a}</p></div></details>`);
  const ans = d.querySelector(".ans");
  d.querySelector("summary").onclick = e => {
    e.preventDefault();
    document.querySelectorAll("#faqList details[open]").forEach(o => { if (o !== d) { o.open = false; o.querySelector(".ans").style.maxHeight = 0; } });
    if (d.open) { ans.style.maxHeight = 0; setTimeout(() => d.open = false, 300); }
    else { d.open = true; ans.style.maxHeight = ans.scrollHeight + "px"; }
  };
  return d;
}));


/* ===== Contact shortcuts (WhatsApp, call, back to top) ===== */
const waLink = (txt) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(txt || "Hi, I'd like to book a free consultation.")}`;
document.querySelectorAll("a[href^='tel:']").forEach(a => a.href = "tel:" + SITE.phone);
document.querySelectorAll("#waFloat,[data-wa]").forEach(a => a.href = waLink());
{ const t = $("#toTop"); if (t) { addEventListener("scroll", () => { t.hidden = scrollY < 700; }, {passive:true}); t.onclick = () => scrollTo({top:0}); } }
document.querySelectorAll("img:not([loading])").forEach(i => { if (!i.closest(".atlas")) i.loading = "lazy"; });

/* ===== Contact form ===== */
if ($("#form")) { const pl = new URLSearchParams(location.search).get("plan"); if (pl) $("#form").msg.value = `I'd like a quote for the ${pl} plan.`; }
if ($("#form")) $("#form").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target; let ok = true;
  ["name","phone","email"].forEach(k => {
    const i = f[k], bad = !i.value.trim() || (k === "phone" && i.value.replace(/\D/g,"").length < 8) || (k === "email" && !/^\S+@\S+\.\S+$/.test(i.value));
    i.classList.toggle("bad", bad); if (bad) ok = false;
  });
  const s = $("#status");
  if (!ok) { s.textContent = "Please complete name, phone and a valid email."; return; }
  const data = Object.fromEntries(new FormData(f)), btn = f.querySelector("[type=submit]");
  const text = `Hi, I'm ${data.name}. Interested in: ${data.topic}. ${data.msg || ""} Phone: ${data.phone}, Email: ${data.email}`.trim();
  if (!SITE.formEndpoint) { s.textContent = "Opening WhatsApp so we can reach you right away…"; open(waLink(text), "_blank", "noopener"); f.reset(); return; }
  btn.disabled = true; s.textContent = "Sending…";
  fetch(SITE.formEndpoint, {method:"POST", headers:{"Content-Type":"application/json", Accept:"application/json"}, body:JSON.stringify(data)})
    .then(r => { if (!r.ok) throw 0; s.textContent = "Thank you. We'll call you within one business day."; f.reset(); })
    .catch(() => { s.textContent = "Could not send. Please call or WhatsApp us instead."; })
    .finally(() => { btn.disabled = false; });
});

/* ===== Optional real photos: drop images/<name>.jpg and it replaces the illustration ===== */
document.querySelectorAll("[data-photo]").forEach(el => {
  const t = new Image(); t.onload = () => { el.style.backgroundImage = `url(${t.src})`; el.classList.add("hasphoto"); }; t.src = el.dataset.photo;
});
