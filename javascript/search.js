/* =========================================================
   NETFLIX SEARCH - JAVASCRIPT
   ========================================================= */

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const searchTitle = document.getElementById("search-title");
const resultCount = document.getElementById("result-count");
const clearButton = document.getElementById("clear-search");
const emptyState = document.getElementById("empty-state");
const noResults = document.getElementById("no-results");
const filterTags = document.querySelectorAll(".search-filter-tag");
const historySection = document.getElementById("search-history-section");
const historyChips = document.getElementById("history-chips");
const clearHistoryBtn = document.getElementById("clear-history-btn");

let currentGenreFilter = "All";

function createSearchCard(movie) {
    const card = document.createElement("article");
    card.className = "search-card";

    card.innerHTML = `
        <div class="card-media">
            <img src="${movie.image}" alt="${movie.title}" loading="lazy">
            <button class="play-overlay" aria-label="Play ${movie.title}">
                <i class="fa-solid fa-play"></i>
            </button>
        </div>
        <div class="search-card-overlay">
            <h3 class="search-card-title">${movie.title}</h3>
            <div class="search-card-info">
                <span style="color:#46d369; font-weight:700;">${movie.score || '8.5'}</span>
                <span>${movie.year}</span>
                <span>${movie.rating}</span>
                <span>${movie.genre}</span>
            </div>
        </div>
    `;

    card.addEventListener("click", () => {
        saveSearchHistory(movie.title);
        window.location.href = `movie-details.html?id=${movie.id}`;
    });

    return card;
}

function saveSearchHistory(query) {
    if (!query || query.trim().length < 2) return;
    let history = JSON.parse(localStorage.getItem("netflixSearchHistory")) || [];
    const trimmed = query.trim();

    history = history.filter(item => item.toLowerCase() !== trimmed.toLowerCase());
    history.unshift(trimmed);
    if (history.length > 6) history = history.slice(0, 6);

    localStorage.setItem("netflixSearchHistory", JSON.stringify(history));
    renderSearchHistory();
}

function renderSearchHistory() {
    if (!historySection || !historyChips) return;
    const history = JSON.parse(localStorage.getItem("netflixSearchHistory")) || [];

    if (history.length === 0) {
        historySection.style.display = "none";
        return;
    }

    historySection.style.display = "block";
    historyChips.innerHTML = "";

    history.forEach(item => {
        const chip = document.createElement("span");
        chip.className = "history-chip";
        chip.textContent = item;
        chip.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = item;
                searchMovies(item);
            }
        });
        historyChips.appendChild(chip);
    });
}

if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", () => {
        localStorage.removeItem("netflixSearchHistory");
        renderSearchHistory();
    });
}

function searchMovies(query) {
    const value = query.trim().toLowerCase();
    if (!window.movies) return;

    if (clearButton) {
        clearButton.style.display = value ? "block" : "none";
    }

    if (!value && currentGenreFilter === "All") {
        if (searchResults) searchResults.innerHTML = "";
        if (searchTitle) searchTitle.textContent = "Explore Movies & TV Shows";
        if (resultCount) resultCount.textContent = "";
        if (emptyState) emptyState.style.display = "flex";
        if (noResults) noResults.style.display = "none";
        renderSearchHistory();
        return;
    }

    if (historySection) historySection.style.display = "none";

    const results = window.movies.filter((movie) => {
        const matchesQuery = !value || (
            movie.title.toLowerCase().includes(value) ||
            (movie.genre && movie.genre.toLowerCase().includes(value)) ||
            (movie.description && movie.description.toLowerCase().includes(value)) ||
            (movie.cast && Array.isArray(movie.cast) && movie.cast.some(c => c.toLowerCase().includes(value)))
        );

        const matchesGenre = currentGenreFilter === "All" ||
            (movie.genre && movie.genre.toLowerCase() === currentGenreFilter.toLowerCase());

        return matchesQuery && matchesGenre;
    });

    if (searchResults) searchResults.innerHTML = "";
    if (emptyState) emptyState.style.display = "none";

    if (searchTitle) {
        searchTitle.textContent = value
            ? `Search results for "${query}"`
            : `${currentGenreFilter} Titles`;
    }

    if (resultCount) {
        resultCount.textContent = `${results.length} result${results.length !== 1 ? "s" : ""}`;
    }

    if (results.length === 0) {
        if (noResults) noResults.style.display = "flex";
        return;
    }

    if (noResults) noResults.style.display = "none";

    results.forEach((movie) => {
        const card = createSearchCard(movie);
        searchResults.appendChild(card);
    });
}

if (searchInput) {
    searchInput.addEventListener("input", () => {
        searchMovies(searchInput.value);
    });

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && searchInput.value.trim()) {
            saveSearchHistory(searchInput.value.trim());
        }
    });
}

if (clearButton) {
    clearButton.addEventListener("click", () => {
        if (searchInput) {
            searchInput.value = "";
            searchInput.focus();
        }
        searchMovies("");
    });
}

filterTags.forEach(tag => {
    tag.addEventListener("click", () => {
        filterTags.forEach(t => t.classList.remove("active"));
        tag.classList.add("active");
        currentGenreFilter = tag.dataset.genre || "All";
        searchMovies(searchInput ? searchInput.value : "");
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== searchInput) {
        event.preventDefault();
        if (searchInput) searchInput.focus();
    }
    if (event.key === "Escape" && searchInput) {
        searchInput.value = "";
        searchMovies("");
    }
});

// Check URL Params for search filters
document.addEventListener("DOMContentLoaded", () => {
    renderSearchHistory();
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get("filter");
    const queryParam = urlParams.get("query");

    if (filterParam) {
        currentGenreFilter = filterParam;
        const matchingTag = Array.from(filterTags).find(t => t.dataset.genre.toLowerCase() === filterParam.toLowerCase());
        if (matchingTag) {
            filterTags.forEach(t => t.classList.remove("active"));
            matchingTag.classList.add("active");
        }
    }

    if (queryParam && searchInput) {
        searchInput.value = queryParam;
    }

    searchMovies(searchInput ? searchInput.value : "");
});