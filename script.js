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

/*const toggle = document.querySelector('.theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
toggle.textContent = savedTheme === 'light' ? '☀︎' : '☾';

toggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
const next = current === 'dark' ? 'light' : 'dark';

body.setAttribute('data-theme', next);
localStorage.setItem('theme', next);
toggle.textContent = next === 'light' ? '☀︎' : '☾';
});*/


let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

function showSlide(index) {
    // Hide all slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
});

    // Show the current slide
    slides[index].classList.add('active');
}

function moveSlide(step) {
    currentSlide += step;

    // Loop back to the first slide if at the end
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

// Show the first slide initially
showSlide(currentSlide);

// Automatic slide transition every 5 seconds
setInterval(() => {
    moveSlide(1); // Move to the next slide every 5 seconds
}, 9000);


// Mobile tab navigation
document.querySelectorAll(".mobile-tabs a").forEach(link => {
    link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});
});

const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
    backToTop.classList.add("visible");
} else {
    backToTop.classList.remove("visible");
}
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
    top: 0,
    behavior: "smooth"
});
});









// Discovery-call modal. Set the real business number below to enable WhatsApp and calling.
// Include the country code and digits only, for example "15551234567".

const discoveryBusinessPhone = "18433729675";
const discoveryDialog = document.getElementById("discoveryDialog");
const discoveryWhatsapp = document.getElementById("discoveryWhatsapp");
const discoveryPhone = document.getElementById("discoveryPhone");
const discoveryPhoneLabel = document.getElementById("discoveryPhoneLabel");
const discoveryPhonePending = document.getElementById("discoveryPhonePending");
const formattedPhone = discoveryBusinessPhone.replace(
    /^1(\d{3})(\d{3})(\d{4})$/,
    "+1 ($1) $2-$3"
);
let discoveryReturnFocus = null;

if (discoveryDialog) {
  if (/^[1-9]\d{6,14}$/.test(discoveryBusinessPhone)) {
    const message = encodeURIComponent("Hello BloomPath! I'd like to book a discovery call. Please let me know the next steps.");
    discoveryWhatsapp.href = `https://wa.me/${discoveryBusinessPhone}?text=${message}`;
    discoveryPhone.href = `tel:+${discoveryBusinessPhone}`;

    discoveryPhoneLabel.textContent = formattedPhone;
    discoveryWhatsapp.hidden = false;
    discoveryPhone.hidden = false;
    discoveryPhonePending.hidden = true;
  }

  document.querySelectorAll("[data-open-discovery]").forEach(button => {
    button.addEventListener("click", () => {
      discoveryReturnFocus = button;
      discoveryDialog.showModal();
      document.body.classList.add("discovery-open");
    });
  });

  const closeDiscovery = () => discoveryDialog.close();
  discoveryDialog.querySelector("[data-close-discovery]").addEventListener("click", closeDiscovery);
  discoveryDialog.addEventListener("click", event => {
    if (event.target === discoveryDialog) closeDiscovery();
  });
  discoveryDialog.addEventListener("close", () => {
    document.body.classList.remove("discovery-open");
    discoveryReturnFocus?.focus();
  });
}



/* Mobile hamburger navigation */

const menuToggle =
    document.querySelector(".mobile-menu-toggle");

const mobileNavigation =
    document.querySelector(".mobile-tabs");

if (menuToggle && mobileNavigation) {

    function closeMobileMenu() {
        mobileNavigation.classList.remove("is-open");
        menuToggle.setAttribute(
            "aria-expanded", "false"
        );
        menuToggle.setAttribute(
            "aria-label", "Open navigation menu"
        );
    }

    menuToggle.addEventListener("click", () => {
        const isOpen =
            mobileNavigation.classList.toggle("is-open");

    menuToggle.setAttribute(
        "aria-expanded", String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu"
            : "Open navigation menu"
    );
});

    mobileNavigation.querySelectorAll("a")
        .forEach(link => {
        link.addEventListener("click", closeMobileMenu);
});

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
        closeMobileMenu();
    }
});

    document.addEventListener("click", event => {
        if (
    !mobileNavigation.contains(event.target) &&
    !menuToggle.contains(event.target)
) {
        closeMobileMenu();
    }
});
}

