// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAqrSn_Le4D1QxReY5jSr4a6wIwBrBhss",
    authDomain: "quizpro-ec73c.firebaseapp.com",
    projectId: "quizpro-ec73c",
    storageBucket: "quizpro-ec73c.appspot.com",
    messagingSenderId: "34365138591",
    appId: "1:34365138591:web:66ab206ebfb4b11669e4aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle login with Firebase Authentication
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form from submitting the traditional way

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pass').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successfully signed in
            const user = userCredential.user;
            console.log("User signed in: ", user.email);
            // Redirect to the quiz page or another action
            window.location.href = "quiz.html"; // Change to your desired URL
        })
        .catch((error) => {
            console.error("Error logging in: ", error.message);
            alert("Login failed: " + error.message);
        });
});

// JavaScript to handle the visibility toggle of the password
document.getElementById('login-eye').addEventListener('click', function () {
    const passwordField = document.getElementById('login-pass');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('ri-eye-line');
    this.classList.toggle('ri-eye-off-line');
});
