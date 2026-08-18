/* =========================================================
   NETFLIX PLANS PAGE - JAVASCRIPT
   ========================================================= */

const planCards = document.querySelectorAll(".plan-card");
const continueBtn = document.getElementById("continue-payment-btn");

let selectedPlanData = {
    plan: "Premium",
    price: "₹649/month",
    quality: "4K + HDR",
    status: "Active"
};

planCards.forEach(card => {
    card.addEventListener("click", () => {
        planCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        selectedPlanData = {
            plan: card.dataset.plan,
            price: card.dataset.price,
            quality: card.dataset.res,
            status: "Active"
        };
    });
});

if (continueBtn) {
    continueBtn.addEventListener("click", () => {
        localStorage.setItem("netflixSelectedPlan", JSON.stringify(selectedPlanData));
        window.location.href = "payment.html";
    });
}
