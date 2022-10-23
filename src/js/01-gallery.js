import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';

const gallery = document.querySelector('.gallery');

const displayImages = () => {
  const items = [];

  for (const galleryItem of galleryItems) {
    const item = `
      <a class="gallery__item" href="${galleryItem.original}">
        <img class="gallery__image" src="${galleryItem.preview}" alt="${galleryItem.description}" />
      </a>
    `;
    items.push(item);
  }

  gallery.insertAdjacentHTML('afterbegin', items.join('\n'));
};

displayImages();

new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
