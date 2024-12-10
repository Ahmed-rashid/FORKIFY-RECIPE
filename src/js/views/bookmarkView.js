import icons from 'url:../../img/icons.svg';
import { ERROR_DEFAULT_SEARCH_MSG } from '../config.js';
import View from './view.js';
import previewView from './previewView.js';

class bookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');

  _errorMessage = ERROR_DEFAULT_SEARCH_MSG;

  addHandlerLoad(handler) {
    window.addEventListener('load', handler);
  }
  _markupGenerator() {
    // return this._data.map(previewView._generateMarkup).join('')

    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new bookmarkView();
