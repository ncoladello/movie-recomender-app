// Function to create a loading spinner element
export function createLoadingSpinner() {
    // Create a container element for the spinner
    const spinnerContainer = document.createElement("div");
    spinnerContainer.classList.add("spinner-container");
    
    // Create the spinner element
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    
    // Append the spinner element to the spinner container
    spinnerContainer.appendChild(spinner);
    
    // Return the spinner container element
    return spinnerContainer;
  }
  