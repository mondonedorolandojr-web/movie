// Future API integration will go here
// Example for OMDb (once you get an API key):
// fetch(`https://www.omdbapi.com/?t=Inception&apikey=YOUR_API_KEY`)
//   .then(res => res.json())
//   .then(data => console.log(data));




///////////////////////////
//    TMDB API movies    //
///////////////////////////
const API_KEY = "d4732bac56b6eb40fe2e40ebef019868";  // Replace with your TMDb key
const BASE_URL = "https://api.themoviedb.org/3";

// Example: Fetch popular movies
fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
  .then(response => response.json())
  .then(data => {
    console.log("Popular Movies:", data.results);
  })
  .catch(error => console.error("Error fetching movies:", error));


// const API_KEY = "d4732bac56b6eb40fe2e40ebef019868";  
// const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function loadPopularMovies() {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await res.json();
    const movies = data.results;
    const container = document.getElementById("movie-list");

    movies.forEach(movie => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${IMG_BASE_URL + movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>⭐ Rating: ${movie.vote_average}</p>
        <p>${movie.release_date}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading movies:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadPopularMovies);


/////////////////////////////
//    TMDB API TV Series   //
/////////////////////////////

// const API_KEY = "YOUR_API_KEY_HERE";
// const BASE_URL = "https://api.themoviedb.org/3";
// const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function loadPopularTV() {
  try {
    const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await res.json();
    const shows = data.results;
    const container = document.getElementById("tv-list");

    shows.forEach(show => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${IMG_BASE_URL + show.poster_path}" alt="${show.name}">
        <h3>${show.name}</h3>
        <p>⭐ Rating: ${show.vote_average}</p>
        <p>${show.first_air_date}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading TV shows:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadPopularTV);






//////////////////////////////////////////////
//    TMDB API Trending Movies + TV Shows   //
//////////////////////////////////////////////

// const API_KEY = "YOUR_API_KEY_HERE";
// const BASE_URL = "https://api.themoviedb.org/3";
// const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

/*
async function loadTrending() {
  try {
    const res = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`);
    const data = await res.json();
    const trending = data.results;
    const container = document.getElementById("trending-list");

    trending.forEach(item => {
      const title = item.title || item.name; // title for movies, name for TV
      const mediaType = item.media_type.toUpperCase();
      const imgPath = item.poster_path ? IMG_BASE_URL + item.poster_path : "assets/img/no-image.png";

      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${imgPath}" alt="${title}">
        <h3>${title}</h3>
        <p>⭐ ${item.vote_average || "N/A"}</p>
        <span class="tag">${mediaType}</span>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading trending data:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadTrending);
*/

async function loadPopular() {
  const [moviesRes, tvRes] = await Promise.all([
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`)
  ]);

  const moviesData = await moviesRes.json();
  const tvData = await tvRes.json();

  const combined = [
    ...moviesData.results.map(m => ({ ...m, media_type: 'movie' })),
    ...tvData.results.map(t => ({ ...t, media_type: 'tv' }))
  ];

  displayResults(combined);
}

window.addEventListener('DOMContentLoaded', loadPopular);



//////////////////////////////
//    Jikan API TV Anime    //
//////////////////////////////
async function fetchTVAnime() {
  const res = await fetch("https://api.jikan.moe/v4/anime?type=tv&order_by=score&sort=desc&limit=20");
  const data = await res.json();
  const container = document.getElementById("anime-list");

  data.data.forEach(anime => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>${anime.episodes || '??'} episodes</p>
    `;
    container.appendChild(card);
  });
}

fetchTVAnime();


//////////////////////////////////
//    Jikan API Anime Movie     //
//////////////////////////////////
async function fetchMovies() {
  const res = await fetch("https://api.jikan.moe/v4/anime?type=movie&order_by=score&sort=desc&limit=20");
  const data = await res.json();
  const container = document.getElementById("anime-movie");

  data.data.forEach(anime => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>${anime.episodes || '??'} episodes</p>
    `;
    container.appendChild(card);
  });
}

fetchMovies();


document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("trending-list")) loadTrending();
  if (document.getElementById("tv-list")) loadPopularTV();
  if (document.getElementById("news-container")) loadMovieNews();
});



/////////////////////////////////
//    TMDB API search movies   //
/////////////////////////////////

// const API_KEY = 'YOUR_API_KEY';
// const BASE_URL = 'https://api.themoviedb.org/3';

/*
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieResults = document.getElementById('movieResults');

async function searchMovies(query) {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

function displayMovies(movies) {
  movieResults.innerHTML = ''; // Clear previous results

  if (movies.length === 0) {
    movieResults.innerHTML = '<p>No movies found.</p>';
    return;
  }

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('card');

    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'placeholder.jpg';

    movieCard.innerHTML = `
      <img src="${poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.release_date || 'Unknown date'}</p>
    `;

    movieResults.appendChild(movieCard);
  });
}

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) searchMovies(query);
});

searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query) searchMovies(query);
  }
});

*/

// const API_KEY = 'YOUR_API_KEY';
// const BASE_URL = 'https://api.themoviedb.org/3';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieResults = document.getElementById('movieResults');

async function searchAll(query) {
  try {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();

    // Filter out people results (we only want movies + TV shows)
    const filteredResults = data.results.filter(
      item => item.media_type === 'movie' || item.media_type === 'tv'
    );

    displayResults(filteredResults);
  } catch (error) {
    console.error('Error fetching results:', error);
  }
}

function displayResults(results) {
  movieResults.innerHTML = '';

  if (results.length === 0) {
    movieResults.innerHTML = '<p>No results found.</p>';
    return;
  }

  results.forEach(item => {
    const isMovie = item.media_type === 'movie';
    const title = isMovie ? item.title : item.name;
    const date = isMovie ? item.release_date : item.first_air_date;
    const poster = item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : 'placeholder.jpg';

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${poster}" alt="${title}">
      <h3>${title}</h3>
      <p>${isMovie ? '🎬 Movie' : '📺 TV Series'}</p>
      <p>${date || 'Unknown date'}</p>
    `;
    movieResults.appendChild(card);
  });
}

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) searchAll(query);
});

searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query) searchAll(query);
  }
});





















































/*
// search movie
async function searchMovie(query) {
  if (query.length < 3) return; // wait until at least 3 letters
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();
  const container = document.getElementById("movie-list");
  container.innerHTML = ""; // clear old results

  data.results.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${IMG_BASE_URL + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average}</p>
      <p>${movie.release_date}</p>
    `;
    container.appendChild(card);
  });
}
*/




// (for trending news on reddit)

/*
async function loadRedditNews() {
  const url = "https://www.reddit.com/r/movies/top.json?limit=5";
  const proxy = "https://api.allorigins.win/get?url=" + encodeURIComponent(url);

  try {
    const res = await fetch(proxy);
    const data = await res.json();
    const posts = JSON.parse(data.contents).data.children;
    const container = document.getElementById("reddit-news");

    if (!container) return; // prevents errors on pages without the section

    posts.forEach(post => {
      const p = post.data;
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h3><a href="https://reddit.com${p.permalink}" target="_blank">${p.title}</a></h3>
        <p>👍 ${p.score} upvotes • 🗨️ ${p.num_comments} comments</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading Reddit news:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadRedditNews);
*/




/*
async function loadRedditNews() {
  const url = "https://www.reddit.com/r/movies/top.json?limit=5";
  const proxy = "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(url);

  try {
    const res = await fetch(proxy);
    const data = await res.json();

    // Reddit JSON is nested inside "data.contents"
    const posts = JSON.parse(data.contents).data.children;

    const container = document.getElementById("reddit-news");
    if (!container) return;

    container.innerHTML = ""; // clear existing content

    posts.forEach(post => {
      const p = post.data;
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h3><a href="https://reddit.com${p.permalink}" target="_blank">${p.title}</a></h3>
        <p>👍 ${p.score} upvotes • 🗨️ ${p.num_comments} comments</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading Reddit news:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadRedditNews);
*/