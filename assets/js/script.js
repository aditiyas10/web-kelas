// LOADER
window.addEventListener("load", () => {
  setTimeout(
    () => document.getElementById("loader").classList.add("hide"),
    3500,
  );
});

window.addEventListener("scroll", () => {
  document.getElementById("stt").classList.toggle("show", window.scrollY > 400);
});

// GALLERY BUILD
const gColors = [
  "#1a1612,#2d2318",
  "#121a12,#182d18",
  "#12121a,#18182d",
  "#1a1218,#2d182d",
  "#1a1a12,#2d2d18",
  "#121a1a,#182d2d",
  "#1a1412,#2d2018",
  "#141a12,#202d18",
  "#12141a,#18202d",
  "#1a1214,#2d1820",
  "#141a14,#202d20",
  "#14121a,#20182d",
];
const grid = document.getElementById("galleryGrid");
gColors.forEach((c, i) => {
  const d = document.createElement("div");
  d.className = "gallery-item";
  const bg = c.split(",");
  d.innerHTML = `<div class="gallery-ph" style="background:linear-gradient(145deg,${bg[0]},${bg[1]})"></div><div class="gallery-hover"><span class="gallery-hover-icon">Lihat</span></div><span class="gph-label">Foto ${String(i + 1).padStart(2, "0")}</span>`;
  d.onclick = () => openModal(i, bg);
  grid.appendChild(d);
});

// INTERSECTION OBSERVER
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add("visible"), +delay);
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".timeline-item").forEach((el, i) => {
  el.dataset.delay = i * 120;
  io.observe(el);
});
document.querySelectorAll(".stat-card").forEach((el, i) => {
  el.dataset.delay = i * 80;
  io.observe(el);
});
document.querySelectorAll(".gallery-item").forEach((el, i) => {
  el.dataset.delay = i * 40;
  io.observe(el);
});
document.querySelectorAll(".track").forEach((el, i) => {
  el.dataset.delay = i * 100;
  io.observe(el);
});
document.querySelectorAll(".letter-card").forEach((el, i) => {
  el.dataset.delay = i * 130;
  io.observe(el);
});
document
  .querySelectorAll(".fade-in,.closing-quote,.closing-class,.closing-year-text")
  .forEach((el) => io.observe(el));

// COUNTER
const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const target = +e.target.dataset.count;
        const suffix = target >= 100 ? "+" : "";
        let curr = 0,
          step = target / 60;
        const t = setInterval(() => {
          curr = Math.min(curr + step, target);
          e.target.textContent = Math.floor(curr) + suffix;
          if (curr >= target) clearInterval(t);
        }, 16);
        counterObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll("[data-count]").forEach((c) => counterObs.observe(c));

// MODAL
function openModal(i, bg) {
  const modal = document.getElementById("modal");
  const box = document.getElementById("modalBox");
  box.style.background = `linear-gradient(145deg,${bg[0]},${bg[1]})`;
  box.textContent = "";
  const lbl = document.createElement("span");
  lbl.style.cssText =
    "font-family:Space Mono,monospace;font-size:.6rem;letter-spacing:.2em;color:rgba(255,255,255,.2);text-transform:uppercase";
  lbl.textContent = `Foto ${String(i + 1).padStart(2, "0")}`;
  box.appendChild(lbl);
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  document.getElementById("modal").classList.remove("open");
  document.body.style.overflow = "";
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
