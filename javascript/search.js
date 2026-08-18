/* =========================================================
   NETFLIX SEARCH
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const searchInput =
    document.getElementById(
        "search-input"
    );

const searchResults =
    document.getElementById(
        "search-results"
    );

const searchTitle =
    document.getElementById(
        "search-title"
    );

const resultCount =
    document.getElementById(
        "result-count"
    );

const clearButton =
    document.getElementById(
        "clear-search"
    );

const emptyState =
    document.getElementById(
        "empty-state"
    );

const noResults =
    document.getElementById(
        "no-results"
    );


/* =========================================================
   CREATE SEARCH CARD
   ========================================================= */

function createSearchCard(movie) {

    const card =
        document.createElement("article");

    card.className =
        "search-card";


    card.innerHTML = `

        <img
            src="${movie.image}"
            alt="${movie.title}"
            loading="lazy"
        >

        <div class="search-card-overlay">

            <h3 class="search-card-title">
                ${movie.title}
            </h3>

            <div class="search-card-info">

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

    `;


    /* ================= CLICK ================= */

    card.addEventListener(
        "click",
        () => {

            window.location.href =
                `movie-details.html?id=${movie.id}`;

        }
    );


    return card;
}


/* =========================================================
   SEARCH MOVIES
   ========================================================= */

function searchMovies(query) {

    const value =
        query
            .trim()
            .toLowerCase();


    /* ================= EMPTY ================= */

    if (!value) {

        searchResults.innerHTML = "";

        searchTitle.textContent =
            "Explore Movies & Shows";

        resultCount.textContent = "";

        emptyState.style.display =
            "flex";

        noResults.style.display =
            "none";

        clearButton.style.display =
            "none";

        return;

    }


    /* ================= SEARCH ================= */

    const results =
        movies.filter((movie) => {

            return (
                movie.title
                    .toLowerCase()
                    .includes(value)

                ||

                movie.genre
                    .toLowerCase()
                    .includes(value)

                ||

                movie.description
                    .toLowerCase()
                    .includes(value)
            );

        });


    /* ================= UPDATE UI ================= */

    searchResults.innerHTML = "";

    emptyState.style.display =
        "none";

    clearButton.style.display =
        "block";


    searchTitle.textContent =
        `Search results for "${query}"`;


    resultCount.textContent =
        `${results.length} result${results.length !== 1 ? "s" : ""}`;


    /* ================= NO RESULTS ================= */

    if (results.length === 0) {

        noResults.style.display =
            "flex";

        return;

    }


    noResults.style.display =
        "none";


    /* ================= RENDER ================= */

    results.forEach((movie) => {

        const card =
            createSearchCard(movie);

        searchResults.appendChild(card);

    });

}


/* =========================================================
   LIVE SEARCH
   ========================================================= */

searchInput.addEventListener(
    "input",
    () => {

        searchMovies(
            searchInput.value
        );

    }
);


/* =========================================================
   CLEAR SEARCH
   ========================================================= */

clearButton.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        searchInput.focus();

        searchMovies("");

    }
);


/* =========================================================
   KEYBOARD SHORTCUT
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        /*
           Press "/" to focus search
        */

        if (
            event.key === "/" &&
            document.activeElement !== searchInput
        ) {

            event.preventDefault();

            searchInput.focus();

        }


        /*
           Press Escape to clear
        */

        if (
            event.key === "Escape"
        ) {

            searchInput.value = "";

            searchMovies("");

        }

    }
);


/* =========================================================
   INITIAL LOAD
   ========================================================= */

searchMovies("");