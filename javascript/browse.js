import { auth } from "./firebase-config.js";
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

// =========================================================
// AUTHENTICATION GUARD & LOGOUT
// =========================================================

onAuthStateChanged(auth, (user) => {
    // If not authenticated via Firebase or LocalStorage, redirect to login
    const isLoggedIn = localStorage.getItem("netflixLoggedIn");
    if (!user && !isLoggedIn) {
        window.location.href = "login.html";
        return;
    }
    console.log("Authenticated user session active:", user ? user.email : "Local session");
});

const logoutButton = document.getElementById("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
            if (auth) {
                await signOut(auth);
            }
            localStorage.removeItem("netflixLoggedIn");
            window.location.href = "index.html";
        } catch (error) {
            console.error("Logout error:", error);
            localStorage.removeItem("netflixLoggedIn");
            window.location.href = "index.html";
        }
    });
}

// =========================================================
// GLOBAL DATA & PROFILE STATE
// =========================================================

let userProfile = JSON.parse(localStorage.getItem("netflixProfile")) || {
    name: "Rahul",
    email: "user@example.com",
    avatar: "../assets/images/avatar1.jpg"
};

function initProfileUI() {
    const avatarImg = document.getElementById("nav-avatar-img");
    if (avatarImg && userProfile.avatar) {
        avatarImg.src = userProfile.avatar;
    }
}

// =========================================================
// NAVBAR SCROLL & DROPDOWNS
// =========================================================

const header = document.getElementById("browse-header");
window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const profileButton = document.getElementById("profile-button");
const profileDropdown = document.getElementById("profile-dropdown");
const notificationButton = document.getElementById("notification-button");
const notificationDropdown = document.getElementById("notification-dropdown");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mainNav = document.getElementById("main-nav");

if (profileButton && profileDropdown) {
    profileButton.addEventListener("click", (e) => {
        e.stopPropagation();
        notificationDropdown?.classList.remove("active");
        profileDropdown.classList.toggle("active");
        profileButton.classList.toggle("active");
    });
}

if (notificationButton && notificationDropdown) {
    notificationButton.addEventListener("click", (e) => {
        e.stopPropagation();
        profileDropdown?.classList.remove("active");
        profileButton?.classList.remove("active");
        notificationDropdown.classList.toggle("active");
    });
}

document.addEventListener("click", (e) => {
    if (profileDropdown && !profileDropdown.contains(e.target) && !profileButton?.contains(e.target)) {
        profileDropdown.classList.remove("active");
        profileButton?.classList.remove("active");
    }
    if (notificationDropdown && !notificationDropdown.contains(e.target) && !notificationButton?.contains(e.target)) {
        notificationDropdown.classList.remove("active");
    }
});

if (mobileMenuButton && mainNav) {
    mobileMenuButton.addEventListener("click", () => {
        mainNav.classList.toggle("active");
        const icon = mobileMenuButton.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-xmark");
        }
    });
}

const clearNotifsBtn = document.getElementById("clear-notifications-btn");
if (clearNotifsBtn) {
    clearNotifsBtn.addEventListener("click", () => {
        const notifList = document.getElementById("notification-list");
        const badge = document.getElementById("notification-badge");
        if (notifList) notifList.innerHTML = "<p style='padding:10px; font-size:0.8rem; color:#808080;'>No new notifications.</p>";
        if (badge) badge.style.display = "none";
    });
}

// =========================================================
// CINEMATIC HERO CONTROLS
// =========================================================

const heroVideo = document.getElementById("hero-video");
const soundButton = document.getElementById("hero-sound-button");
const heroPlayBtn = document.getElementById("hero-play-btn");
const heroInfoBtn = document.getElementById("hero-info-btn");
const heroListBtn = document.getElementById("hero-list-btn");

if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(() => console.log("Autoplay initialized silently."));
}

if (soundButton && heroVideo) {
    soundButton.addEventListener("click", () => {
        heroVideo.muted = !heroVideo.muted;
        const icon = soundButton.querySelector("i");
        if (icon) {
            icon.className = heroVideo.muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high";
        }
    });
}

