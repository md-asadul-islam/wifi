// preloader.js
document.addEventListener('DOMContentLoaded', function() {
  const preloader = document.getElementById('preloader');
  
  // Hide preloader when all assets are loaded
  window.addEventListener('load', function() {
    // Add fade-out class first
    preloader.classList.add('preloader-fade-out');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500); // Match this with CSS transition duration
  });
  
  // Optional: Hide preloader after max 5 seconds even if assets fail to load
  setTimeout(() => {
    if (preloader.style.display !== 'none') {
      preloader.classList.add('preloader-fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  }, 5000);
}); 


