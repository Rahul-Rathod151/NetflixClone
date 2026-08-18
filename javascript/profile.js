/* =========================================================
   NETFLIX PROFILE
   ========================================================= */


/* ================= ELEMENTS ================= */

const profileName =
    document.getElementById("profile-name");

const profileEmail =
    document.getElementById("profile-email");

const myListCount =
    document.getElementById("my-list-count");

const languageSelect =
    document.getElementById("language-select");

const autoplayToggle =
    document.getElementById("autoplay-toggle");

const editProfile =
    document.getElementById("edit-profile");

const logoutButton =
    document.getElementById("logout-button");


/* =========================================================
   PROFILE DATA
   ========================================================= */

const defaultProfile = {
    name: "Rahul",
    email: "user@example.com"
};


let profile =
    JSON.parse(
        localStorage.getItem("netflixProfile")
    ) || defaultProfile;


/* =========================================================
   LOAD PROFILE
   ========================================================= */

function loadProfile() {

    profileName.textContent =
        profile.name;

    profileEmail.textContent =
        profile.email;


    const list =
        JSON.parse(
            localStorage.getItem("myNetflixList")
        ) || [];


    myListCount.textContent =
        `${list.length} saved title${list.length !== 1 ? "s" : ""}`;


    /* ================= LANGUAGE ================= */

    const savedLanguage =
        localStorage.getItem(
            "netflixLanguage"
        );


    if (savedLanguage) {

        languageSelect.value =
            savedLanguage;

    }


    /* ================= AUTOPLAY ================= */

    const savedAutoplay =
        localStorage.getItem(
            "netflixAutoplay"
        );


    if (savedAutoplay !== null) {

        autoplayToggle.checked =
            savedAutoplay === "true";

    }

}


/* =========================================================
   EDIT PROFILE
   ========================================================= */

editProfile.addEventListener(
    "click",
    () => {

        const name =
            prompt(
                "Enter your name:",
                profile.name
            );


        if (!name || !name.trim()) {
            return;
        }


        const email =
            prompt(
                "Enter your email:",
                profile.email
            );


        if (!email || !email.trim()) {
            return;
        }


        profile = {
            name: name.trim(),
            email: email.trim()
        };


        localStorage.setItem(
            "netflixProfile",
            JSON.stringify(profile)
        );


        loadProfile();

    }
);


/* =========================================================
   LANGUAGE
   ========================================================= */

languageSelect.addEventListener(
    "change",
    () => {

        localStorage.setItem(
            "netflixLanguage",
            languageSelect.value
        );

        console.log(
            "Language:",
            languageSelect.value
        );

    }
);


/* =========================================================
   AUTOPLAY
   ========================================================= */

autoplayToggle.addEventListener(
    "change",
    () => {

        localStorage.setItem(
            "netflixAutoplay",
            autoplayToggle.checked
        );

    }
);


/* =========================================================
   LOGOUT
   ========================================================= */

logoutButton.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Are you sure you want to sign out?"
            );


        if (!confirmed) {
            return;
        }


        /*
           For now this removes the
           frontend login session.

           Later we'll replace this with
           real backend authentication.
        */

        localStorage.removeItem(
            "netflixLoggedIn"
        );


        window.location.href =
            "login.html";

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

loadProfile();