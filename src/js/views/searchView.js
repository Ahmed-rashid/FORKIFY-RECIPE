import { timeout } from "../helpers";
class searchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const holder = this.#parentEl.querySelector('.search__field').value;
    this.#clear();
    return holder;
  }
  #clear() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
  addHanderSearch(handlerFunc) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handlerFunc();
    });
  }
}

export default new searchView 