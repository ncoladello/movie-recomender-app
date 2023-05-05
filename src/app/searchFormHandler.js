import { getMovieRecommendations } from "../api/movieRecomendations.js";
import { showRecommendations } from "./showRecommendations.js";
import { createLoadingSpinner } from "../utils/spinner.js";

/**
 * Handles the form submission event.
 */
export async function handleFormSubmit(event) {
  // Prevent the form from submitting.
  event.preventDefault();

  // Get the search term and results container.
  const searchTerm = document.querySelector("#search-movie").value;
  const resultsContainer = document.querySelector(".results-container");

  // Clear the results container.
  resultsContainer.innerHTML = "";

  // Show the loading spinner.
  const loadingSpinner = showLoadingSpinner(resultsContainer);

  try {
    // Get the movie recommendations.
    const recommendations = await getMovieRecommendations(searchTerm);

    // Hide the loading spinner.
    hideLoadingSpinner(loadingSpinner);

    if (recommendations.length > 0) {
      // Show the recommendations.
      await showRecommendations(recommendations, resultsContainer);
    } else {
      // Show a message indicating that no results were found.
      showNoResultsMessage(resultsContainer);
    }
  } catch (error) {
    // Log the error to the console.
    console.error(error);
  } finally {
    // Reset the search field.
    document.querySelector("#search-movie").value = "";

    // Remove the loading spinner.
    hideLoadingSpinner(loadingSpinner);
  }
}

/**
 * Shows a loading spinner in the specified container and returns a reference to the spinner element.
 */
function showLoadingSpinner(container) {
  const loadingSpinner = createLoadingSpinner();
  container.appendChild(loadingSpinner);
  return loadingSpinner;
}

/**
 * Hides the specified loading spinner element.
 */
function hideLoadingSpinner(loadingSpinner) {
  if (loadingSpinner) {
    loadingSpinner.remove();
  }
}

/**
 * Shows a message indicating that no results were found.
 */
function showNoResultsMessage(container) {
  const noResultsMessage = document.createElement("p");
  noResultsMessage.textContent = "No results found.";
  container.appendChild(noResultsMessage);
}
