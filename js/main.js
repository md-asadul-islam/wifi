document.addEventListener('DOMContentLoaded', function() {
  // Testimonial Carousel
  let currentSlide = 0;
  const slides = document.querySelectorAll('.testimonial');
  const totalSlides = slides.length;
  const carousel = document.getElementById('testimonialCarousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  function showSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides; // Handles wrapping
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
  
  // Auto-rotate testimonials
  setInterval(() => showSlide(currentSlide + 1), 5000);
  
  // Search functionality
  document.getElementById('searchInput').addEventListener('keyup', function(e) {
    if (e.key === 'Enter' && this.value.trim()) {
      console.log(`Searching for: ${this.value.trim()}`);
    }
  });
  
  
  
  
});