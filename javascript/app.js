// =========================================================
// NETFLIX LANDING PAGE
// Main JavaScript file
// =========================================================


// =========================================================
// 1. GET HTML ELEMENTS
// =========================================================

const languageSelect =
    document.getElementById("language-select");

const heroTitle =
    document.getElementById("hero-title");

const heroSubtitle =
    document.getElementById("hero-subtitle");

const heroDescription =
    document.getElementById("hero-description");

const emailForm =
    document.getElementById("email-form");

const emailInput =
    document.getElementById("email-input");

const errorMessage =
    document.getElementById("error-message");

const getStartedText =
    document.getElementById("get-started-text");


// =========================================================
// 2. LANDING PAGE TRANSLATIONS
// =========================================================

const translations = {

    en: {
        title: "Unlimited movies,<br>shows, and more",
        subtitle: "Starts at ₹149. Cancel at any time.",
        description:
            "Ready to watch? Enter your email to create or restart your membership.",
        emailPlaceholder: "Email address",
        getStarted: "Get Started"
    },

    hi: {
        title: "अनलिमिटेड फ़िल्में,<br>शो और बहुत कुछ",
        subtitle: "₹149 से शुरू। कभी भी कैंसल करें।",
        description:
            "देखने के लिए तैयार हैं? अपनी सदस्यता शुरू या फिर से शुरू करने के लिए अपना ईमेल दर्ज करें।",
        emailPlaceholder: "ईमेल पता",
        getStarted: "शुरू करें"
    },

    mr: {
        title: "अनलिमिटेड चित्रपट,<br>शो आणि बरेच काही",
        subtitle: "₹149 पासून सुरू. कधीही रद्द करा.",
        description:
            "पाहण्यासाठी तयार आहात? तुमची सदस्यता सुरू किंवा पुन्हा सुरू करण्यासाठी ईमेल प्रविष्ट करा.",
        emailPlaceholder: "ईमेल पत्ता",
        getStarted: "सुरू करा"
    }

};


// =========================================================
// 3. CHANGE LANGUAGE
// =========================================================

function changeLanguage(language) {

    const selectedLanguage =
        translations[language];

    if (!selectedLanguage) {
        return;
    }


    heroTitle.innerHTML =
        selectedLanguage.title;

    heroSubtitle.textContent =
        selectedLanguage.subtitle;

    heroDescription.textContent =
        selectedLanguage.description;

    emailInput.placeholder =
        selectedLanguage.emailPlaceholder;

    getStartedText.textContent =
        selectedLanguage.getStarted;


    localStorage.setItem(
        "netflixLanguage",
        language
    );

}


// =========================================================
// 4. LOAD SAVED LANGUAGE
// =========================================================

function loadSavedLanguage() {

    const savedLanguage =
        localStorage.getItem("netflixLanguage");

    if (
        savedLanguage &&
        translations[savedLanguage]
    ) {

        languageSelect.value =
            savedLanguage;

        changeLanguage(savedLanguage);

    }

}


// =========================================================
// 5. LANGUAGE SELECT EVENT
// =========================================================

languageSelect.addEventListener(
    "change",
    function () {

        changeLanguage(this.value);

    }
);


// =========================================================
// 6. EMAIL VALIDATION
// =========================================================

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


// =========================================================
// 7. SHOW ERROR
// =========================================================

function showEmailError() {

    errorMessage.classList.add("show");

    emailInput.setAttribute(
        "aria-invalid",
        "true"
    );

}


// =========================================================
// 8. HIDE ERROR
// =========================================================

function hideEmailError() {

    errorMessage.classList.remove("show");

    emailInput.removeAttribute(
        "aria-invalid"
    );

}


// =========================================================
// 9. EMAIL FORM SUBMISSION
// =========================================================

emailForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const email =
            emailInput.value.trim();


        if (email === "") {

            showEmailError();

            return;

        }


        if (!isValidEmail(email)) {

            showEmailError();

            return;

        }


        hideEmailError();


        localStorage.setItem(
            "netflixSignupEmail",
            email
        );


        window.location.href =
            "signup.html";

    }
);


// =========================================================
// 10. REMOVE ERROR WHEN USER TYPES
// =========================================================

emailInput.addEventListener(
    "input",
    function () {

        if (this.value.trim() !== "") {

            hideEmailError();

        }

    }
);


