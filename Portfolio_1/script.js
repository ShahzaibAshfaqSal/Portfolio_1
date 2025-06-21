document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form inputs
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const messageDiv = document.getElementById('form-message');

    // Reset error styles
    document.querySelectorAll('.input-box input, textarea').forEach(input => {
        input.classList.remove('input-error');
    });
    messageDiv.classList.remove('success', 'error');
    messageDiv.textContent = '';

    // Validation
    let errors = [];
    if (name.length < 2) errors.push('Name must be at least 2 characters.');
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) errors.push('Invalid email format.');
    if (!/^\+?[\d\s-]{10,}$/.test(phone)) errors.push('Invalid phone number (min 10 digits).');
    if (subject.length < 3) errors.push('Subject must be at least 3 characters.');
    if (message.length < 10) errors.push('Message must be at least 10 characters.');

    // Display errors or proceed
    if (errors.length > 0) {
        messageDiv.classList.add('error');
        messageDiv.textContent = errors.join(' ');
        errors.forEach(error => {
            if (error.includes('Name')) document.getElementById('name').classList.add('input-error');
            if (error.includes('email')) document.getElementById('email').classList.add('input-error');
            if (error.includes('phone')) document.getElementById('phone').classList.add('input-error');
            if (error.includes('Subject')) document.getElementById('subject').classList.add('input-error');
            if (error.includes('Message')) document.getElementById('message').classList.add('input-error');
        });
        return;
    }

    // Store data in localStorage
    const formData = { name, email, phone, subject, message, timestamp: new Date().toISOString() };
    let submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push(formData);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

    // Optional: Trigger mailto link
    const mailtoLink = `mailto:your.email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`)}`;
    window.location.href = mailtoLink;

    // Show success message
    messageDiv.classList.add('success');
    messageDiv.textContent = 'Message submitted successfully! Check your email client.';
    document.getElementById('contact-form').reset(); // Clear form
});