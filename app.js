// ══════════════════════════════════════════════
//  app.js — MovieZone
let allMovies = [
  { title: "Avatar (2009)", type: "Movie", genre: "Sci-Fi", image: "avatar.jpg" },
  { title: "Venom (2021)", type: "Movie", genre: "Action", image: "_.jpeg" },
  { title: "Money Heist", type: "TV Series", genre: "Crime", image: "_ (3).jpeg" },
  { title: "Deadpool (2016)", type: "Movie", genre: "Action", image: "Deadpool (2016) by Tim Miller.jpeg" },
  { title: "Breaking Bad", type: "TV Series", genre: "Drama", image: "_ (5).jpeg" },
  { title: "Spider-Man: No Way Home (2021)", type: "Movie", genre: "Action", image: "_ (1).jpeg" },
  { title: "The Nun (2018)", type: "Movie", genre: "Horror", image: "The NUN Poster.jpeg" },
  { title: "The Expendables 3 (2014)", type: "Movie", genre: "Action", image: "The Expendables 3 2014.jpeg" },
  { title: "The Wolf of Wall Street (2013)", type: "Movie", genre: "Drama", image: "the wolf of wall street film.jpeg" },
  { title: "The Boys (2019)", type: "TV Series", genre: "Action", image: "_ (4).jpeg" },
  { title: "The Incredibles (2004)", type: "Movie", genre: "Animation", image: "The Incredibles- Nov 2004.jpeg" },
  { title: "Harry Potter: Philosopher's Stone (2001)", type: "Movie", genre: "Fantasy", image: "Harry Potter and the Philosopher's Stone (film 1).jpeg" },
  { title: "Sinners (2025)", type: "Movie", genre: "Thriller", image: "Sinners (2025).jpeg" },
  { title: "You (2018)", type: "TV Series", genre: "Thriller", image: "_ (copy 1).jpeg" },
  { title: "Dexter (2006)", type: "TV Series", genre: "Crime", image: "_ (6).jpeg" },
  { title: "Nobody 2 (2024)", type: "Movie", genre: "Action", image: "Nobody 2 movie.jpeg" },
  { title: "Game of Thrones", type: "TV Series", genre: "Fantasy", image: "Game of Thrones.jpeg" },
  { title: "The Lion King (1994)", type: "Movie", genre: "Animation", image: "The Lion King.jpeg" },
  { title: "Blade Runner 2049 (2017)", type: "Movie", genre: "Sci-Fi", image: "Blade Runner 2049 poster.jpeg" },
  { title: "Stranger Things (2019)", type: "TV Series", genre: "Sci-Fi", image: "Stranger Things 3 (2019).jpeg" },
  { title: "American Psycho (2000)", type: "Movie", genre: "Thriller", image: "_ (8).jpeg" },
  { title: "Spider-Man: Homecoming (2017)", type: "Movie", genre: "Action", image: "_ (9).jpeg" },
  { title: "Aquaman (2018)", type: "Movie", genre: "Action", image: "_ (11).jpeg" },
  { title: "Titanic (1997)", type: "Movie", genre: "Romance", image: "poster.jpeg" },
  { title: "One Piece (2023)", type: "TV Series", genre: "Adventure", image: "_ (1) (copy 1).jpeg" },
  { title: "Coco (2017)", type: "Movie", genre: "Animation", image: "Coco (2017) (1).jpeg" },
  { title: "The Meg (2018)", type: "Movie", genre: "Action", image: "The Meg Film Poster.jpeg" },
  { title: "Rush Hour 2 (2001)", type: "Movie", genre: "Comedy", image: "Rush Hour 2.jpeg" },
  { title: "Toy Story (1995)", type: "Movie", genre: "Animation", image: "toy story 1995.jpeg" },
  { title: "Big Hero 6 (2014)", type: "Movie", genre: "Animation", image: "bigHero.jpeg" },
  { title: "xXx: Return Of Xander Cage (2017)", type: "Movie", genre: "Action", image: "xXx Return Of Xander Cage.jpeg" },
  { title: "Bad Sister (2024)", type: "Movie", genre: "Drama", image: "Watch Bad Sister Full Movie HD facts Online.jpeg" },
  { title: "The Woman King (2022)", type: "Movie", genre: "Action", image: "The Woman King.jpeg" },
  { title: "Euphoria (2022)", type: "TV Series", genre: "Drama", image: "Euphoria poster by mahimagraphics.jpeg" },
  { title: "San Andreas (2015)", type: "Movie", genre: "Action", image: "san andreas.jpeg" },
  { title: "Sex Education S4 (2023)", type: "TV Series", genre: "Drama", image: "Sex Education Season 4.jpeg" },
  { title: "Southpaw (2015)", type: "Movie", genre: "Drama", image: "Southpaw Poster.jpeg" },
  { title: "Elektra (2005)", type: "Movie", genre: "Action", image: "Elektra (2005).jpeg" },
  { title: "Pirates of the Caribbean (2003)", type: "Movie", genre: "Adventure", image: "_ (15).jpeg" },
  { title: "Alita: Battle Angel (2019)", type: "Movie", genre: "Sci-Fi", image: "Alita_ Battle Angel Back In Theater Poster.jpeg" },
  { title: "The Guardians", type: "Movie", genre: "Action", image: "the Guardians.jpeg" }
];

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