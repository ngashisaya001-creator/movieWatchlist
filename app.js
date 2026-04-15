// ══════════════════════════════════════════════
//  app.js — MovieZone
let allMovies = [];

// ── 1. LOAD movies.json WHEN PAGE OPENS ────────
fetch('movies.json')
  .then(function(response) {
    return response.json();          // convert the file to a JS array
  })
  .then(function(data) {
    allMovies = data;                // save movies into our array
    buildCards(allMovies);           // draw all cards on the page
    updateCounts();                  // update the stats bar numbers
  })
  .catch(function(error) {
    console.error('Could not load movies.json:', error);
  });


// ── 2. BUILD MOVIE CARDS ───────────────────────
// This function creates an HTML card for every
// movie in the array and puts them in the grid.
function buildCards(movies) {
  var grid = document.getElementById('movie-grid');
  grid.innerHTML = '';               // clear existing cards first

  movies.forEach(function(movie) {

    // Work out the label: "Title (Year)" or just "Title"
    var label = movie.year ? movie.title + ' (' + movie.year + ')' : movie.title;

    // Build the column div
    var col = document.createElement('div');
    col.className = 'col-6 col-sm-4 col-md-3 col-lg-2 movie-col';
    col.setAttribute('data-id', movie.id);
    col.setAttribute('data-watched', movie.watched);  // true or false from JSON

    // Build the inner card HTML
    col.innerHTML =
      '<div class="movie-card' + (movie.watched ? ' is-watched' : '') + '">' +
        '<div class="quality-tag">' + movie.quality + '</div>' +
        '<div class="watch-badge">' +
          '<button class="btn-watch' + (movie.watched ? ' watched' : '') + '" onclick="toggleWatched(this)">' +
            '<i class="bi bi-check-circle"></i>' +
          '</button>' +
        '</div>' +
        '<img src="' + movie.poster + '" alt="' + movie.title + ' poster">' +
        '<div class="card-watched-overlay"></div>' +
        '<div class="movie-info">' +
          '<h3>' + label + '</h3>' +
          '<div class="meta">' + movie.type + ' &bull; ' + movie.genre + '</div>' +
        '</div>' +
      '</div>';

    grid.appendChild(col);
  });
}


// ── 3. TOGGLE WATCHED / UNWATCHED ─────────────
// Called when the ✓ button on a card is clicked.
function toggleWatched(btn) {
  var col     = btn.closest('.movie-col');
  var card    = btn.closest('.movie-card');
  var movieId = parseInt(col.getAttribute('data-id'));

  // Find this movie in our array and flip its watched value
  var movie = allMovies.find(function(m) { return m.id === movieId; });
  movie.watched = !movie.watched;

  // Update the data attribute on the column
  col.setAttribute('data-watched', movie.watched);

  // Add or remove the visual "watched" styling
  if (movie.watched) {
    card.classList.add('is-watched');
    btn.classList.add('watched');
  } else {
    card.classList.remove('is-watched');
    btn.classList.remove('watched');
  }

  // Refresh the stats bar
  updateCounts();
}


// ── 4. UPDATE STATS BAR COUNTS ────────────────
// Reads the current state of allMovies and
// updates Total, Watched, and Unwatched numbers.
function updateCounts() {
  var total     = allMovies.length;
  var watched   = allMovies.filter(function(m) { return m.watched === true; }).length;
  var unwatched = total - watched;

  document.getElementById('total-count').textContent     = total;
  document.getElementById('watched-count').textContent   = watched;
  document.getElementById('unwatched-count').textContent = unwatched;
}


// ── 5. FILTER CARDS ───────────────────────────
// Called by the filter buttons in the HTML.
// type can be: 'all', 'watched', or 'unwatched'
function filterCards(type, clickedBtn) {

  // Move the 'active' class to the clicked button
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  clickedBtn.classList.add('active');

  // Show or hide each column based on its watched state
  document.querySelectorAll('.movie-col').forEach(function(col) {
    var isWatched = col.getAttribute('data-watched') === 'true';

    if (type === 'all') {
      col.classList.remove('hidden');
    } else if (type === 'watched') {
      // show only watched cards
      if (isWatched) {
        col.classList.remove('hidden');
      } else {
        col.classList.add('hidden');
      }
    } else if (type === 'unwatched') {
      // show only unwatched cards
      if (!isWatched) {
        col.classList.remove('hidden');
      } else {
        col.classList.add('hidden');
      }
    }
  });
}