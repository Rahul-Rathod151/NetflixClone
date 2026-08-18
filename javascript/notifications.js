/* =========================================================
   NETFLIX NOTIFICATIONS - JAVASCRIPT
   ========================================================= */

const notifFeed = document.getElementById("notif-feed");
const emptyState = document.getElementById("empty-notif-state");
const markReadBtn = document.getElementById("mark-read-btn");
const clearAllBtn = document.getElementById("clear-all-btn");

const defaultNotifications = [
    {
        id: 1,
        title: "Stranger Things Season 5",
        desc: "The final season is coming soon. Watch the official teaser trailer now!",
        image: "https://img.youtube.com/vi/b9EkMc79ZSU/hqdefault.jpg",
        movieId: 1,
        time: "2 hours ago",
        read: false
    },
    {
        id: 2,
        title: "New Arrival: Jawan",
        desc: "High-octane action thriller starring Shah Rukh Khan is now streaming in 4K Ultra HD.",
        image: "https://img.youtube.com/vi/COv52Qyctws/hqdefault.jpg",
        movieId: 11,
        time: "1 day ago",
        read: false
    },
    {
        id: 3,
        title: "Wednesday Season 2 Teaser",
        desc: "Nevermore Academy opens its doors again. Watch the exclusive preview.",
        image: "https://img.youtube.com/vi/Di310WS8zLk/hqdefault.jpg",
        movieId: 2,
        time: "3 days ago",
        read: true
    },
    {
        id: 4,
        title: "Top 10 Update",
        desc: "Stree 2 is currently #1 in movies in India today.",
        image: "https://img.youtube.com/vi/VlvOgk5BHS4/hqdefault.jpg",
        movieId: 97,
        time: "5 days ago",
        read: true
    }
];

function getNotifications() {
    return JSON.parse(localStorage.getItem("netflixNotifications")) || defaultNotifications;
}

function saveNotifications(list) {
    localStorage.setItem("netflixNotifications", JSON.stringify(list));
}

function renderNotifications() {
    if (!notifFeed || !emptyState) return;

    const notifs = getNotifications();
    notifFeed.innerHTML = "";

    if (notifs.length === 0) {
        notifFeed.style.display = "none";
        emptyState.style.display = "flex";
        return;
    }

    notifFeed.style.display = "flex";
    emptyState.style.display = "none";

    notifs.forEach(item => {
        const card = document.createElement("div");
        card.className = `notif-card ${item.read ? 'read' : 'unread'}`;

        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="notif-details">
                <div class="notif-title-row">
                    <h3>${item.title}</h3>
                    <span class="notif-time">${item.time}</span>
                </div>
                <p>${item.desc}</p>
            </div>
            ${!item.read ? '<span class="unread-dot"></span>' : ''}
        `;

        card.addEventListener("click", () => {
            markAsRead(item.id);
            if (item.movieId) {
                window.location.href = `movie-details.html?id=${item.movieId}`;
            }
        });

        notifFeed.appendChild(card);
    });
}

function markAsRead(id) {
    let notifs = getNotifications();
    notifs = notifs.map(n => n.id === id ? { ...n, read: true } : n);
    saveNotifications(notifs);
    renderNotifications();
}

if (markReadBtn) {
    markReadBtn.addEventListener("click", () => {
        let notifs = getNotifications();
        notifs = notifs.map(n => ({ ...n, read: true }));
        saveNotifications(notifs);
        renderNotifications();
    });
}

if (clearAllBtn) {
    clearAllBtn.addEventListener("click", () => {
        saveNotifications([]);
        renderNotifications();
    });
}

document.addEventListener("DOMContentLoaded", renderNotifications);
