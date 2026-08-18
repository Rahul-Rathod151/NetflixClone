import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


// =========================================================
// LOGOUT
// =========================================================

const logoutButton =
    document.getElementById("logout-button");

if (logoutButton) {

    logoutButton.addEventListener("click", async (event) => {

        event.preventDefault();

        try {

            await signOut(auth);

            console.log("User signed out successfully");

            window.location.href = "index.html";

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }

    });

}


// =========================================================
// AUTHENTICATION GUARD
// =========================================================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;
    }

    console.log(
        "Authenticated user:",
        user.email
    );

});


// =========================================================
// NETFLIX BROWSE JAVASCRIPT
// =========================================================


// =========================================================
// ELEMENTS
// =========================================================

const header =
    document.querySelector(".browse-header");

const profileButton =
    document.getElementById("profile-button");

const profileDropdown =
    document.getElementById("profile-dropdown");

const mobileMenuButton =
    document.getElementById("mobile-menu-button");

const mainNav =
    document.getElementById("main-nav");

const heroVideo =
    document.getElementById("hero-video");

const soundButton =
    document.getElementById("hero-sound-button");


// =========================================================
// NAVBAR
// =========================================================

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


// =========================================================
// PROFILE DROPDOWN
// =========================================================

if (profileButton && profileDropdown) {

    profileButton.addEventListener("click", (event) => {

        event.stopPropagation();

        profileDropdown.classList.toggle("active");

        profileButton.classList.toggle("active");

    });

}


document.addEventListener("click", (event) => {

    if (
        profileDropdown &&
        profileButton &&
        !profileDropdown.contains(event.target) &&
        !profileButton.contains(event.target)
    ) {

        profileDropdown.classList.remove("active");

        profileButton.classList.remove("active");

    }

});


// =========================================================
// MOBILE MENU
// =========================================================

