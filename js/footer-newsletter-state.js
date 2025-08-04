document.addEventListener('DOMContentLoaded', function() {
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  newsletterForms.forEach(form => {
    const emailInput = form.querySelector('.form-control');
    const submitBtn = form.querySelector('.submit-btn');
    const successMsg = form.querySelector('.newsletter-success');
    const errorMsg = document.createElement('div');
    errorMsg.className = 'newsletter-error';
    form.insertBefore(errorMsg, submitBtn.nextSibling);
    
    // Reset error state when user types
    emailInput.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        this.classList.remove('error');
        errorMsg.style.display = 'none';
      }
    });
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous states
      emailInput.classList.remove('error');
      errorMsg.style.display = 'none';
      successMsg.style.display = 'none';
      
      // Validate email
      if (!emailInput.value.trim()) {
        triggerError('Email is required');
        return;
      }
      
      if (!validateEmail(emailInput.value)) {
        triggerError('Please enter a valid email');
        return;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      
      // Simulate API call (replace with actual fetch/axios)
      setTimeout(() => {
        // On success
        showSuccess();
        
        // Reset form after 3 seconds
        setTimeout(resetForm, 3000);
      }, 1500);
    });
    
    function triggerError(message) {
      // Add error class which triggers the shake animation
      emailInput.classList.add('error');
      
      // Show error message
      errorMsg.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
      errorMsg.style.display = 'flex';
      emailInput.focus();
      
      // Re-trigger shake animation by briefly removing/readding class
      setTimeout(() => {
        emailInput.classList.remove('error');
        void emailInput.offsetWidth; // Trigger reflow
        emailInput.classList.add('error');
      }, 10);
    }
    
    function showSuccess() {
      successMsg.innerHTML = `<i class="fas fa-check-circle"></i> Thank you for subscribing! You will get notify about our next updates and news.`;
      successMsg.style.display = 'flex';
      successMsg.classList.remove('hiding');
    }
    
    function resetForm() {
      // Fade out success message
      successMsg.classList.add('hiding');
      
      // After fade completes, reset everything
      setTimeout(() => {
        form.reset();
        successMsg.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        successMsg.classList.remove('hiding');
      }, 500); // Match this with CSS transition duration
    }
    
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  });
});