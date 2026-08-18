/* =========================================================
   NETFLIX SIGNUP - FIREBASE AUTHENTICATION
   ========================================================= */

import {
    signupUser,
    loginWithGoogle
} from "./auth.js";


/* =========================================================
   GET ELEMENTS
   ========================================================= */

const signupForm =
    document.getElementById("signup-form");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirm-password");


const nameError =
    document.getElementById("name-error");

const emailError =
    document.getElementById("email-error");

const passwordError =
    document.getElementById("password-error");

const confirmPasswordError =
    document.getElementById("confirm-password-error");


const passwordToggle =
    document.getElementById("password-toggle");

const confirmPasswordToggle =
    document.getElementById("confirm-password-toggle");


const googleSignup =
    document.getElementById("google-signup");

const signupMessage =
    document.getElementById("signup-message");

const signupButton =
    document.querySelector(".signup-button");


/* =========================================================
   EMAIL VALIDATION
   ========================================================= */

function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* =========================================================
   FIREBASE ERROR MESSAGE
   ========================================================= */

function getFirebaseErrorMessage(errorCode) {

    switch (errorCode) {

        case "auth/email-already-in-use":
            return "An account already exists with this email.";

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/weak-password":
            return "Password is too weak. Use at least 6 characters.";

        case "auth/network-request-failed":
            return "Network error. Please check your internet connection.";

        case "auth/operation-not-allowed":
            return "Email/password authentication is not enabled.";

        default:
            return "Unable to create your account. Please try again.";

    }

}


/* =========================================================
   PASSWORD TOGGLE
   ========================================================= */

passwordToggle.addEventListener(
    "click",
    () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            passwordToggle.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            passwordInput.type = "password";

            passwordToggle.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    }
);


/* =========================================================
   CONFIRM PASSWORD TOGGLE
   ========================================================= */

confirmPasswordToggle.addEventListener(
    "click",
    () => {

        if (
            confirmPasswordInput.type ===
            "password"
        ) {

            confirmPasswordInput.type =
                "text";

            confirmPasswordToggle.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

            confirmPasswordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            confirmPasswordInput.type =
                "password";

            confirmPasswordToggle.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

            confirmPasswordToggle.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    }
);


/* =========================================================
   SIGNUP FORM
   ========================================================= */

signupForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        /* =============================================
           CLEAR OLD ERRORS
           ============================================= */

        nameError.textContent = "";

        emailError.textContent = "";

        passwordError.textContent = "";

        confirmPasswordError.textContent = "";

        signupMessage.textContent = "";


        /* =============================================
           GET VALUES
           ============================================= */

        const name =
            nameInput.value.trim();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;


        let isValid = true;


        /* =============================================
           NAME VALIDATION
           ============================================= */

        if (name === "") {

            nameError.textContent =
                "Please enter your name.";

            isValid = false;

        } else if (name.length < 2) {

            nameError.textContent =
                "Name must contain at least 2 characters.";

            isValid = false;

        }


        /* =============================================
           EMAIL VALIDATION
           ============================================= */

        if (email === "") {

            emailError.textContent =
                "Please enter your email address.";

            isValid = false;

        } else if (!validateEmail(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            isValid = false;

        }


        /* =============================================
           PASSWORD VALIDATION
           ============================================= */

        if (password === "") {

            passwordError.textContent =
                "Please create a password.";

            isValid = false;

        } else if (password.length < 6) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            isValid = false;

        }


        /* =============================================
           CONFIRM PASSWORD
           ============================================= */

        if (confirmPassword === "") {

            confirmPasswordError.textContent =
                "Please confirm your password.";

            isValid = false;

        } else if (
            password !== confirmPassword
        ) {

            confirmPasswordError.textContent =
                "Passwords do not match.";

            isValid = false;

        }


        /* =============================================
           STOP IF INVALID
           ============================================= */

        if (!isValid) {
            return;
        }


        /* =============================================
           DISABLE BUTTON
           ============================================= */

        signupButton.disabled = true;

        signupButton.textContent =
            "Creating account...";


        signupMessage.textContent =
            "";


        /* =============================================
           FIREBASE SIGNUP
           ============================================= */

        try {

            const result =
                await signupUser(
                    email,
                    password
                );


            if (result.success) {

                /*
                   Firebase has successfully created
                   the account.
                */

                const user =
                    result.user;


                /*
                   Store profile information locally
                   for your frontend profile page.

                   IMPORTANT:
                   We are NOT storing the password.
                */

                const profile = {

                    name: name,

                    email: user.email

                };


                localStorage.setItem(
                    "netflixProfile",
                    JSON.stringify(profile)
                );


                localStorage.setItem(
                    "netflixLoggedIn",
                    "true"
                );


                signupMessage.textContent =
                    "Account created successfully!";

                signupMessage.style.color =
                    "#46d369";


                /* =====================================
                   REDIRECT
                   ===================================== */

                setTimeout(() => {

                    window.location.href =
                        "browse.html";

                }, 700);


            } else {

                signupMessage.textContent =
                    getFirebaseErrorMessage(
                        result.error.code
                    );

                signupMessage.style.color =
                    "#e87c03";

            }

        } catch (error) {

            console.error(
                "Signup error:",
                error
            );

            signupMessage.textContent =
                "Something went wrong. Please try again.";

            signupMessage.style.color =
                "#e87c03";

        } finally {

            signupButton.disabled = false;

            signupButton.textContent =
                "Create Account";

        }

    }
);


/* =========================================================
   GOOGLE SIGNUP / LOGIN
   ========================================================= */

googleSignup.addEventListener(
    "click",
    async () => {

        signupMessage.textContent =
            "Opening Google login...";

        signupMessage.style.color =
            "#fff";


        googleSignup.disabled = true;

        googleSignup.style.opacity =
            "0.6";


        try {

            const result =
                await loginWithGoogle();


            if (result.success) {

                const user =
                    result.user;


                /* =====================================
                   SAVE PROFILE
                   ===================================== */

                const profile = {

                    name:
                        user.displayName ||
                        "Netflix User",

                    email:
                        user.email

                };


                localStorage.setItem(
                    "netflixProfile",
                    JSON.stringify(profile)
                );


                localStorage.setItem(
                    "netflixLoggedIn",
                    "true"
                );


                signupMessage.textContent =
                    "Google account connected successfully!";

                signupMessage.style.color =
                    "#46d369";


                setTimeout(() => {

                    window.location.href =
                        "browse.html";

                }, 700);

            } else {

                signupMessage.textContent =
                    getFirebaseErrorMessage(
                        result.error.code
                    );

                signupMessage.style.color =
                    "#e87c03";

            }

        } catch (error) {

            console.error(
                "Google signup error:",
                error
            );

            signupMessage.textContent =
                "Google authentication failed.";

            signupMessage.style.color =
                "#e87c03";

        } finally {

            googleSignup.disabled = false;

            googleSignup.style.opacity =
                "1";

        }

    }
);