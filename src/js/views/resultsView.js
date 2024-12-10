import icons from 'url:../../img/icons.svg';
import {ERROR_DEFAULT_SEARCH_MSG} from '../config.js'
import View from './view.js';
import previewView from './previewView.js';

class resultsView extends View {
  _parentEl = document.querySelector('.results');

  _errorMessage = ERROR_DEFAULT_SEARCH_MSG;

  _markupGenerator() {
    return this._data.map(result => previewView.render(result,false)).join('');
  }

}

export default new resultsView()