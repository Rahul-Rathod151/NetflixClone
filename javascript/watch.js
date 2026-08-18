/* =========================================================
   NETFLIX WATCH PAGE - JAVASCRIPT
   ========================================================= */

const params = new URLSearchParams(window.location.search);
const movieId = Number(params.get("id")) || 1;

const movie = (window.movies && window.movies.find(m => m.id === movieId)) || {
    id: 1,
    title: "Stranger Things",
    trailer: "b9EkMc79ZSU",
    year: "2025",
    rating: "16+",
    seasons: "4 Seasons",
    genre: "Drama",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments and terrifying supernatural forces.",
    cast: ["Millie Bobby Brown", "Finn Wolfhard"]
};

// Elements
const watchMovieTitle = document.getElementById("watch-movie-title");
const watchMovieSub = document.getElementById("watch-movie-sub");
const panelMovieTitle = document.getElementById("panel-movie-title");
const panelMovieDesc = document.getElementById("panel-movie-desc");
const panelCast = document.getElementById("panel-cast");
const panelGenre = document.getElementById("panel-genre");
const playerContainer = document.getElementById("player-iframe-container");
const watchBackBtn = document.getElementById("watch-back-btn");
const playPauseBtn = document.getElementById("play-pause-btn");
const bigPlayBtn = document.getElementById("big-play-btn");
const seekBar = document.getElementById("seek-bar");
const seekProgress = document.getElementById("seek-progress");
const volumeBtn = document.getElementById("volume-btn");
const volumeSlider = document.getElementById("volume-slider");
const speedBtn = document.getElementById("speed-btn");
const speedMenu = document.getElementById("speed-menu");
const currentSpeedDisplay = document.getElementById("current-speed");
const nextTitleBtn = document.getElementById("next-title-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const timeDisplay = document.getElementById("time-display");

let isPlaying = true;
let isMuted = false;
let currentProgress = 35; // default 35%

function initWatchPage() {
    if (watchMovieTitle) watchMovieTitle.textContent = movie.title;
    if (watchMovieSub) watchMovieSub.textContent = movie.seasons ? `${movie.seasons} • ${movie.genre}` : movie.genre;

    if (panelMovieTitle) panelMovieTitle.textContent = movie.title;
    if (panelMovieDesc) panelMovieDesc.textContent = movie.description;
    if (panelCast) panelCast.textContent = Array.isArray(movie.cast) ? movie.cast.join(", ") : (movie.cast || "N/A");
    if (panelGenre) panelGenre.textContent = movie.genre;

    document.title = `Watching: ${movie.title} - Netflix`;

    loadPlayer();
    updateProgressStorage();
}

function loadPlayer() {
    if (!playerContainer) return;

    playerContainer.innerHTML = `
        <iframe
            id="watch-iframe"
            src="https://www.youtube.com/embed/${movie.trailer}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&enablejsapi=1"
            title="${movie.title}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
    `;
}

function updateProgressStorage() {
    let watchData = JSON.parse(localStorage.getItem("netflixWatchProgress")) || {};
    watchData[movie.id] = {
        progress: currentProgress,
        timestamp: "1h 10m left",
        title: movie.title,
        lastWatched: new Date().toISOString()
    };
    localStorage.setItem("netflixWatchProgress", JSON.stringify(watchData));
}

// Back Button Navigation
if (watchBackBtn) {
    watchBackBtn.addEventListener("click", () => {
        if (document.referrer.includes("movie-details.html")) {
            window.history.back();
        } else {
            window.location.href = "browse.html";
        }
    });
}

// Play/Pause Controls Simulation
function togglePlay() {
    isPlaying = !isPlaying;
    const icon = playPauseBtn ? playPauseBtn.querySelector("i") : null;
    if (isPlaying) {
        if (icon) icon.className = "fa-solid fa-pause";
        if (bigPlayBtn) bigPlayBtn.style.display = "none";
    } else {
        if (icon) icon.className = "fa-solid fa-play";
        if (bigPlayBtn) bigPlayBtn.style.display = "flex";
    }
}

if (playPauseBtn) playPauseBtn.addEventListener("click", togglePlay);
if (bigPlayBtn) bigPlayBtn.addEventListener("click", togglePlay);

// Seek bar handling
if (seekBar && seekProgress) {
    seekBar.addEventListener("input", (e) => {
        currentProgress = e.target.value;
        seekProgress.style.width = `${currentProgress}%`;
        if (timeDisplay) {
            const mins = Math.floor((currentProgress / 100) * 105);
            timeDisplay.textContent = `${mins}:00 / 1:45:00`;
        }
        updateProgressStorage();
    });
}

// Volume handling
if (volumeBtn && volumeSlider) {
    volumeBtn.addEventListener("click", () => {
        isMuted = !isMuted;
        const icon = volumeBtn.querySelector("i");
        if (isMuted) {
            icon.className = "fa-solid fa-volume-xmark";
            volumeSlider.value = 0;
        } else {
            icon.className = "fa-solid fa-volume-high";
            volumeSlider.value = 80;
        }
    });
}

// Playback Speed Menu
if (speedBtn && speedMenu) {
    speedBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        speedMenu.classList.toggle("active");
    });

    document.addEventListener("click", () => {
        speedMenu.classList.remove("active");
    });

    const speedOptions = speedMenu.querySelectorAll("span");
    speedOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            speedOptions.forEach(s => s.classList.remove("active"));
            opt.classList.add("active");
            if (currentSpeedDisplay) currentSpeedDisplay.textContent = opt.textContent;
            speedMenu.classList.remove("active");
        });
    });
}

// Next Title Button
if (nextTitleBtn) {
    nextTitleBtn.addEventListener("click", () => {
        const nextId = movie.id + 1 <= 120 ? movie.id + 1 : 1;
        window.location.href = `watch.html?id=${nextId}`;
    });
}

// Fullscreen Toggle
if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => {
        const container = document.getElementById("watch-container");
        if (!document.fullscreenElement) {
            if (container.requestFullscreen) container.requestFullscreen();
            fullscreenBtn.querySelector("i").className = "fa-solid fa-compress";
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            fullscreenBtn.querySelector("i").className = "fa-solid fa-expand";
        }
    });
}

document.addEventListener("DOMContentLoaded", initWatchPage);
