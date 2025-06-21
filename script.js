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

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded. Initializing resume section at 10:53 AM PKT, June 21, 2025.');

    const viewButton = document.querySelector('#view-resume');
    const downloadButton = document.querySelector('#download-resume');
    const preview = document.querySelector('.resume-preview');

    // Check for element existence
    if (!viewButton) console.error('Error: #view-resume button not found in DOM.');
    if (!downloadButton) console.error('Error: #download-resume link not found in DOM.');
    if (!preview) console.error('Error: .resume-preview element not found in DOM.');
    if (!viewButton || !downloadButton || !preview) {
        console.error('Resume section initialization failed due to missing elements.');
        return;
    }

    // Initialize preview state
    preview.classList.remove('active'); // Ensure preview is hidden on load
    console.log('Resume preview initialized as hidden.');

    // Handle View Resume button
    viewButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent any default behavior
        const isActive = preview.classList.contains('active');
        preview.classList.toggle('active');
        console.log(`View Resume clicked. Preview is now: ${isActive ? 'hidden' : 'shown'}`);
        viewButton.textContent = isActive ? 'View Resume' : 'Hide Resume';
    });

    // Handle Download Resume button
    downloadButton.addEventListener('click', function(event) {
        console.log('Download Resume clicked. Native download triggered.');
        // No programmatic click needed; <a download> handles it
    });

    // Prevent automatic download on load
    console.log('Resume section initialized. No automatic download triggered.');
});

// header 
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded. Initializing header at 12:00 PM PKT, June 21, 2025.');

    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('#navbar');

    if (!menuIcon || !navbar) {
        console.error('Header elements not found:', { menuIcon, navbar });
        return;
    }

    // Initialize navbar state
    navbar.classList.remove('active');
    menuIcon.classList.remove('active');
    console.log('Navbar initialized as hidden.');

    // Toggle menu
    menuIcon.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('active');
        console.log(`Hamburger menu toggled: ${navbar.classList.contains('active') ? 'opened' : 'closed'}`);
        console.log('Navbar classes:', navbar.className);
        console.log('Navbar style:', window.getComputedStyle(navbar).maxHeight);
    });

    // Close menu on link click
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(event) {
            console.log(`Navbar link clicked: ${link.getAttribute('href')}`);
            navbar.classList.remove('active');
            menuIcon.classList.remove('active');
            console.log('Menu closed.');
        });
    });
});
