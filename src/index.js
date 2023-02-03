import PicturesApiService from "./fetchPictures";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('#search-form');
const btnLoadMore = document.querySelector('.load-more');
const picturesApiService = new PicturesApiService();
const galleryList = document.querySelector('.gallery');
const gallery = new SimpleLightbox('.gallery a');


console.log(gallery);

searchForm.addEventListener('submit', onSubmit);
btnLoadMore.addEventListener('click', onClick);
galleryList.addEventListener('click', onGalleryItemClick);

function onSubmit(e) {
  e.preventDefault();
  picturesApiService.query = e.currentTarget.elements.searchQuery.value;
  picturesApiService.pageReset();
  galleryList.innerHTML = "";
  creatPictures();
}

function onClick() {
  creatPictures();
}

async function creatPictures() {
  const pictures = await picturesApiService.fetchPictures();
  const markupPictures = await pictures.map(makeup).join(' ');
  galleryList.insertAdjacentHTML('beforeend', markupPictures);
  gallery.refresh();
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
  const isGalleryImage = e.target.classList.contains('gallery__image')
  if (!isGalleryImage) {
    return;
  }
  console.log('aaaaaaaaa');
  gallery.on('close.simplelightbox', function () {
    gallery.close();
  });

}