document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const slideInterval = 3000; // Change image every 3 seconds
  
  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }
  
  // Start the slideshow
  let slideShow = setInterval(nextSlide, slideInterval);
  
  // Optional: Pause on hover
  const hero = document.querySelector('.hero-slideshow');
  hero.addEventListener('mouseenter', () => clearInterval(slideShow));
  hero.addEventListener('mouseleave', () => {
    slideShow = setInterval(nextSlide, slideInterval);
  });
});

