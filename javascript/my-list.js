/* =========================================================
   NETFLIX MY LIST - JAVASCRIPT
   ========================================================= */

const listGrid = document.getElementById("my-list-grid");
const emptyList = document.getElementById("empty-list");
const listCount = document.getElementById("list-count");
const filterBtns = document.querySelectorAll(".filter-btn");

let activeFilter = "all";

function getMyList() {
    let list = JSON.parse(localStorage.getItem("myNetflixList")) || [];
    // Provide default sample list if completely empty initially
    if (list.length === 0 && !localStorage.getItem("myNetflixListInitialized")) {
        list = [1, 3, 11, 71];
        localStorage.setItem("myNetflixList", JSON.stringify(list));
        localStorage.setItem("myNetflixListInitialized", "true");
    }
    return list;
}

function saveMyList(list) {
    localStorage.setItem("myNetflixList", JSON.stringify(list));
}

function createListCard(movie) {
    const card = document.createElement("article");
    card.className = "my-list-card";
    card.dataset.movieId = movie.id;

    card.innerHTML = `
        <div class="card-media">
            <img src="${movie.image}" alt="${movie.title}" loading="lazy">
            <button class="remove-button" aria-label="Remove ${movie.title} from list">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <button class="play-overlay-btn" aria-label="Play ${movie.title}">
                <i class="fa-solid fa-play"></i>
            </button>
        </div>
        <div class="my-list-overlay">
            <h3 class="my-list-title">${movie.title}</h3>
            <div class="my-list-info">
                <span style="color:#46d369; font-weight:700;">${movie.score || '8.5'}</span>
                <span>${movie.rating || '16+'}</span>
                <span>${movie.genre}</span>
            </div>
        </div>
    `;

    // Play action
    const playBtn = card.querySelector(".play-overlay-btn");
    if (playBtn) {
        playBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            window.location.href = `watch.html?id=${movie.id}`;
        });
    }

    // Card Details action
    card.addEventListener("click", () => {
        window.location.href = `movie-details.html?id=${movie.id}`;
    });

    // Remove action
    const removeButton = card.querySelector(".remove-button");
    if (removeButton) {
        removeButton.addEventListener("click", (e) => {
            e.stopPropagation();
            card.classList.add("removing");
            setTimeout(() => {
                removeFromList(movie.id);
            }, 300);
        });
    }

    return card;
}

function removeFromList(movieId) {
    let list = getMyList();
    list = list.filter(id => id !== movieId);
    saveMyList(list);
    renderMyList();
}

function renderMyList() {
    const list = getMyList();
    if (!listGrid || !emptyList) return;

    listGrid.innerHTML = "";

    if (!window.movies) return;

    const savedMovies = list
        .map(id => window.movies.find(m => m.id === id))
        .filter(movie => movie !== undefined);

    const filteredMovies = activeFilter === "all"
        ? savedMovies
        : savedMovies.filter(m => m.genre && m.genre.toLowerCase() === activeFilter.toLowerCase());

    if (filteredMovies.length === 0) {
        listGrid.style.display = "none";
        emptyList.style.display = "flex";
        if (listCount) listCount.textContent = "0 titles";
        return;
    }

    listGrid.style.display = "grid";
    emptyList.style.display = "none";

    if (listCount) {
        listCount.textContent = `${filteredMovies.length} title${filteredMovies.length !== 1 ? "s" : ""}`;
    }

    filteredMovies.forEach(movie => {
        listGrid.appendChild(createListCard(movie));
    });
}

// Filters event listeners
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.dataset.filter;
        renderMyList();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    renderMyList();
});