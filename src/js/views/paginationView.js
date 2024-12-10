import icons from 'url:../../img/icons.svg';
import { RESULT_PER_PAGE_SEARCH } from '../config.js';
import View from './view.js';

class paginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _markupGenerator(pageHolder) {
    const curPage = this._data.search.page;
    const totalPages =Math.ceil((this._data.search.results.length - 1) / RESULT_PER_PAGE_SEARCH)


    //  if start with page 1 ( button forwarc)

    if (curPage === 1 && totalPages > 1) {
      return ` 
      <button data-goto = "${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    //  if the page is the middle ( button forward and backword button)
    if(curPage > 1 && totalPages > curPage){
        return `
        <button data-goto = "${
          curPage - 1
        }"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curPage - 1}</span>
          </button>
          <button data-goto = "${
            curPage + 1
          }"  class="btn--inline pagination__btn--next">
            <span>${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    //  if the page last  ( button backward)
    if(curPage === totalPages){
        return `<button data-goto = "${
          curPage - 1
        }"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${curPage - 1}</span>
          </button>`;
    }
    

    //  if is only 1 one ( no button)
    return ''
  }

  addClickHandler(handler){
   this._parentEl.addEventListener('click',function(e){
    const btn = e.target.closest('.btn--inline')
    
    if(!btn) return

    const goto = +btn.dataset.goto


    handler(goto)
   })
}
}
export default new paginationView();
