document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const inputs = form.querySelectorAll('input, textarea');
  
  // Add floating label effect
  inputs.forEach(input => {
    const formGroup = input.closest('.form-group');
    
    input.addEventListener('focus', () => {
      formGroup.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        formGroup.classList.remove('focused');
      }
    });
    
    // Initialize focused state if field has value
    if (input.value) {
      formGroup.classList.add('focused');
    }
  });
  
  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = form.querySelector('.btn-primary');
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Sending...';
    
    // Simulate form submission (replace with actual AJAX call)
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.textContent = 'Message Sent!';
      submitBtn.style.background = '#2ecc71';
      
      // Reset form after 2 seconds
      setTimeout(() => {
        form.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.style.background = 'linear-gradient(135deg, #3498db, #2ecc71)';
        
        // Remove focused state from all fields
        inputs.forEach(input => {
          input.closest('.form-group').classList.remove('focused');
        });
      }, 2000);
    }, 1500);
  });
}); 




