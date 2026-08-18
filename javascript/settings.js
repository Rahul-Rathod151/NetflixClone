/* =========================================================
   NETFLIX SETTINGS PAGE - JAVASCRIPT
   ========================================================= */

const planDisplay = document.getElementById("settings-plan-display");
const planSub = document.getElementById("settings-plan-sub");
const videoQualitySelect = document.getElementById("video-quality-select");
const autoplayNextToggle = document.getElementById("autoplay-next-toggle");
const autoplayPreviewsToggle = document.getElementById("autoplay-previews-toggle");
const logoutBtn = document.getElementById("settings-logout-btn");

function initSettings() {
    const membership = JSON.parse(localStorage.getItem("netflixMembership")) || {
        plan: "Premium",
        price: "₹649/month",
        quality: "4K + HDR",
        status: "Active"
    };

    if (planDisplay) planDisplay.textContent = `Netflix ${membership.plan} (${membership.quality})`;
    if (planSub) planSub.textContent = `${membership.price} • ${membership.status || 'Active'}`;

    const savedQuality = localStorage.getItem("netflixVideoQuality");
    if (savedQuality && videoQualitySelect) {
        videoQualitySelect.value = savedQuality;
    }

    const savedAutoplayNext = localStorage.getItem("netflixAutoplayNext");
    if (savedAutoplayNext !== null && autoplayNextToggle) {
        autoplayNextToggle.checked = savedAutoplayNext === "true";
    }

    const savedAutoplayPreviews = localStorage.getItem("netflixAutoplay");
    if (savedAutoplayPreviews !== null && autoplayPreviewsToggle) {
        autoplayPreviewsToggle.checked = savedAutoplayPreviews === "true";
    }
}

if (videoQualitySelect) {
    videoQualitySelect.addEventListener("change", () => {
        localStorage.setItem("netflixVideoQuality", videoQualitySelect.value);
    });
}

if (autoplayNextToggle) {
    autoplayNextToggle.addEventListener("change", () => {
        localStorage.setItem("netflixAutoplayNext", autoplayNextToggle.checked);
    });
}

if (autoplayPreviewsToggle) {
    autoplayPreviewsToggle.addEventListener("change", () => {
        localStorage.setItem("netflixAutoplay", autoplayPreviewsToggle.checked);
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to sign out of all devices?")) {
            localStorage.removeItem("netflixLoggedIn");
            window.location.href = "login.html";
        }
    });
}

document.addEventListener("DOMContentLoaded", initSettings);
