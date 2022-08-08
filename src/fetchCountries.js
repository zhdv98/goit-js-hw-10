'use strict';

export class RestCountriesApi {
  #BASE_URL = 'https://restcountries.com/v3.1/name/';

  constructor() {
    this.query = '';
  }

  fetchCountries() {
    return fetch(
      `${this.#BASE_URL}${
        this.query
      }?fields=name,capital,population,languages,flags`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
