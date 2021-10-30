"use strict";

// Render movie data
const renderMovie = function (movie) {
  // Add color based on rating
  const colorRating = function (rating, type, el) {
    if (type == "imdb") {
      rating *= 10;
    }
    if (rating >= 75) {
      el.style.color = "#77d970";
    } else if (rating >= 50 && rating < 75) {
      el.style.color = "#d7d970";
    } else {
      el.style.color = "#D97070";
    }
  };

  // Selecting elements
  const moviePoster = document.getElementById("movie-poster");
  const movieTitle = document.getElementById("movie-title");
  const movieActor = document.getElementById("actor");
  const movieDirector = document.getElementById("director");
  const moviePlot = document.getElementById("plot");
  const movieGenre = document.getElementById("genre");
  const movieLanguage = document.getElementById("language");
  const movieRuntime = document.getElementById("runtime");
  const movieCountry = document.getElementById("country");
  const movieBoxOffice = document.getElementById("box-office");
  const movieAward = document.getElementById("award");
  const imdbRatingEl = document.getElementById("imdb");
  const metacriticRatingEl = document.getElementById("metacritic");

  const loadingEl = document.getElementById("loading");
  const gridContainer = document.querySelector(".grid-container");

  loadingEl.classList.add("hidden");
  gridContainer.classList.remove("hidden");

  // Displaying data
  moviePoster.setAttribute("src", movie.Poster);
  movieTitle.textContent = `${movie.Title} - ${movie.Year}`;

  const actorsData = movie.Actors.split(", ");
  movieActor.textContent = `Starring ${actorsData[0]} and ${actorsData[1]}`;

  movieDirector.textContent = `Directed by ${movie.Director}`;
  moviePlot.textContent = `"${movie.Plot}"`;
  movieGenre.textContent = `Genre : ${movie.Genre}`;
  movieLanguage.textContent = `Language : ${movie.Language}`;
  movieRuntime.textContent = `Runtime : ${movie.Runtime.split(" ")[0]} minute`;
  movieCountry.textContent = `Country : ${movie.Country}`;
  movieBoxOffice.textContent = `Box Office : ${movie.BoxOffice}`;
  movieAward.textContent = `Award : ${movie.Awards}`;

  imdbRatingEl.textContent = `${movie.imdbRating} / 10`;

  if (movie.Metascore == "N/A") {
    document.querySelector(".rating-metacritic").classList.add("hidden");
  } else {
    metacriticRatingEl.textContent = `${movie.Metascore} / 100`;
  }

  colorRating(movie.imdbRating, "imdb", imdbRatingEl);
  colorRating(movie.Metascore, "metacritic", metacriticRatingEl);
};

// Getting movie data from API
const getMovieData = async function (title, year = null) {
  try {
    const response = year
      ? await fetch(
          `http://www.omdbapi.com/?t=${title}&y=${year}&plot=full&apikey=55a16ca8`
        )
      : await fetch(
          `http://www.omdbapi.com/?t=${title}&plot=full&apikey=55a16ca8`
        );
    const data = await response.json();
    if (data.Response == "False") {
      throw new Error("Movie not found");
    }
    renderMovie(data);
  } catch (err) {
    console.error(err);
    document.getElementById("loading-par").textContent = "Movie Not Found :(";
  }
};

// Back button
document.getElementById("back-btn").addEventListener("click", () => {
  sessionStorage.removeItem("movie");
  sessionStorage.removeItem("year");
});

// Searchbar
document
  .getElementById("form")
  .addEventListener("submit", (ev) => ev.preventDefault());
document.getElementById("searchbar").addEventListener("keyup", (ev) => {
  if (ev.key == "Enter") {
    sessionStorage.removeItem("movie");
    sessionStorage.removeItem("year");
    const userInput = ev.target.value;
    if (userInput.indexOf("[") != -1 && userInput.indexOf("]") != -1) {
      sessionStorage.movie = userInput
        .slice(0, userInput.indexOf("["))
        .split(" ")
        .join("+");
      sessionStorage.year = userInput.slice(
        userInput.indexOf("[") + 1,
        userInput.indexOf("]")
      );
    } else {
      sessionStorage.movie = userInput.split(" ").join("+");
    }
    window.location.href = "movie_page.html";
  }
});

// API call
setTimeout(() => {
  if (sessionStorage.year) {
    getMovieData(sessionStorage.movie, sessionStorage.year);
  } else {
    getMovieData(sessionStorage.movie);
  }
}, 700);