// =========================================================
// 11. INITIALIZE PAGE
// =========================================================

loadSavedLanguage();


// =========================================================
// 12. TRENDING MOVIE SLIDER
// =========================================================


// Get slider elements

const trendingMovies =
    document.getElementById(
        "trending-movies"
    );

const trendingLeft =
    document.getElementById(
        "trending-left"
    );

const trendingRight =
    document.getElementById(
        "trending-right"
    );


// =========================================================
// CHECK THAT SLIDER EXISTS
// =========================================================

if (
    trendingMovies &&
    trendingLeft &&
    trendingRight
) {


    // =====================================================
    // SCROLL RIGHT
    // =====================================================

    trendingRight.addEventListener(
        "click",
        function () {

            trendingMovies.scrollBy({

                left: 750,

                behavior: "smooth"

            });

        }
    );


    // =====================================================
    // SCROLL LEFT
    // =====================================================

    trendingLeft.addEventListener(
        "click",
        function () {

            trendingMovies.scrollBy({

                left: -750,

                behavior: "smooth"

            });

        }
    );


    // =====================================================
    // UPDATE ARROW VISIBILITY
    // =====================================================

    function updateSliderButtons() {

        const scrollLeft =
            trendingMovies.scrollLeft;

        const maxScroll =
            trendingMovies.scrollWidth -
            trendingMovies.clientWidth;


        // -----------------------------------------------
        // LEFT BUTTON
        // -----------------------------------------------

        if (scrollLeft > 20) {

            trendingLeft.style.opacity =
                "1";

            trendingLeft.style.pointerEvents =
                "auto";

        } else {

            trendingLeft.style.opacity =
                "0";

            trendingLeft.style.pointerEvents =
                "none";

        }


        // -----------------------------------------------
        // RIGHT BUTTON
        // -----------------------------------------------

        if (
            scrollLeft >=
            maxScroll - 20
        ) {

            trendingRight.style.opacity =
                "0";

            trendingRight.style.pointerEvents =
                "none";

        } else {

            trendingRight.style.opacity =
                "1";

            trendingRight.style.pointerEvents =
                "auto";

        }

    }


    // =====================================================
    // LISTEN FOR SCROLL
    // =====================================================

    trendingMovies.addEventListener(
        "scroll",
        updateSliderButtons
    );


    // =====================================================
    // INITIAL CHECK
    // =====================================================

    updateSliderButtons();

}

// =========================================================
// FAQ ACCORDION
// =========================================================


// Get all FAQ buttons

const faqQuestions =
    document.querySelectorAll(".faq-question");


// Add click event to every FAQ

faqQuestions.forEach(function (question) {

    question.addEventListener(
        "click",
        function () {


            // Get the FAQ item

            const faqItem =
                question.parentElement;


            // Check whether this FAQ is already open

            const isOpen =
                faqItem.classList.contains("active");


            // Close all FAQs

            document
                .querySelectorAll(".faq-item")
                .forEach(function (item) {

                    item.classList.remove("active");

                    item
                        .querySelector(".faq-question")
                        .setAttribute(
                            "aria-expanded",
                            "false"
                        );

                });


            // Open the clicked FAQ

            if (!isOpen) {

                faqItem.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }
    );

});
// =========================================================
// FINAL EMAIL FORM
// =========================================================


const finalEmailForm =
    document.getElementById("final-email-form");

const finalEmailInput =
    document.getElementById("final-email-input");

const finalErrorMessage =
    document.getElementById("final-error-message");


// =========================================================
// CHECK EMAIL
// =========================================================

function isValidFinalEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


// =========================================================
// SUBMIT FINAL EMAIL FORM
// =========================================================

if (finalEmailForm) {

    finalEmailForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                finalEmailInput.value.trim();


            // Check empty email

            if (email === "") {

                finalErrorMessage.classList.add("show");

                return;

            }


            // Check email format

            if (!isValidFinalEmail(email)) {

                finalErrorMessage.classList.add("show");

                return;

            }


            // Hide error

            finalErrorMessage.classList.remove("show");


            // Save email

            localStorage.setItem(
                "netflixSignupEmail",
                email
            );


            // Go to signup page

            window.location.href =
                "signup.html";

        }
    );


    // Remove error when typing

    finalEmailInput.addEventListener(
        "input",
        function () {

            finalErrorMessage.classList.remove(
                "show"
            );

        }
    );

}
