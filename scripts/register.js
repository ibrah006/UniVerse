import { events } from './database.js';

console.log(`we here, events: ${events}`);

const eventDropdown = document.getElementById("event-input");

events.forEach(event=> {
    const dropdownOption = document.createElement("option");
    dropdownOption.value = event.title;
    dropdownOption.innerText = event.title;
    eventDropdown.appendChild(dropdownOption);
});

// Form validation

// Select the form and the submit button
const form = document.getElementById('registerForm');
const submitButton = form.querySelector('button[type="submit"]');

// Add event listener for form submission
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting by default

    // Clear previous error messages
    const errorMessages = form.querySelectorAll('.error');
    errorMessages.forEach(msg => msg.remove());

    // Validate name
    const name = document.getElementById('name');
    if (name.value.trim() === '') {
        showError(name, 'Name is required');
    }

    // Validate email
    const email = document.getElementById('email');
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email.value.trim() === '') {
        showError(email, 'Email is required');
    } else if (!emailPattern.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
    }

    // Validate phone number
    const phone = document.getElementById('phone');
    const phonePattern = /^\+?\d{10,13}$/;  // Matches phone numbers with + and up to 13 digits
    if (phone.value.trim() === '') {
        showError(phone, 'Phone number is required');
    } else if (!phonePattern.test(phone.value.trim())) {
        showError(phone, 'Please enter a valid phone number');
    }

    // Validate event selection
    const eventInput = document.getElementById('event-input');
    if (eventInput.value === '') {
        showError(eventInput, 'Please select an event');
    }
});

// Function to display error messages
function showError(inputElement, message) {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error');
    errorMessage.style.color = 'red';
    errorMessage.textContent = message;
    inputElement.parentElement.insertBefore(errorMessage, inputElement.nextSibling);
}
