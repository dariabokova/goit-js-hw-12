const API_KEY = '46360280-37ac22277a0bce1d099a81efa';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = query => {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
      query
    )}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Error fetching images: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then(data => {
      return data.hits;
    });
};
