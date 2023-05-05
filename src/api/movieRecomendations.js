import { tmdbURL, tmdbAPIKey } from '../config/config.js';

// Retrieve movie recommendations based on the provided movie title
export async function getMovieRecommendations(movieTitle) {
  try {
    const movieId = await getMovieId(movieTitle);
    const recommendations = await getRecommendations(movieId);
    return recommendations;
  } catch (error) {
    console.error(error);
  }
}

// Get the movie ID for the given movie title
async function getMovieId(movieTitle) {
  try {
    const searchUrl = `${tmdbURL}search/movie?api_key=${tmdbAPIKey}&query=${movieTitle}`;
    const response = await fetch(searchUrl);
    const { results } = await response.json();
    return results[0]?.id; // Return the ID of the first movie in the results array
  } catch (error) {
    console.error(error);
  }
}

// Get movie recommendations based on the provided movie ID
async function getRecommendations(movieId) {
  try {
    const recommendUrl = `${tmdbURL}movie/${movieId}/recommendations?api_key=${tmdbAPIKey}`;
    const response = await fetch(recommendUrl);
    const { results } = await response.json();
    return results; // Return the recommendations array
  } catch (error) {
    console.error(error);
  }
}

// Get streaming providers for a specific movie in a particular country
export async function getStreamingProviders(movieId, userCountry) {
  try {
    const endpoint = `${tmdbURL}movie/${movieId}/watch/providers?api_key=${tmdbAPIKey}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    const flatrateProviders = data.results[userCountry]?.flatrate; // Get the flatrate providers for the user's country
    return flatrateProviders || []; // Return the flatrate providers array or an empty array if not available
  } catch (error) {
    console.error(error);
  }
}
