const movieInput = document.getElementById("movieInput");
const movieList = document.getElementById("movieList");

let movies = [];

// Add movie
function addMovie() {
  const movieName = movieInput.value.trim();

  if (movieName === "") return;

  const movie = {
    name: movieName,
    watched: false
  };

  movies.push(movie);
  movieInput.value = "";

  renderMovies();
}

// Render movies
function renderMovies() {
  movieList.innerHTML = "";

  movies.forEach((movie, index) => {
    const li = document.createElement("li");

    // Movie text
    li.textContent = movie.name;

    if (movie.watched) {
      li.classList.add("watched");
    }

    // Toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = movie.watched ? "Unwatch" : "Watch";
    toggleBtn.onclick = () => toggleWatched(index);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteMovie(index);

    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);

    movieList.appendChild(li);
  });
}

// Toggle watched/unwatched
function toggleWatched(index) {
  movies[index].watched = !movies[index].watched;
  renderMovies();
}

// Delete movie
function deleteMovie(index) {
  movies.splice(index, 1);
  renderMovies();
}