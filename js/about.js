   document.addEventListener('DOMContentLoaded', function() {
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

            // Tab Functionality
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    const tabId = this.getAttribute('href').substring(1);
                    const tabContent = document.getElementById(tabId);
                    
                    document.querySelectorAll('.tab-pane').forEach(pane => {
                        pane.classList.remove('show');
                    });
                    tabContent.classList.add('show');
                });
            });
        });


          // Back to top functionality
        $(document).ready(function() {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 200) {
                    $('.back-to-top').fadeIn();
                } else {
                    $('.back-to-top').fadeOut();
                }
            });
            $('.back-to-top').click(function() {
                $('html, body').animate({ scrollTop: 0 }, 500);
                return false;
            });
        });


          document.addEventListener('DOMContentLoaded', function() {
        const carousel = new bootstrap.Carousel(document.getElementById('testimonialCarousel'), {
            interval: 5000,
            wrap: true
        });
    });
        
    //chat bot

    
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
