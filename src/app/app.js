import {
  getMovieRecommendations,
  getStreamingProviders,
} from "../api/movieRecomendations.js";
import { getUserLocation } from "../utils/utils.js";

const userCountry = await getUserLocation();

const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();
  const searchTerm = document.querySelector("#search-movie").value;
  const resultsContainer = document.querySelector(".results-container");
  resultsContainer.innerHTML = "";

  const loadingTimeout = setTimeout(() => {
    const loadingSpinner = createLoadingSpinner();
    resultsContainer.appendChild(loadingSpinner);
  }, 500);

  try {
    const recommendations = await getMovieRecommendations(searchTerm);
    clearTimeout(loadingTimeout);
    await showRecommendations(recommendations, resultsContainer);
  } catch (error) {
    console.error(error);
  } finally {
    document.querySelector("#search-movie").value = "";
    const loadingSpinner = resultsContainer.querySelector(".spinner-container");
    if (loadingSpinner) {
      loadingSpinner.remove();
    }
  }
}

function createLoadingSpinner() {
  const spinnerContainer = document.createElement("div");
  spinnerContainer.classList.add("spinner-container");
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinnerContainer.appendChild(spinner);
  return spinnerContainer;
}

async function showRecommendations(recommendations, resultsContainer) {
  for (const movie of recommendations) {
    const movieContainer = createMovieContainer();
    const moviePoster = createMoviePoster(movie);
    movieContainer.appendChild(moviePoster);
    const movieDetails = createMovieDetails();
    const movieTitle = createMovieTitle(movie);
    movieDetails.appendChild(movieTitle);
    const movieRating = createMovieRating(movie);
    movieDetails.appendChild(movieRating);
    const whereToWatch = await createWheretoWatch(movie);
    movieDetails.appendChild(whereToWatch);
    const movieDescription = createMovieDescription(movie);
    movieDetails.appendChild(movieDescription);
    movieContainer.appendChild(movieDetails);
    resultsContainer.appendChild(movieContainer);
  }
}

function createMovieContainer() {
  const movieContainer = document.createElement("div");
  movieContainer.classList.add("movie-container");
  return movieContainer;
}

function createMoviePoster(movie) {
  const moviePoster = document.createElement("img");
  moviePoster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  moviePoster.alt = `${movie.title} Poster`;
  moviePoster.classList.add("movie-poster");
  return moviePoster;
}

function createMovieDetails() {
  const movieDetails = document.createElement("div");
  movieDetails.classList.add("movie-details");
  return movieDetails;
}

function createMovieTitle(movie) {
  const movieTitle = document.createElement("h2");
  movieTitle.textContent = movie.title;
  movieTitle.classList.add("movie-title");
  return movieTitle;
}

function createMovieRating(movie) {
  const movieRating = document.createElement("p");
  movieRating.textContent = `Rating: ${movie.vote_average.toFixed(1)}`;
  movieRating.classList.add("movie-rating");
  return movieRating;
}

function createMovieDescription(movie) {
  const movieDescription = document.createElement("p");
  movieDescription.textContent = movie.overview;
  movieDescription.classList.add("movie-description");
  return movieDescription;
}

async function createWheretoWatch(movie) {
  const providers = await getStreamingProviders(
    movie.id,
    userCountry.toUpperCase()
  );
  const container = document.createElement("div");
  container.classList.add("wheretowatch-container");
  for (const provider of providers) {
    const logo = document.createElement("img");
    logo.src = `https://image.tmdb.org/t/p/original${provider.logo_path}`;
    logo.alt = `${provider.provider_name} Logo`;
    logo.classList.add("wheretowatch-logo");
    container.appendChild(logo);
  }
  return container;
}
