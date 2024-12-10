import icons from 'url:../../img/icons.svg';
import { ERROR_DEFAULT_UPLOAD_MSG } from '../config.js';
import { SUCCESS_DEFAULT_UPLOAD_MSG } from '../config.js';
import View from './view.js';
import previewView from './previewView.js';

class addRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _addButton = document.querySelector('.nav__btn--add-recipe');
  _closeButton = document.querySelector('.btn--close-modal');
  _uploadButton = document.querySelector('.upload__btn');

  _errorMessage = ERROR_DEFAULT_UPLOAD_MSG;
  _succesMessage = SUCCESS_DEFAULT_UPLOAD_MSG;

  constructor() {
    super();
    this.addHandlerOpenModal();
    this.addHandlerCloseModal();
  }

  addHandlerOpenModal() {
    this._addButton.addEventListener('click', this.toggleModel.bind(this));
  }

  addHandlerCloseModal() {
    this._closeButton.addEventListener('click', this.toggleModel.bind(this));
  }

  toggleModel() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('click', function (e) {
      // e.defaultPrevented();
      e.preventDefault();

      const btn = e.target.closest('.upload__btn');

      if (!btn) return;
      
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _markupGenerator() {}
}

export default new addRecipeView();