if (heroPlayBtn) {
    heroPlayBtn.addEventListener("click", () => {
        window.location.href = "watch.html?id=1";
    });
}

if (heroInfoBtn) {
    heroInfoBtn.addEventListener("click", () => {
        window.location.href = "movie-details.html?id=1";
    });
}

if (heroListBtn) {
    heroListBtn.addEventListener("click", () => {
        toggleMyList(1, heroListBtn);
    });
}

// =========================================================
// MOVIE CARD SYSTEM & TRAILER HOVER (EDGE AWARE)
// =========================================================

function createMovieCard(movie) {
    const card = document.createElement("article");
    card.className = "trailer-card";
    card.dataset.movieId = movie.id;

    card.innerHTML = `
        <div class="trailer-container">
            <img class="movie-poster" src="${movie.image}" alt="${movie.title}" loading="lazy">
            <div class="trailer-preview"></div>
            <div class="movie-overlay">
                <div class="card-actions">
                    <button class="card-action-btn btn-play-card" aria-label="Play ${movie.title}">
                        <i class="fa-solid fa-play"></i>
                    </button>
                    <button class="card-action-btn btn-add-card" aria-label="Add to My List">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <button class="card-action-btn btn-like-card" aria-label="Like">
                        <i class="fa-regular fa-thumbs-up"></i>
                    </button>
                </div>
                <h3>${movie.title}</h3>
                <div class="movie-info">
                    <span style="color:#46d369; font-weight:700;">${movie.score || '8.5'} Match</span>
                    <span class="rating-pill">${movie.rating || '16+'}</span>
                    <span>${movie.year}</span>
                </div>
            </div>
        </div>
    `;

    return card;
}

function createTop10Card(movie, rank) {
    const card = document.createElement("article");
    card.className = "top10-card";
    card.dataset.movieId = movie.id;

    // Use local asset images from movie5.jpg through movie15.jpg for Top 10 ranks 1..10
    const assetNum = 4 + rank; // rank 1 -> movie5.jpg, rank 10 -> movie14.jpg
    const localAssetPath = `../assets/images/movie${assetNum}.jpg`;

    card.innerHTML = `
        <span class="top10-number">${rank}</span>
        <div class="trailer-container">
            <img class="movie-poster" src="${localAssetPath}" alt="${movie.title}" loading="lazy" onerror="this.src='${movie.image}'">
            <div class="trailer-preview"></div>
            <div class="movie-overlay">
                <div class="card-actions">
                    <button class="card-action-btn btn-play-card" aria-label="Play ${movie.title}">
                        <i class="fa-solid fa-play"></i>
                    </button>
                    <button class="card-action-btn btn-add-card" aria-label="Add to My List">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
                <h3>${movie.title}</h3>
                <div class="movie-info">
                    <span style="color:#46d369; font-weight:700;">#${rank} in India</span>
                    <span class="rating-pill">${movie.rating || '16+'}</span>
                </div>
            </div>
        </div>
    `;

    return card;
}

