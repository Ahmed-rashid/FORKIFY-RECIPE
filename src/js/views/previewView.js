import icons from 'url:../../img/icons.svg';
import { ERROR_DEFAULT_SEARCH_MSG } from '../config.js';
import View from './view.js';

class previewView extends View {
  _parentEl = '';

  _markupGenerator() {
    const hashId = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a
          class="preview__link preview__link${hashId === this._data.id
            ? '--active'
            : ''}"
          href="#${this._data.id}"
        >
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div
              class="recipe__user-generated ${this._data.key ? '' : 'hidden'} "
            >
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
    const addItLaterForUserRecipe = `
    (in resultview class line 26)
    href="${icons}#icon-user"`;
  }
}

export default new previewView();
