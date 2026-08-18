/* =========================================================
   NETFLIX PROFILE - JAVASCRIPT
   ========================================================= */

/* ================= ELEMENTS ================= */

const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");
const myListCount = document.getElementById("my-list-count");
const languageSelect = document.getElementById("language-select");
const autoplayToggle = document.getElementById("autoplay-toggle");
const editProfile = document.getElementById("edit-profile");
const logoutButton = document.getElementById("logout-button");
const avatarImg = document.getElementById("profile-avatar-img");
const changeAvatarBtn = document.getElementById("change-avatar-btn");
const avatarPicker = document.getElementById("avatar-picker");
const planTag = document.getElementById("profile-plan-tag");
const membershipTitle = document.getElementById("membership-title");
const membershipBilling = document.getElementById("membership-billing");

/* ================= DEFAULT PROFILE DATA ================= */

const defaultProfile = {
    name: "Rahul",
    email: "user@example.com",
    avatar: "../assets/images/avatar1.jpg"
};

let profile = JSON.parse(localStorage.getItem("netflixProfile")) || defaultProfile;

/* ================= LOAD PROFILE ================= */

function loadProfile() {
    if (profileName) profileName.textContent = profile.name;
    if (profileEmail) profileEmail.textContent = profile.email;

    if (avatarImg) {
        avatarImg.src = profile.avatar || "../assets/images/avatar1.jpg";
    }

    const list = JSON.parse(localStorage.getItem("myNetflixList")) || [];
    if (myListCount) {
        myListCount.textContent = `${list.length} saved title${list.length !== 1 ? "s" : ""}`;
    }

    /* Membership Info */
    const membership = JSON.parse(localStorage.getItem("netflixMembership")) || {
        plan: "Premium",
        price: "₹649/month",
        quality: "4K + HDR",
        status: "Active"
    };

    if (planTag) planTag.textContent = (membership.plan || "PREMIUM").toUpperCase();
    if (membershipTitle) membershipTitle.textContent = `Netflix ${membership.plan || "Premium"} (${membership.quality || "4K + HDR"})`;
    if (membershipBilling) membershipBilling.textContent = `${membership.status || 'Active'} • ${membership.price || '₹649/month'}`;

    /* Language */
    const savedLanguage = localStorage.getItem("netflixLanguage");
    if (savedLanguage && languageSelect) {
        languageSelect.value = savedLanguage;
    }

    /* Autoplay */
    const savedAutoplay = localStorage.getItem("netflixAutoplay");
    if (savedAutoplay !== null && autoplayToggle) {
        autoplayToggle.checked = savedAutoplay === "true";
    }
}

/* ================= EDIT PROFILE ================= */

if (editProfile) {
    editProfile.addEventListener("click", () => {
        const name = prompt("Enter your name:", profile.name);
        if (!name || !name.trim()) return;

        const email = prompt("Enter your email:", profile.email);
        if (!email || !email.trim()) return;

        profile = {
            ...profile,
            name: name.trim(),
            email: email.trim()
        };

        localStorage.setItem("netflixProfile", JSON.stringify(profile));
        loadProfile();
    });
}

/* ================= AVATAR SELECTION ================= */

if (changeAvatarBtn && avatarPicker) {
    changeAvatarBtn.addEventListener("click", () => {
        avatarPicker.style.display = avatarPicker.style.display === "none" ? "block" : "none";
    });

    const avatarOptions = document.querySelectorAll(".avatar-option");
    avatarOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            const newAvatar = opt.dataset.avatar;
            profile.avatar = newAvatar;
            localStorage.setItem("netflixProfile", JSON.stringify(profile));
            avatarPicker.style.display = "none";
            loadProfile();
        });
    });
}

/* ================= LANGUAGE & AUTOPLAY ================= */

if (languageSelect) {
    languageSelect.addEventListener("change", () => {
        localStorage.setItem("netflixLanguage", languageSelect.value);
    });
}

if (autoplayToggle) {
    autoplayToggle.addEventListener("change", () => {
        localStorage.setItem("netflixAutoplay", autoplayToggle.checked);
    });
}

/* ================= LOGOUT ================= */

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        const confirmed = confirm("Are you sure you want to sign out?");
        if (!confirmed) return;

        localStorage.removeItem("netflixLoggedIn");
        window.location.href = "login.html";
    });
}

/* ================= INITIALIZE ================= */

document.addEventListener("DOMContentLoaded", loadProfile);