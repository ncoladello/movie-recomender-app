import { tmdbURL, tmdbAPIKey, streamingAPIURL, streamingAPIKey } from '../config/apiConfig.js';



const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', handleFormSubmit);


function handleFormSubmit(event) {
  event.preventDefault();
  const searchTerm = document.querySelector('#search-movie').value;
  getMovieRecommendations(searchTerm);
}


async function getMovieRecommendations(movieTitle) {
  const searchUrl = `${tmdbURL}search/movie?api_key=${tmdbAPIKey}&query=${movieTitle}`;
  const response = await fetch(searchUrl);
  const data = await response.json();
  const movieId = data.results[0].id; // Get the first movie result
  const recommendUrl = `${tmdbURL}movie/${movieId}/recommendations?api_key=${tmdbAPIKey}`;
  const recommendResponse = await fetch(recommendUrl);
  const recommendData = await recommendResponse.json();
  showRecommendations(recommendData.results, movieId);
}


async function getStreamingLogos(movieId) {
  const streamingUrl = `${tmdbURL}movie/${movieId}/watch/providers?api_key=${tmdbAPIKey}`;
  const response = await fetch(streamingUrl);
  const data = await response.json();
  const providers = data.results;
  const logoUrls = providers['IT'] ? providers['IT'].flatrate.map(provider => provider.logo_path) : [];
  return logoUrls;
}


async function showRecommendations(recommendations, movieId) {
  const resultsContainer = document.createElement('div');
  resultsContainer.classList.add('results-container');
 
  for (let i = 0; i < 5 && i < recommendations.length; i++) {
    const movie = recommendations[i];
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
   
    const moviePoster = document.createElement('img');
    moviePoster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    moviePoster.alt = `${movie.title} Poster`;
    moviePoster.classList.add('movie-poster');
    movieContainer.appendChild(moviePoster);
   
    const movieDetails = document.createElement('div');
    movieDetails.classList.add('movie-details');
   
    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.title;
    movieTitle.classList.add('movie-title');
    movieDetails.appendChild(movieTitle);
   
    const movieRating = document.createElement('p');
    movieRating.textContent = `Rating: ${movie.vote_average}`;
    movieRating.classList.add('movie-rating');
    movieDetails.appendChild(movieRating);
   
    const whereToWatch = document.createElement('div');
    whereToWatch.classList.add('where-to-watch');
    const logoUrls = await getStreamingLogos(movieId);
    logoUrls.forEach(url => {
      const logo = document.createElement('img');
      logo.src = `https://image.tmdb.org/t/p/w92/${url}`;
      logo.alt = 'Streaming Logo';
      whereToWatch.appendChild(logo);
    });
    movieDetails.appendChild(whereToWatch);
   
    movieContainer.appendChild(movieDetails);
    resultsContainer.appendChild(movieContainer);
  }
 
  const main = document.querySelector('main');
  main.appendChild(resultsContainer);
}



