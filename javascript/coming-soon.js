/* =========================================================
   NETFLIX COMING SOON - JAVASCRIPT
   ========================================================= */

const comingFeed = document.getElementById("coming-feed");

const upcomingTitles = [
    {
        id: 1001,
        title: "Stranger Things 5",
        releaseDate: "Arriving Next Friday",
        trailer: "b9EkMc79ZSU",
        image: "https://img.youtube.com/vi/b9EkMc79ZSU/maxresdefault.jpg",
        description: "The epic final season arrives. Hawkins will never be the same again as the gang prepares for one ultimate battle against Vecna.",
        genre: "Drama • Sci-Fi",
        rating: "16+"
    },
    {
        id: 1002,
        title: "Wednesday Season 2",
        releaseDate: "Coming in October",
        trailer: "Di310WS8zLk",
        image: "https://img.youtube.com/vi/Di310WS8zLk/maxresdefault.jpg",
        description: "More mayhem, more mystery, and new monsters await Wednesday Addams at Nevermore Academy.",
        genre: "Fantasy • Mystery",
        rating: "13+"
    },
    {
        id: 1003,
        title: "Squid Game 3",
        releaseDate: "Coming in December",
        trailer: "oqxAJKy0ii4",
        image: "https://img.youtube.com/vi/oqxAJKy0ii4/maxresdefault.jpg",
        description: "Gi-hun returns with a mission to destroy the organization behind the games once and for all.",
        genre: "Thriller • Drama",
        rating: "16+"
    },
    {
        id: 1004,
        title: "Jawan: Director's Cut",
        releaseDate: "Arriving Next Month",
        trailer: "COv52Qyctws",
        image: "https://img.youtube.com/vi/COv52Qyctws/maxresdefault.jpg",
        description: "Unseen extended action scenes and high-octane sequences featuring Shah Rukh Khan.",
        genre: "Action • Thriller",
        rating: "16+"
    }
];

function getReminders() {
    return JSON.parse(localStorage.getItem("netflixReminders")) || [];
}

function toggleReminder(id, btn) {
    let reminders = getReminders();
    const icon = btn.querySelector("i");
    const label = btn.querySelector("span");

    if (reminders.includes(id)) {
        reminders = reminders.filter(r => r !== id);
        if (icon) icon.className = "fa-regular fa-bell";
        if (label) label.textContent = "Remind Me";
        btn.classList.remove("active");
    } else {
        reminders.push(id);
        if (icon) icon.className = "fa-solid fa-check";
        if (label) label.textContent = "Reminder Set";
        btn.classList.add("active");
    }

    localStorage.setItem("netflixReminders", JSON.stringify(reminders));
}

function renderComingSoon() {
    if (!comingFeed) return;
    comingFeed.innerHTML = "";

    const reminders = getReminders();

    upcomingTitles.forEach(item => {
        const isReminded = reminders.includes(item.id);
        const card = document.createElement("article");
        card.className = "coming-card";

        card.innerHTML = `
            <div class="coming-media">
                <iframe
                    src="https://www.youtube.com/embed/${item.trailer}?autoplay=0&rel=0&modestbranding=1"
                    title="${item.title}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            <div class="coming-details">
                <div class="coming-top-row">
                    <div>
                        <span class="coming-date">${item.releaseDate}</span>
                        <h2>${item.title}</h2>
                    </div>
                    <button class="btn-remind ${isReminded ? 'active' : ''}" data-id="${item.id}">
                        <i class="${isReminded ? 'fa-solid fa-check' : 'fa-regular fa-bell'}"></i>
                        <span>${isReminded ? 'Reminder Set' : 'Remind Me'}</span>
                    </button>
                </div>
                <div class="coming-meta">
                    <span class="badge">${item.rating}</span>
                    <span>${item.genre}</span>
                </div>
                <p class="coming-desc">${item.description}</p>
            </div>
        `;

        const remindBtn = card.querySelector(".btn-remind");
        if (remindBtn) {
            remindBtn.addEventListener("click", () => {
                toggleReminder(item.id, remindBtn);
            });
        }

        comingFeed.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", renderComingSoon);