if (mobileMenuButton && mainNav) {

    mobileMenuButton.addEventListener("click", () => {

        mainNav.classList.toggle("active");

        const icon =
            mobileMenuButton.querySelector("i");

        if (!icon) return;

        if (mainNav.classList.contains("active")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}


// =========================================================
// HERO VIDEO
// =========================================================

if (heroVideo) {

    heroVideo.muted = true;

    heroVideo.play().catch(() => {

        console.log("Autoplay blocked.");

    });

}


// =========================================================
// HERO SOUND
// =========================================================

if (soundButton && heroVideo) {

    soundButton.addEventListener("click", () => {

        heroVideo.muted =
            !heroVideo.muted;

        const icon =
            soundButton.querySelector("i");

        if (!icon) return;

        if (heroVideo.muted) {

            icon.classList.remove(
                "fa-volume-high"
            );

            icon.classList.add(
                "fa-volume-xmark"
            );

        } else {

            icon.classList.remove(
                "fa-volume-xmark"
            );

            icon.classList.add(
                "fa-volume-high"
            );

        }

    });

}


// =========================================================
// CREATE MOVIE CARD
// =========================================================

function createMovieCard(movie) {

    const card =
        document.createElement("article");

    card.className = "trailer-card";

    card.dataset.movieId =
        movie.id;

    card.innerHTML = `

        <div class="trailer-container">

            <img
                class="movie-poster"
                src="${movie.image}"
                alt="${movie.title}"
                loading="lazy"
            >

            <div class="trailer-preview"></div>

            <div class="movie-overlay">

                <button
                    class="card-play-button"
                    aria-label="Play ${movie.title}"
                >
                    <i class="fa-solid fa-play"></i>
                </button>

                <button
                    class="card-add-button"
                    aria-label="Add ${movie.title} to My List"
                >
                    <i class="fa-solid fa-plus"></i>
                </button>

                <h3>
                    ${movie.title}
                </h3>

                <div class="movie-info">

                    <span>
                        ${movie.year}
                    </span>

                    <span>
                        ${movie.rating}
                    </span>

                    <span>
                        ${movie.genre}
                    </span>

                </div>

            </div>

        </div>

    `;

    return card;
}


// =========================================================
// GET FIRST 20 MOVIES
// =========================================================

function getFirst20(list) {

    return list.slice(0, 20);

}


// =========================================================
// GET MOVIES BY GENRE
// =========================================================

function getMoviesByGenre(genre) {

    const filteredMovies =
        movies.filter(movie => {

            return movie.genre &&
                movie.genre.toLowerCase() ===
                genre.toLowerCase();

        });

    return getFirst20(filteredMovies);

}


// =========================================================
// RENDER MOVIES
// =========================================================

function renderMovies() {

    // =====================================================
    // GET ROWS
    // =====================================================

   const rows = {

    trending:
        document.getElementById("trending-row"),

    popular:
        document.getElementById("popular-row"),

    top10:
        document.getElementById("top10-row"),

    comedy:
        document.getElementById("comedy-row"),

    horror:
        document.getElementById("horror-row"),

    action:
        document.getElementById("action-row"),

    romance:
        document.getElementById("romance-row"),

    drama:
        document.getElementById("drama-row"),

    indian:
        document.getElementById("indian-row"),

    topPicks:
        document.getElementById("top-picks-row"),

    // =================================================
    // 90s BOLLYWOOD CLASSICS
    // =================================================

    nineties:
        document.getElementById("90s-movies-row")

};



    // =====================================================
    // CLEAR ROWS
    // =====================================================

    Object.values(rows).forEach(row => {

        if (row) {

            row.innerHTML = "";

        }

    });


    // =====================================================
    // TRENDING NOW
    // =====================================================

    if (rows.trending) {

        getFirst20(movies)
            .forEach(movie => {

                rows.trending.appendChild(
                    createMovieCard(movie)
                );

            });

    }


    // =====================================================
    // POPULAR ON NETFLIX
    // =====================================================

    if (rows.popular) {

        getFirst20(
            [...movies].reverse()
        )
        .forEach(movie => {

            rows.popular.appendChild(
                createMovieCard(movie)
            );

        });

    }


    // =====================================================
    // TOP 10 IN INDIA
    // =====================================================

    if (rows.top10) {

        getFirst20(movies)
            .forEach(movie => {

                rows.top10.appendChild(
                    createMovieCard(movie)
                );

            });

    }


    // =====================================================
    // COMEDY
    // =====================================================

    if (rows.comedy) {

        getMoviesByGenre("Comedy")
            .forEach(movie => {

                rows.comedy.appendChild(
                    createMovieCard(movie)
                );

            });

    }


    // =====================================================
    // HORROR
    // =====================================================

    if (rows.horror) {

        getMoviesByGenre("Horror")
            .forEach(movie => {

                rows.horror.appendChild(
                    createMovieCard(movie)
                );

            });

    }


    // =====================================================
    // ACTION
    // =====================================================

    if (rows.action) {

        getMoviesByGenre("Action")
            .forEach(movie => {

                rows.action.appendChild(
                    createMovieCard(movie)
                );

            });

    }


    // =====================================================
    // ROMANCE
    // =====================================================

    if (rows.romance) {

        getMoviesByGenre("Romance")
            .forEach(movie => {

                rows.romance.appendChild(
                    createMovieCard(movie)
                );

            });

    }


    // =====================================================
    // DRAMA
    // =====================================================

    if (rows.drama) {

        getMoviesByGenre("Drama")
            .forEach(movie => {

                rows.drama.appendChild(
                    createMovieCard(movie)
                );

            });

    }


    // =====================================================
    // INDIAN MOVIES
    // =====================================================

    if (rows.indian) {

        const indianMovies =
            movies.filter(movie => {

                return movie.id >= 11;

            });

        getFirst20(indianMovies)
            .forEach(movie => {

                rows.indian.appendChild(
                    createMovieCard(movie)
                );

            });

    }


    // =====================================================
    // TOP PICKS
    // =====================================================

    if (rows.topPicks) {

        const topPicks =
            movies.slice(3);

        getFirst20(topPicks)
            .forEach(movie => {

                rows.topPicks.appendChild(
                    createMovieCard(movie)
                );

            });

    }
    // =====================================================
// 90s BOLLYWOOD CLASSICS
// =====================================================

if (rows.nineties) {

    rows.nineties.innerHTML = "";

    movies
        .filter(movie =>
            movie.id >= 101 &&
            movie.id <= 120
        )
        .forEach(movie => {

            const card =
                createMovieCard(movie);

            rows.nineties.appendChild(card);

        });

}


    // =====================================================
    // INITIALIZE CARD EVENTS
    // =====================================================

    initializeMovieCards();

}


// =========================================================
// YOUTUBE TRAILER
// =========================================================

function startTrailer(card) {

    const movieId =
        Number(card.dataset.movieId);

    const movie =
        movies.find(
            item =>
                item.id === movieId
        );

    if (!movie || !movie.trailer) {

        return;

    }


    const preview =
        card.querySelector(
            ".trailer-preview"
        );

    if (!preview) return;


    // Trailer already loaded

    if (
        preview.dataset.loaded === "true"
    ) {

        preview.classList.add(
            "visible"
        );

        return;

    }


    // =====================================================
    // CREATE YOUTUBE IFRAME
    // =====================================================

    const iframe =
        document.createElement("iframe");


    iframe.src =
        `https://www.youtube.com/embed/${movie.trailer}?autoplay=1&mute=1&controls=0&loop=1&playlist=${movie.trailer}&rel=0&modestbranding=1`;


    iframe.title =
        `${movie.title} trailer`;


    iframe.allow =
        "autoplay; encrypted-media";


    iframe.setAttribute(
        "frameborder",
        "0"
    );


    preview.appendChild(
        iframe
    );


    preview.dataset.loaded =
        "true";


    preview.classList.add(
        "visible"
    );

}


// =========================================================
// STOP TRAILER
// =========================================================

function stopTrailer(card) {

    const preview =
        card.querySelector(
            ".trailer-preview"
        );

    if (!preview) return;

    preview.classList.remove(
        "visible"
    );

}


// =========================================================
// MOVIE CARD EVENTS
// =========================================================

function initializeMovieCards() {

    const cards =
        document.querySelectorAll(
            ".trailer-card"
        );


    cards.forEach(card => {

        let hoverTimer;


        // =================================================
        // MOUSE ENTER
        // =================================================

        card.addEventListener(
            "mouseenter",
            () => {

                hoverTimer =
                    setTimeout(() => {

                        startTrailer(card);

                    }, 700);

            }
        );


        // =================================================
        // MOUSE LEAVE
        // =================================================

        card.addEventListener(
            "mouseleave",
            () => {

                clearTimeout(
                    hoverTimer
                );

                stopTrailer(card);

            }
        );


        // =================================================
        // PLAY BUTTON
        // =================================================

        const playButton =
            card.querySelector(
                ".card-play-button"
            );


        if (playButton) {

            playButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    const movieId =
                        card.dataset.movieId;

                    window.location.href =
                        `movie-details.html?id=${movieId}`;

                }
            );

        }


        // =================================================
        // MY LIST BUTTON
        // =================================================

        const addButton =
            card.querySelector(
                ".card-add-button"
            );


        if (addButton) {

            addButton.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    const movieId =
                        Number(
                            card.dataset.movieId
                        );

                    addToMyList(movieId);

                }
            );

        }


        // =================================================
        // CARD CLICK
        // =================================================

        card.addEventListener(
            "click",
            () => {

                const movieId =
                    card.dataset.movieId;

                window.location.href =
                    `movie-details.html?id=${movieId}`;

            }
        );

    });

}


