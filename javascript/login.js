/* =========================================================
   NETFLIX LOGIN - FIREBASE AUTHENTICATION
   ========================================================= */

import {
    loginUser,
    loginWithGoogle
} from "./auth.js";


/* =========================================================
   GET ELEMENTS
   ========================================================= */

const loginForm =
    document.getElementById("login-form");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const emailError =
    document.getElementById("email-error");

const passwordError =
    document.getElementById("password-error");

const passwordToggle =
    document.getElementById("password-toggle");

const googleLogin =
    document.getElementById("google-login");

const rememberMe =
    document.getElementById("remember-me");

const loginMessage =
    document.getElementById("login-message");

const signinButton =
    document.getElementById("signin-button");


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

        case "auth/invalid-credential":
            return "Incorrect email or password.";

        case "auth/user-not-found":
            return "No account found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/user-disabled":
            return "This account has been disabled.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        case "auth/network-request-failed":
            return "Network error. Please check your internet connection.";

        default:
            return "Unable to sign in. Please try again.";

    }

}


/* =========================================================
   PASSWORD VISIBILITY
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
   LOGIN FORM
   ========================================================= */

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        /* Clear old messages */

        emailError.textContent = "";

        passwordError.textContent = "";

        loginMessage.textContent = "";


        /* Get values */

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        let isValid = true;


        /* =================================================
           EMAIL VALIDATION
           ================================================= */

        if (email === "") {

            emailError.textContent =
                "Please enter your email address.";

            isValid = false;

        } else if (!validateEmail(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            isValid = false;

        }


        /* =================================================
           PASSWORD VALIDATION
           ================================================= */

        if (password === "") {

            passwordError.textContent =
                "Please enter your password.";

            isValid = false;

        } else if (password.length < 6) {

            passwordError.textContent =
                "Your password must contain at least 6 characters.";

            isValid = false;

        }


        /* =================================================
           STOP IF INVALID
           ================================================= */

        if (!isValid) {
            return;
        }


        /* =================================================
           REMEMBER EMAIL
           ================================================= */

        if (rememberMe.checked) {

            localStorage.setItem(
                "netflixRememberEmail",
                email
            );

        } else {

            localStorage.removeItem(
                "netflixRememberEmail"
            );

        }


        /* =================================================
           DISABLE BUTTON
           ================================================= */

        signinButton.disabled = true;

        signinButton.textContent =
            "Signing in...";


        try {

            /* =============================================
               FIREBASE LOGIN
               ============================================= */

            const result =
                await loginUser(
                    email,
                    password
                );


            if (result.success) {

                loginMessage.textContent =
                    "Login successful!";

                loginMessage.style.color =
                    "#46d369";


                /*
                   Store a simple frontend state.
                   Firebase remains the real authentication
                   system.
                */

                localStorage.setItem(
                    "netflixLoggedIn",
                    "true"
                );


                /* =========================================
                   REDIRECT TO BROWSE
                   ========================================= */

                setTimeout(() => {

                    window.location.href =
                        "browse.html";

                }, 500);

            } else {

                loginMessage.textContent =
                    getFirebaseErrorMessage(
                        result.error.code
                    );

                loginMessage.style.color =
                    "#e87c03";

            }

        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            loginMessage.textContent =
                "Something went wrong. Please try again.";

            loginMessage.style.color =
                "#e87c03";

        } finally {

            signinButton.disabled = false;

            signinButton.textContent =
                "Sign In";

        }

    }
);


/* =========================================================
   GOOGLE LOGIN
   ========================================================= */

googleLogin.addEventListener(
    "click",
    async () => {

        loginMessage.textContent =
            "Opening Google login...";

        loginMessage.style.color =
            "#fff";


        googleLogin.disabled = true;

        googleLogin.style.opacity =
            "0.6";


        try {

            const result =
                await loginWithGoogle();


            if (result.success) {

                loginMessage.textContent =
                    "Google login successful!";

                loginMessage.style.color =
                    "#46d369";


                localStorage.setItem(
                    "netflixLoggedIn",
                    "true"
                );


                setTimeout(() => {

                    window.location.href =
                        "browse.html";

                }, 500);

            } else {

                loginMessage.textContent =
                    getFirebaseErrorMessage(
                        result.error.code
                    );

                loginMessage.style.color =
                    "#e87c03";

            }

        } catch (error) {

            console.error(
                "Google login error:",
                error
            );

            loginMessage.textContent =
                "Google login failed. Please try again.";

            loginMessage.style.color =
                "#e87c03";

        } finally {

            googleLogin.disabled = false;

            googleLogin.style.opacity =
                "1";

        }

    }
);


/* =========================================================
   LOAD REMEMBERED EMAIL
   ========================================================= */

const savedEmail =
    localStorage.getItem(
        "netflixRememberEmail"
    );


if (savedEmail) {

    emailInput.value =
        savedEmail;

    rememberMe.checked =
        true;

}