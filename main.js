// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", function () {
  navMenu.classList.toggle("active");

  // Hamburger animation
  const spans = hamburger.querySelectorAll("span");
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navMenu.classList.remove("active");

    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Animated counters for stats
function animateCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");
  const statsSection = document.querySelector(".hero-stats");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statNumbers.forEach((stat) => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                stat.textContent =
                  target.toFixed(0) +
                  (stat.textContent.includes("+") ? "+" : "");
                clearInterval(timer);
              } else {
                stat.textContent =
                  Math.floor(current) +
                  (stat.textContent.includes("+") ? "+" : "");
              }
            }, 30);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statsSection);
}

// Progress bar animation
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill");
  const section = document.querySelector(".sustainability-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          progressBars.forEach((bar) => {
            const width = bar.getAttribute("data-width");
            setTimeout(() => {
              bar.style.width = width + "%";
            }, 300);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(section);
}

// Business tab filtering
const tabButtons = document.querySelectorAll(".tab-btn");
const businessCards = document.querySelectorAll(".business-card");

tabButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    this.classList.add("active");

    const category = this.getAttribute("data-category");

    // Show/hide business cards based on category
    businessCards.forEach((card) => {
      if (
        category === "all" ||
        card.getAttribute("data-category") === category
      ) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 100);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// Form submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your message! We will get back to you soon.");
  contactForm.reset();
});

// Newsletter form
const newsletterForm = document.querySelector(".newsletter-form");
newsletterForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = this.querySelector(".newsletter-input");
  alert("Thank you for subscribing to our newsletter!");
  input.value = "";
});

// Button hover effects
const heroButtons = document.querySelectorAll(".btn-explore, .btn-story");
heroButtons.forEach((button) => {
  button.addEventListener("mouseenter", function () {
    if (this.classList.contains("btn-explore")) {
      const ripple = this.querySelector(".btn-ripple");
      if (ripple) {
        ripple.style.width = "200px";
        ripple.style.height = "200px";
      }
    } else if (this.classList.contains("btn-story")) {
      const shine = this.querySelector(".btn-shine");
      if (shine) {
        shine.style.left = "100%";
        setTimeout(() => {
          shine.style.left = "-100%";
          shine.style.transition = "none";
          setTimeout(() => {
            shine.style.transition = "left 0.6s";
          }, 10);
        }, 600);
      }
    }
  });
});

// Card hover effects
const cards = document.querySelectorAll(
  ".highlight-card, .business-card, .news-card, .leader-card"
);
cards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") === "#") return;

    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Initialize animations when page loads
document.addEventListener("DOMContentLoaded", function () {
  animateCounters();
  animateProgressBars();

  // Create floating particles
  createParticles();

  // Initialize floating particles animation
  const particles = document.querySelectorAll("#floating-particles div");
  particles.forEach((particle, index) => {
    particle.style.animationDelay = `${index * 2}s`;
  });
});

// Create floating particles
function createParticles() {
  const container = document.getElementById("floating-particles");
  if (!container) return;

  // Create multiple particles
  const particleCount = 15;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");

    // Random position
    const left = Math.random() * 100;
    const top = Math.random() * 100;

    // Random size
    const size = Math.random() * 4 + 2;

    // Random color
    const colors = [
      "rgba(255, 255, 255, 0.3)",
      "rgba(228, 0, 43, 0.4)",
      "rgba(0, 168, 232, 0.4)",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Random animation duration
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 5;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      top: ${top}%;
      left: ${left}%;
      opacity: 0.3;
      animation: float ${duration}s infinite ease-in-out ${delay}s;
    `;

    container.appendChild(particle);
  }
}
