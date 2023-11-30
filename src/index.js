import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

//======================================
const selector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const divCatInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
// Сховати loader, error і catInfoDiv
loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');

let arrayBreedsId = [];

// завантажити породи при завантаженні сторінки
fetchBreeds()
  .then(data => {
    // масив об'єктів для використання у SlimSelect
    data.forEach(element => {
      arrayBreedsId.push({ text: element.name, value: element.id });
    });
    // ініціалізація SlimSelect зі збереженими даними про породи
    new SlimSelect({
      select: selector,
      data: arrayBreedsId,
    });
  })
  .catch(onFetchError);
// додати слухач подій на зміну вибору породи
selector.addEventListener('change', onSelectBreed);
function onSelectBreed(event) {
  loader.classList.replace('is-hidden', 'loader');
  error.classList.add('is-hidden');
  divCatInfo.classList.add('is-hidden');
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      // приховати loader, показати selector
      loader.classList.replace('loader', 'is-hidden');
      selector.classList.remove('is-hidden');
      // вдобразити інформацію про кота
      const { url, breeds } = data[0];
      divCatInfo.innerHTML = `<div class='box-img'><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
      divCatInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}
// функція для обробки помилок
function onFetchError() {
  // показати selector, приховати loader
  selector.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');
  // вивести повідомлення про помилку
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px',
    }
  );
}
// завантажити та відобразити породи при завантаженні
fetchBreeds();
//!================
//https://www.npmjs.com/package/slim-select
//https://www.npmjs.com/package/notiflix
//https://slimselectjs.com/events#error
