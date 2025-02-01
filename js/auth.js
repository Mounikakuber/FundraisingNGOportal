// auth.js
document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on
    const isLoginPage = document.querySelector('.login-form') !== null;
    const isHomePage = document.getElementById('logout') !== null;

    if (isLoginPage) {
        // Login page functionality
        const loginForm = document.querySelector('.login-form form');
        const signupForm = document.querySelector('.signup-form form');

        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }

        if (signupForm) {
            signupForm.addEventListener('submit', handleSignup);
        }
    }

    if (isHomePage) {
        // Home page functionality
        setupHomePage();
    }
});

// Form handlers
function handleLogin(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="text"]').value;
    const password = this.querySelector('input[type="password"]').value;

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    const user = authenticateUser(email, password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'home.html';
    } else {
        alert('Invalid email or password');
    }
}

function handleSignup(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[placeholder="Enter your name"]').value;
    const email = this.querySelector('input[placeholder="Enter your email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    if (name.length < 2) {
        alert('Please enter a valid name');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    if (userExists(email)) {
        alert('An account with this email already exists');
        return;
    }

    const user = createUser(name, email, password);
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'home.html';
}

// User management functions
function userExists(email) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some(user => user.email === email);
}

function createUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = {
        id: Date.now(),
        name,
        email,
        password
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
}

function authenticateUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(user => user.email === email && user.password === password);
}

function setupHomePage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


// Add to auth.js
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Add page-specific auth checks
if (window.location.pathname.includes('home.html') ||
    window.location.pathname.includes('about.html') ||
    window.location.pathname.includes('causes.html') ||
    window.location.pathname.includes('event.html') ||
    window.location.pathname.includes('gallery.html')) {
    checkAuth();
}