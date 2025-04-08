// Animation on scroll
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("fade-in", entry.isIntersecting);
      });
    }, {
      threshold: 0.2
    });
  
    cards.forEach(card => {
      observer.observe(card);
    });
  });
  