function startTrailer(card) {
    const movieId = Number(card.dataset.movieId);
    const movie = window.movies ? window.movies.find(m => m.id === movieId) : null;
    if (!movie || !movie.trailer) return;

    const preview = card.querySelector(".trailer-preview");
    if (!preview) return;

    if (preview.dataset.loaded === "true") {
        preview.classList.add("visible");
        return;
    }

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${movie.trailer}?autoplay=1&mute=1&controls=0&loop=1&playlist=${movie.trailer}&rel=0&modestbranding=1`;
    iframe.title = `${movie.title} trailer`;
    iframe.allow = "autoplay; encrypted-media";
    iframe.setAttribute("frameborder", "0");

    preview.appendChild(iframe);
    preview.dataset.loaded = "true";
    preview.classList.add("visible");
}

function stopTrailer(card) {
    const preview = card.querySelector(".trailer-preview");
    if (preview) {
        preview.classList.remove("visible");
    }
}

function adjustCardTransformOrigin(card) {
    const rect = card.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    if (rect.left < 140) {
        card.style.transformOrigin = "left center";
    } else if (rect.right > windowWidth - 140) {
        card.style.transformOrigin = "right center";
    } else {
        card.style.transformOrigin = "center center";
    }
}

function initializeCardEvents(container) {
    const cards = container.querySelectorAll(".trailer-card, .top10-card");

    cards.forEach(card => {
        let hoverTimer;

        card.addEventListener("mouseenter", () => {
            adjustCardTransformOrigin(card);
            hoverTimer = setTimeout(() => {
                startTrailer(card);
            }, 500);
        });

        card.addEventListener("mouseleave", () => {
            clearTimeout(hoverTimer);
            stopTrailer(card);
        });

        const playBtn = card.querySelector(".btn-play-card");
        if (playBtn) {
            playBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                window.location.href = `watch.html?id=${card.dataset.movieId}`;
            });
        }

        const addBtn = card.querySelector(".btn-add-card");
        if (addBtn) {
            addBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleMyList(Number(card.dataset.movieId), addBtn);
            });
        }

        card.addEventListener("click", () => {
            window.location.href = `movie-details.html?id=${card.dataset.movieId}`;
        });
    });
}

// =========================================================
// MY LIST LOCAL STORAGE MANAGEMENT
// =========================================================

function toggleMyList(movieId, btnElement) {
    let myList = JSON.parse(localStorage.getItem("myNetflixList")) || [];
    const icon = btnElement ? btnElement.querySelector("i") : null;

    if (myList.includes(movieId)) {
        myList = myList.filter(id => id !== movieId);
        if (icon) icon.className = "fa-solid fa-plus";
    } else {
        myList.push(movieId);
        if (icon) icon.className = "fa-solid fa-check";
    }

    localStorage.setItem("myNetflixList", JSON.stringify(myList));
}

// =========================================================
// CONTINUE WATCHING SYSTEM
// =========================================================

function renderContinueWatching() {
    const section = document.getElementById("continue-section");
    const row = document.getElementById("continue-row");
    if (!section || !row) return;

    let progressData = JSON.parse(localStorage.getItem("netflixWatchProgress")) || {};
    
    if (Object.keys(progressData).length === 0) {
        progressData = {
            1: { progress: 65, timestamp: "1h 12m left" },
            11: { progress: 40, timestamp: "45m left" },
            3: { progress: 85, timestamp: "12m left" }
        };
        localStorage.setItem("netflixWatchProgress", JSON.stringify(progressData));
    }

    row.innerHTML = "";
    const movieIds = Object.keys(progressData);

    if (movieIds.length === 0) {
        section.style.display = "none";
        return;
    }

    section.style.display = "block";

    movieIds.forEach(id => {
        const movie = window.movies ? window.movies.find(m => m.id === Number(id)) : null;
        if (!movie) return;

        const info = progressData[id];
        const card = document.createElement("article");
        card.className = "continue-card";

        card.innerHTML = `
            <div class="continue-image">
                <img src="${movie.image}" alt="${movie.title}">
                <button class="small-play-button" aria-label="Resume ${movie.title}">
                    <i class="fa-solid fa-play"></i>
                </button>
            </div>
            <div class="progress-bar-container">
                <div class="progress-fill" style="width: ${info.progress}%;"></div>
            </div>
            <div class="continue-details">
                <strong style="color:#fff; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:130px;">${movie.title}</strong>
                <span>${info.timestamp}</span>
            </div>
        `;

        card.addEventListener("click", () => {
            window.location.href = `watch.html?id=${movie.id}`;
        });

        row.appendChild(card);
    });
}

// =========================================================
// REUSABLE ROW SLIDER SETUP FOR ALL SECTIONS
// =========================================================

function setupRowSliders() {
    const movieRows = document.querySelectorAll(".movie-row");

    movieRows.forEach(row => {
        let wrapper = row.closest(".row-wrapper");

        if (!wrapper) {
            wrapper = document.createElement("div");
            wrapper.className = "row-wrapper";
            row.parentNode.insertBefore(wrapper, row);
            wrapper.appendChild(row);
        }

        let leftArrow = wrapper.querySelector(".slider-arrow.arrow-left");
        let rightArrow = wrapper.querySelector(".slider-arrow.arrow-right");

        if (!leftArrow) {
            leftArrow = document.createElement("button");
            leftArrow.className = "slider-arrow arrow-left";
            leftArrow.setAttribute("aria-label", "Scroll left");
            leftArrow.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
            wrapper.appendChild(leftArrow);
        }

        if (!rightArrow) {
            rightArrow = document.createElement("button");
            rightArrow.className = "slider-arrow arrow-right";
            rightArrow.setAttribute("aria-label", "Scroll right");
            rightArrow.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
            wrapper.appendChild(rightArrow);
        }

        function updateArrowVisibility() {
            const scrollLeft = Math.ceil(row.scrollLeft);
            const maxScroll = Math.floor(row.scrollWidth - row.clientWidth);

            if (scrollLeft <= 10) {
                leftArrow.classList.add("hidden");
            } else {
                leftArrow.classList.remove("hidden");
            }

            if (scrollLeft >= maxScroll - 10 || maxScroll <= 0) {
                rightArrow.classList.add("hidden");
            } else {
                rightArrow.classList.remove("hidden");
            }
        }

        leftArrow.onclick = (e) => {
            e.stopPropagation();
            const scrollAmount = row.clientWidth * 0.75;
            row.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        };

        rightArrow.onclick = (e) => {
            e.stopPropagation();
            const scrollAmount = row.clientWidth * 0.75;
            row.scrollBy({ left: scrollAmount, behavior: "smooth" });
        };

        row.addEventListener("scroll", updateArrowVisibility, { passive: true });
        window.addEventListener("resize", updateArrowVisibility, { passive: true });

        // Initial check
        setTimeout(updateArrowVisibility, 150);
    });
}

// =========================================================
// RENDER ALL CONTENT ROWS
// =========================================================

function renderMovies() {
    if (!window.movies) return;

    const rowConfigs = [
        { id: "trending-row", getMovies: () => window.movies.slice(0, 15) },
        { id: "popular-row", getMovies: () => [...window.movies].reverse().slice(0, 15) },
        { id: "action-row", getMovies: () => window.movies.filter(m => m.genre === "Action").slice(0, 15) },
        { id: "comedy-row", getMovies: () => window.movies.filter(m => m.genre === "Comedy").slice(0, 15) },
        { id: "horror-row", getMovies: () => window.movies.filter(m => m.genre === "Horror").slice(0, 15) },
        { id: "romance-row", getMovies: () => window.movies.filter(m => m.genre === "Romance").slice(0, 15) },
        { id: "drama-row", getMovies: () => window.movies.filter(m => m.genre === "Drama").slice(0, 15) },
        { id: "indian-row", getMovies: () => window.movies.filter(m => m.id >= 91 && m.id <= 120).slice(0, 15) },
        { id: "90s-movies-row", getMovies: () => window.movies.filter(m => m.id >= 101 && m.id <= 120) }
    ];

    rowConfigs.forEach(cfg => {
        const rowEl = document.getElementById(cfg.id);
        if (!rowEl) return;
        rowEl.innerHTML = "";
        const movieSlice = cfg.getMovies();
        movieSlice.forEach(movie => {
            rowEl.appendChild(createMovieCard(movie));
        });
        initializeCardEvents(rowEl);
    });

    // Render Top 10 Row (Ranked 1 through 10)
    const top10Row = document.getElementById("top10-row");
    if (top10Row) {
        top10Row.innerHTML = "";
        const top10List = window.movies.filter(m => m.isTop10).slice(0, 10);
        top10List.forEach((movie, index) => {
            top10Row.appendChild(createTop10Card(movie, index + 1));
        });
        initializeCardEvents(top10Row);
    }

    renderContinueWatching();
    setupRowSliders();
}

const searchBtn = document.getElementById("search-button");
if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        window.location.href = "search.html";
    });
}

// =========================================================
// INITIALIZATION
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    initProfileUI();
    renderMovies();
    console.log("Netflix Browse initialized successfully.");
});