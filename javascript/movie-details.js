/* =========================================================
   NETFLIX MOVIE DETAILS - JAVASCRIPT
   ========================================================= */

const params = new URLSearchParams(window.location.search);
const movieId = Number(params.get("id")) || 1;

// Find Movie in dataset
const movie = (window.movies && window.movies.find(item => item.id === movieId)) || {
    id: 1,
    title: "Stranger Things",
    trailer: "b9EkMc79ZSU",
    year: "2025",
    rating: "16+",
    score: "8.7",
    quality: "4K Ultra HD",
    seasons: "4 Seasons",
    genre: "Drama",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    director: "The Duffer Brothers",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments and terrifying supernatural forces.",
    image: "https://img.youtube.com/vi/b9EkMc79ZSU/hqdefault.jpg",
    backdrop: "https://img.youtube.com/vi/b9EkMc79ZSU/maxresdefault.jpg"
};

// Elements
const title = document.getElementById("movie-title");
const year = document.getElementById("movie-year");
const rating = document.getElementById("movie-rating");
const quality = document.getElementById("movie-quality");
const score = document.getElementById("movie-score");
const seasons = document.getElementById("movie-seasons");
const genre = document.getElementById("movie-genre");
const description = document.getElementById("movie-description");
const background = document.getElementById("background-image");
const castEl = document.getElementById("movie-cast");
const directorEl = document.getElementById("movie-director");
const player = document.getElementById("youtube-player");
const listButton = document.getElementById("list-button");
const playButton = document.getElementById("play-button");
const likeButton = document.getElementById("like-button");
const relatedContainer = document.getElementById("related-movies");

function loadMovie() {
    if (!movie) return;

    if (title) title.textContent = movie.title;
    if (year) year.textContent = movie.year;
    if (rating) rating.textContent = movie.rating;
    if (quality) quality.textContent = movie.quality || "HD";
    if (score) score.textContent = `${movie.score || '8.5'} Match`;
    if (seasons) seasons.textContent = movie.seasons || "Movie";
    if (genre) genre.textContent = movie.genre;
    if (description) description.textContent = movie.description;

    if (castEl && movie.cast) {
        castEl.textContent = Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast;
    }
    if (directorEl && movie.director) {
        directorEl.textContent = movie.director;
    }

    if (background) {
        background.src = movie.backdrop || movie.image;
        background.alt = movie.title;
    }

    document.title = `${movie.title} - Netflix`;

    loadTrailer();
    updateListButton();
}

function loadTrailer() {
    if (!player) return;

    if (!movie.trailer) {
        player.innerHTML = `
            <div style="display:flex; align-items:center; justify-content:center; height:300px; color:#aaa; font-size:1.1rem;">
                <i class="fa-solid fa-film" style="margin-right:10px;"></i> Trailer unavailable for this title
            </div>
        `;
        return;
    }

    player.innerHTML = `
        <iframe
            src="https://www.youtube.com/embed/${movie.trailer}?autoplay=0&rel=0&modestbranding=1"
            title="${movie.title} Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
        ></iframe>
    `;
}

function getMyList() {
    return JSON.parse(localStorage.getItem("myNetflixList")) || [];
}

function updateListButton() {
    if (!listButton) return;
    const list = getMyList();
    const icon = listButton.querySelector("i");
    const text = listButton.querySelector("span");

    if (list.includes(movie.id)) {
        if (icon) icon.className = "fa-solid fa-check";
        if (text) text.textContent = "Remove from My List";
    } else {
        if (icon) icon.className = "fa-solid fa-plus";
        if (text) text.textContent = "Add to My List";
    }
}

if (listButton) {
    listButton.addEventListener("click", () => {
        let list = getMyList();

        if (list.includes(movie.id)) {
            list = list.filter(id => id !== movie.id);
        } else {
            list.push(movie.id);
        }

        localStorage.setItem("myNetflixList", JSON.stringify(list));
        updateListButton();
    });
}

if (playButton) {
    playButton.addEventListener("click", () => {
        window.location.href = `watch.html?id=${movie.id}`;
    });
}

if (likeButton) {
    likeButton.addEventListener("click", () => {
        const icon = likeButton.querySelector("i");
        if (icon.classList.contains("fa-regular")) {
            icon.className = "fa-solid fa-thumbs-up";
            likeButton.style.color = "#e50914";
        } else {
            icon.className = "fa-regular fa-thumbs-up";
            likeButton.style.color = "#fff";
        }
    });
}

function loadRelatedMovies() {
    if (!relatedContainer || !window.movies) return;

    relatedContainer.innerHTML = "";
    const related = window.movies
        .filter(item => item.id !== movie.id && item.genre === movie.genre)
        .slice(0, 6);

    if (related.length < 6) {
        window.movies.forEach(item => {
            if (item.id !== movie.id && !related.includes(item) && related.length < 6) {
                related.push(item);
            }
        });
    }

    related.forEach(item => {
        const card = document.createElement("article");
        card.className = "related-card";

        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="related-card-info">
                <h4>${item.title}</h4>
                <div style="font-size:0.75rem; color:#aaa; margin-top:4px;">
                    <span>${item.year}</span> • <span>${item.rating}</span>
                </div>
            </div>
        `;

        card.addEventListener("click", () => {
            window.location.href = `movie-details.html?id=${item.id}`;
        });

        relatedContainer.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadMovie();
    loadRelatedMovies();
});