// =========================================================
// MY LIST
// =========================================================

function addToMyList(movieId) {

    let myList =
        JSON.parse(
            localStorage.getItem(
                "myNetflixList"
            )
        ) || [];


    if (!myList.includes(movieId)) {

        myList.push(movieId);

        localStorage.setItem(
            "myNetflixList",
            JSON.stringify(myList)
        );

        alert(
            "Added to My List"
        );

    } else {

        alert(
            "Already in My List"
        );

    }

}


// =========================================================
// CAROUSEL
// =========================================================

document.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest(
                ".carousel-button"
            );

        if (!button) return;


        const section =
            button.closest(
                ".content-section"
            );

        if (!section) return;


        const row =
            section.querySelector(
                ".movie-row"
            );

        if (!row) return;


        const amount =
            row.clientWidth * 0.8;


        if (
            button.dataset.direction === "left"
        ) {

            row.scrollBy({

                left: -amount,

                behavior: "smooth"

            });

        } else {

            row.scrollBy({

                left: amount,

                behavior: "smooth"

            });

        }

    }
);


// =========================================================
// SEARCH
// =========================================================

const searchButton =
    document.getElementById(
        "search-button"
    );


if (searchButton) {

    searchButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "search.html";

        }
    );

}


// =========================================================
// INITIALIZE
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderMovies();

        console.log(
            "Netflix Browse initialized."
        );

    }
);