import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
const selector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const divCatInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
// Сховати loader, error і catInfoDiv
loader.classList.add('is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');
let arrayBreedsId = [];
// додати слухач подій на зміну вибору породи
selector.addEventListener('change', onSelectBreed);
function onSelectBreed(event) {
  const breedId = event.currentTarget.value;
  if (!breedId) {
    return;
  }
  loader.classList.remove('is-hidden');
  error.classList.add('is-hidden');
  divCatInfo.classList.add('is-hidden');
  fetchCatByBreed(breedId)
    .then(data => {
      // приховати loader, показати selector
      loader.classList.add('is-hidden');
      selector.classList.remove('is-hidden');
      // вдобразити інформацію про кота
      const { url, breeds } = data[0];
      divCatInfo.innerHTML = `<div class='box-img'><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
      divCatInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}
// завантажити породи при завантаженні сторінки
fetchBreeds()
  .then(data => {
    arrayBreedsId.push({
      placeholder: true,
      text: data[0].name,
      value: '',
      disabled: true,
    });
    // масив об'єктів для використання у SlimSelect
    data.forEach(element => {
      arrayBreedsId.push({
        text: element.name,
        value: element.id,
      });
    });
    new SlimSelect({
      select: selector,
      data: arrayBreedsId,
    });
  })
  .catch(onFetchError);
// функція для обробки помилок
function onFetchError() {
  selector.classList.remove('is-hidden');
  loader.classList.add('is-hidden');
  // вивести повідомлення про помилку
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'top-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px',
    }
  );
}
fetchBreeds();
//!================
//https://www.npmjs.com/package/slim-select
//https://www.npmjs.com/package/notiflix
//https://slimselectjs.com/events#error
