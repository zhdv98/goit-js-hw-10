import './css/styles.css';
import { RestCountriesApi } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import createCountriesList from './templates/countries.hbs';
import createCountryCard from './templates/country-item.hbs';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.js-country-list');
const countryItemEl = document.querySelector('.js-country-info');

const DEBOUNCE_DELAY = 300;
const restCountriesApi = new RestCountriesApi();

const onDataInput = event => {
  restCountriesApi.query = event.target.value.trim();

  restCountriesApi
    .fetchCountries()
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length >= 2) {
        countryListEl.innerHTML = createCountriesList(data);
        countryItemEl.innerHTML = '';
      } else if (data.length === 1) {
        const country = data[0];
        const obj = {
          ...country,
          languages: Object.values(country.languages).join(','),
        };
        countryItemEl.innerHTML = createCountryCard(obj);
        countryListEl.innerHTML = '';
      } else if (data.length === 0) {
        event.target.reset();
        return;
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};

inputEl.addEventListener('input', debounce(onDataInput, DEBOUNCE_DELAY));
