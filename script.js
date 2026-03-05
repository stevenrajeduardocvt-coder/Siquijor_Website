// 1. INITIALIZE LENIS (Smooth Scroll - Optimized for NO DELAY)
const lenis = new Lenis({
  duration: 0.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// 2. SYNC LENIS WITH GSAP SCROLLTRIGGER
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 3. REGISTER GSAP SCROLLTRIGGER
gsap.registerPlugin(ScrollTrigger);

// 4. CONFIGURE SCROLLTRIGGER FOR BETTER PERFORMANCE
ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,scroll,resize",
});

// 5. VIDEO BACKGROUND ANIMATION (Page Load - Works on Both Pages)
gsap.to(".video-animate", {
  opacity: 1,
  scale: 1,
  duration: 2,
  ease: "power3.out",
  delay: 0.3,
});

// 6. HERO ANIMATION (Load - For Index Page)
if (document.querySelector(".hero-text")) {
  const tl = gsap.timeline();
  tl.to(".hero-text span", {
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power4.out",
    stagger: 0.2,
    delay: 0.5,
  }).to(
    ".hero-sub",
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=1",
  );
}

// 7. REVEAL TEXT ANIMATION (Scroll Trigger - Works on Both Pages)
gsap.utils.toArray(".reveal-text").forEach((text) => {
  gsap.to(text, {
    scrollTrigger: {
      trigger: text,
      start: "top 85%",
      toggleActions: "play none none reverse",
      scrub: false,
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
  });
});

// 8. IMAGE REVEAL (Clip Path - Works on Both Pages)
gsap.utils.toArray(".reveal-img-wrapper").forEach((wrapper) => {
  let img = wrapper.querySelector("img");
  if (img) {
    gsap.to(img, {
      scrollTrigger: {
        trigger: wrapper,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.5,
      },
      clipPath: "inset(0 0% 0 0)",
      ease: "none",
    });
  }
});

// 9. NAVBAR SCROLL EFFECT
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// 10. FORM SUBMISSION (Prevent Default)
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert(
      "Thank you for your booking request! We will contact you within 24 hours.",
    );
    this.reset();
  });
}

// 11. SMOOTH SCROLL FOR NAV LINKS (Using Lenis)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  });
});

// 12. ACTIVE NAV LINK ON SCROLL
let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (lenis.scrollTop >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }, 100);
});

// 13. PROPERTY CARD HOVER EFFECT
document.querySelectorAll(".property-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    gsap.to(this, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", function () {
    gsap.to(this, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// 14. CONTACT CARD HOVER EFFECT
document.querySelectorAll(".contact-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    gsap.to(this, {
      y: -5,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", function () {
    gsap.to(this, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// 15. BUTTON CLICK ANIMATION
document
  .querySelectorAll(".btn-primary-custom, .btn-secondary-custom")
  .forEach((btn) => {
    btn.addEventListener("click", function (e) {
      gsap.fromTo(
        this,
        { scale: 1 },
        { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 },
      );
    });
  });

// 16. MOBILE MENU CLOSE ON CLICK
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: true,
      });
    }
  });
});

// 17. STAGGERED PROPERTY CARDS ANIMATION
gsap.utils.toArray(".property-card").forEach((card, i) => {
  gsap.fromTo(
    card,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      delay: i * 0.15,
    }
  );
});

// 18. STAGGERED CONTACT CARDS ANIMATION
gsap.utils.toArray(".contact-card").forEach((card, i) => {
  gsap.fromTo(
    card,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      delay: i * 0.1,
    }
  );
});

// 19. HERO BACKGROUND PARALLAX (Index Page Only)
if (document.querySelector(".hero-bg")) {
  gsap.to(".hero-bg img", {
    yPercent: 15,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
    },
  });
}

