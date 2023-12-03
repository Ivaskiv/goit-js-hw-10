//======================================
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_Rgw5Xyw13vrbNOFVWbwXSZ8hkJIkQmrA4JdPZFMwemW0UhvxOXEgzkqb9QnUxX4s';
//======================================
const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = axios.defaults.headers.common['x-api-key'];

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds1?api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      throw new Error(error);
    });
}
function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch();
}

export { fetchBreeds, fetchCatByBreed };
//======================================
// коли ви виконуєте HTTP-запити за допомогою Axios у вашому додатку (наприклад, за допомогою axios.get), цей ключ автоматично додається до заголовків запиту. Це дозволяє вам аутентифікувати свої запити до The Cat API та отримувати доступ до обмежених ресурсів, які вимагають ключ.
