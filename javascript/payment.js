/* =========================================================
   NETFLIX PAYMENT PAGE - JAVASCRIPT
   ========================================================= */

const payTabs = document.querySelectorAll(".pay-tab");
const cardInputs = document.getElementById("card-inputs");
const upiInputs = document.getElementById("upi-inputs");
const paymentForm = document.getElementById("payment-form");
const paymentMsg = document.getElementById("payment-msg");
const subscribeBtn = document.getElementById("subscribe-btn");

// Elements for Order Summary
const summaryPlanName = document.getElementById("summary-plan-name");
const summaryPlanPrice = document.getElementById("summary-plan-price");
const summaryPlanQuality = document.getElementById("summary-plan-quality");
const summaryPlanTotal = document.getElementById("summary-plan-total");

const selectedPlan = JSON.parse(localStorage.getItem("netflixSelectedPlan")) || {
    plan: "Premium",
    price: "₹649/month",
    quality: "4K + HDR",
    status: "Active"
};

function initSummary() {
    if (summaryPlanName) summaryPlanName.textContent = `${selectedPlan.plan} Plan`;
    if (summaryPlanPrice) summaryPlanPrice.textContent = selectedPlan.price;
    if (summaryPlanQuality) summaryPlanQuality.textContent = selectedPlan.quality;
    if (summaryPlanTotal) summaryPlanTotal.textContent = selectedPlan.price.split('/')[0];
}

payTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
        e.preventDefault();
        payTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        if (tab.dataset.tab === "card") {
            cardInputs.style.display = "block";
            upiInputs.style.display = "none";
        } else {
            cardInputs.style.display = "none";
            upiInputs.style.display = "block";
        }
    });
});

if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (subscribeBtn) {
            subscribeBtn.disabled = true;
            subscribeBtn.textContent = "Processing Subscription...";
        }

        if (paymentMsg) {
            paymentMsg.textContent = "Simulating payment verification...";
            paymentMsg.style.color = "#46d369";
        }

        setTimeout(() => {
            const membership = {
                plan: selectedPlan.plan,
                price: selectedPlan.price,
                quality: selectedPlan.quality,
                status: "Active",
                activatedAt: new Date().toISOString()
            };

            localStorage.setItem("netflixMembership", JSON.stringify(membership));

            if (paymentMsg) paymentMsg.textContent = "Payment Successful! Activating Membership...";

            setTimeout(() => {
                window.location.href = "profile.html";
            }, 800);

        }, 1000);
    });
}

document.addEventListener("DOMContentLoaded", initSummary);
