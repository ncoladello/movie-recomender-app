import { ipApiURL } from '../config/apiConfig.js';



export async function getUserLocation() {
    return fetch(ipApiURL)
      .then(response => response.json())
      .then(data => {
        const { country_code } = data;
        return country_code;
      })
      .catch(error => console.error(error));
  }
  