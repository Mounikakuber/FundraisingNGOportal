// Save this as login.js
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const forgotPasswordLink = document.getElementById('forgotPassword');

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const submitButton = document.getElementById('loginSubmit');

        // Show processing state
        submitButton.value = 'Processing...';
        submitButton.disabled = true;

        // Basic validation
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            resetButton(submitButton, 'Login');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            resetButton(submitButton, 'Login');
            return;
        }

        // Simulate authentication (replace with your actual authentication logic)
        setTimeout(() => {
            const user = authenticateUser(email, password);
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'home.html'; // Redirect to home page
            } else {
                alert('Invalid email or password');
                resetButton(submitButton, 'Login');
            }
        }, 1000);
    });

    // Signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const submitButton = document.getElementById('signupSubmit');

        // Show processing state
        submitButton.value = 'Processing...';
        submitButton.disabled = true;

        // Validation
        if (name.length < 2) {
            alert('Please enter a valid name');
            resetButton(submitButton, 'Signup');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            resetButton(submitButton, 'Signup');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            resetButton(submitButton, 'Signup');
            return;
        }

        // Simulate signup process
        setTimeout(() => {
            if (userExists(email)) {
                alert('An account with this email already exists');
                resetButton(submitButton, 'Signup');
                return;
            }

            const user = createUser(name, email, password);
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'home.html'; // Redirect to home page
        }, 1000);
    });

    // Helper functions
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function resetButton(button, text) {
        button.value = text;
        button.disabled = false;
    }

    function userExists(email) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.some(user => user.email === email);
    }

    function createUser(name, email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const newUser = { id: Date.now(), name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return newUser;
    }

    function authenticateUser(email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.find(user => user.email === email && user.password === password);
    }
});