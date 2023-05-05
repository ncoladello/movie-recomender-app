// Import the functions from 'viewMovies.js'
import {
  createMovieContainer,
  createMoviePoster,
  createMovieDetails,
  createMovieTitle,
  createMovieRating,
  createMovieDescription,
  createWheretoWatch,
} from "./viewMovies.js";

// Show recommendations on the UI
export async function showRecommendations(recommendations, resultsContainer) {
  // Loop through each movie in the recommendations array
  for (const movie of recommendations) {
    // Create a movie container using the createMovieContainer function
    const movieContainer = createMovieContainer();

    // Create a movie poster using the createMoviePoster function and append it to the movie container
    const moviePoster = createMoviePoster(movie);
    movieContainer.appendChild(moviePoster);

    // Create movie details using the createMovieDetails function
    const movieDetails = createMovieDetails();

    // Create a movie title using the createMovieTitle function and append it to the movie details
    const movieTitle = createMovieTitle(movie);
    movieDetails.appendChild(movieTitle);

    // Create a movie rating using the createMovieRating function and append it to the movie details
    const movieRating = createMovieRating(movie);
    movieDetails.appendChild(movieRating);

    // Create a 'Where to watch' section using the createWheretoWatch function and append it to the movie details
    const whereToWatch = await createWheretoWatch(movie);
    movieDetails.appendChild(whereToWatch);

    // Create a movie description using the createMovieDescription function and append it to the movie details
    const movieDescription = createMovieDescription(movie);
    movieDetails.appendChild(movieDescription);

    // Append the movie details to the movie container, and the movie container to the results container
    movieContainer.appendChild(movieDetails);
    resultsContainer.appendChild(movieContainer);
  }
}
