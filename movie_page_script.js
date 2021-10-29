"use strict";

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

const renderMovie = function (movie) {
  document.getElementById("movie-poster").setAttribute("src", movie.Poster);
  document.getElementById(
    "movie-title"
  ).textContent = `${movie.Title} - ${movie.Year}`;

  const movieActors = movie.Actors.split(", ");
  document.getElementById(
    "actor"
  ).textContent = `Starring ${movieActors[0]} and ${movieActors[1]}`;

  document.getElementById(
    "director"
  ).textContent = `Directed by ${movie.Director}`;

  document.getElementById("plot").textContent = `"${movie.Plot}""`;
  document.getElementById("genre").textContent = `Genre : ${movie.Genre}`;

  document.getElementById(
    "language"
  ).textContent = `Language : ${movie.Language}`;

  document.getElementById("runtime").textContent = `Runtime : ${
    movie.Runtime.split(" ")[0]
  } minute`;

  document.getElementById("country").textContent = `Country : ${movie.Country}`;
  document.getElementById(
    "box-office"
  ).textContent = `Box Office : ${movie.BoxOffice}`;

  document.getElementById("award").textContent = `Award : ${movie.Awards}`;

  document.getElementById("imdb").textContent = `${movie.imdbRating} / 10`;

  if (movie.Metascore == "N/A") {
    document.querySelector(".rating-metacritic").classList.add("hidden");
  } else {
    document.getElementById(
      "metacritic"
    ).textContent = `${movie.Metascore} / 100`;
  }

  colorRating(movie.imdbRating, "imdb", document.getElementById("imdb"));
  colorRating(
    movie.Metascore,
    "metacritic",
    document.getElementById("metacritic")
  );
};

const getMovieData = async function (title, year = null) {
  const response = year
    ? await fetch(
        `http://www.omdbapi.com/?t=${title}&y=${year}&plot=full&apikey=55a16ca8`
      )
    : await fetch(
        `http://www.omdbapi.com/?t=${title}&plot=full&apikey=55a16ca8`
      );
  const data = await response.json();
  console.log(data); // Remove this line
  renderMovie(data);
};

document.getElementById("back-btn").addEventListener("click", () => {
  sessionStorage.removeItem("movie");
  sessionStorage.removeItem("year");
});

if (sessionStorage.year) {
  getMovieData(sessionStorage.movie, sessionStorage.year);
} else {
  getMovieData(sessionStorage.movie);
}
