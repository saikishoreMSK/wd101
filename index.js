document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const tableBody = document.querySelector('#entriesTable tbody');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const acceptedTerms = document.getElementById('terms').checked;

        
        resetErrorMessages();

        if (!name) {
            showError('nameError', 'Please fill in the name field.');
            return;
        }

        if (!email) {
            showError('emailError', 'Please fill in the email field.');
            return;
        } else if (email.indexOf('@') === -1) {
            showError('emailError', 'Please include "@" in the email address.');
            return;
        }

        if (!password) {
            showError('passwordError', 'Please fill in the password field.');
            return;
        }

        if (!dob) {
            showError('dobError', 'Please fill in the date of birth field.');
            return;
        } else {
            const dobDate = new Date(dob);
            const currentDate = new Date();
            const age = currentDate.getFullYear() - dobDate.getFullYear();

            if (age < 18 || age > 55) {
                showError('dobError', 'Age must be between 18 and 55.');
                return;
            }
        }

        if (!acceptedTerms) {
            showError('termsError', 'Please tick the box to accept terms.');
            return;
        }

        const entry = {
            name,
            email,
            password,
            dob,
            acceptedTerms
        };

        const entries = JSON.parse(localStorage.getItem('user-entries')) || [];
        entries.push(entry);
        localStorage.setItem('user-entries', JSON.stringify(entries));

        form.reset();

        displayEntries();
    });

    function displayEntries() {

        tableBody.innerHTML = '';
        const entries = JSON.parse(localStorage.getItem('user-entries')) || [];

        entries.forEach(entry => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = entry.name;
            row.insertCell().textContent = entry.email;
            row.insertCell().textContent = entry.password;
            row.insertCell().textContent = entry.dob;
            row.insertCell().textContent = entry.acceptedTerms ? 'Yes' : 'No';
        });
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }

    function resetErrorMessages() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => element.textContent = '');
    }

    displayEntries();
});
