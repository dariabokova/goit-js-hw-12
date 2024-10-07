import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderImages(images) {
  return images.reduce((acc, item) => {
      return (
          acc +
          `<article class="gallery-item">
              <a href="${item.largeImageURL}" class="gallery-link">
                  <img src="${item.webformatURL}" alt="${item.tags}" class="gallery-image" />
              </a>
              <ul class="info">
                  <li class="info-item"><strong>Likes:</strong> ${item.likes}</li>
                  <li class="info-item"><strong>Views:</strong> ${item.views}</li>
                  <li class="info-item"><strong>Comments:</strong> ${item.comments}</li>
                  <li class="info-item"><strong>Downloads:</strong> ${item.downloads}</li>
              </ul>
          </article>`
      );
  }, '');
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
      message: "Sorry, but you have reached the end of search results.",
    });
  }