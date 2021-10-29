"use strict";

// Sliding movie poster to the right
const slideRight = function (genre) {
  const movies = document.querySelectorAll(`.${genre}-movie`);

  movies.forEach((mov) => {
    mov.classList.add("slide");
    mov.style.transform = "translateX(-260px)";
  });

  setTimeout(() => {
    document.getElementById(`${genre}-movie-cards`).removeChild(movies[0]);
    document.getElementById(`${genre}-movie-cards`).appendChild(movies[0]);
    movies.forEach((mov) => {
      mov.classList.remove("slide");
      mov.style.transform = "translateX(-130px)";
    });
  }, 500);
};

// Sliding movie poster to the left
const slideLeft = function (genre) {
  const movies = document.querySelectorAll(`.${genre}-movie`);
  console.log(movies);
  movies.forEach((mov) => {
    mov.classList.add("slide");
    mov.style.transform = "translateX(0)";
  });

  setTimeout(() => {
    document
      .getElementById(`${genre}-movie-cards`)
      .removeChild(movies[movies.length - 1]);
    document
      .getElementById(`${genre}-movie-cards`)
      .insertAdjacentElement("afterbegin", movies[movies.length - 1]);
    movies.forEach((mov) => {
      mov.classList.remove("slide");
      mov.style.transform = "translateX(-130px)";
    });
  }, 500);
};

// Get the movie url on click
document.querySelectorAll(".movie-cards").forEach((el) =>
  el.addEventListener("click", (ev) => {
    if (ev.target.dataset.movie) {
      sessionStorage.movie = ev.target.dataset.movie;
      if (ev.target.dataset.year) {
        sessionStorage.year = ev.target.dataset.year;
      }
    }
  })
);

// Searchbar
document
  .getElementById("form")
  .addEventListener("submit", (ev) => ev.preventDefault());
document.getElementById("searchbar").addEventListener("keyup", (ev) => {
  if (ev.key == "Enter") {
    sessionStorage.movie = ev.target.value.split(" ").join("+");
    window.location.href = "movie_page.html";
  }
});

// Left and right button on click
document
  .getElementById("ra-btn-action")
  .addEventListener("click", () => slideRight("action"));
document
  .getElementById("la-btn-action")
  .addEventListener("click", () => slideLeft("action"));
document
  .getElementById("ra-btn-horror")
  .addEventListener("click", () => slideRight("horror"));
document
  .getElementById("la-btn-horror")
  .addEventListener("click", () => slideLeft("horror"));
document
  .getElementById("ra-btn-kids")
  .addEventListener("click", () => slideRight("kids"));
document
  .getElementById("la-btn-kids")
  .addEventListener("click", () => slideLeft("kids"));
document
  .getElementById("ra-btn-star")
  .addEventListener("click", () => slideRight("star"));
document
  .getElementById("la-btn-star")
  .addEventListener("click", () => slideLeft("star"));
