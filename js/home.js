document.addEventListener('DOMContentLoaded', function() {
    // Existing user authentication code
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const userInfo = document.getElementById('user-info');
    if (userInfo) {
        userInfo.innerHTML = `Welcome, ${currentUser.name}!`;
    }

    // Logout handler
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }

    // Counter Animation
    const counters = document.querySelectorAll('.count');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const current = +counter.innerText;
            const increment = target / speed;

            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });


    // Progress Bar Animation
    document.querySelectorAll(".progress-bar").forEach(bar => {
        const target = bar.getAttribute("aria-valuenow");
        bar.style.width = "0%";
        setTimeout(() => {
            bar.style.width = target + "%";
        }, 500);
    });

    // Smooth scroll
    document.querySelectorAll('.donate-now, .btn-primary[href="#"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.donation-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Amount button handlers
    document.querySelectorAll('.amount-btn').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.amount-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            document.getElementById('custom-amount').value = this.getAttribute('data-amount');
        });
    });

   // Initialize EmailJS
emailjs.init("goSU83D6zV-g6cdkO"); // Replace with your actual EmailJS public key

// Donation form handler
const donationForm = document.getElementById('donation-form');
if (donationForm) {
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = donationForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';

        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            contact_number: document.getElementById('contact').value,
            donation_amount: document.getElementById('custom-amount').value,
            to_name: 'NGO Portal Admin',
            message: `New donation received: $${document.getElementById('custom-amount').value}`
        };

        // Send email using EmailJS
        emailjs.send(
            'service_fbbvrfd', // Replace with your EmailJS service ID
            'template_xudkl12', // Replace with your EmailJS template ID
            templateParams
        )
        .then(function(response) {
            showMessage('success', 'Thank you for your donation! We will contact you shortly.', donationForm);
            donationForm.reset();
        })
        .catch(function(error) {
            showMessage('error', 'There was an error processing your donation. Please try again.', donationForm);
            console.error('EmailJS Error:', error);
        })
        .finally(function() {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
    });
}
//------------------------------------------------------------------------------------
// // Contact form handler
// const contactForm = document.getElementById('contact-form');
// if (contactForm) {
//     contactForm.addEventListener('submit', function(e) {
//         e.preventDefault();

//         // Show loading state
//         const submitBtn = contactForm.querySelector('button[type="submit"]');
//         const originalBtnText = submitBtn.textContent;
//         submitBtn.disabled = true;
//         submitBtn.textContent = 'Sending...';

//         const templateParams = {
//             from_name: document.getElementById('contact-name').value,
//             from_email: document.getElementById('contact-email').value,
//             subject: document.getElementById('contact-subject').value,
//             message: document.getElementById('contact-message').value,
//             to_name: 'NGO Portal Admin'
//         };

//         // Send email using EmailJS
//         emailjs.send(
//             'service_fbbvrfd', // Replace with your EmailJS service ID
//             'template_xudkl12', // Replace with your EmailJS template ID
//             templateParams
//         )
//         .then(function(response) {
//             showMessage('success', 'Your message has been sent! We will get back to you soon.', contactForm);
//             contactForm.reset();
//         })
//         .catch(function(error) {
//             showMessage('error', 'There was an error sending your message. Please try again.', contactForm);
//             console.error('EmailJS Error:', error);
//         })
//         .finally(function() {
//             // Reset button state
//             submitBtn.disabled = false;
//             submitBtn.textContent = originalBtnText;
//         });
//     });
// }

 // Initialize EmailJS once
emailjs.init("goSU83D6zV-g6cdkO");

// Contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            const templateParams = {
                from_name: document.getElementById('contact-name').value,
                from_email: document.getElementById('contact-email').value,
                subject: document.getElementById('contact-subject').value,
                message: document.getElementById('contact-message').value,
                to_name: 'NGO Portal Admin'
            };
            
            emailjs.send('service_fbbvrfd', 'template_xudkl12', templateParams)
                .then(() => {
                    showPopup('Success', 'Your message has been sent successfully!');
                    contactForm.reset();
                })
                .catch((error) => {
                    showPopup('Error', 'Failed to send message. Please try again.');
                    console.error('EmailJS Error:', error);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });
        });
    }
});

