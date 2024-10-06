import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const renderImages = images => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
            <li class="gallery-item">
                <a href="${largeImageURL}" class="gallery-link">
                    <img src="${webformatURL}" alt="${tags}" class="gallery-image" />
                </a>
                <div class="info">
                    <p class="info-item"><span>Likes</span> ${likes}</p>
                    <p class="info-item"><span>Views</span> ${views}</p>
                    <p class="info-item"><span>Comments</span> ${comments}</p>
                    <p class="info-item"><span>Downloads</span> ${downloads}</p>
                </div>
            </li>
        `
    )
    .join('');
};
gallery.insertAdjacentHTML('beforeend', markup);

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message,
  });
}

export function showEndMessage() {
  iziToast.info({
    title: 'End of Results',
    message: "We're sorry, but you've reached the end of search results.",
  });
}

export function showLoader() {
  document.querySelector('.loader').style.display = 'flex';
}

export function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
}

// export const showError = message => {
//   iziToast.error({
//     title: 'Error',
//     message,
//   });
// };

// export const showLoader = () => {
//   const loader = document.querySelector('.loader');
//   loader.innerHTML = '<div class="spinner"></div>';
//   loader.style.display = 'flex';
// };

// export const hideLoader = () => {
//   const loader = document.querySelector('.loader');
//   loader.style.display = 'none';
// };