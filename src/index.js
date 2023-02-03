import PicturesApiService from "./fetchPictures";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.querySelector('#search-form');
const btnLoadMore = document.querySelector('.load-more');
const picturesApiService = new PicturesApiService();
const galleryList = document.querySelector('.gallery');
const gallery = new SimpleLightbox('.gallery a');
const size = searchForm.getBoundingClientRect();

searchForm.addEventListener('submit', onSubmit);
galleryList.addEventListener('click', onGalleryItemClick);
document.addEventListener('scroll', endOfGallary);

function onSubmit(e) {
  e.preventDefault();
  picturesApiService.query = e.currentTarget.elements.searchQuery.value;
  picturesApiService.pageReset();
  galleryList.innerHTML = "";
  creatPictures();
}

function endOfGallary() {
  let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
  const viewPort = document.documentElement.clientHeight;
  const endGallery = windowRelativeBottom - viewPort;

  if (endGallery <= 0) {
    creatPictures();
  }
}

function creatPictures() {
  picturesApiService.fetchPictures().then(pictures => {
    const markupPictures = pictures.map(makeup).join(' ');
    galleryList.insertAdjacentHTML('beforeend', markupPictures);
    gallery.refresh();
  }

  ).catch(function (error) {
    if (error.response.status !== 200) {
      Notify.failure("We're sorry, but you've reached the end of search results.");
    }
  });
};


const makeup = ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
  return `
  <a class="gallery__item" href="${largeImageURL}">
    <img class="gallery__image"
    src="${webformatURL}" 
    alt="${tags}"
    loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
            ${likes}
        </p>
        <p class="info-item">
          <b>Views</b>
            ${views}
        </p>
        <p class="info-item">
          <b>Comments</b>
            ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
            ${downloads}
        </p>
      </div>
  </a>
  `
}

function onGalleryItemClick(e) {
  e.preventDefault();
  gallery.on('close.simplelightbox', function () {
    gallery.close();
  });

}