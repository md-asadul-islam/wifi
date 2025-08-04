document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('.newsletter-form');
  
  forms.forEach(form => {
    const emailInput = form.querySelector('.form-control');
    const submitBtn = form.querySelector('.submit-btn');
    const successMsg = form.querySelector('.newsletter-success');
    const errorMsg = document.createElement('div');
    errorMsg.className = 'newsletter-error';
    form.insertBefore(errorMsg, submitBtn.nextSibling);
    
    // Real-time validation
    emailInput.addEventListener('input', function() {
      if (this.value.length > 0) {
        if (validateEmail(this.value)) {
          this.classList.remove('error');
          this.classList.add('valid');
          errorMsg.style.display = 'none';
        } else {
          this.classList.remove('valid');
        }
      } else {
        this.classList.remove('error', 'valid');
        errorMsg.style.display = 'none';
      }
    });
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset states
      emailInput.classList.remove('error', 'valid');
      errorMsg.style.display = 'none';
      successMsg.style.display = 'none';
      
      // Validate
      if (!emailInput.value.trim()) {
        showError('Email is required');
        return;
      }
      
      if (!validateEmail(emailInput.value)) {
        showError('Please enter a valid email');
        return;
      }
      
      // Submit form
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      
      mockApiCall(emailInput.value)
        .then(() => {
          successMsg.innerHTML = `<i class="fas fa-check-circle"></i> Thank you! We've sent a confirmation to ${emailInput.value}`;
          successMsg.style.display = 'flex';
          form.reset();
        })
        .catch(err => {
          showError(err.message || 'Subscription failed. Please try again.');
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
        });
    });
    
    function showError(message) {
      emailInput.classList.add('error');
      errorMsg.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
      errorMsg.style.display = 'flex';
      emailInput.focus();
    }
  });
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function mockApiCall(email) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 10% chance of error
        Math.random() > 0.1 ? resolve() : reject({ message: 'Server error. Please try later.' });
      }, 1500);
    });
  }
});