// Popup functions
function showPopup(title, message) {
    // Remove any existing popup
    const existingPopup = document.querySelector('.popup-message');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.innerHTML = `
        <div class="popup-content">
            <h4>${title}</h4>
            <p>${message}</p>
            <button onclick="closePopup()">Close</button>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Auto close after 5 seconds
    setTimeout(closePopup, 5000);
}

function closePopup() {
    const popup = document.querySelector('.popup-message');
    if (popup) {
        popup.remove();
    }
}







// Message display function
function showMessage(type, message, form) {
    // Remove any existing messages
    const existingMessages = form.querySelectorAll('.alert');
    existingMessages.forEach(msg => msg.remove());

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
    messageDiv.textContent = message;

    // Insert message at the top of the form
    form.prepend(messageDiv);

    // Remove message after 5 seconds
    setTimeout(() => messageDiv.remove(), 5000);
}
});



// Smooth scroll for "Join Now" buttons
document.querySelectorAll('.join-now').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


//------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality
    const tabLinks = document.querySelectorAll('.about-tab .nav-link');
    const tabContents = document.querySelectorAll('.about-tab .tab-pane');

    tabLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all tabs and content
            tabLinks.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active', 'show'));

            // Add active class to clicked tab
            this.classList.add('active');
            const targetId = this.getAttribute('href').substring(1);
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                targetContent.classList.add('active', 'show');
            }
        });
    });

    // Parallax scrolling effect
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallaxSection = document.querySelector('.about-img-start');
        if (parallaxSection) {
            parallaxSection.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        }
    });
});



// Add this to your existing JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animation class to elements
    const sections = [
        { id: 'home', element: document.querySelector('.carousel') },
        { id: 'about', element: document.querySelector('.section-header') },
        { id: 'causes', element: document.querySelector('.causes-section') },
        { id: 'events', element: document.querySelector('.event-item') },
        { id: 'contact', element: document.querySelector('#contact') }
    ];

    // Add animation classes to elements
    document.querySelectorAll('.service-item, .cause-card, .event-item, .counter, .donation-form')
        .forEach((element, index) => {
            element.classList.add('animate-on-scroll');
            element.classList.add(`delay-${(index % 4) + 1}`);
        });

    // Handle scroll animations
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Handle navigation active state
    function updateActiveNav() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            if (!section.element) return;
            
            const sectionTop = section.element.offsetTop - 100;
            const sectionBottom = sectionTop + section.element.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Event listeners
    window.addEventListener('scroll', () => {
        handleScrollAnimations();
        updateActiveNav();
    });

    // Initial check for animations
    handleScrollAnimations();
    updateActiveNav();

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});


//   home mission vision
document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.about-tab .nav-link');
    const tabContents = document.querySelectorAll('.about-tab .tab-pane');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabLinks.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('active', 'show');
            });
            
            // Show the selected tab content
            const targetId = this.getAttribute('href').substring(1);
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active', 'show');
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const donateBtn = document.getElementById('floating-donate-btn');
    const modal = document.getElementById('donate-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const form = document.getElementById('floating-donate-form');
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmount = document.getElementById('custom-amount');

    // Show modal
    donateBtn.addEventListener('click', () => {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Hide modal
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }

    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle amount button selection
    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove selected class from all buttons
            amountBtns.forEach(b => b.classList.remove('selected'));
            // Add selected class to clicked button
            btn.classList.add('selected');
            // Set custom amount input
            customAmount.value = btn.dataset.amount;
        });
    });

    // Clear button selection when custom amount is entered
    customAmount.addEventListener('input', () => {
        amountBtns.forEach(btn => btn.classList.remove('selected'));
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('donor-name').value,
            email: document.getElementById('donor-email').value,
            amount: customAmount.value
        };

        // Here you would typically send the data to your server
        console.log('Donation form submitted:', formData);
        
        // Show success message (you can customize this)
        alert('Thank you for your donation!');
        
        // Reset form and close modal
        form.reset();
        closeModal();
    });

    // Add scroll behavior for floating button
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Show/hide button based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            donateBtn.style.transform = 'translateY(100px)'; // Hide button
        } else {
            donateBtn.style.transform = 'translateY(0)'; // Show button
        }
        
        lastScroll = currentScroll;
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const chatButton = document.getElementById('chat-button');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle Chat Window
    chatButton.addEventListener('click', () => {
        chatContainer.style.display = 'flex';
        chatButton.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
        chatContainer.style.display = 'none';
        chatButton.style.display = 'flex';
    });

    // Send Message Function
    function sendUserMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';

            setTimeout(() => {
                simulateBotResponse(message);
            }, 1000);
        }
    }

    // Add Message to Chat
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Simulate Bot Response
    function simulateBotResponse(userMessage) {
        let botResponse = "I'm a demo chatbot. To integrate real AI responses, you'll need to connect to an AI API service.";

        if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
            botResponse = "Hello! How can I assist you today?";
        } else if (userMessage.toLowerCase().includes('help')) {
            botResponse = "I'm here to help! What do you need assistance with?";
        }

        addMessage(botResponse, 'bot');
    }

    // Event Listeners
    sendMessage.addEventListener('click', sendUserMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
});

