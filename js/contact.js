const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value === "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

// Validation logic
const form = document.querySelector("form");
const nameInput = form.querySelector('input[name="name"]');
const emailInput = form.querySelector('input[name="email"]');
const phoneInput = form.querySelector('input[name="phone"]');
const messageInput = form.querySelector('textarea[name="message"]');

form.addEventListener("submit", function (e) {
  let isValid = true;

  // Name validation
  if (nameInput.value.trim() === "") {
    alert("Name is required.");
    isValid = false;
  }

  // Email validation
  if (emailInput.value.trim() === "") {
    alert("Email is required.");
    isValid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      alert("Please enter a valid email address.");
      isValid = false;
    }
  }

  // Phone number validation
  if (phoneInput.value.trim() === "") {
    alert("Phone number is required.");
    isValid = false;
  } else {
    const phoneRegex = /^\d{10}$/; // Exactly 10 digits
    if (!phoneRegex.test(phoneInput.value.trim())) {
      alert("Please enter a valid 10-digit phone number.");
      isValid = false;
    }
  }

  // Message validation
  if (messageInput.value.trim() === "") {
    alert("Message is required.");
    isValid = false;
  }

  // Prevent submission if any validation fails
  if (!isValid) {
    e.preventDefault();
  }
});


