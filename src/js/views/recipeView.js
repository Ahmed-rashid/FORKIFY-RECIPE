import View from './view.js';
import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import { ERROR_DEFAULT_FETCHING_MSG } from '../config';
import { state } from '../model.js';


class recipeView extends View {
  _parentEl = document.querySelector('.recipe');

  _errorMessage = ERROR_DEFAULT_FETCHING_MSG;


  addHandlerUpdateServings(handler){
    this._parentEl.addEventListener('click',function(e){
      const btn = e.target.closest('.btn-update');
      if(!btn) return
      const updateServingData = +btn.dataset.setGoto;

      if(updateServingData > 0) handler(updateServingData)
    })
  }

  _markupGenerator() {
   
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes"> ${
            this._data.coockingTime
          } </span>
          <span class="recipe__info-text"> Minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.serving
          }</span>
          <span class="recipe__info-text">SERVING</span>

          <div class="recipe__info-buttons">
            <button data-set-goto = "${
              this._data.serving - 1
            }" class="btn--tiny btn-update btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button data-set-goto = "${
              this._data.serving + 1
            }" class="btn--tiny btn-update btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'} ">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round bookmark">
          <svg class="">
         
            <use href="${icons}#icon-bookmark${
      this._data.bookmark ? '-fill' : ''
    }"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(this.#generateIngredient).join('')}
          

          <li class="recipe__ingredient">
          
            
          </li>
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check
          out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href=${this._data.url}
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  addHandlerRender(hander) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, hander));
  }

  addHandlerBookmark(handler){
    this._parentEl.addEventListener('click',function(e){
      const btn = e.target.closest('.bookmark');

      handler()
    })
  }

  #generateIngredient(el) {
    return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                el.quantity ? new Fraction(el.quantity).toString() : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${el?.unit || ''}</span>
                ${el?.description || ''}
              </div>
            </li>
          `;
  }
}

export default new recipeView();
