// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_Rgw5Xyw13vrbNOFVWbwXSZ8hkJIkQmrA4JdPZFMwemW0UhvxOXEgzkqb9QnUxX4s';
//!   Колекція порід
//   Під час завантаження сторінки має виконуватися HTTP-запит за колекцією порід. Для цього необхідно виконати GET-запит на ресурс https://api.thecatapi.com/v1/breeds, що повертає масив об'єктів. У разі успішного запиту, необхідно наповнити select.breed-select опціями так, щоб value опції містило id породи, а в інтерфейсі користувачеві відображалася назва породи.

//   Напиши функцію fetchBreeds(), яка виконує HTTP-запит і повертає проміс із масивом порід - результатом запиту. Винеси її у файл cat-api.js та зроби іменований експорт.

// function fetchBreeds() {
//   return axios
//     .get('https://api.thecatapi.com/v1/breeds')
//     .then(response => response.data)
//     .catch(error => {});
// }
// console.log(fetchBreeds());