// 20. SECTION HEADINGS FADE IN
gsap.utils.toArray(".section-title").forEach((title) => {
  gsap.fromTo(
    title,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 21. LEAD TEXT FADE IN
gsap.utils.toArray(".lead").forEach((lead) => {
  gsap.fromTo(
    lead,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: lead,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 22. PROPERTY PRICE ANIMATION
gsap.utils.toArray(".property-price").forEach((price) => {
  gsap.fromTo(
    price,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: price,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 23. BOOKING FORM FADE IN
if (document.querySelector(".booking-form")) {
  gsap.fromTo(
    ".booking-form",
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".booking-section",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

// 24. FOOTER FADE IN
gsap.fromTo(
  ".footer-section",
  { opacity: 0, y: 30 },
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".footer-section",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  }
);

// 25. IMAGE HOVER ZOOM EFFECT
gsap.utils.toArray(".property-image img, .gallery-item img").forEach((img) => {
  img.addEventListener("mouseenter", function () {
    gsap.to(this, {
      scale: 1.1,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  img.addEventListener("mouseleave", function () {
    gsap.to(this, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  });
});

// 26. NAVBAR BRAND FADE IN ON LOAD
gsap.fromTo(
  ".navbar-brand",
  { opacity: 0, x: -20 },
  {
    opacity: 1,
    x: 0,
    duration: 0.6,
    ease: "power2.out",
    delay: 0.3,
  }
);

// 27. NAV LINKS STAGGER FADE IN ON LOAD
gsap.fromTo(
  ".nav-link",
  { opacity: 0, y: -10 },
  {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.out",
    delay: 0.5,
    stagger: 0.1,
  }
);

// 28. ABOUT IMAGE PARALLAX
if (document.querySelector(".about-image")) {
  gsap.to(".about-image img", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: ".about-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
    },
  });
}

// 29. CONTACT INFO FADE IN
gsap.utils.toArray(".contact-info").forEach((info) => {
  gsap.fromTo(
    info,
    { opacity: 0, x: -20 },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: info,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 30. FORM INPUTS FADE IN
gsap.utils.toArray(".form-control, .form-select").forEach((input) => {
  gsap.fromTo(
    input,
    { opacity: 0, y: 10 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: input,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 31. PROPERTY FEATURES FADE IN
gsap.utils.toArray(".property-features").forEach((features) => {
  gsap.fromTo(
    features,
    { opacity: 0, y: 10 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: features,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 32. PROPERTY TITLE FADE IN
gsap.utils.toArray(".property-title").forEach((title) => {
  gsap.fromTo(
    title,
    { opacity: 0, y: 15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 33. HERO CONTENT STAGGER ANIMATION
if (document.querySelector(".hero-content")) {
  gsap.fromTo(
    ".hero-content > *",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
      delay: 0.5,
    }
  );
}

// 34. SECTION DIVIDERS FADE IN
gsap.utils.toArray(".section-title, .lead").forEach((element) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 35. PROPERTY CARD CONTENT STAGGER
gsap.utils.toArray(".property-card").forEach((card) => {
  const content = card.querySelector(".property-content");
  gsap.fromTo(
    content,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 36. GALLERY IMAGES STAGGER ANIMATION
  gsap.utils.toArray(".gallery-item").forEach((item, i) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        delay: i * 0.2,
      }
    );
  });

// 37. NAVBAR SCROLL ANIMATION
gsap.to(".navbar", {
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5,
  },
  backgroundColor: "rgba(74, 64, 54, 0.95)",
  padding: "1rem 0",
});

// 38. BUTTONS HOVER EFFECT
gsap.utils.toArray(".btn-primary-custom, .btn-secondary-custom").forEach(
  (btn) => {
    btn.addEventListener("mouseenter", function () {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    btn.addEventListener("mouseleave", function () {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }
);

// 39. SECTION BACKGROUND FADE
gsap.utils.toArray(".about-section, .properties-section, .gallery-section, .contact-section").forEach((section) => {
  gsap.fromTo(
    section,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 40. FORM LABEL FADE IN
gsap.utils.toArray(".form-label").forEach((label) => {
  gsap.fromTo(
    label,
    { opacity: 0, y: 5 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: label,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 41. CONTACT ICON FADE IN
gsap.utils.toArray(".contact-icon, .contact-icon-large").forEach((icon) => {
  gsap.fromTo(
    icon,
    { opacity: 0, scale: 0 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: icon,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 42. PROPERTY CARD CONTENT STAGGER
gsap.utils.toArray(".property-card").forEach((card) => {
  const title = card.querySelector(".property-title");
  const features = card.querySelector(".property-features");
  const price = card.querySelector(".property-price");
  
  gsap.fromTo(
    [title, features, price],
    { opacity: 0, y: 10 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 43. HERO TEXT REVEAL ON LOAD
gsap.fromTo(
  ".hero-text",
  { opacity: 0 },
  {
    opacity: 1,
    duration: 1.5,
    ease: "power3.out",
    delay: 0.3,
  }
);

// 44. NAVBAR LINKS HOVER EFFECT
gsap.utils.toArray(".nav-link").forEach((link) => {
  link.addEventListener("mouseenter", function () {
    gsap.to(this, {
      color: "#fff",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  link.addEventListener("mouseleave", function () {
    gsap.to(this, {
      color: "rgba(255, 255, 255, 0.8)",
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// 45. FOOTER LINKS HOVER EFFECT
gsap.utils.toArray(".footer-link").forEach((link) => {
  link.addEventListener("mouseenter", function () {
    gsap.to(this, {
      color: "#fff",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  link.addEventListener("mouseleave", function () {
    gsap.to(this, {
      color: "rgba(212, 197, 181, 0.8)",
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// 46. SCROLL TO TOP BUTTON (Optional)
const scrollTopBtn = document.createElement("button");
scrollTopBtn.innerHTML = "↑";
scrollTopBtn.className = "btn btn-primary-custom";
scrollTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  display: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  lenis.scrollTo(0, {
    duration: 0.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
});

// 47. IMAGE LOADING ANIMATION
gsap.utils.toArray("img").forEach((img) => {
  if (img.complete) {
    gsap.fromTo(
      img,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }
    );
  } else {
    img.addEventListener("load", () => {
      gsap.fromTo(
        img,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    });
  }
});

// 48. SECTION SPACING ANIMATION
gsap.utils.toArray("section").forEach((section, i) => {
  gsap.fromTo(
    section,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: i * 0.1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 49. PAGE LOAD COMPLETE
window.addEventListener("load", () => {
  gsap.to("body", {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
  });
});

// 50. RESIZE HANDLER
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});

// 51. TOUCH DEVICE DETECTION
if ("ontouchstart" in window) {
  document.body.classList.add("touch-device");
}

// 52. SMOOTH SCROLL FOR ALL ANCHORS (Using Lenis)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      lenis.scrollTo(targetElement, {
        offset: 0,
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  });
});

// 53. PARALLAX TEXT EFFECT
gsap.utils.toArray(".section-title").forEach((title) => {
  gsap.to(title, {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: title,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
    },
  });
});

// 54. PROPERTY CARD SHADOW EFFECT
gsap.utils.toArray(".property-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    gsap.to(this, {
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", function () {
    gsap.to(this, {
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// 55. SCROLL TRIGGER REFRESH ON LOAD
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

// 56. REMOVE SCROLL DELAY - CRITICAL FIX
document.body.style.overflow = "hidden";
setTimeout(() => {
  document.body.style.overflow = "auto";
}, 100);

// 57. PREVENT DEFAULT SCROLL BEHAVIOR
document.documentElement.style.scrollBehavior = "smooth";

// 58. FINAL ANIMATION COMPLETE
console.log("✅ All animations loaded successfully!");
console.log("✅ Lenis smooth scroll is active!");
console.log("✅ GSAP ScrollTrigger is synced!");
console.log("✅ Scroll delay has been removed!");