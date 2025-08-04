// Floating Buttons with Scroll Progress and Chat Functionality

// Get DOM elements
const backToTopContainer = document.querySelector('.back-to-top-container');
const backToTopBtn = document.querySelector('.back-to-top');
const progressCircle = document.querySelector('.progress-ring-circle');
const progressText = document.querySelector('.scroll-progress-text');
const chatButton = document.querySelector('.chat-button');
const chatContainer = document.querySelector('.chat-container');
const chatOptions = document.querySelector('.chat-options');

// Exit if required elements don't exist
if (!backToTopContainer || !backToTopBtn || !progressCircle || !progressText || !chatButton || !chatContainer || !chatOptions) {
  console.error('Required elements not found in the DOM');
} else {
  // Constants
  const circumference = 282.6;
  const scrollThreshold = 400;
  const moveUpDistance = 70;

  // Scroll event handler
  const handleScroll = function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    const percent = Math.round(scrollProgress * 100);
    
    // Update circular progress
    progressCircle.style.strokeDashoffset = circumference - (scrollProgress * circumference);
    progressText.textContent = `${percent}%`;
    
    // Toggle visibility and positions
    if (scrollTop > scrollThreshold) {
      backToTopContainer.style.display = 'flex';
      backToTopBtn.classList.remove('hidden');
      chatButton.style.transform = `translateY(-${moveUpDistance}px)`;
      chatOptions.style.bottom = `calc(70px + ${moveUpDistance}px)`;
    } else {
      backToTopContainer.style.display = 'none';
      backToTopBtn.classList.add('hidden');
      chatButton.style.transform = 'translateY(0)';
      chatOptions.style.bottom = '70px';
    }
  };

  // Back to top click handlers
  backToTopContainer.addEventListener('click', function(e) {
    // Only trigger if clicking on the container itself, not its children
    if (e.target === this) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Close chat when clicking outside
  const closeChatOnClickOutside = function(e) {
    if (!chatContainer.contains(e.target) && e.target !== chatButton) {
      chatContainer.classList.remove('active');
      document.removeEventListener('click', closeChatOnClickOutside);
    }
  };

  // Chat button click handler
  chatButton.addEventListener('click', function(e) {
    e.stopPropagation();
    const wasActive = chatContainer.classList.contains('active');
    
    // Close all chat containers first (in case there are multiple)
    document.querySelectorAll('.chat-container').forEach(container => {
      container.classList.remove('active');
    });
    
    // Toggle if this was the active one, else open
    if (!wasActive) {
      chatContainer.classList.add('active');
      
      // Set transition delays for chat options
      document.querySelectorAll('.chat-option').forEach((option, index) => {
        option.style.transitionDelay = `${index * 0.1}s`;
      });
      
      // Add click outside listener
      document.addEventListener('click', closeChatOnClickOutside);
    } else {
      document.removeEventListener('click', closeChatOnClickOutside);
    }
  });

  // Initialize
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger once to initialize
}