/* =========================================================
   NETFLIX MY LIST
   ========================================================= */


/* ================= ELEMENTS ================= */

const listGrid =
    document.getElementById("my-list-grid");

const emptyList =
    document.getElementById("empty-list");

const listCount =
    document.getElementById("list-count");


/* ================= GET LIST ================= */

function getMyList() {

    return JSON.parse(
        localStorage.getItem("myNetflixList")
    ) || [];

}


/* ================= SAVE LIST ================= */

function saveMyList(list) {

    localStorage.setItem(
        "myNetflixList",
        JSON.stringify(list)
    );

}


/* ================= CREATE CARD ================= */

function createListCard(movie) {

    const card =
        document.createElement("article");

    card.className = "my-list-card";

    card.innerHTML = `

        <img
            src="${movie.image}"
            alt="${movie.title}"
            loading="lazy"
        >

        <button
            class="remove-button"
            aria-label="Remove ${movie.title}"
        >
            <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="my-list-overlay">

            <h3 class="my-list-title">
                ${movie.title}
            </h3>

            <div class="my-list-info">

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


    /* ================= CARD CLICK ================= */

    card.addEventListener(
        "click",
        () => {

            window.location.href =
                `movie-details.html?id=${movie.id}`;

        }
    );


    /* ================= REMOVE ================= */

    const removeButton =
        card.querySelector(
            ".remove-button"
        );


    removeButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            removeFromList(movie.id);

        }
    );


    return card;

}


/* ================= REMOVE MOVIE ================= */

function removeFromList(movieId) {

    let list =
        getMyList();


    list =
        list.filter(
            id => id !== movieId
        );


    saveMyList(list);

    renderMyList();

}


/* ================= RENDER ================= */

function renderMyList() {

    const list =
        getMyList();


    listGrid.innerHTML = "";


    /* ================= EMPTY ================= */

    if (list.length === 0) {

        listGrid.style.display =
            "none";

        emptyList.style.display =
            "flex";

        listCount.textContent =
            "0 titles";

        return;

    }


    /* ================= SHOW LIST ================= */

    listGrid.style.display =
        "grid";

    emptyList.style.display =
        "none";


    listCount.textContent =
        `${list.length} title${list.length !== 1 ? "s" : ""}`;


    list.forEach((movieId) => {

        const movie =
            movies.find(
                item => item.id === movieId
            );


        if (!movie) return;


        const card =
            createListCard(movie);


        listGrid.appendChild(card);

    });

}


/* ================= INITIALIZE ================= */

renderMyList();