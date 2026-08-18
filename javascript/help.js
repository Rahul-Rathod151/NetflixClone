/* =========================================================
   NETFLIX HELP CENTER - JAVASCRIPT
   ========================================================= */

const faqBtns = document.querySelectorAll(".faq-btn");
const searchInput = document.getElementById("help-search-input");
const chatBtn = document.getElementById("live-chat-btn");

faqBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const item = btn.parentElement;
        const icon = btn.querySelector("i");
        const isOpen = item.classList.contains("active");

        document.querySelectorAll(".faq-item").forEach(i => {
            i.classList.remove("active");
            const ic = i.querySelector(".faq-btn i");
            if (ic) ic.className = "fa-solid fa-plus";
        });

        if (!isOpen) {
            item.classList.add("active");
            if (icon) icon.className = "fa-solid fa-minus";
        }
    });
});

if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const val = e.target.value.toLowerCase().trim();
        const faqItems = document.querySelectorAll(".faq-item");

        faqItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (!val || text.includes(val)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
}

if (chatBtn) {
    chatBtn.addEventListener("click", () => {
        alert("Connecting to Netflix Customer Support Demo... An agent will be with you shortly!");
    });
}
