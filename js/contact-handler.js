// Save as contact-handler.js
class ContactFormHandler {
    constructor() {
        this.emailjsPublicKey = "goSU83D6zV-g6cdkO";
        this.serviceID = "service_fbbvrfd";
        this.templateID = "template_xudkl12";
        this.init();
    }

    init() {
        emailjs.init(this.emailjsPublicKey);
        this.attachFormListeners();
        this.addNotificationStyles();
    }

    attachFormListeners() {
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'contact-form') {
                e.preventDefault();
                this.handleSubmission(e.target);
            }
        });
    }

    async handleSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const params = {
                from_name: form.querySelector('#contact-name').value,
                from_email: form.querySelector('#contact-email').value,
                subject: form.querySelector('#contact-subject').value,
                message: form.querySelector('#contact-message').value,
                to_name: 'NGO Portal Admin'
            };

            await emailjs.send(this.serviceID, this.templateID, params);
            this.showNotification('Success!', 'Message sent successfully', 'success');
            form.reset();
        } catch (error) {
            console.error('Submission error:', error);
            this.showNotification('Error!', 'Failed to send message', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    }

    showNotification(title, message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <h4>${title}</h4>
            <p>${message}</p>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    addNotificationStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 4px;
                z-index: 9999;
                min-width: 300px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                animation: slideIn 0.5s ease-out;
            }
            .notification.success {
                background: #4CAF50;
                color: white;
            }
            .notification.error {
                background: #f44336;
                color: white;
            }
            .notification button {
                position: absolute;
                right: 10px;
                top: 10px;
                background: transparent;
                border: none;
                color: white;
                cursor: pointer;
            }
            @keyframes slideIn {
                from {transform: translateX(100%)}
                to {transform: translateX(0)}
            }
        `;
        document.head.appendChild(styles);
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => new ContactFormHandler());