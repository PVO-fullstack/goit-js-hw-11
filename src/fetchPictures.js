import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

export default class PicturesApiService {

  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    const response = await axios.get(`https://pixabay.com/api/?key=33230147-590fd19dde6d7b5b8f6ceacce&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
    if (this.page === 1) {
      Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
    }
    this.pageIncrement();
    const picturesList = response.data.hits;
    console.log(picturesList);
    return picturesList;
  }

  pageIncrement() {
    this.page += 1;
  }

  pageReset() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQyery) {
    this.searchQuery = newQyery;
  }
}
