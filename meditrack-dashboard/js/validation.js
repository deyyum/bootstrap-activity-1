
document.addEventListener('DOMContentLoaded', () => {

  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const msgField  = document.getElementById('inputMessage');
  const charCount = document.getElementById('charCount');
  const successAlert = document.getElementById('successAlert');

  
  msgField.addEventListener('input', () => {
    const len = msgField.value.length;
    charCount.textContent = len;

    if (len >= 20) {
      charCount.style.color = '#198754'; 
      msgField.setCustomValidity('');    
    } else {
      charCount.style.color = '#dc3545';
      msgField.setCustomValidity('Message must be at least 20 characters.');
    }
  });

  
  submitBtn.addEventListener('click', () => {

    
    if (msgField.value.length < 20) {
      msgField.setCustomValidity('Message must be at least 20 characters.');
    } else {
      msgField.setCustomValidity('');
    }

    // Add .was-validated to show Bootstrap's :valid/:invalid styles
    form.classList.add('was-validated');

    // Run native HTML5 validation
    if (!form.checkValidity()) {
      // Form is invalid — Bootstrap will show .invalid-feedback blocks
      return;
    }

    // ── Form is VALID ──
    successAlert.classList.remove('d-none');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Sent!';

    // Reset after 3 seconds and close modal
    setTimeout(() => {
      form.reset();
      form.classList.remove('was-validated');
      charCount.textContent = '0';
      successAlert.classList.add('d-none');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="bi bi-send me-1"></i>Submit';

      // Close modal
      const modal = bootstrap.Modal.getInstance(
        document.getElementById('contactModal')
      );
      if (modal) modal.hide();
    }, 2500);
  });

  // ── Reset validation state when modal closes ──
  document.getElementById('contactModal').addEventListener('hidden.bs.modal', () => {
    form.reset();
    form.classList.remove('was-validated');
    charCount.textContent = '0';
    successAlert.classList.add('d-none');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="bi bi-send me-1"></i>Submit';
    msgField.setCustomValidity('');
  });

});
