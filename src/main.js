import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  showLoader,
  hideLoader,
  showError,
} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const searchForm = document.querySelector('.search-form');
const galleryElement = document.querySelector('.gallery');
let gallery = new SimpleLightbox('.gallery a');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const query = event.target.elements.query.value.trim();
  if (!query) {
    showError('Please enter a search query.');
    return;
  }

  galleryElement.innerHTML = '';

  showLoader();

  fetchImages(query)
    .then(images => {
      if (images.length === 0) {
        showError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }

      renderImages(images);
      gallery.refresh();
    })
    .catch(error => {
      showError(`Error fetching images: ${error.message}`);
    })
    .finally(() => {
      hideLoader();
    });
});