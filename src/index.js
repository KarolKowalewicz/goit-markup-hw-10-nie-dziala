import './css/styles.css';
import debounce from 'lodash.debounce';
import { cardTmpCountrySearch, cardTmpCountriesList } from './cardTmp';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

input.addEventListener('input', debounce(handleInputSearch, DEBOUNCE_DELAY));

function handleInputSearch() {
  let name = input.value.trim();
  if (name === '') {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }

  fetchCountries(name)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        return;
      } else if (countries.length > 1 && countries.length <= 10) {
        const markurList = countries.map(cardTmpCountriesList).join('');
        countryList.innerHTML = markurList;
        countryInfo.innerHTML = '';
      } else {
        const markur = countries.map(cardTmpCountrySearch).join('');
        countryInfo.innerHTML = markur;
        countryList.innerHTML = '';
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      return error;
    });
}
