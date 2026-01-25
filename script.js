// Clean, subtle count-up animation
const counters = document.querySelectorAll(".count");

const animate = (el) => {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || "";
  let current = 0;
  const duration = 2000;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    current = Math.floor(progress * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver(
        (entries, obs) => {
      entries.forEach(entry => {
      if (entry.isIntersecting) {
  animate(entry.target);
  obs.unobserve(entry.target);
}
});
},
{ threshold: 0.4 }
);

counters.forEach(c => observer.observe(c));

// Premium reveal on scroll
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
        (entries, observer) => {
      entries.forEach(entry => {
      if (!entry.isIntersecting) return;
entry.target.classList.add("visible");
observer.unobserve(entry.target);
});
},
{
  threshold: 0.25,
      rootMargin: "0px 0px -80px 0px"
}
);

reveals.forEach(el => revealObserver.observe(el));


// ================================
// SERVICE IMAGE PARALLAX + REVEAL
// ================================

const serviceImages = document.querySelectorAll(".service-image");

const imageObserver = new IntersectionObserver(
        (entries) => {
      entries.forEach(entry => {
      if (!entry.isIntersecting) return;
entry.target.classList.add("in-view");
});
},
{
  threshold: 0.4
}
);

serviceImages.forEach(img => imageObserver.observe(img));

// Subtle parallax on scroll
window.addEventListener("scroll", () => {
  serviceImages.forEach(image => {
  const rect = image.getBoundingClientRect();
const speed = 0.08;
const offset = rect.top * speed;
image.style.transform = `translateY(${offset}px)`;
});
});


// FAQ accordion
document.querySelectorAll(".faq-question").forEach(q => {
  q.addEventListener("click", () => {
  const answer = q.nextElementSibling;
const open = answer.style.maxHeight;
document.querySelectorAll(".faq-answer").forEach(a => a.style.maxHeight = null);
if (!open) answer.style.maxHeight = answer.scrollHeight + "px";
});
});

// Slide-in reveal for About section
const slideElements = document.querySelectorAll(
    ".reveal-slide-left, .reveal-slide-right"
);

const slideObserver = new IntersectionObserver(
        (entries, observer) => {
        entries.forEach(entry => {
        if (!entry.isIntersecting) return;
entry.target.classList.add("visible");
observer.unobserve(entry.target);
});
},
{
    threshold: 0.25,
        rootMargin: "0px 0px -80px 0px"
}
);

slideElements.forEach(el => slideObserver.observe(el));

document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
const icon = button.querySelector(".faq-icon");
const isOpen = item.classList.contains("active");

// Close all
document.querySelectorAll(".faq-item").forEach(i => {
    i.classList.remove("active");
const iIcon = i.querySelector(".faq-icon");
if (iIcon) iIcon.textContent = "+";
});

// Open clicked
if (!isOpen) {
    item.classList.add("active");
    icon.textContent = "×";
}
});
});







