/* =========================================================
   NETFLIX FORGOT PASSWORD - FIREBASE
   ========================================================= */

import { resetPassword } from "./auth.js";


/* ================= GET ELEMENTS ================= */

const forgotForm =
    document.getElementById("forgot-form");

const emailInput =
    document.getElementById("email");

const emailError =
    document.getElementById("email-error");

const resetMessage =
    document.getElementById("reset-message");

const resetButton =
    document.querySelector(".reset-button");


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

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/user-not-found":
            return "No account was found with this email.";

        case "auth/too-many-requests":
            return "Too many requests. Please try again later.";

        case "auth/network-request-failed":
            return "Network error. Please check your internet connection.";

        default:
            return "Unable to send reset email. Please try again.";

    }

}


/* =========================================================
   FORM SUBMIT
   ========================================================= */

forgotForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        /* =============================================
           CLEAR PREVIOUS MESSAGES
           ============================================= */

        emailError.textContent = "";

        resetMessage.textContent = "";


        /* =============================================
           GET EMAIL
           ============================================= */

        const email =
            emailInput.value.trim();


        /* =============================================
           EMPTY EMAIL
           ============================================= */

        if (email === "") {

            emailError.textContent =
                "Please enter your email address.";

            emailInput.focus();

            return;

        }


        /* =============================================
           INVALID EMAIL
           ============================================= */

        if (!validateEmail(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            emailInput.focus();

            return;

        }


        /* =============================================
           LOADING
           ============================================= */

        resetButton.disabled = true;

        resetButton.textContent =
            "Sending...";


        try {

            /* =========================================
               FIREBASE PASSWORD RESET
               ========================================= */

            const result =
                await resetPassword(email);


            /* =========================================
               SUCCESS
               ========================================= */

            if (result.success) {

                resetMessage.textContent =
                    "Password reset link sent! Check your email.";

                resetMessage.style.color =
                    "#46d369";


                emailInput.value = "";


            } else {

                resetMessage.textContent =
                    getFirebaseErrorMessage(
                        result.error.code
                    );

                resetMessage.style.color =
                    "#e87c03";

            }


        } catch (error) {

            console.error(
                "Password reset error:",
                error
            );

            resetMessage.textContent =
                "Something went wrong. Please try again.";

            resetMessage.style.color =
                "#e87c03";

        } finally {

            resetButton.disabled = false;

            resetButton.textContent =
                "Send Reset Link";

        }

    }
);