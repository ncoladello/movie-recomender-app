import { tmdbURL, tmdbAPIKey } from '../config/apiConfig.js';


export async function getMovieRecommendations(movieTitle) {
    const movieId = await getMovieId(movieTitle);
    const recommendations = await getRecommendations(movieId);
    return recommendations;
  }

  
async function getMovieId(movieTitle) {
    const searchUrl = `${tmdbURL}search/movie?api_key=${tmdbAPIKey}&query=${movieTitle}`;
    const response = await fetch(searchUrl);
    const { results } = await response.json();
    return results[0]?.id;
  }
  
async function getRecommendations(movieId) {
    const recommendUrl = `${tmdbURL}movie/${movieId}/recommendations?api_key=${tmdbAPIKey}`;
    const response = await fetch(recommendUrl);
    const { results } = await response.json();
    return results;
  }
  
export async function getStreamingProviders(movieId, userCountry) {
    const endpoint = `${tmdbURL}movie/${movieId}/watch/providers?api_key=${tmdbAPIKey}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    const flatrateProviders = data.results[userCountry]?.flatrate;
    return flatrateProviders || [];
  }
  