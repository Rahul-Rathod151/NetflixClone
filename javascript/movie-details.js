/* =========================================================
   NETFLIX MOVIE DETAILS
   ========================================================= */


/* =========================================================
   GET MOVIE ID FROM URL
   ========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


const movieId =
    Number(params.get("id"));


/* =========================================================
   FIND MOVIE
   ========================================================= */

const movie =
    movies.find(
        item => item.id === movieId
    );


/* =========================================================
   CHECK MOVIE
   ========================================================= */

if (!movie) {

    window.location.href =
        "browse.html";

}


/* =========================================================
   ELEMENTS
   ========================================================= */

const title =
    document.getElementById(
        "movie-title"
    );

const year =
    document.getElementById(
        "movie-year"
    );

const rating =
    document.getElementById(
        "movie-rating"
    );

const seasons =
    document.getElementById(
        "movie-seasons"
    );

const genre =
    document.getElementById(
        "movie-genre"
    );

const description =
    document.getElementById(
        "movie-description"
    );

const background =
    document.getElementById(
        "background-image"
    );

const player =
    document.getElementById(
        "youtube-player"
    );

const listButton =
    document.getElementById(
        "list-button"
    );


/* =========================================================
   LOAD MOVIE
   ========================================================= */

function loadMovie() {

    title.textContent =
        movie.title;

    year.textContent =
        movie.year;

    rating.textContent =
        movie.rating;

    seasons.textContent =
        movie.seasons;

    genre.textContent =
        movie.genre;

    description.textContent =
        movie.description;

    background.src =
        movie.image;

    background.alt =
        movie.title;


    document.title =
        `${movie.title} - Netflix`;


    loadTrailer();

    updateListButton();

}


/* =========================================================
   YOUTUBE TRAILER
   ========================================================= */

function loadTrailer() {

    if (!movie.trailer) {

        player.innerHTML = `
            <div style="
                display:flex;
                align-items:center;
                justify-content:center;
                height:100%;
                color:#aaa;
            ">
                Trailer unavailable
            </div>
        `;

        return;
    }


    player.innerHTML = `

        <iframe
            src="https://www.youtube.com/embed/${movie.trailer}?rel=0&modestbranding=1"
            title="${movie.title} Trailer"
            allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
                web-share
            "
            allowfullscreen
        ></iframe>

    `;

}


/* =========================================================
   MY LIST
   ========================================================= */

function getMyList() {

    return JSON.parse(
        localStorage.getItem(
            "myNetflixList"
        )
    ) || [];

}


function updateListButton() {

    const list =
        getMyList();

    const icon =
        listButton.querySelector("i");

    const text =
        listButton.querySelector("span");


    if (list.includes(movie.id)) {

        icon.className =
            "fa-solid fa-check";

        text.textContent =
            "Remove from My List";

    } else {

        icon.className =
            "fa-solid fa-plus";

        text.textContent =
            "Add to My List";

    }

}


listButton.addEventListener(
    "click",
    () => {

        let list =
            getMyList();


        if (list.includes(movie.id)) {

            list =
                list.filter(
                    id => id !== movie.id
                );

        } else {

            list.push(movie.id);

        }


        localStorage.setItem(
            "myNetflixList",
            JSON.stringify(list)
        );


        updateListButton();

    }
);


/* =========================================================
   PLAY BUTTON
   ========================================================= */

const playButton =
    document.getElementById(
        "play-button"
    );


playButton.addEventListener(
    "click",
    () => {

        document
            .querySelector(
                ".trailer-section"
            )
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =========================================================
   RELATED MOVIES
   ========================================================= */

const relatedContainer =
    document.getElementById(
        "related-movies"
    );


function loadRelatedMovies() {

    const related =
        movies
            .filter(
                item =>
                    item.id !== movie.id &&
                    item.genre === movie.genre
            )
            .slice(0, 5);


    /*
       If there aren't enough movies
       in the same genre, fill the rest.
    */

    if (related.length < 5) {

        movies.forEach((item) => {

            if (
                item.id !== movie.id &&
                !related.includes(item) &&
                related.length < 5
            ) {

                related.push(item);

            }

        });

    }


    related.forEach((item) => {

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "related-card";


        card.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.title}"
                loading="lazy"
            >

        `;


        card.addEventListener(
            "click",
            () => {

                window.location.href =
                    `movie-details.html?id=${item.id}`;

            }
        );


        relatedContainer.appendChild(
            card
        );

    });

}


/* =========================================================
   INITIALIZE
   ========================================================= */

loadMovie();

loadRelatedMovies();