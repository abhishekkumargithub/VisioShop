import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9xgwmYkR6GBfthCfm058JuNxs0mLbP5Y",
  authDomain: "login-with-firebase-961b3.firebaseapp.com",
  projectId: "login-with-firebase-961b3",
  storageBucket: "login-with-firebase-961b3.appspot.com",
  messagingSenderId: "290886764504",
  appId: "1:290886764504:web:0222a3b840a27c4a1754ad"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct")

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

createacctbtn.addEventListener("click", function() {
  var isVerified = true;

  signupEmail = signupEmailIn.value;
  confirmSignupEmail = confirmSignupEmailIn.value;
  if(signupEmail != confirmSignupEmail) {
      window.alert("Email fields do not match. Try again.")
      isVerified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if(signupPassword != confirmSignUpPassword) {
      window.alert("Password fields do not match. Try again.")
      isVerified = false;
  }
  
  if(signupEmail == null || confirmSignupEmail == null || signupPassword == null || confirmSignUpPassword == null) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }
  
  if(isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      window.alert("Success! Account created.");
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      window.alert("Error occurred. Try again.");
    });
  }
});

submitButton.addEventListener("click", function() {
  email = emailInput.value;
  console.log(email);
  password = passwordInput.value;
  console.log(password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    
      window.alert("Success! Welcome back!");
      window.location.href = 'index.html';
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error occurred. Try again.");
      window.alert("Error occurred. Try again.");
    });
});

signupButton.addEventListener("click", function() {
    main.style.display = "none";
    createacct.style.display = "block";
});

returnBtn.addEventListener("click", function() {
    main.style.display = "block";
    createacct.style.display = "none";
});

        // Function to speak text
      function speakText(text) {
          const utterance = new SpeechSynthesisUtterance(text);
          window.speechSynthesis.speak(utterance);
      }

      // Function to stop speech
      function stopSpeech() {
          window.speechSynthesis.cancel();
      }
      // login text to speech
      emailInput.addEventListener('mouseenter', () => speakText('Email input field'));
      emailInput.addEventListener('mouseleave', stopSpeech);
      passwordInput.addEventListener('mouseenter', () => speakText('Password input field'));
      passwordInput.addEventListener('mouseleave', stopSpeech);
      submitButton.addEventListener('mouseenter', () => speakText('Submit button'));
      submitButton.addEventListener('mouseleave', stopSpeech);
      signupButton.addEventListener('mouseenter',()=> speakText('Sign Up to create a new account'));
      signupButton.addEventListener('mouseleave', stopSpeech);
      emailSignupInput.addEventListener('mouseenter', () => speakText('Email field'));
      //sign up text to speech
       // Define elements for sign up text-to-speech
const emailSignupInput = document.getElementById("email-signup");
const confirmEmailSignupInput = document.getElementById("confirm-email-signup");
const passwordSignupInput = document.getElementById("password-signup");
const confirmPasswordSignupInput = document.getElementById("confirm-password-signup");
const createAcctBtn = document.getElementById("create-acct-btn");

// Add event listeners for sign up text-to-speech
emailSignupInput.addEventListener('mouseenter', () => speakText('Email field'));
emailSignupInput.addEventListener('mouseleave', stopSpeech);
confirmEmailSignupInput.addEventListener('mouseenter', () => speakText('Confirm Email field'));
confirmEmailSignupInput.addEventListener('mouseleave', stopSpeech);
passwordSignupInput.addEventListener('mouseenter', () => speakText('Password field'));
passwordSignupInput.addEventListener('mouseleave', stopSpeech);
confirmPasswordSignupInput.addEventListener('mouseenter', () => speakText('Confirm Password field'));
confirmPasswordSignupInput.addEventListener('mouseleave', stopSpeech);
createAcctBtn.addEventListener('mouseenter', () => speakText('Create Account button'));
createAcctBtn.addEventListener('mouseleave', stopSpeech);
