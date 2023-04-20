# Movie Recommendation Website

This study project proposes to be a movie recommendation website, based on the input of a movie, using the TMDB API and presenting five suggestions, also providing which streaming services to watch, for now only in Italy.

## Project Objectives

The final version of the project must have the following features:

- Suggestions of films by genre or name of a previous film (for now only by name)
- Provide direct links to movies in streams (using the Movie of the Night API)
- Randomize suggestions, always generating 5 different suggestions
- Through the TMDB API provide the possibility for the user to favorite movies, list favorite movies and exclude them from their list

## Project Progress

At the moment, the project is being improved by separating the functions into their own files, in order to improve the architecture. The project already has the function to search for recommendations and list posters, names, movie rates, and the logo of the streaming service available in Italy. The CSS has not been implemented yet.

## How to Run


- Create a new folder in src named config and a file named apiConfig.js where you have to include this:

export const tmdbURL = "https://api.themoviedb.org/3/";
export const tmdbAPIKey = 'your_api_key';
export const streamingAPIURL = "https://streaming-availability.p.rapidapi.com/search/basic";
export const streamingAPIKey = 'your_api_key';

- To have the API's keys, you have to visit:

https://developers.themoviedb.org/3/getting-started/introduction

https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/

- To run the project, clone this repository and open the `index.html` file in your browser. 

## Contributing

Contributions to this project are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
