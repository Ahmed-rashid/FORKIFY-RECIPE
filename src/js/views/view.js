// import { isArray } from 'core-js/core/array';
import { isArray } from 'core-js/./es/array';
import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }



  /**
   * 
   * @param {object | object[]  } data  the data to be rendered (eg: recipe)
   * @param {boolean} [render=true] by default is true , if fasle will return the markup  
   * @returns {undefined | string} a markup string is returned if render = false
   */
  render(data, render = true) {
    if (!data || (isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;

    const markup = this._markupGenerator();

    if (!render) return markup;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;

    const oldMarkup = this._markupGenerator();

    const markupConvreted = document
      .createRange()
      .createContextualFragment(oldMarkup);

    const updateMarkup = Array.from(markupConvreted.querySelectorAll('*'));
    const currMarkup = Array.from(this._parentEl.querySelectorAll('*'));

    updateMarkup.forEach((attr, index) => {
      const curEl = currMarkup[index];
      if (
        !attr.isEqualNode(curEl) &&
        attr.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log(attr.firstChild?.nodeValue);
        curEl.textContent = attr.textContent;
      }
      if (!attr.isEqualNode(curEl)) {
        // console.log(attr.attributes)
        const elAttributes = Array.from(attr.attributes);
        // console.log(elAttributes)
        elAttributes.forEach(elAttr => {
          curEl.setAttribute(elAttr.name, elAttr.value);
        });
      }
    });
  }
  renderMessage(msg = this._succesMessage) {
    const markup = `
    <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${msg}</p>
        </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(msg = this._errorMessage) {
    const markup = `
           <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>
  `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }
  //   #markupGenerator() {}
}
