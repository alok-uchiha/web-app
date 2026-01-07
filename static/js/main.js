window.addEventListener("load", () => {
  const zoroSection = document.querySelector(".zoro-section");
  const sanjiSection = document.querySelector(".sanji-section");
  const sections = document.querySelectorAll("section");

  function updateTheme() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollY >= sanjiSection.offsetTop - windowHeight / 2) {
      document.body.style.backgroundColor = "#f5c542"; // Sanji yellow
      document.body.style.transition = "background-color 0.8s ease";
    } else {
      document.body.style.backgroundColor = "#1b5e55"; // Zoro green
      document.body.style.transition = "background-color 0.8s ease";
    }
  }

  function fadeInSections() {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        section.classList.add("visible");
      }
    });
  }

  // Run once on load to set correct color
  updateTheme();
  fadeInSections();

  // Listen for scroll events
  window.addEventListener("scroll", () => {
    updateTheme();
    fadeInSections();
  });
});
