import { fetchImages, PER_PAGE } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";


const searchForm = document.querySelector('.search-form');
const imagesBoxEl = document.querySelector('.gallery');
const loadMore = document.querySelector('.js-load-more');
const messageBox = document.querySelector('.message');
const loader = document.querySelector('.loader');

let currentPage = 1;
let query = null;
let totalPages = 0;
let gallery = null;


searchForm.addEventListener('submit', handleSubmit);
loadMore.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  query = form.elements.query.value.trim();

  if (!query) {
    return;
  }

  currentPage = 1;
  imagesBoxEl.innerHTML = '';
  loadMore.classList.add('is-hidden');

  try {
    showLoader();
    const response = await fetchImages(query, currentPage);
    totalPages = Math.ceil(response.totalHits / PER_PAGE);

    if (response.totalHits === 0) {
      showMessage("Sorry, there are no images matching your search query. Please try again!");
      return;
    }

    const imagesMarkup = renderImages(response.hits);
    imagesBoxEl.innerHTML = imagesMarkup;

    if (!gallery) {
      gallery = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    } else {
      gallery.refresh();
    }

    if (currentPage < totalPages) {
      loadMore.classList.remove('is-hidden');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    hideLoader();
    form.reset();
  }
}

async function handleLoadMore() {
  currentPage += 1;
  try {
    showLoader();
    const response = await fetchImages(query, currentPage);


    const imagesMarkup = renderImages(response.hits);
    imagesBoxEl.insertAdjacentHTML('beforeend', imagesMarkup);


    gallery.refresh();

    if (currentPage >= totalPages) {
      loadMore.classList.add('is-hidden');
      showMessage("We're sorry, but you've reached the end of search results.");
    }

    handleScrollView();

  } catch (error) {
    console.error('Error:', error);
  } finally {
    hideLoader();
  }
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showMessage(message) {
  messageBox.textContent = message;
  messageBox.classList.remove('is-hidden');


  setTimeout(() => {
    messageBox.classList.add('is-hidden');

  }, 3000);
}
function handleScrollView() {
  const lastArticle = imagesBoxEl.lastElementChild;
  if (lastArticle) {
    const articleHeight = lastArticle.getBoundingClientRect().height;
    window.scrollBy({
      top: articleHeight * 2,
      left: 0,
      behavior: 'smooth',
    });
  } else {
    console.error('Were sorry, but you have reached the end of search results.');
  }
}