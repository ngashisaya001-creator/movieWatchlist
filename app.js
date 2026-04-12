// SELECT ELEMENTS
const movieCards = document.querySelectorAll(".movie-col");
const totalCount = document.getElementById("total-count");
const watchedCount = document.getElementById("watched-count");
const unwatchedCount = document.getElementById("unwatched-count");

const searchInput = document.querySelector(".search-wrapper input");
const searchBtn = document.querySelector(".search-wrapper button");

// ============================
// UPDATE STATS
// ============================
function updateStats() {
  let total = movieCards.length;
  let watched = 0;

  movieCards.forEach(card => {
    if (card.dataset.watched === "true") {
      watched++;
    }
  });

  totalCount.textContent = total;
  watchedCount.textContent = watched;
  unwatchedCount.textContent = total - watched;
}

// ============================
// TOGGLE WATCHED
// ============================
function toggleWatched(button) {
  const card = button.closest(".movie-col");
  const overlay = card.querySelector(".card-watched-overlay");

  if (card.dataset.watched === "false") {
    card.dataset.watched = "true";
    overlay.style.opacity = "0.6"; // show overlay
  } else {
    card.dataset.watched = "false";
    overlay.style.opacity = "0"; // hide overlay
  }

  updateStats();
}

// ============================
// FILTER MOVIES
// ============================
function filterCards() {
  console.log("filtering cards...");
}

  // remove active class
  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  movieCards.forEach(card => {
    const watched = card.dataset.watched;

    if (type === "all") {
      card.style.display = "block";
    } else if (type === "watched" && watched === "true") {
      card.style.display = "block";
    } else if (type === "unwatched" && watched === "false") {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });


// ============================
// SEARCH FUNCTION
// ============================
function searchMovies() {
  const query = searchInput.value.toLowerCase();

  movieCards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();

    if (title.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// trigger search
searchBtn.addEventListener("click", searchMovies);

// optional: search on typing
searchInput.addEventListener("keyup", searchMovies);

// ============================
// INITIAL LOAD
// ============================
updateStats();