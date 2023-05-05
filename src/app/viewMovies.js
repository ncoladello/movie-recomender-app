// Import necessary functions from other modules
import { getStreamingProviders } from "../api/movieRecomendations.js";
import { getUserLocation } from "../utils/utils.js";

// Get the user's location and store it in a variable
const userCountry = await getUserLocation();

// Function to create a container for a movie
export function createMovieContainer() {
  const movieContainer = document.createElement("div");
  movieContainer.classList.add("movie-container");
  return movieContainer;
}

// Function to create a poster for a movie
export function createMoviePoster(movie) {
  const moviePoster = document.createElement("img");
  moviePoster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  moviePoster.alt = `${movie.title} Poster`;
  moviePoster.classList.add("movie-poster");
  return moviePoster;
}

// Function to create a details section for a movie
export function createMovieDetails() {
  const movieDetails = document.createElement("div");
  movieDetails.classList.add("movie-details");
  return movieDetails;
}

// Function to create a title for a movie
export function createMovieTitle(movie) {
  const movieTitle = document.createElement("h2");
  movieTitle.textContent = movie.title;
  movieTitle.classList.add("movie-title");
  return movieTitle;
}

// Function to create a rating for a movie
export function createMovieRating(movie) {
  const movieRating = document.createElement("p");
  movieRating.textContent = `Rating: ${movie.vote_average.toFixed(1)}`;
  movieRating.classList.add("movie-rating");
  return movieRating;
}

// Function to create a description for a movie
export function createMovieDescription(movie) {
  const movieDescription = document.createElement("p");
  movieDescription.textContent = movie.overview;
  movieDescription.classList.add("movie-description");
  return movieDescription;
}

// Function to create a section with information on where to watch a movie
export async function createWheretoWatch(movie) {
    const container = document.createElement("div");
    container.classList.add("wheretowatch-container");
  
    // Get the user's country code and the list of streaming providers for the movie
    const countryCode = await getUserLocation();
    const providers = await getStreamingProviders(movie.id, countryCode.toUpperCase());
  
    // Create an array of streaming provider logos
    const logos = await Promise.all(providers.map(createStreamingProviderLogo));
    container.append(...logos);
  
    return container;
  }
  
  // Function to create a logo for a streaming provider
  function createStreamingProviderLogo(provider) {
    const logo = document.createElement("img");
    logo.src = `https://image.tmdb.org/t/p/original${provider.logo_path}`;
    logo.alt = `${provider.provider_name} Logo`;
    logo.classList.add("wheretowatch-logo");
    return logo;
  }
