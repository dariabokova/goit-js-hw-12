// import { fetchImages } from './js/pixabay-api.js';
// import {
//   renderImages,
//   showLoader,
//   hideLoader,
//   showError,
// } from './js/render-functions.js';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';



// const searchForm = document.querySelector('.search-form');
// const galleryElement = document.querySelector('.gallery');
// let gallery = new SimpleLightbox('.gallery a');

// searchForm.addEventListener('submit', event => {
//   event.preventDefault();

//   const query = event.target.elements.query.value.trim();
//   if (!query) {
//     showError('Please enter a search query.');
//     return;
//   }

//   galleryElement.innerHTML = '';

//   showLoader();

//   fetchImages(query)
//     .then(images => {
//       if (images.length === 0) {
//         showError(
//           'Sorry, there are no images matching your search query. Please try again!'
//         );
//         return;
//       }

//       renderImages(images);
//       gallery.refresh();
//     })
//     .catch(error => {
//       showError(`Error fetching images: ${error.message}`);
//     })
//     .finally(() => {
//       hideLoader();
//     });
// });
import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  showLoader,
  hideLoader,
  showError,
  showEndMessage,
} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const galleryElement = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let gallery = new SimpleLightbox('.gallery a');
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  currentQuery = event.target.elements.query.value.trim();
  if (!currentQuery) {
    showError('Please enter a search query.');
    return;
  }

  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  await fetchImagesAndRender(currentQuery, currentPage);
}

async function onLoadMore() {
  currentPage += 1;
  await fetchImagesAndRender(currentQuery, currentPage);
}

async function fetchImagesAndRender(query, page) {
  showLoader();
  try {
    const data = await fetchImages(query, page);
    if (data.hits.length === 0) {
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      hideLoadMoreButton();
      return;
    }

    totalHits = data.totalHits;
    renderImages(data.hits);
    gallery.refresh();

    if (galleryElement.children.length >= totalHits) {
      hideLoadMoreButton();
      showEndMessage();
    } else {
      showLoadMoreButton();
    }

    scrollPage();
  } catch (error) {
    showError(`Error fetching images: ${error.message}`);
  } finally {
    hideLoader();
  }
}

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}