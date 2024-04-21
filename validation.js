document.addEventListener('DOMContentLoaded', function() {
    const imageItems = document.querySelectorAll('.image-item');
    const verifyBtn = document.getElementById('verifyBtn');
    const fnameError = document.getElementById('fnameError');
    const lnameError = document.getElementById('lnameError');
    const emailError = document.getElementById('emailError');
    const passError = document.getElementById('passError');
    const cpassError = document.getElementById('CpassError');
    const errorMessage = document.getElementById('errorMessage'); 
    const card = document.querySelector('.card'); 
  
    let selectedImages = [];
    let captchaAttempts = 0; 
  
    imageItems.forEach(function(item, index) {
        item.addEventListener('click', function() {
            item.classList.toggle('selected'); // Toggle the selected class
            if (item.classList.contains('selected')) {
                selectedImages.push(index + 1); // Add the index of the selected image
            } else {
                selectedImages = selectedImages.filter(imgIndex => imgIndex !== index + 1); // Remove the index if deselected
            }
        });
    });
  
    verifyBtn.addEventListener('click', function() {
        captchaAttempts++;
  
        if (captchaAttempts > 4) {
            window.location.href = 'error.html';
            return;
        }
  
        const fname = document.getElementById('fname').value.trim();
        const lname = document.getElementById('lname').value.trim();
        const email = document.getElementById('email').value.trim();
        const pass = document.getElementById('pass').value.trim();
  
        if (selectedImages.includes(1) && selectedImages.includes(5) && selectedImages.includes(9) && selectedImages.length <= 3  ) {
            window.location.href = `nxtpage.html?fname=${encodeURIComponent(fname)}&lname=${encodeURIComponent(lname)}&email=${encodeURIComponent(email)}&pass=${encodeURIComponent(pass)}`;
        } else {
            shuffleImages();
            errorMessage.textContent = 'Please try again.'; // Throw an error to indicate retry
            selectedImages = [];
            imageItems.forEach(item => item.classList.remove('selected'));
            
        }
    });
  
    function shuffleImages() {
        const imageGrid = document.querySelector('.image-grid');
        const shuffledImages = Array.from(imageItems).sort(() => Math.random() - 0.5);
        imageGrid.innerHTML = ''; 
        shuffledImages.forEach(image => imageGrid.appendChild(image));
        
    }
  
    document.addEventListener('mousemove', function(event) {
        console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
    });
  
    function validateForm(event) {
        event.preventDefault(); 
  
        const fname = document.getElementById('fname').value.trim();
        const lname = document.getElementById('lname').value.trim();
        const email = document.getElementById('email').value.trim();
        const pass = document.getElementById('pass').value.trim();
        const cpass = document.getElementById('Cpass').value.trim();
  
        fnameError.innerHTML = "";
        lnameError.innerHTML = "";
        emailError.innerHTML = "";
        passError.innerHTML = "";
        cpassError.innerHTML = "";
        errorMessage.textContent = ""; // Clear error message
  
        let isValid = true;
        const lettersRegex = /^[A-Za-z]+$/;
  
        if (fname === "") {
            fnameError.innerHTML = "First name is required";
            isValid = false;
        } else if (!lettersRegex.test(fname)) {
            fnameError.innerHTML = "First name should contain only letters";
            isValid = false;
        } else if (fname.length > 15) {
            fnameError.innerHTML = "First name should not exceed 15 characters";
            isValid = false;
        }
  
        if (lname === "") {
            lnameError.innerHTML = "Last name is required";
            isValid = false;
        } else if (!lettersRegex.test(lname)) {
            lnameError.innerHTML = "Last name should contain only letters";
            isValid = false;
        } else if (lname.length > 15) {
            lnameError.innerHTML = "Last name should not exceed 15 characters";
            isValid = false;
        }
  
        if (email === "") {
            emailError.innerHTML = "Email is required";
            isValid = false;
        } else if (!isValidEmail(email)) {
            emailError.innerHTML = "Invalid Email Address";
            isValid = false;
        }
  
        if (pass === "") {
            passError.innerHTML = "Password is required";
            isValid = false;
        } else if (pass.length < 8) {
            passError.innerHTML = "Password should be at least 8 characters long";
            isValid = false;
        } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) {
            passError.innerHTML = "Password should contain at least one special character";
            isValid = false;
        } else if (pass.includes('"') || pass.includes("'")) {
            passError.innerHTML = "Password should not contain inverted commas";
            isValid = false;
        }
  
        if (cpass === "") {
            cpassError.innerHTML = "Please confirm your password";
            isValid = false;
        } else if (pass !== cpass) {
            cpassError.innerHTML = "Passwords do not match";
            isValid = false;
        }
  
        if (isValid) {
            card.style.display = 'block';
            return false; 
        }
  
        return false;  
    }
  
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
  
    // Add event listener for form submission
    const registerForm = document.querySelector('form');
    registerForm.addEventListener('submit', validateForm);
  });
  