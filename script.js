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




// ====================================
// DISCOVERY CALL - TWO STEP FORM
// ====================================

const discoveryBusinessPhone = "18433729675";

const discoveryDialog =
    document.getElementById("discoveryDialog");

const discoveryForm =
    document.getElementById("discoveryForm");

const discoveryStep1 =
    document.getElementById("discoveryStep1");

const discoveryStep2 =
    document.getElementById("discoveryStep2");

const discoveryTopic =
    document.getElementById("discoveryTopic");

const discoveryOtherWrap =
    document.getElementById("discoveryOtherWrap");

const discoveryOther =
    document.getElementById("discoveryOther");

const discoveryEmail =
    document.getElementById("discoveryEmail");

const discoveryWhatsapp =
    document.getElementById("discoveryWhatsapp");

const discoveryPhone =
    document.getElementById("discoveryPhone");

const discoveryPhoneLabel =
    document.getElementById("discoveryPhoneLabel");

const discoveryPhonePending =
    document.getElementById("discoveryPhonePending");

let discoveryReturnFocus = null;

if (discoveryDialog && discoveryForm) {

    const title =
        document.getElementById("discoveryTitle");

    const description =
        document.getElementById("discoveryDescription");

    const summary =
        document.getElementById("discoverySummary");

    const backButton =
        document.getElementById("discoveryBack");

    const formattedPhone = discoveryBusinessPhone.replace(
        /^1(\d{3})(\d{3})(\d{4})$/,
        "+1 ($1) $2-$3"
    );



// International phone number input
    const phoneInput =
        document.getElementById("discoveryPhoneInput");

    const phoneIti = window.intlTelInput(phoneInput, {
            initialCountry: "ca",
            numberDisplayFormat: "INTERNATIONAL",

            // Use a normal dropdown on desktop and mobile
            countrySelectorMode: "DROPDOWN",

            // Prevent clipping inside the dialog
            dropdownParent: discoveryDialog,

            // Keep desktop dropdown aligned with phone input
            matchDropdownWidth: true,
            formatAsYouType: true,
            loadUtils: () => import(
        "https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.8/dist/js/utils.js"
    )
});

// Clear validation errors when the number changes
    phoneInput.addEventListener("input", () => {
        phoneInput.setCustomValidity("");
});

    phoneInput.addEventListener("countrychange", () => {
        phoneInput.setCustomValidity("");
});

    const validBusinessPhone =
        /^[1-9]\d{6,14}$/.test(discoveryBusinessPhone);

    if (validBusinessPhone) {
        discoveryPhone.href = `tel:+${discoveryBusinessPhone}`;
        discoveryPhoneLabel.textContent = formattedPhone;
        discoveryPhone.hidden = false;
        discoveryWhatsapp.hidden = false;
        discoveryPhonePending.hidden = true;
    } else {
        discoveryPhone.hidden = true;
        discoveryWhatsapp.hidden = true;
        discoveryPhonePending.hidden = false;
    }

    // Show or hide custom topic field
    function updateOtherField() {
        const isOther = discoveryTopic.value === "Other";

        discoveryOtherWrap.hidden = !isOther;
        discoveryOther.required = isOther;

        if (!isOther) {
            discoveryOther.value = "";
        }
    }

    discoveryTopic.addEventListener(
        "change",
        updateOtherField
    );

    // Change popup content between steps
    function showDiscoveryStep(step) {
        const firstStep = step === 1;

        discoveryStep1.hidden = !firstStep;
        discoveryStep2.hidden = firstStep;

        title.textContent = firstStep
            ? "Let's begin with a conversation."
            : "You're one step closer.";

        description.textContent = firstStep
            ? "Tell us a little about yourself so we can personalize your discovery call request."
            : "Choose how you'd like to connect with BloomPath.";

        if (firstStep) {
            document.getElementById("discoveryName").focus();
        } else {
            discoveryEmail.focus();
        }
    }

    // Open Step 1 from all existing CTA buttons
    document.querySelectorAll(
        "[data-open-discovery]"
    ).forEach(button => {

        button.addEventListener("click", () => {

        discoveryReturnFocus = button;

    discoveryForm.reset();
    updateOtherField();

    discoveryDialog.showModal();
    document.body.classList.add("discovery-open");

    showDiscoveryStep(1);
});

});

    // Form submission moves to Step 2
 /*   discoveryForm.addEventListener("submit", event => {

        event.preventDefault();

    const name = document
        .getElementById("discoveryName")
        .value.trim();

    const email = document
        .getElementById("discoveryEmailInput")
        .value.trim();

    const phone = document
        .getElementById("discoveryPhoneInput")
        .value.trim();

    const topic = discoveryTopic.value === "Other"
        ? `Other: ${discoveryOther.value.trim()}`
        : discoveryTopic.value;

    // Prepare a personalized message
    const message = [
        "Hello BloomPath,",
        "",
        "I would like to book a free discovery call.",
        "",
        `Name: ${name}`,
        `Coaching Topic: ${topic}`,
        `Email: ${email}`,
        `Phone Number: ${phone}`,
        "",
        "Please let me know the next steps.",
        "",
        "Thank you!"
    ].join("\n");

    const subject =
        `Free Discovery Call Request - ${name}`;

    // Prepare email draft
    discoveryEmail.href =
        `mailto:bloompathelevate@gmail.com` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(message)}`;

    // Prepare WhatsApp draft
    if (validBusinessPhone) {
        discoveryWhatsapp.href =
            `https://wa.me/${discoveryBusinessPhone}` +
            `?text=${encodeURIComponent(message)}`;
    }

    // Show a brief summary
    summary.textContent =
        `Your selected topic: ${topic}`;

    // Navigate to Step 2
    showDiscoveryStep(2);

});*/


    discoveryForm.addEventListener("submit", async event => {

        event.preventDefault();

        // Get visitor details
        const name = document
            .getElementById("discoveryName")
            .value.trim();

        const email = document
            .getElementById("discoveryEmailInput")
            .value.trim();

        const topic = discoveryTopic.value === "Other"
            ? `Other: ${discoveryOther.value.trim()}`
            : discoveryTopic.value;

        // Ensure the phone formatting library is ready
        try {
            await phoneIti.promise;
        } catch (error) {
            phoneInput.setCustomValidity(
                "Phone validation is unavailable. Please try again."
            );
            phoneInput.reportValidity();
            return;
        }

        // Validate phone number against selected country
        if (!phoneIti.isValidNumber()) {
            phoneInput.setCustomValidity(
                "Please enter a valid phone number for the selected country."
            );
            phoneInput.reportValidity();
            return;
        }

        phoneInput.setCustomValidity("");

        // International phone number, e.g. +1 403-555-0123
        const phone = phoneIti.getNumber("INTERNATIONAL");

        // =================================
        // EMAIL MESSAGE
        // =================================

        const emailSubject =
            `Free Discovery Call Request - ${name}`;

        const emailMessage = [
            "Hello BloomPath,",
            "",
            "I would like to request a free discovery call to explore how your coaching services can support my personal growth and goals.",
            "",
            "MY DETAILS",
            "------------------------------",
            `Full Name: ${name}`,
            `Coaching Topic: ${topic}`,
            `Email Address: ${email}`,
            `Phone Number: ${phone}`,
            "------------------------------",
            "",
            "I would appreciate more information about the next steps and available scheduling options.",
            "",
            "Best regards,",
            name
        ].join("\n");

        discoveryEmail.href =
            "mailto:bloompathelevate@gmail.com" +
            `?subject=${encodeURIComponent(emailSubject)}` +
            `&body=${encodeURIComponent(emailMessage)}`;


        // =================================
        // WHATSAPP MESSAGE
        // =================================

        const whatsappMessage = [
            "*BLOOMPATH | FREE DISCOVERY CALL*",
            "",
            "Hello BloomPath,",
            "",
            "I'd like to request a free discovery call to learn more about your coaching services.",
            "",
            "*My Details*",
            "",
            `*Name:* ${name}`,
            `*Coaching Topic:* ${topic}`,
            `*Email:* ${email}`,
            `*Phone:* ${phone}`,
            "",
            "I'd appreciate information about the next steps and available scheduling options."
        ].join("\n");

        if (validBusinessPhone) {
            discoveryWhatsapp.href =
                `https://wa.me/${discoveryBusinessPhone}` +
                `?text=${encodeURIComponent(whatsappMessage)}`;
        }

        // Show the selected topic
        summary.textContent =
            `Your selected topic: ${topic}`;

        // Move to Step 2
        showDiscoveryStep(2);

    });


    // Go back to edit details
    backButton.addEventListener("click", () => {
        showDiscoveryStep(1);
});

    // Close popup
    const closeDiscovery = () => discoveryDialog.close();

    discoveryDialog
        .querySelector("[data-close-discovery]")
        .addEventListener("click", closeDiscovery);

    // Close by clicking outside popup
    discoveryDialog.addEventListener("click", event => {
        if (event.target === discoveryDialog) {
        closeDiscovery();
    }
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

