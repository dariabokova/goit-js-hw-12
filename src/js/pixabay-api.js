// const API_KEY = '46360280-37ac22277a0bce1d099a81efa';
// const BASE_URL = 'https://pixabay.com/api/';

// export const fetchImages = query => {
//   return fetch(
//     `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
//       query
//     )}&image_type=photo&orientation=horizontal&safesearch=true`
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(
//           `Error fetching images: ${response.status} ${response.statusText}`
//         );
//       }
//       return response.json();
//     })
//     .then(data => {
//       return data.hits;
//     });
// };
import axios from 'axios';

const API_KEY = '46360280-37ac22277a0bce1d099a81efa';
const BASE_URL = 'https://pixabay.com/api/';
export async function fetchImages(query, page = 1) {
  try {
    console.log('Fetching images for query:', query, 'and page:', page);
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });
    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error(
      `Error fetching images: ${error.response?.status || ''} ${
        error.response?.statusText || ''
      }`
    );
  }
}


// export async function fetchImages(query, page = 1) {
//   try {
//     const response = await axios.get(BASE_URL, {
//       params: {
//         key: API_KEY,
//         q: query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page: page,
//         per_page: 15,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       `Error fetching images: ${error.response.status} ${error.response.statusText}`
//     );
//   }
// }
