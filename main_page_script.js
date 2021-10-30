"use strict";

// Sliding movie poster to the right
const slideRight = function (genre) {
  const movies = document.querySelectorAll(`.${genre}-movie`);

  movies.forEach((mov) => {
    mov.classList.add("slide");
    mov.style.transform = "translateX(-260px)";
  });

  setTimeout(() => {
    document.getElementById(`${genre}-movie-poster`).removeChild(movies[0]);
    document.getElementById(`${genre}-movie-poster`).appendChild(movies[0]);
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
      .getElementById(`${genre}-movie-poster`)
      .removeChild(movies[movies.length - 1]);
    document
      .getElementById(`${genre}-movie-poster`)
      .insertAdjacentElement("afterbegin", movies[movies.length - 1]);
    movies.forEach((mov) => {
      mov.classList.remove("slide");
      mov.style.transform = "translateX(-130px)";
    });
  }, 500);
};

// Get the movie url on click
document.querySelectorAll(".movie-poster").forEach((el) =>
  el.addEventListener("click", (ev) => {
    sessionStorage.removeItem("movie");
    sessionStorage.removeItem("year");
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

// Left and right button on click
const genre = ["action", "horror", "kids", "star"];
document
  .querySelectorAll(".right-arrow-btn")
  .forEach((el, i) => el.addEventListener("click", () => slideRight(genre[i])));
document
  .querySelectorAll(".left-arrow-btn")
  .forEach((el, i) => el.addEventListener("click", () => slideLeft(genre[i])));
