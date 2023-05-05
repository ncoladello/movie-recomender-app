// Import the handleFormSubmit function from the searchFormHandler.js module
import { handleFormSubmit } from "./src/app/searchFormHandler.js";

// Get the search form element
const searchForm = document.querySelector("form");

// Add an event listener to the search form for the submit event
// When the form is submitted, the handleFormSubmit function will be called
searchForm.addEventListener("submit", handleFormSubmit);
