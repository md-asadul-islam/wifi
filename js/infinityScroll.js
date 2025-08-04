// clients-scroll.js
document.addEventListener('DOMContentLoaded', function() {
  // Pause animation on hover for better UX
  const containers = document.querySelectorAll('.scroll-container');
  
  containers.forEach(container => {
    container.addEventListener('mouseenter', () => {
      const items = container.querySelectorAll('.scroll-item');
      items.forEach(item => {
        item.style.animationPlayState = 'paused';
      });
    });
    
    container.addEventListener('mouseleave', () => {
      const items = container.querySelectorAll('.scroll-item');
      items.forEach(item => {
        item.style.animationPlayState = 'running';
      });
    });
  });
  
  // Optional: Duplicate items for wider screens
  function duplicateItemsForWideScreens() {
    const containers = document.querySelectorAll('.scroll-container');
    const windowWidth = window.innerWidth;
    
    containers.forEach(container => {
      const items = container.querySelectorAll('.scroll-item');
      const itemsWidth = items.length * 160; // 160px per item
      
      if (itemsWidth < windowWidth * 1.5) {
        container.innerHTML += container.innerHTML;
      }
    });
  }
  
  // Run on load and resize
  duplicateItemsForWideScreens();
  window.addEventListener('resize', duplicateItemsForWideScreens);
});