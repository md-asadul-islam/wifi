// Infinite Scroll for Client Logos
document.addEventListener('DOMContentLoaded', function() {
  const clientsScroll = document.getElementById('clientsScroll');
  const logos = clientsScroll.innerHTML;
  
  // Duplicate logos for infinite scroll effect
  clientsScroll.innerHTML = logos + logos;
  
  // Reset animation when it ends
  clientsScroll.addEventListener('animationiteration', () => {
    // Reset position when animation completes a cycle
    if (clientsScroll.style.animationPlayState !== 'paused') {
      clientsScroll.style.animation = 'none';
      void clientsScroll.offsetWidth; // Trigger reflow
      clientsScroll.style.animation = 'scroll 30s linear infinite';
    }
  });
});