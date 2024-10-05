// const API_KEY = '46360280-37ac22277a0bce1d099a81efa';

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


import iziToast from "izitoast";

export default function fetchPhotos(search){
const searchParams = new URLSearchParams({
    key :"46360280-37ac22277a0bce1d099a81efa",
    q: `"${search}"`,
    image_type: "photo",
    orientation:"horizontal",
    safesearch:true
  });


return fetch(`https://pixabay.com/api/?${searchParams}`)}